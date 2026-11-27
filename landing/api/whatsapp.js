// GET & POST /api/whatsapp — Bot oficial FUXIA Marketing Digital (IA 100% GRATUITA: $0, sin tarjeta)
// Soporta 2 canales simultáneos sin n8n:
//   A) Widget de Chat IA en vivo en la web pública (POST { source: 'web-chat', message, name, history })
//      conviviendo en https://fuxia-landing.vercel.app junto al WhatsApp Business (+57 323 531 5015).
//   B) Webhook oficial Meta WhatsApp Cloud API (+57 324 396 4088 · Phone Number ID: 1063543846848888).
//
// Cadena de IA 100% GRATUITA:
//   1) Groq Cloud Free Tier (GROQ_API_KEY · modelo default: openai/gpt-oss-120b)
//   2) Pollinations Free OpenAI API (https://text.pollinations.ai/openai · $0 sin API key)
//   3) Fallback determinístico comercial FUXIA

const crypto = require('node:crypto');

const DEFAULT_PHONE_NUMBER_ID = '1063543846848888';
const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b';
const GRAPH_API_VERSION = 'v21.0';
const MAX_SEEN_IDS = 500;
const WEB_RATE_WINDOW_MS = 10 * 60 * 1000;
const WEB_RATE_MAX_REQ = 15;
const seenMessageIds = new Set();
const webRateBuckets = new Map();

const SYSTEM_PROMPT = [
  'Eres el asistente comercial oficial de FUXIA Marketing Digital en Medellín.',
  'Enfoque estricto: marketing digital y campañas bien estructuradas en Meta Ads (Ads Manager), contenido estratégico, landing pages y posicionamiento en Google Maps. NO vendas bots ni automatizaciones con n8n como producto principal.',
  'Canal humano directo: WhatsApp Business oficial +57 323 531 5015 (con Ferney Pamplona).',
  'Reglas de tono: español de Colombia cercano, claro, directo, sin humo ni tecnicismos. Nunca digas "setup", "UTMs" ni "tiendas de tecnología"; usa "montaje inicial", "medición exacta de anuncios" y "negocios locales".',
  'Planes oficiales (COP, sin IVA · sin contratos de 12 meses · garantía 20 días):',
  '- Diagnóstico gratis (15 min): revisamos Instagram, oferta y campañas actuales + 3 mejoras concretas.',
  '- Combo Presencia ($550.000 pago único): Links Pro + Google Maps optimizado, 100% abonable si en 30 días pasa a Arranque o Crecimiento.',
  '- Arranque ($1.500.000 pago único, opción 50/50): landing, medición exacta de CPL, perfiles optimizados, 4 piezas + 2 guiones y campaña Meta Ads estructurada.',
  '- Crecimiento (Mes 1 $1.500.000 montaje inicial, opción 50/50 · desde Mes 2 $750.000/mes): todo Arranque + 8 piezas/mes + gestión Meta Ads + reporte mensual de leads y CPL.',
  '- Escala (Mes 1 $2.500.000 montaje inicial · desde Mes 2 $1.200.000/mes): 12 piezas/mes + 4 reels + embudo multi-campaña (frío + retargeting) + tablero de métricas + reunión quincenal.',
  '- La pauta se paga directo a Meta ($300k–$600k/mes recomendado para empezar).',
  'Objetivo: responde en máximo 4–5 líneas cortas, resuelve la duda y haz 1 pregunta concreta para calificar (qué vende o si ya pauta en Meta Ads) o invitar a hablar por WhatsApp Business (+57 323 531 5015) para agendar el diagnóstico gratis de 15 min.'
].join('\n');

function escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cleanAiText(raw) {
  return String(raw || '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim()
    .slice(0, 1200);
}

function getClientIp(req) {
  const fwd = req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip']);
  if (typeof fwd === 'string' && fwd.trim()) {
    return fwd.split(',')[0].trim().slice(0, 64);
  }
  return (req.socket && req.socket.remoteAddress) ? String(req.socket.remoteAddress).slice(0, 64) : 'unknown';
}

function isAllowedWebOrigin(req) {
  const origin = req.headers && req.headers.origin;
  if (!origin) return true;
  try {
    const u = new URL(origin);
    const host = u.hostname.toLowerCase();
    return (
      host === 'fuxia-landing.vercel.app' ||
      (host.endsWith('.vercel.app') && host.startsWith('fuxia-landing')) ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === 'fuxia.co' ||
      host.endsWith('.fuxia.co')
    );
  } catch {
    return false;
  }
}

function checkWebRateLimit(ip, now) {
  if (webRateBuckets.size > 500) {
    for (const [k, tsList] of webRateBuckets.entries()) {
      const fresh = tsList.filter((t) => now - t < WEB_RATE_WINDOW_MS);
      if (fresh.length) webRateBuckets.set(k, fresh);
      else webRateBuckets.delete(k);
    }
  }
  const prev = webRateBuckets.get(ip) || [];
  const recent = prev.filter((t) => now - t < WEB_RATE_WINDOW_MS);
  if (recent.length >= WEB_RATE_MAX_REQ) {
    webRateBuckets.set(ip, recent);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((WEB_RATE_WINDOW_MS - (now - recent[0])) / 1000)) };
  }
  recent.push(now);
  webRateBuckets.set(ip, recent);
  return { allowed: true, retryAfterSec: 0 };
}

function getQueryParam(req, name) {
  if (req.query && req.query[name] !== undefined) {
    return String(req.query[name]);
  }
  if (typeof req.url === 'string' && req.url.includes('?')) {
    try {
      const u = new URL(req.url, 'https://fuxia-landing.vercel.app');
      const v = u.searchParams.get(name);
      return v === null ? '' : v;
    } catch {
      return '';
    }
  }
  return '';
}

function verifySignature(req, rawBody) {
  const secret = process.env.META_APP_SECRET || '';
  if (!secret) return true;
  const sigHeader = req.headers && (req.headers['x-hub-signature-256'] || req.headers['X-Hub-Signature-256']);
  if (typeof sigHeader !== 'string' || !sigHeader.startsWith('sha256=')) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(sigHeader, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function rememberMessageId(id) {
  if (!id) return true;
  if (seenMessageIds.has(id)) return false;
  if (seenMessageIds.size >= MAX_SEEN_IDS) {
    const first = seenMessageIds.values().next().value;
    seenMessageIds.delete(first);
  }
  seenMessageIds.add(id);
  return true;
}

function extractIncomingMessage(body) {
  const entry = Array.isArray(body.entry) ? body.entry[0] : null;
  const change = entry && Array.isArray(entry.changes) ? entry.changes[0] : null;
  const value = change && change.value ? change.value : null;
  if (!value || !Array.isArray(value.messages) || value.messages.length === 0) {
    return null;
  }
  const msg = value.messages[0];
  const contact = Array.isArray(value.contacts) ? value.contacts[0] : null;
  const name = (contact && contact.profile && contact.profile.name) ? String(contact.profile.name).trim().slice(0, 60) : 'Cliente';
  const from = String(msg.from || '').replace(/\D/g, '').slice(0, 20);
  const id = String(msg.id || '').slice(0, 128);

  let text = '';
  if (msg.type === 'text' && msg.text && msg.text.body) {
    text = String(msg.text.body);
  } else if (msg.type === 'button' && msg.button && msg.button.text) {
    text = String(msg.button.text);
  } else if (msg.type === 'interactive' && msg.interactive) {
    const br = msg.interactive.button_reply;
    const lr = msg.interactive.list_reply;
    text = (br && br.title) || (lr && lr.title) || '';
  }
  text = text.trim().slice(0, 800);
  if (!from || !text) return null;
  return { id, from, name, text };
}

function buildFallbackReply(userText, name) {
  const q = String(userText || '').toLowerCase();
  const saludo = name && name !== 'Cliente' ? `¡Hola ${name}!` : '¡Hola!';

  if (/precio|cuanto|cuánto|vale|costo|tarifa|plan|paquete/.test(q)) {
    return (
      `${saludo} Te cuento súper claro (sin contratos largos):\n` +
      `• *Combo Presencia:* $550.000 (Links Pro + Google Maps, 100% abonable en 30 días).\n` +
      `• *Arranque:* $1.500.000 pago único (50/50) con landing, medición y primera campaña Meta Ads.\n` +
      `• *Crecimiento:* Mes 1 $1.500.000 (montaje inicial) · desde mes 2 $750.000/mes.\n\n` +
      `¿Qué vende tu negocio y ya estás pautando en Meta Ads o arrancas desde cero?`
    );
  }
  if (/combo|maps|google|links/.test(q)) {
    return (
      `${saludo} El *Combo Presencia ($550.000 COP)* incluye tu página Links Pro con tu marca + optimización completa de tu ficha de Google Maps en Medellín, y es *100% abonable* si en 30 días pasas a Arranque o Crecimiento.\n\n` +
      `¿Tu negocio ya tiene ficha en Google Maps o la creamos desde cero?`
    );
  }
  if (/diagnostico|diagnóstico|cita|llamada|reunion|reunión|agendar/.test(q)) {
    return (
      `${saludo} ¡Con gusto! En el *diagnóstico gratis de 15 min* revisamos tu Instagram, tu oferta y tus campañas actuales, y sales con 3 mejoras concretas sin compromiso.\n\n` +
      `Cuéntame en 1 línea qué vendes y si prefieres mañana *AM o PM* para agendarlo.`
    );
  }
  if (/pauta|anuncio|meta|campana|campaña|publicidad|ads/.test(q)) {
    return (
      `${saludo} En *FUXIA Marketing* estructuramos campañas en Meta Ads (Ads Manager, nada de botón Promocionar) con oferta clara, creativos que convierten y medición real de CPL.\n\n` +
      `¿Qué vendes hoy y cuánto inviertes al mes en anuncios (o arrancas desde cero)?`
    );
  }
  return (
    `${saludo} Soy el asistente de *FUXIA Marketing Digital* (Medellín) 👋\n` +
    `Ayudamos a negocios locales a conseguir clientes con *campañas bien estructuradas en Meta Ads*, contenido estratégico y Google Maps.\n\n` +
    `Para darte una recomendación real, cuéntame:\n` +
    `1) ¿Qué vende tu negocio?\n` +
    `2) ¿Hoy buscas lanzar campañas, mejorar tu oferta o el Combo Presencia ($550k abonable)?`
  );
}

async function callGroqFreeAi(messages, groqKey) {
  const model = process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 6500);
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.35,
        max_tokens: 320
      }),
      signal: ctl.signal
    });
    clearTimeout(timer);
    if (!r.ok) return '';
    const data = await r.json();
    const content = data && Array.isArray(data.choices) && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : '';
    return cleanAiText(content);
  } catch {
    clearTimeout(timer);
    return '';
  }
}

