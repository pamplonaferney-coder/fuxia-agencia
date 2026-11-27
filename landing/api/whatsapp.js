// GET & POST /api/whatsapp — Bot oficial WhatsApp Cloud API para FUXIA (+57 324 396 4088)
// Sin n8n, 100% código serverless 24/7 en Vercel.
// Env vars en Vercel:
//   WHATSAPP_PHONE_NUMBER_ID (default: 1063543846848888 · línea +57 324 396 4088)
//   WHATSAPP_VERIFY_TOKEN    (token de verificación para el webhook de Meta)
//   WHATSAPP_ACCESS_TOKEN    (token permanente de Usuario del Sistema en Meta)
//   META_APP_SECRET          (opcional: valida firma X-Hub-Signature-256)
//   GEMINI_API_KEY           (opcional: respuestas con Gemini 2.5 Flash; si falla usa fallback)
//   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID (alerta instantánea de leads a Ferney)

const crypto = require('node:crypto');

const DEFAULT_PHONE_NUMBER_ID = '1063543846848888';
const GRAPH_API_VERSION = 'v21.0';
const MAX_SEEN_IDS = 500;
const seenMessageIds = new Set();

const SYSTEM_PROMPT = [
  'Eres el asistente comercial oficial de FUXIA Marketing Digital en Medellín (WhatsApp +57 324 396 4088).',
  'Enfoque estricto: marketing digital y campañas bien estructuradas en Meta Ads (Ads Manager), contenido estratégico, landing pages y posicionamiento en Google Maps. NO vendas bots ni automatizaciones con n8n como producto principal.',
  'Reglas de tono: español de Colombia cercano, claro, directo, sin humo ni tecnicismos. Nunca digas "setup", "UTMs" ni "tiendas de tecnología"; usa "montaje inicial", "medición exacta de anuncios" y "negocios locales".',
  'Planes oficiales (COP, sin IVA · sin contratos de 12 meses · garantía 20 días):',
  '- Diagnóstico gratis (15 min): revisamos Instagram, oferta y campañas actuales + 3 mejoras concretas.',
  '- Combo Presencia ($550.000 pago único): Links Pro + Google Maps optimizado, 100% abonable si en 30 días pasa a Arranque o Crecimiento.',
  '- Arranque ($1.500.000 pago único, opción 50/50): landing, medición exacta, perfiles optimizados, 4 piezas + 2 guiones y campaña Meta Ads estructurada.',
  '- Crecimiento (Mes 1 $1.500.000 montaje inicial, opción 50/50 · desde Mes 2 $750.000/mes): todo Arranque + 8 piezas/mes + gestión Meta Ads + reporte mensual.',
  '- Escala (Mes 1 $2.500.000 montaje inicial · desde Mes 2 $1.200.000/mes): 12 piezas/mes + 4 reels + embudo multi-campaña (frío + retargeting) + tablero de métricas + reunión quincenal.',
  '- La pauta se paga directo a Meta ($300k–$600k/mes recomendado).',
  'Objetivo: responde en máximo 5 líneas cortas, resuelve la duda y haz 1 pregunta concreta para calificar (qué vende o si ya pauta en Meta Ads) o invitar al diagnóstico gratis de 15 min.'
].join('\n');

function escHtml(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

async function generateAiReply(userText, name) {
  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) return buildFallbackReply(userText, name);
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 7000);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: `Nombre del contacto: ${name}\nMensaje: ${userText}` }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 280 }
      }),
      signal: ctl.signal
    });
    clearTimeout(timer);
    if (!r.ok) return buildFallbackReply(userText, name);
    const data = await r.json();
    const candidate = data && Array.isArray(data.candidates) ? data.candidates[0] : null;
    const parts = candidate && candidate.content && Array.isArray(candidate.content.parts) ? candidate.content.parts : [];
    const reply = parts.map((p) => p.text || '').join('').trim();
    return reply ? reply.slice(0, 1200) : buildFallbackReply(userText, name);
  } catch {
    return buildFallbackReply(userText, name);
  }
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

async function notifyTelegram(incoming, replyText, waStatus) {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN || '';
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.CHAT_ID || '';
  if (!token || !chatId) return false;
  const text =
    '<b>Nuevo mensaje Bot WhatsApp (+57 324 396 4088)</b>\n' +
    'Nombre: ' + escHtml(incoming.name) + '\n' +
    'Número: +' + escHtml(incoming.from) + '\n' +
    'Mensaje: ' + escHtml(incoming.text) + '\n' +
    'Respuesta bot (' + (waStatus.sent ? 'enviada' : escHtml(waStatus.reason || 'pendiente')) + '): ' +
    escHtml(replyText.slice(0, 300));
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

  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (!verifySignature(req, rawBody)) {
    res.status(401).json({ ok: false, error: 'invalid_signature' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body && typeof body === 'object' ? body : {};

  const incoming = extractIncomingMessage(body);
  if (!incoming) {
    res.status(200).json({ ok: true, ignored: true });
    return;
  }
  if (!rememberMessageId(incoming.id)) {
    res.status(200).json({ ok: true, duplicate: true });
    return;
  }

  const replyText = await generateAiReply(incoming.text, incoming.name);
  const waStatus = await sendWhatsAppText(incoming.from, replyText);
  const notified = await notifyTelegram(incoming, replyText, waStatus);

  res.status(200).json({
    ok: true,
    replied: waStatus.sent,
    notified,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || DEFAULT_PHONE_NUMBER_ID
  });
};

module.exports._internals = {
  buildFallbackReply,
  extractIncomingMessage,
  seenMessageIds
};
