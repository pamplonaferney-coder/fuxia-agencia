// POST /api/lead — captura server-side del lead (el form también abre WhatsApp).
// Notifica por Telegram. Env vars en Vercel: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID.
function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method' });
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
  const servicio = String(body.servicio || '').trim().slice(0, 80);
  if (nombre.length < 2 || negocio.length < 2 || !servicio) {
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