async function callPollinationsFreeAi(messages) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 6500);
  try {
    const r = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'openai',
        messages,
        temperature: 0.35
      }),
      signal: ctl.signal
    });
    clearTimeout(timer);
    if (!r.ok) return '';
    const data = await r.json();
    const content = data && Array.isArray(data.choices) && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : '';
    return cleanAiText(content);
  } catch {
    clearTimeout(timer);
    return '';
  }
}

async function generateFreeAiReply(userText, name, rawHistory) {
  const history = Array.isArray(rawHistory)
    ? rawHistory
      .slice(-4)
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 400) }))
    : [];

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: name && name !== 'Cliente' ? `Nombre: ${name}\nMensaje: ${userText}` : userText }
  ];

  const groqKey = process.env.GROQ_API_KEY || '';
  if (groqKey) {
    const groqReply = await callGroqFreeAi(messages, groqKey);
    if (groqReply) return { text: groqReply, provider: 'groq-free' };
  }

  if (process.env.DISABLE_POLLINATIONS_FALLBACK !== '1') {
    const pollReply = await callPollinationsFreeAi(messages);
    if (pollReply) return { text: pollReply, provider: 'pollinations-free' };
  }

  return { text: buildFallbackReply(userText, name), provider: 'fallback' };
}

async function sendWhatsAppText(to, bodyText) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || DEFAULT_PHONE_NUMBER_ID;
  if (!accessToken) return { sent: false, reason: 'missing_access_token' };
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(phoneNumberId)}/messages`;
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { preview_url: false, body: bodyText }
      }),
      signal: ctl.signal
    });
    clearTimeout(timer);
    if (!r.ok) return { sent: false, reason: 'graph_http_' + r.status };
    return { sent: true };
  } catch {
    return { sent: false, reason: 'network_error' };
  }
}

async function notifyTelegram(title, detailLines) {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN || '';
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.CHAT_ID || '';
  if (!token || !chatId) return false;
  const text = `<b>${escHtml(title)}</b>\n` + detailLines.join('\n');
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: ctl.signal
    });
    clearTimeout(timer);
    return r.ok;
  } catch {
    return false;
  }
}

async function handleWebChat(req, res, body) {
  if (!isAllowedWebOrigin(req)) {
    res.status(403).json({ ok: false, error: 'origin' });
    return;
  }
  const rl = checkWebRateLimit(getClientIp(req), Date.now());
  if (!rl.allowed) {
    if (typeof res.setHeader === 'function') res.setHeader('Retry-After', String(rl.retryAfterSec));
    res.status(429).json({ ok: false, error: 'rate_limit', retryAfter: rl.retryAfterSec });
    return;
  }
  const message = String(body.message || '').trim().slice(0, 500);
  const name = String(body.name || 'Visitante Web').trim().slice(0, 50) || 'Visitante Web';
  if (message.length < 2) {
    res.status(400).json({ ok: false, error: 'validation' });
    return;
  }
  const ai = await generateFreeAiReply(message, name, body.history);
  const notified = await notifyTelegram('Consulta Bot IA en Web Pública', [
    'Visitante: ' + escHtml(name),
    'Mensaje: ' + escHtml(message),
    'Respuesta (' + escHtml(ai.provider) + '): ' + escHtml(ai.text.slice(0, 280))
  ]);
  res.status(200).json({ ok: true, reply: ai.text, aiProvider: ai.provider, notified });
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = getQueryParam(req, 'hub.mode');
    const token = getQueryParam(req, 'hub.verify_token');
    const challenge = getQueryParam(req, 'hub.challenge');
    const expected = process.env.WHATSAPP_VERIFY_TOKEN || '';
    if (mode === 'subscribe' && expected && token === expected) {
      if (typeof res.setHeader === 'function') res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      if (typeof res.send === 'function') {
        res.status(200).send(challenge);
      } else {
        res.status(200).json({ challenge });
      }
      return;
    }
    res.status(403).json({ ok: false, error: 'verify_failed' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method' });
    return;
  }

  let body = req.body;
  const rawBody = typeof body === 'string' ? body : JSON.stringify(body || {});
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body && typeof body === 'object' ? body : {};

  // Canal A: Widget de Chat IA en vivo en https://fuxia-landing.vercel.app
  if (body.source === 'web-chat') {
    await handleWebChat(req, res, body);
    return;
  }

  // Canal B: Webhook oficial Meta WhatsApp Cloud API (+57 324 396 4088)
  if (!verifySignature(req, rawBody)) {
    res.status(401).json({ ok: false, error: 'invalid_signature' });
    return;
  }

  const incoming = extractIncomingMessage(body);
  if (!incoming) {
    res.status(200).json({ ok: true, ignored: true });
    return;
  }
  if (!rememberMessageId(incoming.id)) {
    res.status(200).json({ ok: true, duplicate: true });
    return;
  }

  const ai = await generateFreeAiReply(incoming.text, incoming.name);
  const waStatus = await sendWhatsAppText(incoming.from, ai.text);
  const notified = await notifyTelegram('Nuevo mensaje Bot WhatsApp (+57 324 396 4088)', [
    'Nombre: ' + escHtml(incoming.name),
    'Número: +' + escHtml(incoming.from),
    'Mensaje: ' + escHtml(incoming.text),
    'IA (' + escHtml(ai.provider) + ' · ' + (waStatus.sent ? 'enviada' : escHtml(waStatus.reason || 'pendiente')) + '): ' + escHtml(ai.text.slice(0, 280))
  ]);

  res.status(200).json({
    ok: true,
    replied: waStatus.sent,
    aiProvider: ai.provider,
    notified,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || DEFAULT_PHONE_NUMBER_ID
  });
};

module.exports._internals = {
  buildFallbackReply,
  cleanAiText,
  extractIncomingMessage,
  seenMessageIds,
  webRateBuckets
};
