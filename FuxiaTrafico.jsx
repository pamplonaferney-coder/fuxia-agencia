import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// FUXIA × FERNEY — SISTEMA 60 DÍAS + SETUP
// Setup: lun 14 – dom 20 sept 2026 · Día 1: lun 21 sept · Día 60: jue 19 nov
// Pauta: C1 retargeting d16-30 + C2 frío d31-45 ($10k/d) + sostener F4
// Base $450k · Techo $500k · Uso: claude.ai artifacts o CodeSandbox
// ═══════════════════════════════════════════════════════════════════

const F = "#E040FB";
const BG = "#070707";
const S1 = "#101010";
const S2 = "#181818";
const T1 = "#F0EFE8";
const T2 = "#888880";
const T3 = "#444440";
const B2 = "rgba(255,255,255,0.06)";
const OK = "#8AE8A0";
const WARN = "#F5C842";
const GASTO = "#FF8A65";

const TECHO = 500000;
const WA_NUM = "573005370203";
const WD = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fecha(idx) {
  const b = new Date(2026, 8, 14 + idx);
  return WD[b.getDay()] + " " + b.getDate() + " " + MO[b.getMonth()];
}
function gastoDia(idx) {
  const d = idx - 6; // día 1 = idx 7
  if (d >= 16 && d <= 60) return 10000;
  return 0;
}

