import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const JSX_PATH = path.join(ROOT, 'FuxiaTrafico.jsx');
const OUT_INDEX = path.join(ROOT, 'trafico-web', 'index.html');
const LEGACY_MOVIL = path.join(ROOT, 'trafico-web', 'FuxiaTrafico_Movil.html');
const LEGACY_PREVIEW = path.join(ROOT, 'trafico-web', 'FuxiaTrafico_preview.html');

// Limpiar duplicados heredados si reaparecen
for (const oldFile of [LEGACY_MOVIL, LEGACY_PREVIEW]) {
  if (fs.existsSync(oldFile)) {
    fs.unlinkSync(oldFile);
    console.log('Deleted duplicate:', path.basename(oldFile));
  }
}

// 1. Bundle FuxiaTrafico.jsx -> IIFE en trafico-web/index.html
const tmpEntry = path.join(os.tmpdir(), `fuxia_trafico_entry_${process.pid}.jsx`);
fs.writeFileSync(
  tmpEntry,
  `import { createRoot } from "react-dom/client";\nimport FuxiaTrafico from ${JSON.stringify(JSX_PATH)};\ncreateRoot(document.getElementById("root")).render(<FuxiaTrafico />);\n`,
  'utf8'
);

let bundleCode;
try {
  const bundled = await esbuild.build({
    entryPoints: [tmpEntry],
    bundle: true,
    minify: true,
    format: 'iife',
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    nodePaths: [path.join(ROOT, 'node_modules')],
    write: false,
  });
  bundleCode = bundled.outputFiles[0].text.replace(/<\/script>/gi, '<\\/script>');
} finally {
  if (fs.existsSync(tmpEntry)) fs.unlinkSync(tmpEntry);
}

const unifiedHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="robots" content="noindex, nofollow" />
<title>FUXIA Marketing · Sistema 60d + Multi-Red + Marca Personal</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />
<!-- Meta Pixel Code (consentido: solo carga si aceptas cookies) -->
<script>
window.FUXIA_PIXEL_ID = '1632121441954497';
window.FuxiaPixelLoad = function () {
  if (window.fbq) return;
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', window.FUXIA_PIXEL_ID);
  fbq('track', 'PageView');
};
try { if (localStorage.getItem('fuxia_cookie_consent') === 'accepted') window.FuxiaPixelLoad(); } catch (e) {}
</script>
<noscript><img height="1" width="1" style="display:none" alt=""
src="https://www.facebook.com/tr?id=1632121441954497&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
<style>html,body{margin:0;padding:0;background:#070707;color:#F8F8F4;}#fx-footer{max-width:860px;margin:0 auto;padding:18px 20px 56px;font-family:system-ui,sans-serif;font-size:12px;color:#A6A6BA;line-height:2;border-top:1px solid rgba(255,255,255,0.1);}#fx-footer a{color:#EE72FF;}#cookie-banner{position:fixed;left:12px;right:12px;bottom:12px;z-index:10002;background:#131313;border:2px solid #E040FB;border-radius:12px;padding:14px;display:none;font-family:system-ui,sans-serif;font-size:12px;color:#aaa;line-height:1.6;max-width:520px;margin:0 auto;box-shadow:0 10px 40px rgba(224,64,251,0.35);}#cookie-banner.show{display:block;}#cookie-banner a{color:#E040FB;}#cookie-banner .ck-btns{display:flex;gap:8px;margin-top:10px;}#cookie-banner button{flex:1;padding:10px;border-radius:8px;font-weight:700;cursor:pointer;font-size:13px;}#ck-accept{background:#E040FB;color:#fff;border:1px solid #E040FB;}#ck-reject{background:transparent;color:#aaa;border:1px solid rgba(255,255,255,.3);}#ck-float{position:fixed;left:12px;bottom:12px;z-index:10001;width:44px;height:44px;border-radius:50%;background:#131313;border:1px solid #E040FB;color:#fff;font-size:20px;cursor:pointer;display:none;align-items:center;justify-content:center;}#ck-float.show{display:flex;}</style>
</head>
<body>
<div id="root"></div>
<script>
${bundleCode}
</script>
<div id="fx-footer">© 2026 FUXIA · Medellín · WA +57 323 531 5015 · Ley 1581 de 2012 · Pixel de Meta solo si aceptas<br /><a href="https://fuxia-landing.vercel.app/politica-datos.html">Tratamiento de datos</a> · <a href="https://fuxia-landing.vercel.app/politica-cookies.html">Cookies</a> · <a href="https://fuxia-landing.vercel.app/terminos.html">Términos</a></div>
<div id="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies"><div><strong>🍪 Cookies + Pixel de Meta.</strong> El Pixel solo se activa si aceptas. <a href="https://fuxia-landing.vercel.app/politica-cookies.html">Ver política</a>.</div><div class="ck-btns"><button id="ck-accept" type="button">Aceptar todo</button><button id="ck-reject" type="button">Solo necesarias</button></div></div>
<button id="ck-float" type="button" aria-label="Configurar cookies" title="Configurar cookies">🍪</button>
<script>(function(){var K='fuxia_cookie_consent',b=document.getElementById('cookie-banner'),f=document.getElementById('ck-float');function g(){try{return localStorage.getItem(K);}catch(e){return null;}}function s(v){try{localStorage.setItem(K,v);}catch(e){}}function show(){b.classList.add('show');f.classList.remove('show');}function hide(){b.classList.remove('show');if(g())f.classList.add('show');}var force=/[?#&]cookies/.test(location.search+location.hash);setTimeout(function(){if(!g()||force)show();else if(g())f.classList.add('show');},700);document.getElementById('ck-accept').addEventListener('click',function(){s('accepted');hide();if(window.FuxiaPixelLoad)window.FuxiaPixelLoad();});document.getElementById('ck-reject').addEventListener('click',function(){s('rejected');hide();});f.addEventListener('click',show);})();</script>
</body>
</html>
`;

fs.writeFileSync(OUT_INDEX, unifiedHtml, 'utf8');
console.log('Wrote unified trafico-web/index.html:', unifiedHtml.length, 'bytes');

// 2. Smoke test JSDOM de las 7 pestañas + nuevas funciones (Ir a Hoy, JSON sync, edición de leads, 0 rastros viejos)
const errors = [];
const dom = new JSDOM(unifiedHtml, { runScripts: 'dangerously', url: 'https://fuxia-trafico.vercel.app/#calendario' });
dom.window.addEventListener('error', (e) => errors.push(String(e.error || e.message)));
await new Promise((r) => setTimeout(r, 120));

const root = dom.window.document.getElementById('root');
const clickTab = async (needle) => {
  const btn = [...root.querySelectorAll('button.fx-tab')].find((b) => b.textContent.includes(needle));
  if (!btn) throw new Error('Missing tab: ' + needle);
  btn.click();
  await new Promise((r) => setTimeout(r, 40));
  return root.textContent;
};

const calText = root.textContent;
const f1Btn = [...root.querySelectorAll('button.fx-pill')].find((b) => b.textContent.includes('F1 Base'));
if (f1Btn) f1Btn.click();
await new Promise((r) => setTimeout(r, 40));
const day1Text = root.textContent;
const day3Btn = [...root.querySelectorAll('button.fx-day')].find((b) => b.textContent.trim() === '3');
if (day3Btn) day3Btn.click();
await new Promise((r) => setTimeout(r, 40));
const day3Text = root.textContent;

const redesText = await clickTab('Redes FUXIA');
const personalText = await clickTab('Marca Personal');
const tabText = await clickTab('Tablero');
const campText = await clickTab('Campañas');
const waText = await clickTab('Mensajes & DMs');
const kpiText = await clickTab('KPIs');

// Test checking a personal brand task
await clickTab('Marca Personal');
const firstTask = root.querySelector('.fx-task');
if (firstTask) firstTask.click();
await new Promise((r) => setTimeout(r, 30));
const afterCheck = root.textContent;

// Verify zero residual "tiendas de tecnología" in source JSX
const jsxSrc = fs.readFileSync(JSX_PATH, 'utf8');
const noLegacyNiche = !/tiendas de tecnolog/i.test(jsxSrc);

const checks = {
  errors: errors.length,
  noLegacyNiche,
  hasHoyButton: calText.includes('Ir a Hoy') && personalText.includes('Ir a Hoy'),
  hasDay1PerNetwork: day1Text.includes('Qué publicar hoy — red por red') && day1Text.includes('Instagram') && day1Text.includes('TikTok') && day1Text.includes('Threads') && day1Text.includes('Facebook'),
  hasDay3ExactPoll: day3Text.includes('¿Cuánto te demorás hoy en responder un WhatsApp nuevo?') && day3Text.includes('Menos de 15 min') && day3Text.includes('Más de 1 hora'),
  hasDay1DmsClear: day1Text.includes('DMs QUE TÚ ENVÍAS') && day1Text.includes('DMs / WA QUE TE LLEGAN'),
  hasRedes4: redesText.includes('TikTok') && redesText.includes('Threads') && redesText.includes('Facebook') && redesText.includes('Instagram'),
  hasPersonal4: personalText.includes('@ferneypamplona') && personalText.includes('LinkedIn') && personalText.includes('Ver texto / preguntas / guion exacto'),
  hasPersonalCheckWorked: afterCheck.includes('(1/'),
  hasTableroUpgrades: tabText.includes('Exportar respaldo JSON') && tabText.includes('Importar respaldo JSON') && tabText.includes('Seguimiento hoy'),
  hasCampNative: campText.includes('PÚBLICOS NATIVOS META'),
  hasWa: waText.includes('DMs QUE TÚ ENVÍAS') && waText.includes('DMs / WHATSAPP QUE TE LLEGAN'),
  hasKpi: kpiText.includes('Pauta acumulada'),
  movilDeleted: !fs.existsSync(LEGACY_MOVIL),
  previewDeleted: !fs.existsSync(LEGACY_PREVIEW),
};
console.log('UNIFIED SMOKE:', checks);
if (Object.values(checks).some((v) => v === false) || errors.length > 0) {
  throw new Error('Smoke test failed: ' + JSON.stringify({ checks, errors }));
}
console.log('ALL UNIFIED BUILD & SMOKE TESTS PASSED!');
