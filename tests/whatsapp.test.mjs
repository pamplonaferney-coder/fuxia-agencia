import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const handler = require('../landing/api/whatsapp.js');

function createRes() {
  const out = { statusCode: 0, body: null, text: null, headers: {} };
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
    send(payload) {
      out.text = payload;
      return this;
    },
    setHeader(key, val) {
      out.headers[key] = val;
    }
  };
}

function makeWebhookBody(msgOverride = {}, name = 'Camila') {
  return {
    object: 'whatsapp_business_account',
    entry: [
      {
        changes: [
          {
            value: {
              contacts: [{ profile: { name } }],
              messages: [
                Object.assign(
                  {
                    from: '573001234567',
                    id: 'wamid.' + Math.random().toString(36).slice(2),
                    type: 'text',
                    text: { body: 'Hola, cuánto valen los planes de campañas?' }
                  },
                  msgOverride
                )
              ]
            }
          }
        ]
      }
    ]
  };
}

test('GET verifies Meta webhook challenge when verify_token matches', async () => {
  const prev = process.env.WHATSAPP_VERIFY_TOKEN;
  process.env.WHATSAPP_VERIFY_TOKEN = 'fuxia_verify_secret';
  try {
    const resOk = createRes();
    await handler(
      {
        method: 'GET',
        url: '/api/whatsapp?hub.mode=subscribe&hub.verify_token=fuxia_verify_secret&hub.challenge=987654'
      },
      resOk
    );
    assert.equal(resOk.out.statusCode, 200);
    assert.equal(resOk.out.text, '987654');

    const resBad = createRes();
    await handler(
      {
        method: 'GET',
        query: { 'hub.mode': 'subscribe', 'hub.verify_token': 'wrong', 'hub.challenge': '111' }
      },
      resBad
    );
    assert.equal(resBad.out.statusCode, 403);
    assert.equal(resBad.out.body.error, 'verify_failed');
  } finally {
    if (prev === undefined) delete process.env.WHATSAPP_VERIFY_TOKEN;
    else process.env.WHATSAPP_VERIFY_TOKEN = prev;
  }
});

test('rejects unsupported HTTP methods with 405', async () => {
  const res = createRes();
  await handler({ method: 'DELETE', headers: {} }, res);
  assert.equal(res.out.statusCode, 405);
  assert.equal(res.out.body.error, 'method');
});

test('validates X-Hub-Signature-256 when META_APP_SECRET is set', async () => {
  const prev = process.env.META_APP_SECRET;
  process.env.META_APP_SECRET = 'super_secret_app';
  try {
    const payload = JSON.stringify({ entry: [] });
    const badRes = createRes();
    await handler({ method: 'POST', headers: { 'x-hub-signature-256': 'sha256=deadbeef' }, body: payload }, badRes);
    assert.equal(badRes.out.statusCode, 401);
    assert.equal(badRes.out.body.error, 'invalid_signature');

    const goodSig = 'sha256=' + crypto.createHmac('sha256', 'super_secret_app').update(payload).digest('hex');
    const okRes = createRes();
    await handler({ method: 'POST', headers: { 'x-hub-signature-256': goodSig }, body: payload }, okRes);
    assert.equal(okRes.out.statusCode, 200);
    assert.equal(okRes.out.body.ignored, true);
  } finally {
    if (prev === undefined) delete process.env.META_APP_SECRET;
    else process.env.META_APP_SECRET = prev;
  }
});

test('ignores status-only webhooks and deduplicates repeated message IDs', async () => {
  const prevTok = process.env.WHATSAPP_ACCESS_TOKEN;
  const prevGroq = process.env.GROQ_API_KEY;
  const prevDis = process.env.DISABLE_POLLINATIONS_FALLBACK;
  const prevTg = process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.WHATSAPP_ACCESS_TOKEN;
  delete process.env.GROQ_API_KEY;
  process.env.DISABLE_POLLINATIONS_FALLBACK = '1';
  delete process.env.TELEGRAM_BOT_TOKEN;
  try {
    const statusRes = createRes();
    await handler(
      { method: 'POST', headers: {}, body: { entry: [{ changes: [{ value: { statuses: [{ id: 's1' }] } }] }] } },
      statusRes
    );
    assert.equal(statusRes.out.statusCode, 200);
    assert.equal(statusRes.out.body.ignored, true);

    const fixedId = 'wamid.duplicate_check_1';
    const firstRes = createRes();
    await handler({ method: 'POST', headers: {}, body: makeWebhookBody({ id: fixedId }) }, firstRes);
    assert.equal(firstRes.out.statusCode, 200);
    assert.equal(firstRes.out.body.replied, false);
    assert.equal(firstRes.out.body.aiProvider, 'fallback');

    const dupRes = createRes();
    await handler({ method: 'POST', headers: {}, body: makeWebhookBody({ id: fixedId }) }, dupRes);
    assert.equal(dupRes.out.statusCode, 200);
    assert.equal(dupRes.out.body.duplicate, true);
  } finally {
    if (prevTok !== undefined) process.env.WHATSAPP_ACCESS_TOKEN = prevTok;
    if (prevGroq !== undefined) process.env.GROQ_API_KEY = prevGroq;
    if (prevDis === undefined) delete process.env.DISABLE_POLLINATIONS_FALLBACK;
    else process.env.DISABLE_POLLINATIONS_FALLBACK = prevDis;
    if (prevTg !== undefined) process.env.TELEGRAM_BOT_TOKEN = prevTg;
  }
});