// ─── DOCUMENTOS COMPLETOS (guiones, campañas, plantillas, reglas) ───
const DOCS = {
reel1: { t: "Guion reel Día 1 — Ferney", txt:
`IG @ferneypamplona · 35-40s · 9:16 · Publicar lun 12:00-14:00

[0-3s] HOOK — a cámara con tinto en mano. Texto: "Paré un mes. Esto aprendí."
[3-12s] EL POR QUÉ — "Publicaba todos los días. Funcionó a medias: seguidores, no clientes."
[12-22s] LA LECCIÓN — pantalla pipeline vacío. "Seguidores ✓ Clientes ✗. Contenido con objetivo: confianza primero, venta después."
[22-32s] LO QUE VIENE — "Retomo Fuxia: diagnóstico gratis primero. Sin presión."
[32-38s] CIERRE — "Negocio en Medellín: escribime. El diagnóstico es gratis. El tinto lo pongo yo."
[38-40s] OUTRO — Logo FUXIA.

Grabación: 8-10 AM luz frontal, tinto en mano, mirar AL LENTE, subtítulos quemados, música tendencia vol 20%.

CAPTION:
Paré un mes. Esto es lo que aprendí:
Publicar todos los días sin sistema = seguidores, no clientes.
Retomo Fuxia: diagnóstico gratis primero, propuesta después. Sin presión, sin letra chica.
Negocio en Medellín: escribime por DM. El tinto lo pongo yo ☕
📍 Medellín · @fuxia_oficial
#automatizacion #ia #pymes #medellin #fuxia #emprendimiento #inteligenciaartificial

STORIES (30 min después): 1) screenshot reel "te costó escribir", 2) selfie + sticker link WA, 3) "5 cupos diagnóstico" + caja de preguntas.` },
creativoA: { t: "Creativo A — Reel demo del bot (25-30s)", txt:
`9:16 · Orgánico día 18 + anuncio en todas las campañas.
[0-3s] Notificación WA entrante. Texto: "Un cliente escribe a las 11 PM."
[3-8s] Split dueño dormido / cliente esperando. Voz: "Esto pasa todos los días en Medellín."
[8-20s] SCREEN RECORDING REAL sin cortes: cliente pregunta → bot responde → agenda → link de pago. Texto: "Respuesta instantánea. 24/7."
[20-25s] Ferney a cámara con celular: "Esto se monta en 1 semana."
[25-30s] Logo + "DM o comenta DEMO".
Reglas: pantalla real, subtítulos quemados, música sin copyright vol 20%.` },
creativoB: { t: "Creativo B — Carrusel de casos (6 slides 1080x1350)", txt:
`Orgánico días 2 y 4 + anuncio. Paleta: fondo #0A0A0C, texto #F2EFE9, acento #E040FB.
S1 Portada: "2 negocios. 2 casos reales."
S2 KATOBO antes: pedidos por WA y DM mezclados, todo a cuaderno.
S3 KATOBO después: bot contesta 70% · pedidos a panel · 8h/semana recuperadas.
S4 DB antes: web solo portafolio, sin captación.
S5 DB después: formulario a WA · respuesta <30s · 3 leads calificados mes 1.
S6 Cierre: "Tu negocio puede ser el siguiente. Diagnóstico gratis. Link en bio."

CAPTION DÍA 2:
2 casos reales de Medellín. KATOBO: 8h/semana. DB: 3 leads mes 1. No es magia, es automatización.
Comentá CASO o escribime por DM. 📍 Medellín · @fuxia_oficial` },
creativoC: { t: "Creativo C — Reel proceso Fuxia (30-40s)", txt:
`9:16 · Orgánico día 16 + anuncio.
[0-3s] "Así trabajamos en Fuxia."
[3-10s] PASO 1 Diagnóstico gratis 15 min: qué te quita tiempo, qué se automatiza y qué no.
[10-18s] PASO 2 Propuesta 1 página en 48h, precio fijo, sin letra chica.
[18-28s] PASO 3 Implementación 1-2 semanas, aprobás cada paso.
[28-35s] PASO 4 Soporte: si algo falla nos enteramos los dos.
[35-40s] "Diagnóstico gratis. Escribime y arrancamos."
A cámara siempre, fondo limpio, pantallas sin datos sensibles, subtítulos quemados.

CAPTION DÍA 16:
1. Diagnóstico gratis (15 min) 2. Propuesta 1 página (48h) 3. Implementación (1-2 sem) 4. Soporte.
Sin contratos 12 meses. Sin letra chica. Sin cobrar por hora. DM. 📍 Medellín · @fuxia_oficial` },
camp1: { t: "Campaña 1 — Retargeting (d16-30, $150k)", txt:
`Ads Manager → Crear → Objetivo Interacción → "FUXIA | Retargeting | D16-30 | WhatsApp". Sin Advantage+ presupuesto, sin A/B.
CONJUNTO "Caliente | WhatsApp": Conversión Mensajes → WhatsApp. $10.000/día. Medellín +25km, 25-50, todos.
Públicos combinados (O): visitantes web 30d + interactuaron IG Fuxia 30d + interactuaron IG Ferney 30d + vieron 50%+ reels 30d.
Ubicaciones Advantage+. 3 ANUNCIOS:
1A Demo bot (reel A): "Mientras dormís, el bot contesta. Real, sin edición." Titular: Tu WhatsApp se responde solo.
1B Casos (carrusel B): "2 negocios, 2 resultados. ¿El siguiente?" Titular: Casos reales.
1C Proceso (reel C): "Diagnóstico, propuesta, 1-2 semanas, soporte." Titular: Diagnóstico gratis 15 min.
Botón: Enviar mensaje. URL: https://wa.me/${WA_NUM}?text=Hola,%20quiero%20info
D16-21 NO TOCAR (responder <1h, anotar). D21: comparar costo/conversación, ganador +30%, pausar 2.` },
camp2: { t: "Campaña 2 — Frío controlado (d31-45, $150k)", txt:
`Misma estructura. "FUXIA | Frío | D31-45 | WhatsApp". $10.000/día.
PÚBLICO: Medellín +25km 25-50. Intereses (O): PyME, Emprendimiento, WhatsApp Business, Marketing digital, Publicidad en línea.
EXCLUIR: retargeting + seguidores.
ANUNCIOS (mismos creativos, textos educativos):
2A "3 tareas a mano que la IA hace en segundos. ¿Cuál te quita más tiempo?" Titular: Automatizá lo repetitivo.
2B "Web que vende sola (caso DB)." Titular: Webs que venden solas.
2C "5 cupos fundador, precio congelado." Titular: 5 cupos · Precio fundador.
D31-36 NO TOCAR. D37: pausar 2 peores; ganador +30% SOLO si CPA < $10.000; si todo > $15.000 pausar C2 y reforzar C1.
D45 DECISIÓN: ¿escalar ganadora +20%? ¿cambiar creativos? ¿pausar y esperar mes 2?` },
plantillas: { t: "Plantillas copy-paste Ads Manager", txt:
`CAMPAÑA: Interacción · FUXIA | [Retargeting/Frío] | WhatsApp · $10.000/día · Mensajes → WhatsApp.
RETARGETING: Medellín +25km, 25-50, todos. O: web 30d + IG Fuxia 30d + IG Ferney 30d + video 50% 30d.
FRÍO: igual geo/edad. O: PyME, Emprendimiento, WA Business, Marketing digital, Publi en línea. Excluir retargeting.
COPIES (texto/titular/descripción/botón):
1A "Mientras dormís, el bot contesta…" / Tu WhatsApp se responde solo / Diagnóstico gratis · Medellín / Enviar mensaje
1B "2 negocios, 2 resultados…" / Casos reales de automatización / Diagnóstico gratis · Medellín / Enviar mensaje
1C "Diagnóstico, propuesta, 1-2 semanas…" / Diagnóstico gratis en 15 minutos / Automatización e IA · Medellín / Enviar mensaje
2A "3 tareas a mano…" / Automatizá lo repetitivo / Diagnóstico gratis · Medellín / Enviar mensaje
2B "Web que vende sola…" / Webs que venden solas / Ejemplos reales · Medellín / Enviar mensaje
2C "5 cupos fundador…" / 5 cupos · Precio fundador / Diagnóstico sin costo / Enviar mensaje
URL base: https://wa.me/${WA_NUM}` },
checklist16: { t: "Checklist lanzamiento (día 16)", txt:
`[ ] WA Business Fuxia funcionando + link wa.me probado
[ ] Pixel disparando eventos en la landing
[ ] Retargeting con 100+ personas (si no, esperar 2 días)
[ ] 3 creativos subidos (A, B, C) + textos del documento
[ ] Página FB vinculada + método de pago activo
[ ] $10.000/día definidos, campaña en Borrador
Todo ✅ → PUBLICAR.` },
reglas: { t: "6 reglas que no se rompen", txt:
`1. NUNCA "Promocionar publicación". Siempre Ads Manager.
2. NO tocar la campaña los primeros 6 días (aprendizaje).
3. WhatsApp respondido en MENOS DE 1 HORA. La velocidad ES el producto.
4. El KPI es conversación → llamada, NO el clic.
5. Primeros $10k/día validan: CPA < $8.000 a 15 días = subir. CPA > $15.000 = pausar y revisar.
6. Escasez REAL: 5 cupos son 5. Cierran viernes = cierran viernes.` },
arbol: { t: "Árbol NO vende — D16/D21/D31/D37 (3 capas)", txt:
`SOLO usar con 6+ días sin tocar. Si no, NO TOCAR y salir.

CAPA 1 — DATOS (si falla, no toques presupuesto ni creativo):
[ ] Pixel Helper en incógnito + Aceptar todo: PageView ID 1632121441954497 en verde?
[ ] Lead (formulario) y Contact (clic wa.me) disparando? + /api/lead llega a Telegram?
[ ] UTMs por CTA (hero/paquetes/popup) separando origen?
[ ] WA respondido <1h en todos los chats? (si no, no es algoritmo, es operación)
NO → fix medición, reinicia conteo 6 días. SÍ → pasa a Capa 2.

CAPA 2 — APRENDIZAJE (volumen $10k/d = 1-3 conv/día, siempre limitado):
[ ] Retargeting ≥100 personas? Si no, espera 2 días, no publiques C1/C2.
[ ] Frecuencia frío >3? Overlap C1 vs C2? Excluiste retargeting+seguidores en frío?
[ ] Rechazos / cuenta limitada? Presupuesto $10k/día intacto?
CPA >$15k en 6 días → pausar C2 y reforzar C1. CPA $10-15k → aguanta + itera 1 ángulo.
SÍ → pasa a Capa 3.

CAPA 3 — NEGOCIO (cierra el número?):
Ticket Starter $1.5M / Pro $3.5M / Fund $6.5M. Cierre 1/20 conv = CPA viable <$75k, pero para escalar exige <$8-10k.
[ ] Oferta clara? Diagnóstico 15min gratis + propuesta 1 página 48h?
[ ] Creativo pantalla real (demo bot / caso / proceso)? Sin humo, subtítulos quemados?
[ ] Calificación 3 preguntas WA aplicada? Sin filtro = curiosos.
DECISIÓN:
- Dato roto → fix + reiniciar.
- 1 ángulo gana → réplica mismo hook otro inicio, pausa 2 perdedores, ganador +30% SOLO si CPA <$10k.
- Todo >$15k → mata frío, orgánico + retargeting hasta mes 2.
- D45: escalar ganadora +20%? cambiar creativos? pausar? Con dato, no gusto.` } };

