// POST /api/lead — captura server-side del lead (el form también abre WhatsApp).
// Notifica por Telegram. Env vars en Vercel: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const RATE_MAX_REQ = 5;
const RATE_MAX_KEYS = 500;
const rateBuckets = new Map();

function getClientIp(req) {
  const fwd = req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip']);
  if (typeof fwd === 'string' && fwd.trim()) {
    return fwd.split(',')[0].trim().slice(0, 64);
  }
  return (req.socket && req.socket.remoteAddress) ? String(req.socket.remoteAddress).slice(0, 64) : 'unknown';
}

function checkRateLimit(ip, now) {
  if (rateBuckets.size > RATE_MAX_KEYS) {
    for (const [key, timestamps] of rateBuckets.entries()) {
      const fresh = timestamps.filter((ts) => now - ts < RATE_WINDOW_MS);
      if (fresh.length) rateBuckets.set(key, fresh);
      else rateBuckets.delete(key);
    }
  }
  const prev = rateBuckets.get(ip) || [];
  const recent = prev.filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQ) {
    rateBuckets.set(ip, recent);
    const retryAfterSec = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000));
    return { allowed: false, retryAfterSec };
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return { allowed: true, retryAfterSec: 0 };
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function isAllowedOrigin(req) {
  const origin = req.headers && req.headers.origin;
  if (!origin) return true; // peticiones same-origin o sin Origin
  try {
    const u = new URL(origin);
    const host = u.hostname.toLowerCase();
    return (
      host === 'fuxia-landing.vercel.app' ||
      host.endsWith('.vercel.app') && host.startsWith('fuxia-landing') ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === 'fuxia.co' ||
      host.endsWith('.fuxia.co')
    );
  } catch {
    return false;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method' });
    return;
  }
  if (!isAllowedOrigin(req)) {
    res.status(403).json({ ok: false, error: 'origin' });
    return;
  }
  const rl = checkRateLimit(getClientIp(req), Date.now());
  if (!rl.allowed) {
    if (typeof res.setHeader === 'function') {
      res.setHeader('Retry-After', String(rl.retryAfterSec));
    }
    res.status(429).json({ ok: false, error: 'rate_limit', retryAfter: rl.retryAfterSec });
    return;
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body && typeof body === 'object' ? body : {};
  // Honeypot: si viene lleno es bot → respuesta falsa de éxito, sin notificar.
  if (body.empresa) {
    res.status(200).json({ ok: true });
    return;
  }
  const nombre = String(body.nombre || '').trim().slice(0, 60);
  const negocio = String(body.negocio || '').trim().slice(0, 80);
  const whatsapp = String(body.whatsapp || '').trim().slice(0, 20);
  const waDigits = whatsapp.replace(/\D/g, '');
  const servicio = String(body.servicio || '').trim().slice(0, 80);
  if (nombre.length < 2 || negocio.length < 2 || waDigits.length < 7 || !servicio) {
    res.status(400).json({ ok: false, error: 'validation' });
    return;
  }
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN || '';
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.CHAT_ID || '';
  if (!token || !chatId) {
    res.status(200).json({ ok: true, notified: false });
    return;
  }
  const text =
    '<b>Nuevo lead FUXIA (web)</b>\n' +
    'Nombre: ' + esc(nombre) + '\n' +
    'WhatsApp: ' + esc(whatsapp) + '\n' +
    'Negocio: ' + esc(negocio) + '\n' +
    'Interés: ' + esc(servicio);
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    const r = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: ctl.signal
    });
    clearTimeout(t);
    if (!r.ok) throw new Error('telegram ' + r.status);
    res.status(200).json({ ok: true, notified: true });
  } catch {
    res.status(200).json({ ok: true, notified: false });
  }
};