test('replies via Groq Free AI + Graph API and notifies Telegram on incoming message', async () => {
  const saved = {
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_MODEL: process.env.GROQ_MODEL,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID
  };
  const prevFetch = globalThis.fetch;
  const calls = [];
  process.env.WHATSAPP_ACCESS_TOKEN = 'wa-test-token';
  process.env.WHATSAPP_PHONE_NUMBER_ID = '1063543846848888';
  process.env.GROQ_API_KEY = 'gsk_test_free_key';
  process.env.GROQ_MODEL = 'openai/gpt-oss-120b';
  process.env.TELEGRAM_BOT_TOKEN = 'tg-test-token';
  process.env.TELEGRAM_CHAT_ID = '99999';

  try {
    globalThis.fetch = async (url, opts) => {
      calls.push({ url: String(url), method: opts && opts.method });
      if (String(url).includes('api.groq.com')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            choices: [{ message: { content: '<think>interno</think>Hola Camila, agendemos 15 min gratis.' } }]
          })
        };
      }
      return { ok: true, status: 200, json: async () => ({}) };
    };

    const res = createRes();
    await handler(
      {
        method: 'POST',
        headers: {},
        body: makeWebhookBody({ type: 'interactive', interactive: { button_reply: { title: 'Quiero diagnóstico' } } })
      },
      res
    );
    assert.equal(res.out.statusCode, 200);
    assert.equal(res.out.body.replied, true);
    assert.equal(res.out.body.aiProvider, 'groq-free');
    assert.equal(res.out.body.notified, true);
    assert.equal(res.out.body.phoneNumberId, '1063543846848888');
    assert.ok(calls.some((c) => c.url.includes('api.groq.com')));
    assert.ok(calls.some((c) => c.url.includes('1063543846848888/messages')));
    assert.ok(calls.some((c) => c.url.includes('api.telegram.org')));
  } finally {
    globalThis.fetch = prevFetch;
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
});

test('falls back to Pollinations Free AI (zero API key) and then deterministic fallback on errors', async () => {
  const saved = {
    WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    DISABLE_POLLINATIONS_FALLBACK: process.env.DISABLE_POLLINATIONS_FALLBACK,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID
  };
  const prevFetch = globalThis.fetch;
  process.env.WHATSAPP_ACCESS_TOKEN = 'wa-test-token';
  process.env.GROQ_API_KEY = 'gsk_rate_limited';
  delete process.env.DISABLE_POLLINATIONS_FALLBACK;
  process.env.TELEGRAM_BOT_TOKEN = 'tg-test-token';
  process.env.TELEGRAM_CHAT_ID = '99999';

  try {
    // Case A: Groq fails (429) -> Pollinations Free AI succeeds (200)
    globalThis.fetch = async (url) => {
      if (String(url).includes('api.groq.com')) return { ok: false, status: 429 };
      if (String(url).includes('text.pollinations.ai')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            choices: [{ message: { content: 'Respuesta IA gratis Pollinations para tu negocio.' } }]
          })
        };
      }
      return { ok: true, status: 200, json: async () => ({}) };
    };
    const resPoll = createRes();
    await handler(
      {
        method: 'POST',
        headers: {},
        body: makeWebhookBody({ type: 'button', button: { text: 'Combo Presencia Google Maps' } })
      },
      resPoll
    );
    assert.equal(resPoll.out.statusCode, 200);
    assert.equal(resPoll.out.body.aiProvider, 'pollinations-free');
    assert.equal(resPoll.out.body.replied, true);

    // Case B: Both Groq and Pollinations fail -> deterministic fallback
    globalThis.fetch = async () => ({ ok: false, status: 503 });
    const resFb = createRes();
    await handler(
      {
        method: 'POST',
        headers: {},
        body: makeWebhookBody({ text: { body: 'cuánto vale el plan arranque?' } })
      },
      resFb
    );
    assert.equal(resFb.out.statusCode, 200);
    assert.equal(resFb.out.body.aiProvider, 'fallback');
    assert.equal(resFb.out.body.replied, false);
    assert.equal(resFb.out.body.notified, false);

    // Check deterministic fallback branches directly
    const { buildFallbackReply } = handler._internals;
    assert.ok(buildFallbackReply('¿cuánto vale?', 'Juan').includes('$550.000'));
    assert.ok(buildFallbackReply('quiero el combo maps', 'Ana').includes('Combo Presencia'));
    assert.ok(buildFallbackReply('agendar diagnostico', 'Luis').includes('15 min'));
    assert.ok(buildFallbackReply('necesito campañas de meta ads', 'Sofía').includes('Ads Manager'));
    assert.ok(buildFallbackReply('hola buen día', 'Cliente').includes('FUXIA Marketing Digital'));
  } finally {
    globalThis.fetch = prevFetch;
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
});