const WA_T = [
{ t: "Bienvenida automática", txt: `Hola 👋 Gracias por escribir a FUXIA. Contamos en 2 líneas qué hacen en tu negocio y te digo en 15 min qué se puede automatizar. ¿A qué se dedican? — Ferney` },
{ t: "Calificación (3 preguntas)", txt: `Perfecto. Para no hacerte perder tiempo, 3 cortas: 1) ¿Cuántos mensajes les llegan al día por WA/IG? 2) ¿Quién los responde y en qué horario? 3) ¿Qué pregunta les repiten el 80% del tiempo?` },
{ t: "Agendamiento", txt: `Con eso ya veo por dónde va. ¿Te sirve una llamada de 15 min mañana? Te mando propuesta de 1 página en 48h después. ¿Mañana AM o PM?` },
{ t: "Seguimiento 48h", txt: `Hola [nombre], te había mandado la propuesta corta de FUXIA. ¿La pudiste ver? Si no es el momento, todo bien, me decís y la dejamos para después.` },
{ t: "Reactivación leads fríos", txt: `Hola [nombre], soy Ferney de FUXIA (Medellín). Hace un tiempo hablamos de automatizar [negocio]. Abrí 5 cupos de diagnóstico gratis esta semana. ¿Te sirve uno de 15 min?` } ];

