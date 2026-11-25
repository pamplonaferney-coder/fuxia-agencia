import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const handler = require('../landing/api/lead.js');

function createRes() {
  const out = { statusCode: 0, body: null, headers: {} };
  return {
    out,
    status(code) {
      out.statusCode = code;
      return this;
    },
    json(payload) {
      out.body = payload;
      return this;
    },
    setHeader(key, val) {
      out.headers[key] = val;
    }
  };
}

test('rejects non-POST methods with 405', async () => {
  const res = createRes();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.out.statusCode, 405);
  assert.equal(res.out.body.error, 'method');
});

test('rejects disallowed external origin with 403', async () => {
  const res = createRes();
  await handler({
    method: 'POST',
    headers: { origin: 'https://malicious.example', 'x-forwarded-for': '10.0.0.1' },
    body: { nombre: 'Ana', negocio: 'Cafe', whatsapp: '3001234567', servicio: 'Combo' }
  }, res);
  assert.equal(res.out.statusCode, 403);
  assert.equal(res.out.body.error, 'origin');
});

test('rejects invalid origin URL with 403', async () => {
  const res = createRes();
  await handler({
    method: 'POST',
    headers: { origin: 'not-a-valid-url', 'x-forwarded-for': '10.0.0.2' },
    body: { nombre: 'Ana', negocio: 'Cafe', whatsapp: '3001234567', servicio: 'Combo' }
  }, res);
  assert.equal(res.out.statusCode, 403);
});

test('returns silent 200 when honeypot field is filled', async () => {
  const res = createRes();
  await handler({
    method: 'POST',
    headers: { origin: 'https://fuxia-landing.vercel.app', 'x-forwarded-for': '10.0.0.3' },
    body: JSON.stringify({ empresa: 'BotCorp', nombre: 'Bot', negocio: 'Spam', whatsapp: '3001234567', servicio: 'Combo' })
  }, res);
  assert.equal(res.out.statusCode, 200);
  assert.equal(res.out.body.ok, true);
});

test('returns 400 when whatsapp or required fields are invalid', async () => {
  const res = createRes();
  await handler({
    method: 'POST',
    headers: { origin: 'https://fuxia-landing.vercel.app', 'x-forwarded-for': '10.0.0.4' },
    body: { nombre: 'Ana', negocio: 'Cafe', whatsapp: '123', servicio: 'Combo' }
  }, res);
  assert.equal(res.out.statusCode, 400);
  assert.equal(res.out.body.error, 'validation');
});

test('accepts valid lead without Telegram credentials (notified: false)', async () => {
  const prevTok = process.env.TELEGRAM_BOT_TOKEN;
  const prevChat = process.env.TELEGRAM_CHAT_ID;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  try {
    const res = createRes();
    await handler({
      method: 'POST',
      headers: { origin: 'https://fuxia-landing.vercel.app', 'x-forwarded-for': '10.0.0.5' },
      body: { nombre: 'Carlos', negocio: 'Estetica', whatsapp: '300 555 1234', servicio: 'Combo Presencia' }
    }, res);
    assert.equal(res.out.statusCode, 200);
    assert.deepEqual(res.out.body, { ok: true, notified: false });
  } finally {
    if (prevTok !== undefined) process.env.TELEGRAM_BOT_TOKEN = prevTok;
    if (prevChat !== undefined) process.env.TELEGRAM_CHAT_ID = prevChat;
  }
});

test('notifies Telegram on valid lead and handles Telegram HTTP errors safely', async () => {
  const prevTok = process.env.TELEGRAM_BOT_TOKEN;
  const prevChat = process.env.TELEGRAM_CHAT_ID;
  const prevFetch = globalThis.fetch;
  process.env.TELEGRAM_BOT_TOKEN = 'test-token';
  process.env.TELEGRAM_CHAT_ID = '12345';
  try {
    globalThis.fetch = async () => ({ ok: true, status: 200 });
    const resOk = createRes();
    await handler({
      method: 'POST',
      headers: { origin: 'https://fuxia.co', 'x-forwarded-for': '10.0.0.6' },
      body: { nombre: 'Laura <3', negocio: 'Repostería & Café', whatsapp: '3109876543', servicio: 'Crecimiento' }
    }, resOk);
    assert.equal(resOk.out.statusCode, 200);
    assert.deepEqual(resOk.out.body, { ok: true, notified: true });

    globalThis.fetch = async () => ({ ok: false, status: 500 });
    const resErr = createRes();
    await handler({
      method: 'POST',
      headers: { 'x-real-ip': '10.0.0.7' },
      body: { nombre: 'Mateo', negocio: 'Servicios', whatsapp: '3152223344', servicio: 'Arranque' }
    }, resErr);
    assert.equal(resErr.out.statusCode, 200);
    assert.deepEqual(resErr.out.body, { ok: true, notified: false });
  } finally {
    globalThis.fetch = prevFetch;
    if (prevTok === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
    else process.env.TELEGRAM_BOT_TOKEN = prevTok;
    if (prevChat === undefined) delete process.env.TELEGRAM_CHAT_ID;
    else process.env.TELEGRAM_CHAT_ID = prevChat;
  }
});

test('enforces rate limit after 5 requests from same IP (429 + Retry-After)', async () => {
  const ip = '10.0.0.99';
  for (let i = 0; i < 5; i++) {
    const r = createRes();
    await handler({
      method: 'POST',
      headers: { 'x-forwarded-for': ip },
      body: { nombre: 'Test', negocio: 'Biz', whatsapp: '3001112233', servicio: 'Combo' }
    }, r);
    assert.equal(r.out.statusCode, 200);
  }
  const blocked = createRes();
  await handler({
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: { nombre: 'Test', negocio: 'Biz', whatsapp: '3001112233', servicio: 'Combo' }
  }, blocked);
  assert.equal(blocked.out.statusCode, 429);
  assert.equal(blocked.out.body.error, 'rate_limit');
  assert.ok(Number(blocked.out.headers['Retry-After']) > 0);
});