// ─── PLAN: setup idx 0-6 (14-20 sep) + días 1-60 (21 sep - 19 nov) ───
// d: -7..-1 setup · 1..60 · tareas: máx 5 · docs: claves de DOCS
const PLAN = [
{ i: 0, fase: "Setup", titulo: "WhatsApp Business de Fuxia", tareas: ["Descargar WA Business y crear cuenta Fuxia", "Perfil: foto logo, horario, ubicación Medellín, catálogo con 3 paquetes", "Bienvenida + mensaje de ausencia automáticos", "Probar wa.me/" + WA_NUM + " con mensaje precargado"], kpi: "WA operativo con bienvenida + catálogo", tip: "La velocidad de respuesta ES el producto que vendés." },
{ i: 1, fase: "Setup", titulo: "Pixel + medición", tareas: ["Pedir/instalar Pixel ID en la landing", "Verificar con Meta Pixel Helper: ViewContent, Contact, Lead", "Probar formulario: debe llegar aviso a Telegram (/api/lead)", "Confirmar UTMs por CTA (hero, paquetes, popup)"], kpi: "Eventos disparando", tip: "Sin medición, la pauta es adivinanza." },
{ i: 2, fase: "Setup", titulo: "Lead magnet", tareas: ["PDF '5 procesos que podés automatizar esta semana'", "Subirlo con URL pública + link en bio", "Caption de lanzamiento en historias", "Conectar descarga a captura (DM o email)"], kpi: "Magnet descargable", tip: "1 problema, 1 promesa, 2 páginas." },
{ i: 3, fase: "Setup", titulo: "Bios que venden", tareas: ["Bio @ferneypamplona: propuesta + prueba + CTA WA", "Bio @fuxia_oficial igual + highlights (casos, precios, WA)", "Links actualizados en ambas", "Foto perfil nítida en ambas"], kpi: "Bios listas", tip: "3 segundos: qué, para quién, cómo contactar." },
{ i: 4, fase: "Setup", titulo: "Reactivar fríos + grabar A", tareas: ["Enviar 15 mensajes reactivación (plantilla WA)", "Grabar Creativo A: reel demo del bot (guion completo)", "Subtítulos quemados + música sin copyright"], kpi: "15 mensajes + CR-A listo", tip: "Pantalla real, sin cortes: lo real vende.", docs: ["creativoA"] },
{ i: 5, fase: "Setup", titulo: "Casos + diseñar B", tareas: ["Empaquetar KATOBO (fotos, 8h/semana) y DB (3 leads)", "Diseñar Creativo B: carrusel 6 slides en Canva", "Revisar paleta #0A0A0C/#F2EFE9/#E040FB"], kpi: "Carrusel B listo", tip: "Un dato por slide.", docs: ["creativoB"] },
{ i: 6, fase: "Setup", titulo: "BM + pago + grabar C", tareas: ["Business Manager + método de pago activo", "Vincular página FB + cuenta WA", "Grabar Creativo C: reel proceso", "Pasar checklist de lanzamiento"], kpi: "Todo en borrador + CR-C listo", tip: "Nada se publica hoy.", docs: ["creativoC", "checklist16"] },

{ i: 7, fase: "F1 · Cimientos", titulo: "Día 1 — Reel Ferney", tareas: ["Publicar reel día 1 (12:00-14:00) + historias", "Enviar 3 DMs con el magnet", "Responder TODO <2h"], kpi: "Reel vivo + 3 DMs", tip: "El tinto lo pones vos.", docs: ["reel1"] },
{ i: 8, fase: "F1 · Cimientos", titulo: "Día 2 — Carrusel casos", tareas: ["Publicar carrusel B + caption día 2", "Enviar 3 DMs", "Historias anunciando el carrusel"], kpi: "Carrusel vivo", docs: ["creativoB"] },
{ i: 9, fase: "F1 · Cimientos", titulo: "Día 3 — Detrás de cámara", tareas: ["Historia setup + encuesta", "3 DMs magnet", "Comentar 5 cuentas aliadas"], kpi: "Alcance orgánico" },
{ i: 10, fase: "F1 · Cimientos", titulo: "Día 4 — Rotar formato", tareas: ["Reel o carrusel del banco", "3 DMs", "Registrar leads en Notion"], kpi: "Pipeline al día" },
{ i: 11, fase: "F1 · Cimientos", titulo: "Día 5 — Encuesta + follow-up", tareas: ["Historia encuesta nicho", "3 DMs", "Follow-up a los del día 1"], kpi: "Follow-ups hechos" },
{ i: 12, fase: "F1 · Cimientos", titulo: "Día 6 — Banco", tareas: ["Grabar 2 crudos", "2 DMs", "Editar 1 para mañana"], kpi: "Banco +2" },
{ i: 13, fase: "F1 · Cimientos", titulo: "Día 7 — Revisión S1", tareas: ["Contar: leads / conversaciones / llamadas", "Anotar qué pieza rindió", "Planear semana 2"], kpi: "Informe S1" },
{ i: 14, fase: "F1 · Cimientos", titulo: "Día 8 — Reel 3 procesos", tareas: ["Reel '3 tareas a mano' (base anuncio 2A)", "3 DMs", "Historias"], kpi: "Reel vivo" },
{ i: 15, fase: "F1 · Cimientos", titulo: "Día 9 — Caso DB", tareas: ["Carrusel/post caso DB", "3 DMs", "Calificar leads (plantilla WA)"], kpi: "Leads calificados" },
{ i: 16, fase: "F1 · Cimientos", titulo: "Día 10 — Historias + DMs", tareas: ["Historias cotidianas + link", "3 DMs", "Agendar llamadas que salgan"], kpi: "Calls en agenda" },
{ i: 17, fase: "F1 · Cimientos", titulo: "Día 11 — Reel + follow-ups", tareas: ["Reel del banco", "3 DMs", "Follow-up días 2-4"], kpi: "2da vuelta lista" },
{ i: 18, fase: "F1 · Cimientos", titulo: "Día 12 — Historias", tareas: ["Historias + caja de preguntas", "3 DMs", "Responder todo"], kpi: "Engagement" },
{ i: 19, fase: "F1 · Cimientos", titulo: "Día 13 — Banco", tareas: ["Grabar 2 crudos", "2 DMs", "Revisar magnet: ¿descargas?"], kpi: "Banco +2" },
{ i: 20, fase: "F1 · Cimientos", titulo: "Día 14 — Revisión 2 sem", tareas: ["Totales 14 días vs meta F1 (20/5/1)", "Ajustar hooks flojos", "Descanso"], kpi: "Informe 14d" },
{ i: 21, fase: "F1 · Cimientos", titulo: "Día 15 — Pre-lanzamiento C1", tareas: ["Pasar checklist lanzamiento completo", "Verificar retargeting ≥100 personas (si no, esperar)", "Dejar C1 en BORRADOR (no publicar)", "Avisar en historias: 'mañana arranca pauta'"], kpi: "C1 lista para publicar", tip: "Si el público es chico, esperar 2 días.", docs: ["checklist16", "plantillas"] },

{ i: 22, fase: "F2 · Tracción", titulo: "Día 16 — PUBLICAR C1 + reel proceso", tareas: ["Pasar Árbol NO vende Capa 1 (Pixel+WA+UTMs) antes de publicar", "Publicar Campaña 1 (paso a paso)", "Publicar reel proceso C + caption día 16", "Responder <1h todo"], kpi: "C1 activa", tip: "Desde hoy: NO TOCAR 6 días.", docs: ["arbol", "camp1", "creativoC"] },
{ i: 23, fase: "F2 · Tracción", titulo: "Día 17 — Observar", tareas: ["Solo revisar rechazos", "Orgánico normal + 3 DMs", "Anotar leads"], kpi: "0 rechazos" },
{ i: 24, fase: "F2 · Tracción", titulo: "Día 18 — Reel demo orgánico", tareas: ["Publicar reel demo bot + caption (comenta DEMO)", "3 DMs", "Responder DEMOs al instante"], kpi: "Comentarios DEMO", docs: ["creativoA"] },
{ i: 25, fase: "F2 · Tracción", titulo: "Día 19 — Sostener", tareas: ["Orgánico + 3 DMs", "Calificar chats con plantilla", "Agendar llamadas"], kpi: "Calls agendadas" },
{ i: 26, fase: "F2 · Tracción", titulo: "Día 20 — Sostener", tareas: ["Orgánico + 3 DMs", "Follow-up propuestas", "Anotar"], kpi: "Pipeline vivo" },
{ i: 27, fase: "F2 · Tracción", titulo: "Día 21 — OPTIMIZACIÓN C1", tareas: ["Pasar Árbol NO vende (Capas 1-2-3) — solo si lleva 6 días intacta", "Comparar costo/conversación A vs B vs C", "Ganador +30%, pausar 2 perdedores", "Anotar ángulo ganador (demo/caso/proceso)"], kpi: "C1 optimizada", tip: "El dato manda, no el gusto.", docs: ["arbol", "camp1"] },
{ i: 28, fase: "F2 · Tracción", titulo: "Día 22 — Réplica", tareas: ["Variación del ángulo ganador (mismo hook, otro inicio)", "3 DMs", "Llamadas"], kpi: "Variación lista" },
{ i: 29, fase: "F2 · Tracción", titulo: "Día 23 — Sostener", tareas: ["Orgánico + 3 DMs", "Propuestas pendientes", "Anotar"], kpi: "2 propuestas (meta F2)" },
{ i: 30, fase: "F2 · Tracción", titulo: "Día 24 — Sostener", tareas: ["Orgánico + historias", "3 DMs", "Revisar CPL acumulado"], kpi: "CPL controlado" },
{ i: 31, fase: "F2 · Tracción", titulo: "Día 25 — Empuje", tareas: ["Historia 'quedan X cupos' (solo real)", "Follow-ups", "Llamadas"], kpi: "Urgencia real" },
{ i: 32, fase: "F2 · Tracción", titulo: "Día 26 — Banco", tareas: ["Grabar 2 crudos", "2 DMs", "Descanso parcial"], kpi: "Banco" },
{ i: 33, fase: "F2 · Tracción", titulo: "Día 27 — Informe", tareas: ["Gastado/leads/calls/propuestas F2", "Comparar vs meta (50/15/5/2)", "Ajustar"], kpi: "Informe F2" },
{ i: 34, fase: "F2 · Tracción", titulo: "Día 28 — Transición", tareas: ["Preparar C2 en borrador", "Orgánico", "Descanso"], kpi: "C2 en borrador" },
{ i: 35, fase: "F2 · Tracción", titulo: "Día 29 — Revisión", tareas: ["Cerrar números F2", "Lecciones", "Anunciar C2"], kpi: "F2 cerrada" },
{ i: 36, fase: "F2 · Tracción", titulo: "Día 30 — Cierre F2", tareas: ["Post balance público", "Agradecer", "Preparar d31"], kpi: "Balance público" },

{ i: 37, fase: "F3 · Conversión", titulo: "Día 31 — PUBLICAR C2", tareas: ["Pasar Árbol NO vende Capa 1-2 (exclusiones + frecuencia + ≥100)", "Publicar Campaña 2 frío (paso a paso)", "Orgánico educativo", "Responder <1h"], kpi: "C2 activa", tip: "Frío cuesta más: normal.", docs: ["arbol", "camp2", "plantillas"] },
{ i: 38, fase: "F3 · Conversión", titulo: "Día 32-36 — No tocar", tareas: ["NO tocar C2", "Orgánico + 3 DMs/día", "Anotar leads y calidad"], kpi: "Aprendizaje C2" },
{ i: 39, fase: "F3 · Conversión", titulo: "Día 33 — Sostener", tareas: ["Orgánico", "Llamadas y propuestas", "Follow-ups"], kpi: "Propuestas" },
{ i: 40, fase: "F3 · Conversión", titulo: "Día 34 — Sostener", tareas: ["Orgánico", "3 DMs", "Calificar"], kpi: "Pipeline" },
{ i: 41, fase: "F3 · Conversión", titulo: "Día 35 — Sostener", tareas: ["Orgánico", "Historias cupos", "Llamadas"], kpi: "Calls" },
{ i: 42, fase: "F3 · Conversión", titulo: "Día 36 — Pre-corte", tareas: ["Revisar CPA provisorio C2", "Orgánico", "Anotar"], kpi: "CPA provisorio" },
{ i: 43, fase: "F3 · Conversión", titulo: "Día 37 — OPTIMIZACIÓN C2", tareas: ["Pasar Árbol NO vende completo — decide: escalar / iterar / matar", "Pausar 2 peores", "Ganador +30% SOLO si CPA < $10.000", "Si todo > $15.000: pausar C2 y reforzar C1"], kpi: "C2 optimizada", docs: ["arbol", "camp2"] },
{ i: 44, fase: "F3 · Conversión", titulo: "Día 38 — Cierre", tareas: ["Empujar propuestas abiertas", "Follow-ups", "Llamadas"], kpi: "Cierres en curso" },
{ i: 45, fase: "F3 · Conversión", titulo: "Día 39 — Cierre", tareas: ["Orgánico + escasez real", "Cerrar", "Anotar"], kpi: "1-2 cierres" },
{ i: 46, fase: "F3 · Conversión", titulo: "Día 40 — Sostener", tareas: ["Orgánico", "Onboarding cliente nuevo", "Anotar"], kpi: "Entrega inicia" },
{ i: 47, fase: "F3 · Conversión", titulo: "Día 41 — Sostener", tareas: ["Orgánico", "Propuestas", "Banco 2 crudos"], kpi: "Banco" },
{ i: 48, fase: "F3 · Conversión", titulo: "Día 42 — Informe", tareas: ["Números F3 vs meta (80/25/8/4/1-2)", "Qué campaña ganó y por qué", "Ajustar"], kpi: "Informe F3" },
{ i: 49, fase: "F3 · Conversión", titulo: "Día 43 — Transición", tareas: ["Planificar escala F4", "Orgánico", "Descanso"], kpi: "Plan F4" },
{ i: 50, fase: "F3 · Conversión", titulo: "Día 44 — Pre-cierre", tareas: ["Follow-ups finales F3", "Orgánico", "Anotar"], kpi: "Pipeline limpio" },
{ i: 51, fase: "F3 · Conversión", titulo: "Día 45 — DECISIÓN FINAL", tareas: ["Pasar Árbol NO vende Capa 3 (¿escalar +20%? ¿cambiar? ¿pausar?)", "¿Escalar ganadora +20%? ¿Cambiar creativos? ¿Pausar y esperar?", "Decidir con datos, anotar", "Comunicar plan"], kpi: "Decisión tomada", tip: "Sin dato no hay decisión.", docs: ["arbol", "camp2"] },

{ i: 52, fase: "F4 · Escalar", titulo: "Día 46 — Escalar", tareas: ["Aplicar decisión d45 (+20% ganadora)", "Orgánico", "Entregas clientes"], kpi: "Escala ON" },
{ i: 53, fase: "F4 · Escalar", titulo: "Día 47 — Sostener", tareas: ["Vigilar CPL (no romper lo que anda)", "Orgánico + DMs", "Llamadas"], kpi: "CPL estable" },
{ i: 54, fase: "F4 · Escalar", titulo: "Día 48 — Documentar 1", tareas: ["Escribir playbook: setup y F1", "Orgánico", "Anotar"], kpi: "Playbook 1/3" },
{ i: 55, fase: "F4 · Escalar", titulo: "Día 49 — Documentar 2", tareas: ["Playbook: campañas y optimización", "Orgánico", "Anotar"], kpi: "Playbook 2/3" },
{ i: 56, fase: "F4 · Escalar", titulo: "Día 50 — Punto medio", tareas: ["Revisar metas F4 (2-3 cierres)", "Ajustar budget si hace falta", "Orgánico"], kpi: "Mitad F4" },
{ i: 57, fase: "F4 · Escalar", titulo: "Día 51 — Cierres", tareas: ["Empujar cierres pendientes", "Follow-ups", "Orgánico"], kpi: "Cierres" },
{ i: 58, fase: "F4 · Escalar", titulo: "Día 52 — Cierres", tareas: ["Llamadas de cierre", "Propuestas finales", "Orgánico"], kpi: "Firmas" },
{ i: 59, fase: "F4 · Escalar", titulo: "Día 53 — Documentar 3", tareas: ["Playbook: cierres y entrega", "Orgánico", "Anotar"], kpi: "Playbook 3/3" },
{ i: 60, fase: "F4 · Escalar", titulo: "Día 54 — Sostener", tareas: ["Orgánico", "Entregas", "Banco mes siguiente"], kpi: "Banco" },
{ i: 61, fase: "F4 · Escalar", titulo: "Día 55 — Sostener", tareas: ["Orgánico", "Llamadas", "Revisar CPL"], kpi: "Control" },
{ i: 62, fase: "F4 · Escalar", titulo: "Día 56 — Pre-cierre", tareas: ["Follow-ups", "Orgánico", "Orden Notion"], kpi: "Orden" },
{ i: 63, fase: "F4 · Escalar", titulo: "Día 57 — Informe", tareas: ["Números 60 días completos", "CAC real final", "Lecciones"], kpi: "Informe 60d" },
{ i: 64, fase: "F4 · Escalar", titulo: "Día 58 — Balance público", tareas: ["Post balance 60 días (números reales)", "Agradecer", "Anunciar ciclo 2"], kpi: "Balance público" },
{ i: 65, fase: "F4 · Escalar", titulo: "Día 59 — Descanso", tareas: ["Mínimo operativo", "Responder", "Dormir"], kpi: "Recarga" },
{ i: 66, fase: "F4 · Escalar", titulo: "Día 60 — Cierre", tareas: ["Celebrar 2-3 clientes", "Sistema documentado para replicar", "Plan ciclo 2"], kpi: "🎯 2-3 clientes", tip: "ESTÁ TODO. AHORA A REPLICAR." }
];

const CSS = `
.fx * { box-sizing: border-box; margin: 0; padding: 0; }
.fx { background: ${BG}; min-height: 100vh; font-family: 'Syne', sans-serif; color: ${T1}; }
.fx-mono { font-family: 'JetBrains Mono', monospace; }
.fx-tab { background: transparent; border: none; color: ${T2}; font-family: 'Syne', sans-serif; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 14px; cursor: pointer; border-bottom: 1.5px solid transparent; white-space: nowrap; }
.fx-tab.on { color: ${F}; border-bottom-color: ${F}; }
.fx-card { background: ${S1}; border: 0.5px solid ${B2}; border-radius: 12px; padding: 18px 20px; }
.fx-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: ${T3}; }
.fx-h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
.fx-h2 { font-size: 16px; font-weight: 700; }
.fx-body { font-size: 13px; line-height: 1.7; color: ${T2}; }
.fx-pill { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 3px 10px; border-radius: 20px; }
.fx-day { background: transparent; border: 0.5px solid ${B2}; color: ${T2}; font-family: 'JetBrains Mono', monospace; font-size: 11px; min-width: 38px; height: 38px; border-radius: 19px; cursor: pointer; padding: 0 8px; }
.fx-day.on { border-color: ${F}; color: ${F}; background: rgba(224,64,251,0.08); }
.fx-doc { background: ${S2}; border: 0.5px solid ${B2}; border-radius: 8px; padding: 0 14px; margin-top: 10px; }
.fx-doc summary { cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: ${F}; padding: 12px 0; list-style: none; }
.fx-doc summary::-webkit-details-marker { display: none; }
.fx-doc summary:before { content: "+ "; font-weight: 700; }
.fx-doc[open] summary:before { content: "– "; }
.fx-doc pre { font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.7; color: ${T1}; white-space: pre-wrap; word-break: break-word; padding-bottom: 14px; }
.fx-task { display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; border-bottom: 0.5px solid ${B2}; cursor: pointer; }
.fx-task:last-child { border-bottom: none; }
.fx-cb { width: 18px; height: 18px; border: 1px solid ${T3}; border-radius: 4px; flex-shrink: 0; margin-top: 2px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #000; font-weight: 700; }
.fx-cb.on { background: ${F}; border-color: ${F}; }
.fx-txt { font-size: 13px; line-height: 1.6; color: ${T1}; }
.fx-txt.on { color: ${T3}; text-decoration: line-through; }
.fx-bar { height: 6px; background: ${S2}; border-radius: 3px; overflow: hidden; }
.fx-bar > div { height: 100%; border-radius: 3px; }
.fx-copybtn { background: transparent; border: 0.5px solid ${B2}; color: ${T2}; font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
.scrollx { overflow-x: auto; scrollbar-width: none; }
.scrollx::-webkit-scrollbar { display: none; }
`;

function money(n) { return "$" + n.toLocaleString("es-CO"); }

export default function FuxiaTrafico() {
  const [tab, setTab] = useState("cal");
  const [idx, setIdx] = useState(0);
  const [fase, setFase] = useState("Setup");
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("fuxia60_checks") || "{}");
      setChecks(s);
    } catch (e) {}
  }, []);
  function toggle(k) {
    setChecks((prev) => {
      const n = Object.assign({}, prev, { [k]: !prev[k] });
      try { localStorage.setItem("fuxia60_checks", JSON.stringify(n)); } catch (e) {}
      return n;
    });
  }
  function copy(t, txt) {
    try { navigator.clipboard.writeText(txt); } catch (e) {}
    setCopied(t);
    setTimeout(() => setCopied(""), 1500);
  }

  const day = PLAN[idx];
  const gastado = PLAN.filter((p) => p.i <= day.i).reduce((a, p) => a + gastoDia(p.i), 0);
  const baseTotal = PLAN.reduce((a, p) => a + gastoDia(p.i), 0);
  const pct = Math.min(100, Math.round((gastado / TECHO) * 100));
  const fases = ["Setup", "F1 · Cimientos", "F2 · Tracción", "F3 · Conversión", "F4 · Escalar"];
  const fDays = PLAN.filter((p) => p.fase === fase);
  const metas = {
    "Setup": "Todo técnico listo para el día 1",
    "F1 · Cimientos": "20 leads · 5 conversaciones · 1 llamada",
    "F2 · Tracción": "50 leads · 15 conversaciones · 5 llamadas · 2 propuestas",
    "F3 · Conversión": "80 leads · 25 conversaciones · 8 llamadas · 4 propuestas · 1-2 cierres",
    "F4 · Escalar": "2-3 clientes cerrados · sistema documentado"
  };

  return (
    <div className="fx">
      <div style={{ borderBottom: "0.5px solid " + B2, background: S1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
            <span className="fx-h1" style={{ color: F }}>FUXIA × FERNEY</span>
            <span className="fx-mono" style={{ fontSize: 11, color: T2 }}>60 días + setup</span>
            <span className="fx-mono" style={{ fontSize: 10, color: T3, marginLeft: "auto" }}>TECHO $500K</span>
          </div>
          <div className="scrollx" style={{ display: "flex" }}>
            {[["cal", "Calendario"], ["camp", "Campañas"], ["wa", "WhatsApp"], ["kpi", "KPIs"]].map(([id, l]) => (
              <button key={id} className={"fx-tab" + (tab === id ? " on" : "")} onClick={() => setTab(id)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 70px" }}>
        {tab === "cal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="scrollx" style={{ display: "flex", gap: 6 }}>
              {fases.map((f) => (
                <button key={f} className="fx-pill" style={{ cursor: "pointer", border: "0.5px solid " + (fase === f ? F : B2), color: fase === f ? F : T2, background: fase === f ? "rgba(224,64,251,0.08)" : "transparent", padding: "6px 14px", whiteSpace: "nowrap" }} onClick={() => { setFase(f); const fd = PLAN.find((p) => p.fase === f); if (fd) setIdx(PLAN.indexOf(fd)); }}>{f.replace(" · ", " ")}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {fDays.map((p) => {
                const lbl = p.i < 7 ? "S" + (p.i + 1) : String(p.i - 6);
                return <button key={p.i} className={"fx-day" + (idx === PLAN.indexOf(p) ? " on" : "")} onClick={() => setIdx(PLAN.indexOf(p))}>{lbl}</button>;
              })}
            </div>
            <div className="fx-card" style={{ borderColor: "rgba(224,64,251,0.3)" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                <span className="fx-label">{fecha(day.i)} · {day.fase}</span>
                <span className="fx-pill" style={{ marginLeft: "auto", color: gastoDia(day.i) ? GASTO : OK, background: "rgba(255,255,255,0.04)", flexShrink: 0 }}>
                  {gastoDia(day.i) ? money(gastoDia(day.i)) + " pauta" : (day.i < 7 ? "setup" : "orgánico")}
                </span>
              </div>
              <div className="fx-h2" style={{ margin: "8px 0 10px" }}>{day.i < 7 ? "Setup D" + (day.i - 7) + " — " + day.titulo : "Día " + (day.i - 6) + " — " + day.titulo}</div>
              {day.tareas.map((t, ti) => {
                const k = day.i + "-" + ti;
                const on = !!checks[k];
                return (
                  <div key={k} className="fx-task" onClick={() => toggle(k)}>
                    <div className={"fx-cb" + (on ? " on" : "")}>{on ? "✓" : ""}</div>
                    <div className={"fx-txt" + (on ? " on" : "")}>{t}</div>
                  </div>
                );
              })}
              {day.tip ? <div style={{ marginTop: 12, padding: "10px 14px", background: S2, borderLeft: "2px solid " + F, borderRadius: 4, fontSize: 13, color: T1 }}><span className="fx-label" style={{ color: F, marginRight: 8 }}>TIP</span>{day.tip}</div> : null}
              {(day.docs || []).map((dk) => (
                <details key={dk} className="fx-doc">
                  <summary>{DOCS[dk].t} — ver completo</summary>
                  <pre>{DOCS[dk].txt}</pre>
                </details>
              ))}
              <div className="fx-mono" style={{ fontSize: 11, color: WARN, marginTop: 12 }}>▸ KPI del día: {day.kpi}</div>
            </div>
          </div>
        )}

        {tab === "camp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="fx-label">Guiones · campañas · plantillas · reglas</div>
            {Object.keys(DOCS).map((dk) => (
              <details key={dk} className="fx-doc">
                <summary>{DOCS[dk].t}</summary>
                <pre>{DOCS[dk].txt}</pre>
              </details>
            ))}
          </div>
        )}

        {tab === "wa" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="fx-label">Plantillas WhatsApp — tocar copiar</div>
            {WA_T.map((w) => (
              <div key={w.t} className="fx-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span className="fx-h2">{w.t}</span>
                  <button className="fx-copybtn" onClick={() => copy(w.t, w.txt)}>{copied === w.t ? "✓ copiado" : "copiar"}</button>
                </div>
                <div className="fx-body" style={{ whiteSpace: "pre-wrap" }}>{w.txt}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "kpi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="fx-card">
              <div className="fx-label" style={{ marginBottom: 8 }}>Pauta acumulada · techo {money(TECHO)}</div>
              <div style={{ fontSize: 30, fontWeight: 800 }}>{money(gastado)} <span className="fx-mono" style={{ fontSize: 12, color: T3 }}>/ base {money(baseTotal)}</span></div>
              <div className="fx-bar" style={{ marginTop: 12 }}><div style={{ width: pct + "%", background: F }} /></div>
              <div className="fx-mono" style={{ fontSize: 11, color: T2, marginTop: 6 }}>{pct}% del techo · margen {money(TECHO - baseTotal)} para escalar</div>
            </div>
            {Object.keys(metas).map((m) => (
              <div key={m} className="fx-card">
                <div className="fx-label">{m}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: F, marginTop: 6 }}>{metas[m]}</div>
              </div>
            ))}
            <div className="fx-card" style={{ borderColor: "rgba(245,200,66,0.3)" }}>
              <div className="fx-label" style={{ color: WARN, marginBottom: 8 }}>Check semanal</div>
              <div className="fx-body">Lun: leads acumulados vs meta fase · Mié: CPL y calidad chats · Vie: calls y propuestas · Dom: informe + plan siguiente.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
