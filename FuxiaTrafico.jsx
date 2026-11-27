import { useState, useEffect } from "react";
import {
  FUXIA_BIOS,
  FUXIA_SISTEMA_1A4,
  FUXIA_MULTIRRED,
  FERNEY_BIOS,
  FERNEY_PILARES,
  FERNEY_CALENDARIO,
  DM_SALIENTES,
  DM_ENTRANTES,
  getPublicacionesDia,
  getDmGuiaDia,
  FP_DM_SALIENTES,
  FP_DM_ENTRANTES,
  getFpPublicacionesDia,
  getFpDmGuiaDia
} from "./FuxiaRedesData.jsx";

// ═══════════════════════════════════════════════════════════════════
// FUXIA MARKETING × FERNEY — SISTEMA UNIFICADO (MÓVIL + PC)
// Setup: lun 23 – dom 29 nov 2026 · Día 1: lun 30 nov · Día 60: jue 28 ene 2027
// Mercado: negocios locales en Medellín · Marketing Digital y Campañas Estructuradas
// Redes FUXIA: IG · TikTok · Threads · Facebook
// Marca Personal @ferneypamplona: IG · Facebook · Threads · LinkedIn
// ═══════════════════════════════════════════════════════════════════

const F = "#E040FB";
const BG = "#070707";
const S1 = "#111116";
const S2 = "#1B1B22";
const T1 = "#F8F8F4";
const T2 = "#D2D2DF";
const T3 = "#A6A6BA";
const B2 = "rgba(255,255,255,0.12)";
const OK = "#8AE8A0";
const WARN = "#F5C842";
const GASTO = "#FF8A65";

const TECHO = 500000;
const WA_NUM = "573235315015";
const WD = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fecha(idx) {
  const b = new Date(2026, 10, 23 + idx);
  return WD[b.getDay()] + " " + b.getDate() + " " + MO[b.getMonth()];
}
function gastoDia(idx) {
  const d = idx - 6; // día 1 = idx 7
  if (d >= 16 && d <= 60) return 10000;
  return 0;
}

// ─── DOCUMENTOS COMPLETOS (guiones, campañas, plantillas, reglas) ───
const DOCS = {
nicho: { t: "Mercado y cliente ideal (ICP)", txt:
`MERCADO OBJETIVO — NEGOCIOS LOCALES EN MEDELLÍN QUE QUIEREN CAMPAÑAS BIEN ESTRUCTURADAS

Quién es el cliente:
- Negocios de productos, tiendas de celulares y accesorios, servicios locales (salud, estética, técnico, remodelación) y alimentos/repostería.
- 1 a 3 sedes en Medellín o área metropolitana.
- Dueño o administrador que quiere atraer clientes reales con marketing digital medible (no likes vacíos).
- Ha publicado en redes o probado el botón "Promocionar publicación" sin estructura ni retorno claro.
- Quiere campañas bien estructuradas en Meta Ads, contenido con oferta clara, landing y presencia en Google Maps.

Dolores que le quitamos:
- Quema presupuesto en el botón "Promocionar publicación" sin saber qué anuncio trae clientes.
- Publica todos los días, pero sin estrategia ni oferta clara.
- Depende 100% del voz a voz o de meses buenos y meses muertos.
- Contrató agencias o freelancers que entregaban "12 posts bonitos" sin leads ni medición real.

Señales de buen prospecto:
- Tiene buen producto o servicio en Medellín y margen para invertir en pauta ($300k–$600k/mes).
- Tiene Instagram activo, Google Maps incompleto o página web que no convierte.
- Ya probó pautar sin estructura y quiere un método serio y medible.

Promesa FUXIA:
"Te montamos campañas de marketing digital bien estructuradas en 30 días: oferta clara, creativos que convierten, Meta Ads medidos y reporte real. No solo posts: clientes."

Frase de ascensor:
"Soy Ferney, de FUXIA. Ayudo a negocios locales en Medellín a conseguir clientes todos los meses con campañas bien estructuradas en Meta Ads, contenido estratégico y medición real."` },

precios: { t: "Packs, precios y add-ons", txt:
`PACKS FUXIA MARKETING (COP, sin IVA · +19% si requiere factura con IVA)

DIAGNÓSTICO — Gratis (15 min)
- Auditoría express de tu Instagram, oferta, Google Maps y campañas actuales.
- 3 oportunidades concretas para mejorar resultados. Sin compromiso.

1) ARRANQUE — $1.500.000 (pago único · opción 50/50)
- Landing de conversión + medición exacta de qué anuncio trae clientes (Pixel + eventos).
- Perfiles optimizados (IG/FB) + highlights + canal de contacto listo.
- 4 piezas estratégicas de contenido + guion de 2 reels.
- Primera campaña de Meta Ads estructurada en Ads Manager (pauta aparte).

2) CRECIMIENTO — Mes 1: $1.500.000 (montaje inicial, lanzamiento incluido · opción 50/50) · desde mes 2: $750.000/mes (recomendado)
- Montaje inicial = pago único donde construimos todo tu sistema base (landing, medición exacta de anuncios, perfiles, oferta y campaña inicial).
- Todo lo de Arranque.
- 8 piezas estratégicas/mes + stories + guiones.
- Gestión y optimización continua de Meta Ads (pauta aparte: $300k-$600k/mes).
- Pruebas creativas y optimización semanal de CPL/CPA.
- Reporte mensual claro: leads, conversaciones, CPL y resultados reales.

3) ESCALA — Mes 1: $2.500.000 (montaje inicial completo, lanzamiento incluido · opción 50/50) · desde mes 2: $1.200.000/mes
- Montaje inicial completo = sistema base + arquitectura multi-campaña (público frío + retargeting) + tablero de métricas.
- Todo lo de Crecimiento.
- 12 piezas/mes + 4 reels estratégicos orientados a conversión.
- Embudo multi-campaña (captación fría + retargeting + tests creativos A/B).
- Tablero de métricas en tiempo real (CPL, CPA, retorno) y reunión estratégica quincenal.
- Acompañamiento comercial para mejorar el cierre de leads entrantes.

PRODUCTOS DE ENTRADA (puente sin fricción)
- Links Pro: $250.000 · Google Maps: $300.000 · Combo Presencia: $550.000 (100% abonable si en 30 días pasa a Arranque o Crecimiento).
- Piloto fundador (1-2 cupos por DM/llamada): descuento por caso documentado + testimonio.

PAUTA
- Se paga directo a Meta con tarjeta del cliente.
- Inicio recomendado: $300.000-$600.000/mes.
- FUXIA no cobra comisión sobre pauta.

ADD-ONS
- Sesión de fotos: $350.000.
- Reel extra: $250.000.
- Email marketing: $450.000/mes.
- Auditoría de embudo y campañas: $300.000.

REGLA
No vender horas ni "posts sueltos". Vender estrategia, campañas estructuradas, entregables y resultados medibles.` },

reel1: { t: "Guion reel Día 1 — Ferney", txt:
`IG @ferneypamplona · 35-40s · 9:16 · Publicar día 1, 12:00-14:00

[0-3s] HOOK — a cámara en una tienda de celulares. Texto: "En diciembre tu WhatsApp te está costando ventas."
[3-10s] PROBLEMA — "En temporada la gente cotiza en 3 tiendas; si respondés en 2 horas ya compró en otro lado."
[10-20s] ERRORES — "1) Publicás sin oferta. 2) No medís. 3) No hacés seguimiento a los que piden precio."
[20-30s] SOLUCIÓN — "En FUXIA armamos el sistema: contenido, anuncios y seguimiento por WhatsApp."
[30-38s] CTA — "Diagnóstico gratis de 15 min. Escribime por DM. Sin presión."
[38-40s] OUTRO — Logo FUXIA.

Grabación: luz frontal, vertical, subtítulos quemados, música tendencia volumen 20%.

CAPTION:
En temporada navideña tu WhatsApp te está costando ventas y no es por el producto.
Es por respuesta lenta, falta de seguimiento y pauta sin medición.
En FUXIA armamos el sistema completo: contenido + anuncios + WhatsApp.
Diagnóstico gratis de 15 min. DM o link en bio.
#marketingdigital #medellin #tiendasdecelulares #whatsappbusiness #fuxia

STORIES (30 min después):
1) Screenshot del reel.
2) Sticker de link a WhatsApp.
3) Caja de preguntas: "¿Cuántos mensajes te llegan al día en temporada?"` },

creativoA: { t: "Creativo A — Reel caso real + método (25-30s)", txt:
`9:16 · Orgánico día 13 y 18 + anuncio en campañas (Anuncio 1A).

[0-3s] Texto: "Por qué unas campañas traen clientes y otras solo likes."
[3-8s] Pantalla real: diferencia entre botón Promocionar sin foco vs. campaña estructurada con oferta + landing + medición.
[8-18s] Método FUXIA: diagnóstico 15 min → oferta clara → creativos enfocados en dolor → Meta Ads medidos con reporte real.
[18-24s] Texto: "DB Digital: 3 clientes calificados mes 1. KATOBO: +8 horas/semana recuperadas."
[24-30s] CTA: "Diagnóstico gratis de tus campañas. DM o comentá SISTEMA."

Reglas:
- No inventar resultados.
- Mostrar estructura real, sin cortes innecesarios.
- Subtítulos quemados y música sin copyright al 20%.

CAPTION:
No es suerte ni "hack del algoritmo", es campaña bien estructurada. Dos proyectos reales en Medellín: DB Digital y KATOBO.
Comentá SISTEMA o escribime por DM. 📍 Medellín · @fuxia_oficial` },

creativoB: { t: "Creativo B — Carrusel 6 slides (1080x1350)", txt:
`Orgánico días 2 y 4 + anuncio. Paleta: #0A0A0C / #F2EFE9 / #E040FB.

S1 Portada: "3 señales de que tu WhatsApp te está costando ventas."
S2 "Respondés en más de 1 hora."
S3 "No sabés de dónde vienen tus clientes."
S4 "Publicás todos los días, pero no tenés oferta."
S5 "Caso real: KATOBO recuperó 8 h/semana. DB Digital captó 3 leads calificados el primer mes."
S6 Cierre: "Diagnóstico gratis de 15 min. Link en bio o DM."

CAPTION DÍA 2:
Si te pasa 1 de 3, estás dejando plata en la mesa.
No es falta de producto: es falta de sistema.
DM SISTEMA o link en bio. 📍 Medellín · @fuxia_oficial` },

creativoC: { t: "Creativo C — Reel proceso FUXIA (30-40s)", txt:
`9:16 · Orgánico día 16 + anuncio.

[0-3s] "Así trabajamos en FUXIA."
[3-10s] PASO 1 Diagnóstico gratis 15 min: qué vendés, cómo llegan clientes y dónde se pierden.
[10-18s] PASO 2 Estrategia de una página en 48 h: oferta, contenido, anuncios y seguimiento.
[18-28s] PASO 3 Implementación 2-4 semanas: landing, WhatsApp, campañas y contenido.
[28-35s] PASO 4 Reporte: leads, conversaciones, CPL y ventas.
[35-40s] "Diagnóstico gratis. Escribime y arrancamos."

A cámara, fondo limpio, pantallas sin datos sensibles, subtítulos quemados.

CAPTION DÍA 16:
1. Diagnóstico gratis (15 min) 2. Estrategia (48 h) 3. Implementación (2-4 semanas) 4. Reporte.
Sin contratos de 12 meses. Sin letra chica. DM. 📍 Medellín · @fuxia_oficial` },

camp1: { t: "Campaña 1 — Retargeting nativo Meta (d16-30, $150k)", txt:
`Ads Manager → Crear → Objetivo Interacción → "FUXIA | Retargeting | D16-30 | Mensajes". Sin Advantage+ presupuesto, sin A/B.

CONJUNTO "Caliente | Campañas": Conversión Mensajes → WhatsApp (canal de contacto directo). $10.000/día. Medellín +25 km, 25-50, todos.
PÚBLICOS NATIVOS META (base principal, no dependen del banner de cookies/Pixel):
- Interactuaron IG @fuxia_oficial 30d + interactuaron IG @ferneypamplona 30d + vieron 50%+ reels 30d.
- Complemento: visitantes web 30d (solo quienes aceptaron cookies).
Ubicaciones Advantage+. ARRANCAR CON 2 ANUNCIOS GANADORES DEL ORGÁNICO (no diluir $10k/día en 3; rotar el 3º si hay volumen):
1A Reel caso real + método (A · Día 13): "Por qué unas campañas traen clientes y otras solo likes. Casos reales en Medellín (DB Digital y KATOBO)." Titular: Diagnóstico gratis.
1B Carrusel Antes/Después o 3 Señales (B): "Botón Promocionar vs. Campaña bien estructurada en Meta Ads. Dejá de quemar presupuesto." Titular: ¿Tu pauta trae ventas?
1C (reserva) Carrusel Google Maps + Combo $550k (Día 12): "Aparecé primero en Google Maps + Links Pro ($550k abonable)." Titular: Combo Presencia $550k.
Botón: Enviar mensaje. URL: https://wa.me/${WA_NUM}?text=Hola,%20quiero%20el%20diagnostico

D16-21 NO TOCAR (responder <1h, anotar). D21: comparar costo/conversación, ganador +30%, pausar el perdedor.` },

camp2: { t: "Campaña 2 — Frío controlado enero (d31-45, $150k)", txt:
`Misma estructura. "FUXIA | Frío | D31-45 | Mensajes". $10.000/día.
Ángulo enero: "Arrancá el año con campañas de marketing digital bien estructuradas que traigan clientes todas las semanas."

PÚBLICO: Medellín +25 km, 25-50. Intereses (O): dueños de pequeños negocios, emprendimiento, publicidad en redes sociales, marketing digital, comercio electrónico.
EXCLUIR: retargeting (IG/video/web) + seguidores.

ARRANCAR CON 2 ANUNCIOS (1 dolor de pauta + 1 prueba real; reservar el 3º para rotar):
2A "Pasó diciembre y bajaron las ventas: 3 errores que te hacen quemar presupuesto en Meta Ads." Titular: Campañas que sí venden.
2B "Caso real + método FUXIA: estrategia, creativos y Meta Ads medidos en Medellín." Titular: Casos reales.
2C (reserva) "Combo Presencia $550k abonable o 5 cupos de diagnóstico gratis." Titular: Diagnóstico 15 min.

D31-36 NO TOCAR. D37: pausar el peor; ganador +30% SOLO si CPA < $10.000; si todo > $15.000, pausar C2 y reforzar C1.
D45 DECISIÓN: ¿escalar ganadora +20%? ¿cambiar creativos? ¿pausar y esperar mes 2?` },

plantillas: { t: "Plantillas copy-paste Ads Manager", txt:
`CAMPAÑA: Interacción · FUXIA Marketing | [Retargeting/Frío] | Mensajes · $10.000/día · Destino contacto: WhatsApp.
RETARGETING (priorizar nativos Meta por consentimiento de cookies): Medellín +25 km, 25-50, todos. O: IG Fuxia 30d + IG Ferney 30d + video 50% 30d (+ web 30d como extra).
FRÍO: igual geo/edad. O: dueños de pequeños negocios, emprendimiento, marketing digital, publicidad en redes sociales, comercio electrónico. Excluir retargeting + seguidores.

COPIES (texto/titular/descripción/botón — usar 2 activos por conjunto con $10k/día):
1A "Por qué unas campañas traen clientes y otras solo likes…" / Diagnóstico gratis / Marketing digital y Meta Ads en Medellín / Enviar mensaje
1B "Botón Promocionar vs. campaña bien estructurada…" / ¿Tu pauta trae ventas? / Auditoría gratis en 15 min / Enviar mensaje
1C "Aparecé en Google Maps + Links Pro ($550k abonable)…" / Combo Presencia $550k / 100% abonable en 30 días / Enviar mensaje
2A "Pasó diciembre y bajaron las ventas: 3 errores en Meta Ads…" / Campañas que sí venden / Diagnóstico gratis · Medellín / Enviar mensaje
2B "Caso real: estrategia, creativos y anuncios medidos…" / Casos reales / Sin contratos de 12 meses / Enviar mensaje
2C "5 cupos de diagnóstico gratis para tus campañas…" / Diagnóstico 15 min / Sin compromiso · Medellín / Enviar mensaje
URL base: https://wa.me/${WA_NUM}` },

checklist16: { t: "Checklist lanzamiento (día 16)", txt:
`[ ] WhatsApp Business de FUXIA funcionando + link wa.me probado
[ ] Públicos nativos Meta (IG Fuxia + IG Ferney + video 50%) con 100+ personas (no depender solo del Pixel por opt-in de cookies)
[ ] Pixel disparando eventos en la landing (probado aceptando cookies en incógnito)
[ ] 2 creativos ganadores subidos (A y B; C en reserva) + textos del documento
[ ] Página FB vinculada + método de pago activo
[ ] $10.000/día definidos, campaña en Borrador
[ ] Landing con propuesta de marketing y CTA a WhatsApp
Todo listo → PUBLICAR.` },

reglas: { t: "6 reglas que no se rompen", txt:
`1. NUNCA "Promocionar publicación". Siempre Ads Manager.
2. NO tocar la campaña los primeros 6 días (aprendizaje).
3. WhatsApp respondido en MENOS DE 1 HORA. La velocidad ES el servicio.
4. El KPI es conversación → llamada, NO el clic.
5. Primeros $10k/día validan: CPA < $8.000 a 15 días = subir. CPA > $15.000 = pausar y revisar.
6. Escasez REAL: 5 cupos son 5. Cierran viernes = cierran viernes.` },

arbol: { t: "Árbol NO vende — D16/D21/D31/D37 (3 capas)", txt:
`SOLO usar con 6+ días sin tocar. Si no, NO TOCAR y salir.

CAPA 1 — DATOS (si falla, no toques presupuesto ni creativo):
[ ] Pixel Helper en incógnito + Aceptar todo: PageView en verde?
[ ] Lead (formulario) y Contact (clic wa.me) disparando? + /api/lead llega a Telegram?
[ ] UTMs por CTA (hero, paquetes, popup) separando origen?
[ ] WA respondido <1h en todos los chats? (si no, no es algoritmo, es operación)
NO → fix medición, reinicia conteo 6 días. SÍ → pasa a Capa 2.

CAPA 2 — APRENDIZAJE (volumen $10k/d = 1-3 conv/día, siempre limitado):
[ ] Retargeting ≥100 personas? Si no, espera 2 días, no publiques C1/C2.
[ ] Frecuencia frío >3? Overlap C1 vs C2? Excluiste retargeting+seguidores en frío?
[ ] Rechazos / cuenta limitada? Presupuesto $10k/día intacto?
CPA >$15k en 6 días → pausar C2 y reforzar C1. CPA $10-15k → aguanta + itera 1 ángulo.
SÍ → pasa a Capa 3.

CAPA 3 — NEGOCIO (cierra el número?):
Ticket Arranque $1.5M / Crecimiento $1.5M + $750k/mes / Escala $2.5M + $1.2M/mes.
[ ] Oferta clara? Diagnóstico 15 min gratis + propuesta de 1 página en 48 h?
[ ] Creativo con prueba real (caso / pantalla / proceso)? Sin humo, subtítulos quemados?
[ ] Calificación 3 preguntas WA aplicada? Sin filtro = curiosos.

DECISIÓN:
- Dato roto → fix + reiniciar.
- 1 ángulo gana → réplica mismo hook otro inicio, pausa 2 perdedores, ganador +30% SOLO si CPA <$10k.
- Todo >$15k → mata frío, orgánico + retargeting hasta mes 2.
- D45: escalar ganadora +20%? cambiar creativos? pausar? Con dato, no gusto.` },

contenido30: { t: "Calendario de contenido 30 días (Enfoque Marketing Digital desde Día 5)", txt:
`SEMANA 1 — CONFIANZA (D1–D4 originales · desde D5 enfoque Campañas)
Lun (D1): Reel lanzamiento temporada (original).
Mar (D2): Carrusel 3 señales (original).
Mié (D3): Stories detrás de cámara + encuesta (original).
Jue (D4): Reel auditoría 3 fugas (original).
Vie (D5): Carrusel Oferta 4 pasos — Cómo estructuramos tus campañas + Combo $550k.
Sáb (D6): Reel Objeción "Pautar es caro vs. quemar plata en Promocionar" + Stories Q&A Meta Ads.
Dom (D7): Revisión Semana 1 + respaldo JSON/CSV.

SEMANA 2 — AUTORIDAD EN CAMPAÑAS Y META ADS
Lun (D8): Reel "Cómo estructurar Meta Ads con $10k–$20k/día sin quemar presupuesto".
Mar (D9): Carrusel "Antes y Después: Botón Promocionar vs. Campaña estructurada".
Mié (D10): Stories encuesta Meta Ads ("Miedo a perder plata" vs. "No sé estructurarlos").
Jue (D11): Reel "Anatomía de un anuncio que sí trae clientes (4 piezas)".
Vie (D12): Carrusel Google Maps + Combo Presencia $550k abonable (Reserva #3).
Sáb (D13): Reel Caso Real + Método FUXIA (Anuncio 1A: DB Digital + KATOBO).
Dom (D14): Revisión 14 días + verificación pre-pauta Día 16.

SEMANA 3 — OFERTA Y PAUTA EN VIVO
Lun (D15): Reel "Qué revisamos en el diagnóstico gratis de campañas (15 min)".
Mar (D16): Carrusel "Arranque vs Crecimiento vs Escala" + Encendido C1.
Mié (D17): Stories de objeciones sobre Meta Ads y presupuesto.
Jue (D18): Reel caso real + lectura de métricas (CPL/CPA).
Vie (D19): Post de escasez real (5 cupos de diagnóstico).
Sáb (D20): Stories de cierre de cupos + detrás de cámara Ads Manager.
Dom (D21): Optimización C1 (6 días intacta).

SEMANA 4 — PRUEBA Y RESULTADOS
Lun (D22): Reel "Qué funcionó en nuestros primeros 6 días de Meta Ads (números reales)".
Mar (D23): Carrusel resultados y aprendizajes del mes.
Mié (D24): Stories de agradecimiento + encuesta de metas 2027.
Jue (D25): Reel "El error #1 al cambiar campañas antes de tiempo".
Vie (D26): Post balance + preparación campaña fría enero.
Sáb (D27): Stories behind the scenes + Q&A campañas.
Dom (D28): Descanso / preparación C2.

RITMO: 3 reels/semana · 2 carruseles/semana · stories diarias · 5 DMs/día.` },

propuesta: { t: "Propuesta de 1 página (plantilla)", txt:
`PROPUESTA FUXIA MARKETING — [NOMBRE DEL NEGOCIO]

1. Diagnóstico
- Qué venden, cómo atraen clientes hoy y dónde se fuga el presupuesto o la conversión.
- 3 hallazgos concretos de Instagram, oferta, Google Maps y campañas actuales.

2. Objetivo
- [Ej: 30 leads calificados/mes con CPL controlado y proceso medible].
- Plazo: 60 días.

3. Qué hacemos
- Estrategia y oferta: propuesta de valor clara + ángulo ganador.
- Contenido: X piezas/mes + reels + stories orientados a conversión.
- Campañas Meta Ads: estructura en Ads Manager (frío + retargeting) + pruebas creativas.
- Conversión y reporte: landing / perfil optimizado + reporte mensual de leads, CPL y resultados.

4. Inversión
- Pack [Arranque/Crecimiento/Escala]: $[valor].
- Pauta aparte: $[300k-600k]/mes directo a Meta.
- Sin contratos de 12 meses. Sin cobro por hora.

5. Próximos pasos
1) Aprobación de propuesta.
2) Onboarding y accesos.
3) Implementación en 2-4 semanas.
4) Primer reporte a los 30 días.

Firma: Ferney Pamplona · FUXIA · WhatsApp +57 323 531 5015` },

dm: { t: "Guion de prospección por DM (Salientes vs. Entrantes)", txt:
`📤 DMs QUE TÚ ENVÍAS (PROSPECCIÓN SALIENTE — 5 NUEVOS/DÍA)
1) Primer DM (sin vender):
"Hola [Nombre], vi el perfil de [Negocio] en Medellín y me gustó mucho lo que ofrecen. Noté un detalle rápido en su estructura de oferta/captación desde Instagram que suele frenar clientes nuevos. ¿Te molesta si te hago 1 pregunta corta?"

2) Cuando te respondan:
"Genial. ¿Hoy están trayendo clientes solo con publicaciones orgánicas o ya corren campañas en Meta Ads? Te pregunto porque 8 de cada 10 negocios locales queman presupuesto en 'Promocionar publicación' o publican sin embudo claro."

3) Invitar al diagnóstico gratis (15 min):
"En FUXIA abrimos 5 diagnósticos gratis de 15 min esta semana para negocios en Medellín: revisamos tu Instagram, tu oferta, Google Maps y tus campañas, y te llevás 3 mejoras concretas (sin compromiso). ¿Te sirve mañana AM o PM?"

📥 DMs / WHATSAPP QUE TE LLEGAN (ENTRANTES — RESPONDER <1 HORA)
Nunca responder "hola ¿en qué te ayudo?". Usar siempre el filtro de 3 preguntas:
1) ¿Qué vendes o qué servicio ofreces?
2) ¿Ya estás invirtiendo en Meta Ads / redes o arrancas desde cero?
3) ¿Tu prioridad hoy es: lanzar campañas bien estructuradas, mejorar tu contenido/oferta o el Combo Presencia ($550k abonable)?

REGLAS:
- No mandar audio sin permiso (excepto si comentaron AUDITORÍA).
- Personalizar siempre con el nombre real del negocio.
- Máximo 5 DMs nuevos salientes al día + seguimiento a 48h.` },

reporte: { t: "Reporte mensual (plantilla)", txt:
`REPORTE FUXIA — [CLIENTE] — [MES]

1) Resultados
- Leads: [X]
- Conversaciones: [X]
- Llamadas: [X]
- Propuestas: [X]
- Cierres: [X]
- CPL: $[X]
- Ventas atribuidas: $[X]

2) Contenido
- Piezas publicadas: [X]
- Mejor pieza: [enlace] — [resultado]
- Peor pieza: [enlace] — [aprendizaje]

3) Pauta
- Invertido: $[X]
- Campaña ganadora: [nombre]
- CPA: $[X]
- Ajustes para el próximo mes: [X]

4) Próximos pasos
- [Acción 1]
- [Acción 2]
- [Acción 3]

Nota: los números se explican con contexto, no solo con capturas.` },

onboarding: { t: "Onboarding de cliente (checklist)", txt:
`[ ] Contrato/propuesta firmada + anticipo recibido.
[ ] Accesos: Instagram, Facebook, WhatsApp Business, web (si aplica).
[ ] Pago de pauta configurado con tarjeta del cliente.
[ ] Brief: productos, precios, público, zonas de entrega, objeciones.
[ ] Casos o testimonios disponibles.
[ ] Calendario de contenido del primer mes aprobado.
[ ] Plantillas de WhatsApp y flujo de calificación.
[ ] Fecha de lanzamiento y fecha del primer reporte.
[ ] Grupo de WhatsApp o canal de comunicación.
[ ] Responsable de responder leads y horario.` },

banco5: { t: "Banco de 5 piezas base (listo para grabar/diseñar)", txt:
`BANCO DE 5 PIEZAS — NEGOCIOS LOCALES QUE VENDEN POR WHATSAPP EN MEDELLÍN (DIC 2026)
Paleta carruseles: #0A0A0C / #F2EFE9 / #E040FB · CTA: DM "SISTEMA" o wa.me/${WA_NUM}

1) REEL (35-40s · Día 1 · Dolor/Temporada):
- Hook: "En diciembre tu WhatsApp te está costando ventas."
- Desarrollo: El cliente con prima cotiza en 3 negocios; si tardás +2h o no hacés seguimiento compra en otro lado. 3 errores: sin oferta, botón promocionar sin medir, chats en visto.
- CTA: "5 diagnósticos gratis de 15 min. Escribime SISTEMA por DM."

2) CARRUSEL 6 slides (1080x1350 · Día 2 · Educación / Anuncio 1B):
- S1: "3 señales de que tu WhatsApp te está costando ventas."
- S2: "01/ Respondés en más de 1 hora."
- S3: "02/ No hacés seguimiento a las 24-48h."
- S4: "03/ Pautás sin saber qué anuncio trae ventas."
- S5: "Casos reales: KATOBO (8 h/sem) · DB Digital (3 leads calificados mes 1)."
- S6: "Diagnóstico gratis 15 min · DM SISTEMA."

3) REEL pantalla real (30-35s · Día 4 · Auditoría express):
- Hook: "3 cosas que reviso en 60s para saber por qué un negocio local no vende más por WhatsApp."
- Puntos: 1) Bio + link wa.me precargado 2) Calificación 3 preguntas 3) Etiquetas + follow-up 24h.
- CTA: "Comentá AUDITORIA y te mando audio gratis de 60s."

4) REEL objeción precio (30-35s · Día 6 · ROI de campañas):
- Hook: "'Invertir en marketing es caro' — caro es quemar plata en el botón Promocionar sin medir nada."
- Desarrollo: $400k–$600k/mes botados en anuncios mal estructurados o sin oferta clara vs. campaña medida en Ads Manager con objetivo de clientes reales. Experiencia comercial en Claro, Oppo, Tigo, Realme y Xiaomi.
- CTA: "Escribime SISTEMA y revisamos tus números y campañas en 15 min gratis."

5) CARRUSEL 6 slides (1080x1350 · Día 5 · Oferta + Proceso 4 pasos):
- S1: "Así estructuramos tus campañas de marketing digital en 30 días."
- S2: "01/ Diagnóstico gratis 15 min (oferta, redes y pauta)." · S3: "02/ Plan de 1 página en 48h."
- S4: "03/ Montaje inicial (7-15 días, 50/50) o Combo Presencia $550k abonable."
- S5: "04/ Crecimiento y Escala: gestión de Meta Ads, creativos y reporte mensual de CPL."
- S6: "Negocios locales en Medellín · DM SISTEMA."` }
};

const WA_T = [
{ t: "Bienvenida contacto directo", txt: `Hola, gracias por escribir a FUXIA Marketing. Contame en 2 líneas qué vendés y cómo estás atrayendo clientes hoy (redes, anuncios o voz a voz). Te respondo en menos de 1 hora. — Ferney` },
{ t: "Calificación (3 preguntas)", txt: `Perfecto. Para darte una recomendación real, 3 preguntas cortas: 1) ¿Qué vendés exactamente en tu negocio? 2) ¿Ya estás invirtiendo en Meta Ads o arrancás desde cero? 3) ¿Cuál es tu meta principal este mes (más clientes, ordenar tus campañas o Google Maps + Links Pro)?` },
{ t: "Agendamiento", txt: `Con eso ya veo clarísimo por dónde ir. Te propongo un diagnóstico gratis de 15 min donde revisamos tu perfil, oferta y campañas actuales, y salís con 3 acciones concretas sin compromiso. ¿Te sirve mañana AM o PM?` },
{ t: "Seguimiento 48h", txt: `Hola [nombre], te escribí por el diagnóstico gratis de campañas de FUXIA. ¿Lo pudiste ver? Si esta semana estás full, cero lío, me decís y lo dejamos para después.` },
{ t: "Reactivación leads fríos", txt: `Hola [nombre], soy Ferney de FUXIA (Medellín). Hace un tiempo hablamos de estructurar las campañas de marketing digital de [negocio]. Abrí 5 diagnósticos gratis esta semana. ¿Te sirve uno de 15 min?` }
];

// ─── PLAN: setup idx 0-6 (23-29 nov) + días 1-60 (30 nov - 28 ene) ───
// d: -7..-1 setup · 1..60 · tareas: máx 5 · docs: claves de DOCS
const PLAN = [
{ i: 0, fase: "Setup", titulo: "Mercado, oferta y precios", tareas: ["Definir mercado: negocios locales en Medellín que venden por WhatsApp (productos, celulares, servicios y alimentos)", "Elegir 2-3 dolores: respuesta lenta, seguimiento manual, pauta sin medición", "Fijar oferta: diagnóstico gratis + Combo $550k abonable + Arranque/Crecimiento/Escala", "Escribir promesa en 1 frase + 3 pruebas reales"], kpi: "Oferta clara en 1 página", tip: "Si no lo explicás en 15 segundos, no está listo.", docs: ["nicho", "precios"] },
{ i: 1, fase: "Setup", titulo: "Auditoría + 20 prospectos", tareas: ["Auditar 10 negocios locales de Medellín en Instagram/WhatsApp", "Listar 20 prospectos con nombre, negocio y canal", "Anotar 3 dolores por prospecto", "Elegir los 10 primeros para DM"], kpi: "20 prospectos calificados", tip: "La lista vale más que el logo." },
{ i: 2, fase: "Setup", titulo: "Perfiles y WhatsApp Business", tareas: ["Bio IG/FB/TikTok/Threads: qué hacés, para quién y CTA a WhatsApp", "Highlights: casos, precios, proceso y diagnóstico", "WhatsApp Business: perfil, catálogo con packs, bienvenida y ausencia", "Probar wa.me/" + WA_NUM + " con mensaje precargado"], kpi: "Perfiles y WA listos", tip: "3 segundos: qué, para quién, cómo contactar." },
{ i: 3, fase: "Setup", titulo: "Landing de marketing", tareas: ["Actualizar hero: promesa para negocios locales que venden por WhatsApp", "Sección de casos y prueba social", "Oferta con packs, Combo $550k abonable y CTA a WhatsApp", "SEO local: Medellín + marketing digital + WhatsApp"], kpi: "Landing publicada", tip: "Una landing, una promesa, un CTA." },
{ i: 4, fase: "Setup", titulo: "Medición y seguimiento", tareas: ["Pixel + eventos Lead/Contact en la landing", "UTMs por CTA (hero, packs, popup)", "Formulario/WhatsApp conectado a aviso interno", "Tablero simple: leads, conversaciones, llamadas, cierres"], kpi: "Medición funcionando", tip: "Sin medición, la pauta es adivinanza." },
{ i: 5, fase: "Setup", titulo: "Lead magnet + contenido base", tareas: ["Crear PDF '5 puntos que frenan tus ventas por WhatsApp'", "Diseñar calendario de contenido de 30 días", "Escribir 3 guiones de reels", "Preparar banco de 5 piezas"], kpi: "Magnet + calendario listos", tip: "1 problema, 1 promesa, 2 páginas.", docs: ["contenido30", "banco5"] },
{ i: 6, fase: "Setup", titulo: "Grabar creativos + campaña en borrador", tareas: ["Grabar reels A, B y C con guiones", "Subtítulos quemados + música sin copyright", "Business Manager + método de pago activo", "Dejar campaña de retargeting en borrador"], kpi: "Creativos listos + C1 en borrador", tip: "Nada se publica hoy.", docs: ["reel1", "creativoA", "creativoB", "creativoC", "checklist16"] },

{ i: 7, fase: "F1 · Base", titulo: "Día 1 — Reel lanzamiento (WhatsApp Diciembre)", tareas: ["📢 PUBLICAR en IG + TikTok + Facebook (Dia1_Lunes_Reel_WhatsApp_Diciembre.mp4) + Threads (opinión)", "📢 IG/FB Stories: reshare + 1 story tuya a cámara real (15s) + link WA", "📤 ENVIAR tú: 5 DMs nuevos en frío a negocios locales de Medellín (Guion #1)", "📥 RESPONDER <1h los DMs/comentarios que te lleguen (Guion A)"], kpi: "4 redes activas + 5 DMs enviados", tip: "Tu WhatsApp es el mostrador. Revisa abajo qué subir en cada red y el texto exacto del DM.", docs: ["reel1", "dm"] },
{ i: 8, fase: "F1 · Base", titulo: "Día 2 — Carrusel 3 Señales (futuro Anuncio 1B)", tareas: ["📢 PUBLICAR en IG + Facebook álbum (Dia2_Martes_Carrusel_3_Senales) + Threads (mini-hilo 3 señales)", "📢 IG/FB Stories anunciando el carrusel + responder comentarios en TikTok del Día 1", "📤 ENVIAR tú: 5 DMs nuevos en frío (Guion #1)", "📥 RESPONDER <1h todo mensaje entrante y registrar en Tablero"], kpi: "Carrusel vivo + 5 DMs enviados", docs: ["creativoB"] },
{ i: 9, fase: "F1 · Base", titulo: "Día 3 — Stories Encuesta + Interacción", tareas: ["📢 PUBLICAR 3 Stories IG/FB (Dia3_Miercoles_Stories con encuesta <15 min vs >1h) + Threads pregunta abierta", "📤 ENVIAR tú: DM personalizado a TODOS los que voten 'Más de 1 hora' (Guion #4 — lead más caliente)", "📤 ENVIAR tú: completar 5 DMs nuevos en frío + comentar en 5 cuentas locales de Medellín", "📥 RESPONDER <1h todos los DMs/WA entrantes"], kpi: "Encuesta + DMs a votantes" },
{ i: 10, fase: "F1 · Base", titulo: "Día 4 — Reel Auditoría 3 Fugas (CTA Audio 60s)", tareas: ["📢 PUBLICAR en IG + TikTok + Facebook (Dia4_Jueves_Reel_Auditoria_3_Fugas.mp4) + Threads tip 3 preguntas", "📤 ENVIAR tú: 5 DMs nuevos en frío + DM con oferta de audio 60s a quien comente AUDITORÍA", "📥 RESPONDER <1h mensajes entrantes y actualizar Tablero de leads"], kpi: "Comentarios AUDITORÍA + Tablero al día" },
{ i: 11, fase: "F1 · Base", titulo: "Día 5 — Carrusel Oferta 4 Pasos (Campañas + Combo $550k)", tareas: ["📢 PUBLICAR en IG + Facebook álbum (Dia5_Viernes_Carrusel_Sistema_Oferta — enfoque campañas bien estructuradas) + Threads oferta transparente", "📤 ENVIAR tú: seguimiento 48h a los DMs/leads de lunes y martes que dejaron en visto (Guion #5)", "📤 ENVIAR tú: 5 DMs nuevos en frío a negocios locales de Medellín (Guion #1)", "📥 RESPONDER <1h preguntas de precio con Guion C (Combo $550k + $1.5M)"], kpi: "Follow-ups hechos + oferta campañas publicada" },
{ i: 12, fase: "F1 · Base", titulo: "Día 6 — Reel Objeción 'Pautar es caro' vs. Promocionar + Stories Q&A", tareas: ["📢 PUBLICAR en IG + TikTok + Facebook (Dia6_Sabado_Reel_ROI_Es_Caro.mp4 — caption ROI campañas) + 2 Stories Q&A Meta Ads + Threads", "📤 ENVIAR tú: 4 DMs nuevos en frío (Guion #1)", "📥 RESPONDER <1h caja de preguntas sobre Meta Ads, DMs y WhatsApp entrantes"], kpi: "Reel ROI campañas + Q&A Meta Ads activos" },
{ i: 13, fase: "F1 · Base", titulo: "Día 7 — Revisión Semana 1 (sin prospección fría)", tareas: ["📊 Abrir Tablero y contar totales S1 vs meta (20 leads / 10 conv. / 2 llamadas)", "📢 Anotar qué pieza en IG/TikTok/Threads/FB generó más DMs o guardados (ganadores para Meta Ads)", "📥 RESPONDER <1h solo mensajes entrantes y exportar respaldo JSON/CSV"], kpi: "Informe S1 + respaldo guardado" },
{ i: 14, fase: "F1 · Base", titulo: "Día 8 — Reel Meta Ads con $10k–$20k/día (Estructura 2 anuncios + 6 días)", tareas: ["📢 PUBLICAR en IG + TikTok + Facebook (Dia8_Lunes_Reel_MetaAds_Estructura.mp4) + Threads regla 2 anuncios + 2 grupos FB Medellín", "📤 ENVIAR tú: 5 DMs nuevos en frío a negocios locales (Guion #1)", "📥 RESPONDER <1h todos los mensajes/comentarios entrantes"], kpi: "4 redes S2 activas + 5 DMs enviados" },
{ i: 15, fase: "F1 · Base", titulo: "Día 9 — Carrusel Antes y Después (Botón Promocionar vs. Campaña Estructurada)", tareas: ["📢 PUBLICAR en IG + Facebook álbum (Dia9_Martes_Carrusel_Antes_Despues — contraste pauta improvisada vs. Ads Manager) + Threads", "📤 ENVIAR tú: 5 DMs nuevos en frío (Guion #1)", "📥 RESPONDER <1h y calificar prospectos con filtro de 3 preguntas (Guion A)"], kpi: "Carrusel Antes/Después vivo + leads calificados", docs: ["creativoA"] },
{ i: 16, fase: "F1 · Base", titulo: "Día 10 — Stories Encuesta Meta Ads + Agendamiento", tareas: ["📢 PUBLICAR 3 Stories IG/FB (Encuesta: 'Miedo a perder plata 💸' vs 'No sé estructurarlos 🧩') + Threads pregunta Meta Ads", "📤 ENVIAR tú: DM personalizado a TODOS los votantes según su voto (Guion #4) + 5 DMs nuevos", "📥 RESPONDER <1h y agendar llamadas de diagnóstico de 15 min"], kpi: "Encuesta Meta Ads + calls en agenda" },
{ i: 17, fase: "F1 · Base", titulo: "Día 11 — Reel Anatomía de un Anuncio que Sí Trae Clientes (4 piezas)", tareas: ["📢 PUBLICAR en IG + TikTok + Facebook (Dia11_Jueves_Reel_Anatomia_Anuncio.mp4) + Threads checklist creativo", "📤 ENVIAR tú: seguimiento a TODOS los leads de Semana 1 que no respondieron (Guion #5) + 5 DMs nuevos", "📥 RESPONDER <1h mensajes entrantes y registrar en Tablero"], kpi: "Reel creativos publicado + follow-ups S1" },
{ i: 18, fase: "F1 · Base", titulo: "Día 12 — Carrusel Google Maps + Combo $550k (Reserva #3)", tareas: ["📢 PUBLICAR en IG + Facebook álbum (Dia12_Viernes_Carrusel_GoogleMaps_Combo) + Threads + TikTok clip Maps", "📤 ENVIAR tú: 5 DMs a negocios locales con ficha incompleta en Google Maps (Guion #1)", "📥 RESPONDER <1h los mensajes de 'COMBO' con Guion D (cierre rápido $550k abonable)"], kpi: "Oferta Combo $550k en 4 redes" },
{ i: 19, fase: "F1 · Base", titulo: "Día 13 — Reel Caso Real + Método FUXIA (Anuncio 1A: DB Digital + KATOBO)", tareas: ["📢 PUBLICAR en IG + TikTok + Facebook (Dia13_Sabado_Reel_Caso_Real_Sistema.mp4 — enfoque método y campañas) + 2 Stories Q&A + Threads", "📤 ENVIAR tú: 4 DMs nuevos en frío (Guion #1)", "📥 RESPONDER <1h comentarios SISTEMA y Q&A entrantes"], kpi: "Prueba social viva (Anuncio 1A)" },
{ i: 20, fase: "F1 · Base", titulo: "Día 14 — Revisión 14 días + Pre-pauta Día 16", tareas: ["📊 Revisar totales 14 días en Tablero vs meta F1 (20/10/2) y exportar respaldo JSON/CSV", "🎯 Verificar público 'IG @fuxia_oficial | Interacción 30d' (ideal 500+; si <500 agrupar IG 90d + VV 50% + FB + web)", "🎯 Dejar borrador C1 en Ads Manager con 2 anuncios ganadores (1A + 1B) + reserva #3 (Día 12) y mensaje precargado 3 opciones"], kpi: "Pre-pauta verificada" },
{ i: 21, fase: "F1 · Base", titulo: "Día 15 — Pre-lanzamiento C1", tareas: ["Pasar checklist de lanzamiento completo", "Verificar públicos nativos Meta (IG + video 50%) ≥100 personas", "Subir 2 creativos ganadores en C1 borrador (3º en reserva)", "Anunciar en historias: 'mañana arranca pauta'"], kpi: "C1 lista para publicar", tip: "Priorizá públicos de IG/video: el Pixel web solo dispara si aceptan cookies.", docs: ["checklist16", "plantillas"] },

{ i: 22, fase: "F2 · Tracción", titulo: "Día 16 — PUBLICAR C1 + reel proceso", tareas: ["Pasar Árbol NO vende Capa 1 (pixel + WA + UTMs)", "Publicar Campaña 1 de retargeting nativo Meta", "Publicar reel proceso C + caption día 16", "Responder <1h todo (ángulo temporada diciembre)"], kpi: "C1 activa", tip: "Desde hoy: NO TOCAR 6 días.", docs: ["arbol", "camp1", "creativoC"] },
{ i: 23, fase: "F2 · Tracción", titulo: "Día 17 — Observar", tareas: ["Solo revisar rechazos", "Orgánico normal + 5 DMs", "Anotar leads y calidad"], kpi: "0 rechazos" },
{ i: 24, fase: "F2 · Tracción", titulo: "Día 18 — Reel caso orgánico", tareas: ["Publicar reel caso A + caption (comentá SISTEMA)", "5 DMs", "Responder comentarios al instante"], kpi: "Comentarios SISTEMA", docs: ["creativoA"] },
{ i: 25, fase: "F2 · Tracción", titulo: "Día 19 — Sostener", tareas: ["Orgánico + 5 DMs", "Calificar chats con las 3 preguntas", "Agendar llamadas"], kpi: "Calls agendadas" },
{ i: 26, fase: "F2 · Tracción", titulo: "Día 20 — Sostener", tareas: ["Orgánico + 5 DMs", "Follow-up a propuestas", "Anotar objeciones"], kpi: "Pipeline vivo" },
{ i: 27, fase: "F2 · Tracción", titulo: "Día 21 — OPTIMIZACIÓN C1", tareas: ["Pasar Árbol NO vende (Capas 1-2-3) solo si lleva 6 días intacta", "Comparar costo/conversación A vs B vs C", "Ganador +30%, pausar 2 perdedores", "Anotar ángulo ganador"], kpi: "C1 optimizada", tip: "El dato manda, no el gusto.", docs: ["arbol", "camp1"] },
{ i: 28, fase: "F2 · Tracción", titulo: "Día 22 — Réplica", tareas: ["Variación del ángulo ganador (mismo hook, otro inicio)", "5 DMs", "Llamadas"], kpi: "Variación lista" },
{ i: 29, fase: "F2 · Tracción", titulo: "Día 23 — Sostener", tareas: ["Orgánico + 5 DMs", "Propuestas pendientes", "Anotar"], kpi: "2 propuestas (meta F2)" },
{ i: 30, fase: "F2 · Tracción", titulo: "Día 24 — Sostener", tareas: ["Orgánico + historias", "5 DMs", "Revisar CPL acumulado"], kpi: "CPL controlado" },
{ i: 31, fase: "F2 · Tracción", titulo: "Día 25 — Empuje", tareas: ["Historia 'quedan X cupos' (solo real)", "Follow-ups", "Llamadas"], kpi: "Urgencia real" },
{ i: 32, fase: "F2 · Tracción", titulo: "Día 26 — Banco", tareas: ["Grabar 2 reels crudos", "4 DMs", "Descanso parcial"], kpi: "Banco" },
{ i: 33, fase: "F2 · Tracción", titulo: "Día 27 — Informe", tareas: ["Gastado/leads/calls/propuestas F2", "Comparar vs meta (50/20/5/2)", "Ajustar"], kpi: "Informe F2" },
{ i: 34, fase: "F2 · Tracción", titulo: "Día 28 — Transición", tareas: ["Preparar C2 en borrador", "Orgánico", "Descanso"], kpi: "C2 en borrador" },
{ i: 35, fase: "F2 · Tracción", titulo: "Día 29 — Revisión", tareas: ["Cerrar números F2", "Lecciones", "Anunciar C2"], kpi: "F2 cerrada" },
{ i: 36, fase: "F2 · Tracción", titulo: "Día 30 — Cierre F2", tareas: ["Post balance público", "Agradecer", "Preparar día 31"], kpi: "Balance público" },

{ i: 37, fase: "F3 · Conversión", titulo: "Día 31 — PUBLICAR C2", tareas: ["Pasar Árbol NO vende Capa 1-2 (exclusiones + frecuencia + ≥100)", "Publicar Campaña 2 frío", "Orgánico educativo", "Responder <1h"], kpi: "C2 activa", tip: "Frío cuesta más: normal.", docs: ["arbol", "camp2", "plantillas"] },
{ i: 38, fase: "F3 · Conversión", titulo: "Día 32 — Observar", tareas: ["NO tocar C2", "Orgánico + 5 DMs", "Anotar leads y calidad"], kpi: "Aprendizaje C2" },
{ i: 39, fase: "F3 · Conversión", titulo: "Día 33 — Sostener", tareas: ["Orgánico", "Llamadas y propuestas", "Follow-ups"], kpi: "Propuestas" },
{ i: 40, fase: "F3 · Conversión", titulo: "Día 34 — Sostener", tareas: ["Orgánico", "5 DMs", "Calificar"], kpi: "Pipeline" },
{ i: 41, fase: "F3 · Conversión", titulo: "Día 35 — Sostener", tareas: ["Orgánico", "Historias de cupos", "Llamadas"], kpi: "Calls" },
{ i: 42, fase: "F3 · Conversión", titulo: "Día 36 — Pre-corte", tareas: ["Revisar CPA provisorio C2", "Orgánico", "Anotar"], kpi: "CPA provisorio" },
{ i: 43, fase: "F3 · Conversión", titulo: "Día 37 — OPTIMIZACIÓN C2", tareas: ["Pasar Árbol NO vende completo: escalar / iterar / matar", "Pausar 2 peores", "Ganador +30% solo si CPA < $10.000", "Si todo > $15.000: pausar C2 y reforzar C1"], kpi: "C2 optimizada", docs: ["arbol", "camp2"] },
{ i: 44, fase: "F3 · Conversión", titulo: "Día 38 — Cierre", tareas: ["Empujar propuestas abiertas", "Follow-ups", "Llamadas"], kpi: "Cierres en curso" },
{ i: 45, fase: "F3 · Conversión", titulo: "Día 39 — Cierre", tareas: ["Orgánico + escasez real", "Cerrar", "Anotar"], kpi: "1-2 cierres" },
{ i: 46, fase: "F3 · Conversión", titulo: "Día 40 — Onboarding", tareas: ["Onboarding del cliente nuevo", "Pedir accesos y brief", "Agendar lanzamiento"], kpi: "Entrega inicia", docs: ["onboarding"] },
{ i: 47, fase: "F3 · Conversión", titulo: "Día 41 — Sostener", tareas: ["Orgánico", "Propuestas", "Grabar 2 reels crudos"], kpi: "Banco" },
{ i: 48, fase: "F3 · Conversión", titulo: "Día 42 — Informe", tareas: ["Números F3 vs meta (80/30/8/4/1-2)", "Qué campaña ganó y por qué", "Ajustar"], kpi: "Informe F3", docs: ["reporte"] },
{ i: 49, fase: "F3 · Conversión", titulo: "Día 43 — Transición", tareas: ["Planificar escala F4", "Orgánico", "Descanso"], kpi: "Plan F4" },
{ i: 50, fase: "F3 · Conversión", titulo: "Día 44 — Pre-cierre", tareas: ["Follow-ups finales F3", "Orgánico", "Anotar"], kpi: "Pipeline limpio" },
{ i: 51, fase: "F3 · Conversión", titulo: "Día 45 — DECISIÓN FINAL", tareas: ["Pasar Árbol NO vende Capa 3", "¿Escalar ganadora +20%? ¿Cambiar creativos? ¿Pausar?", "Decidir con datos y anotar", "Comunicar plan"], kpi: "Decisión tomada", tip: "Sin dato no hay decisión.", docs: ["arbol", "camp2"] },

{ i: 52, fase: "F4 · Escala", titulo: "Día 46 — Escalar", tareas: ["Aplicar decisión día 45 (+20% ganadora)", "Orgánico", "Entregas de clientes"], kpi: "Escala ON" },
{ i: 53, fase: "F4 · Escala", titulo: "Día 47 — Sostener", tareas: ["Vigilar CPL (no romper lo que anda)", "Orgánico + 5 DMs", "Llamadas"], kpi: "CPL estable" },
{ i: 54, fase: "F4 · Escala", titulo: "Día 48 — Documentar 1", tareas: ["Escribir playbook: setup y oferta", "Orgánico", "Anotar"], kpi: "Playbook 1/3" },
{ i: 55, fase: "F4 · Escala", titulo: "Día 49 — Documentar 2", tareas: ["Playbook: contenido y campañas", "Orgánico", "Anotar"], kpi: "Playbook 2/3" },
{ i: 56, fase: "F4 · Escala", titulo: "Día 50 — Punto medio", tareas: ["Revisar metas F4 (2-3 clientes)", "Ajustar presupuesto si hace falta", "Orgánico"], kpi: "Mitad F4" },
{ i: 57, fase: "F4 · Escala", titulo: "Día 51 — Cierres", tareas: ["Empujar cierres pendientes", "Follow-ups", "Orgánico"], kpi: "Cierres" },
{ i: 58, fase: "F4 · Escala", titulo: "Día 52 — Cierres", tareas: ["Llamadas de cierre", "Propuestas finales", "Orgánico"], kpi: "Firmas" },
{ i: 59, fase: "F4 · Escala", titulo: "Día 53 — Documentar 3", tareas: ["Playbook: cierres y onboarding", "Orgánico", "Anotar"], kpi: "Playbook 3/3" },
{ i: 60, fase: "F4 · Escala", titulo: "Día 54 — Sostener", tareas: ["Orgánico", "Entregas", "Banco del mes siguiente"], kpi: "Banco" },
{ i: 61, fase: "F4 · Escala", titulo: "Día 55 — Sostener", tareas: ["Orgánico", "Llamadas", "Revisar CPL"], kpi: "Control" },
{ i: 62, fase: "F4 · Escala", titulo: "Día 56 — Pre-cierre", tareas: ["Follow-ups", "Orgánico", "Ordenar pipeline"], kpi: "Orden" },
{ i: 63, fase: "F4 · Escala", titulo: "Día 57 — Informe 60d", tareas: ["Números completos: leads, CPL, CAC, MRR", "Lecciones", "Ajustar oferta"], kpi: "Informe 60d", docs: ["reporte"] },
{ i: 64, fase: "F4 · Escala", titulo: "Día 58 — Balance público", tareas: ["Post balance 60 días (números reales)", "Agradecer", "Anunciar ciclo 2"], kpi: "Balance público" },
{ i: 65, fase: "F4 · Escala", titulo: "Día 59 — Descanso", tareas: ["Mínimo operativo", "Responder", "Dormir"], kpi: "Recarga" },
{ i: 66, fase: "F4 · Escala", titulo: "Día 60 — Cierre", tareas: ["Celebrar 2-3 clientes", "Sistema documentado para replicar", "Plan del ciclo 2"], kpi: "2-3 clientes · MRR $1.5M+", tip: "ESTÁ TODO. AHORA A REPLICAR." }
];

const CSS = `
.fx * { box-sizing: border-box; margin: 0; padding: 0; }
.fx { background: ${BG}; min-height: 100vh; font-family: 'Syne', sans-serif; color: ${T1}; font-size: 15px; }
.fx-mono { font-family: 'JetBrains Mono', monospace; }
.fx-tab { background: transparent; border: none; color: ${T2}; font-family: 'Syne', sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 11px 15px; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; }
.fx-tab.on { color: #F072FF; border-bottom-color: ${F}; }
.fx-card { background: ${S1}; border: 1px solid ${B2}; border-radius: 12px; padding: 18px 20px; }
.fx-label { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${T3}; }
.fx-h1 { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
.fx-h2 { font-size: 17.5px; font-weight: 700; color: ${T1}; }
.fx-body { font-size: 14.5px; line-height: 1.7; color: ${T2}; }
.fx-pill { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 11.5px; font-weight: 600; padding: 4px 11px; border-radius: 20px; }
.fx-day { background: transparent; border: 1px solid ${B2}; color: ${T2}; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; font-weight: 600; min-width: 40px; height: 40px; border-radius: 20px; cursor: pointer; padding: 0 9px; }
.fx-day.on { border-color: ${F}; color: #F072FF; background: rgba(224,64,251,0.14); }
.fx-doc { background: ${S2}; border: 1px solid ${B2}; border-radius: 8px; padding: 0 14px; margin-top: 10px; }
.fx-doc summary { cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 13.5px; font-weight: 700; color: #F072FF; padding: 13px 0; list-style: none; }
.fx-doc summary::-webkit-details-marker { display: none; }
.fx-doc summary:before { content: "+ "; font-weight: 700; }
.fx-doc[open] summary:before { content: "– "; }
.fx-doc pre { font-family: 'JetBrains Mono', monospace; font-size: 13.5px; line-height: 1.75; color: ${T1}; white-space: pre-wrap; word-break: break-word; padding-bottom: 14px; }
.fx-task { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border: none; border-bottom: 1px solid ${B2}; background: transparent; width: 100%; text-align: left; font: inherit; color: inherit; cursor: pointer; }
.fx-task:last-child { border-bottom: none; }
.fx-cb { width: 20px; height: 20px; border: 1.5px solid ${T3}; border-radius: 4px; flex-shrink: 0; margin-top: 2px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #000; font-weight: 700; }
.fx-cb.on { background: ${F}; border-color: ${F}; }
.fx-txt { font-size: 14.5px; line-height: 1.65; color: ${T1}; }
.fx-txt.on { color: ${T3}; text-decoration: line-through; }
.fx-bar { height: 7px; background: ${S2}; border-radius: 4px; overflow: hidden; }
.fx-bar > div { height: 100%; border-radius: 4px; }
.fx-copybtn { background: transparent; border: 1px solid ${B2}; color: ${T1}; font-family: 'JetBrains Mono', monospace; font-size: 11.5px; font-weight: 600; padding: 5px 11px; border-radius: 6px; cursor: pointer; }
.fx-copybtn:hover { border-color: ${F}; color: #F072FF; }
.fx-btn { background: ${F}; border: none; color: #000; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; padding: 10px 18px; border-radius: 8px; cursor: pointer; }
.fx-btn:hover { opacity: 0.9; }
.fx-in { background: ${S2}; border: 1px solid ${B2}; color: ${T1}; font-family: 'JetBrains Mono', monospace; font-size: 13.5px; padding: 9px 11px; border-radius: 8px; width: 100%; outline: none; }
.fx-in:focus { border-color: ${F}; }
.fx-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
.fx-fgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; }
.fx-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; padding: 12px 0; border-bottom: 0.5px solid ${B2}; }
.fx-row:last-child { border-bottom: none; }
.scrollx { overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.scrollx::-webkit-scrollbar { display: none; }
.fx-sticky-prog { position: sticky; top: 0; z-index: 20; background: rgba(7,7,7,0.94); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(224,64,251,0.28); padding: 8px 20px; }
.fx-badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 14px; border: 1px solid ${B2}; color: ${T1}; background: rgba(255,255,255,0.05); }
@media (max-width: 640px) {
  .fx-h1 { font-size: 22px; }
  .fx-card { padding: 14px 14px; }
  .fx-tab { font-size: 12px; padding: 10px 11px; letter-spacing: 0.06em; }
  .fx-day { min-width: 38px; height: 38px; }
}
`;

const PIPE_KEY = "fuxia_marketing_pipeline_v1";
const FP_CHECKS_KEY = "ferney_personal_checks_v1";
const ETAPAS = ["Lead", "Conversación", "Llamada", "Propuesta", "Cierre", "Perdido"];
const ETAPA_IDX = { "Lead": 1, "Conversación": 2, "Llamada": 3, "Propuesta": 4, "Cierre": 5, "Perdido": 0 };
const CANALES = [
  "DM IG",
  "TikTok",
  "Threads",
  "Facebook",
  "LinkedIn",
  "Marca Personal @ferneypamplona",
  "Reel / Orgánico",
  "Meta Ads Retargeting",
  "Meta Ads Frío",
  "Landing / Web",
  "WhatsApp Directo",
  "Referido"
];
const RED_COLOR = {
  "Instagram": "#E040FB",
  "TikTok": "#69C9D0",
  "Threads": "#F8F8F4",
  "Facebook": "#60A5FA",
  "LinkedIn": "#38BDF8"
};
const PLANES_VAL = [
  { label: "Diagnóstico ($0)", val: 0 },
  { label: "Arranque ($1.5M)", val: 1500000 },
  { label: "Crecimiento (Mes 1 $1.5M · luego $750k/m)", val: 1500000 },
  { label: "Escala (Mes 1 $2.5M · luego $1.2M/m)", val: 2500000 },
  { label: "Combo Abonable ($550k)", val: 550000 },
  { label: "Google Maps ($300k)", val: 300000 },
  { label: "Links Pro ($250k)", val: 250000 },
  { label: "Piloto ($750k)", val: 750000 }
];
const ETAPA_COLOR = {
  "Lead": T2,
  "Conversación": "#69C9D0",
  "Llamada": WARN,
  "Propuesta": F,
  "Cierre": OK,
  "Perdido": GASTO
};

function money(n) { return "$" + (Number(n) || 0).toLocaleString("es-CO"); }
function todayIso() { return new Date().toISOString().slice(0, 10); }
function csvCell(v) { return '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"'; }

export { PLAN, DOCS, WA_T, FUXIA_MULTIRRED, FERNEY_CALENDARIO };

function initialTabFromHash() {
  try {
    const h = (window.location.hash || "").toLowerCase();
    if (h.includes("tablero")) return "tab";
    if (h.includes("redes")) return "redes";
    if (h.includes("personal") || h.includes("ferney")) return "personal";
    if (h.includes("camp") || h.includes("guion")) return "camp";
    if (h.includes("whatsapp") || h.includes("wa")) return "wa";
    if (h.includes("kpi") || h.includes("meta")) return "kpi";
  } catch (e) {}
  return "cal";
}

function getTodayFuxiaIdx() {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(2026, 10, 23); // 23 nov 2026 = idx 0
  const diff = Math.floor((todayMidnight - start) / 86400000);
  return Math.max(0, Math.min(PLAN.length - 1, diff));
}
function getTodayFpIdx() {
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(2026, 10, 30); // 30 nov 2026 = fpIdx 0
  const diff = Math.floor((todayMidnight - start) / 86400000);
  return Math.max(0, Math.min(FERNEY_CALENDARIO.length - 1, diff));
}

function DmGuiaGrid({ keyPrefix, enviarTexto, recibirTexto, outTitle, inTitle, outRec, inRec, outAll, inAll, outSummary, inSummary, copied, onCopy }) {
  const boxes = [
    { kind: "out", title: outTitle, border: "rgba(245,200,66,0.38)", color: WARN, copyBtn: "copiar guion", desc: enviarTexto, subLbl: "Mensaje exacto sugerido", rec: outRec, all: outAll, summary: outSummary },
    { kind: "in", title: inTitle, border: "rgba(138,232,160,0.38)", color: OK, copyBtn: "copiar respuesta", desc: recibirTexto, subLbl: "Respuesta exacta sugerida", rec: inRec, all: inAll, summary: inSummary }
  ];
  return (
    <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
      {boxes.map((b) => {
        const recKey = keyPrefix + "-" + b.kind;
        return (
          <div key={b.kind} style={{ padding: "13px 14px", background: S2, border: "1px solid " + b.border, borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span className="fx-label" style={{ color: b.color }}>{b.title}</span>
              <button type="button" className="fx-copybtn" onClick={() => onCopy(recKey, b.rec.txt)}>
                {copied === recKey ? "✓ copiado" : b.copyBtn}
              </button>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: T1, marginBottom: 8 }}>{b.desc}</div>
            <div style={{ fontSize: 11.5, color: b.color, fontWeight: 700, marginBottom: 4 }}>{b.subLbl} ({b.rec.etiqueta}):</div>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.6, color: T2, whiteSpace: "pre-wrap", wordBreak: "break-word", background: S1, padding: "9px 10px", borderRadius: 6, border: "1px solid " + B2 }}>{b.rec.txt}</pre>
            <details className="fx-doc" style={{ marginTop: 8, background: S1 }}>
              <summary>{b.summary}</summary>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 10 }}>
                {b.all.map((g) => {
                  const gKey = keyPrefix + "-all-" + b.kind + "-" + g.id;
                  return (
                    <div key={g.id} style={{ padding: "8px 10px", background: S2, borderRadius: 6, border: "1px solid " + B2 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{g.etiqueta}</span>
                        <button type="button" className="fx-copybtn" onClick={() => onCopy(gKey, g.txt)}>{copied === gKey ? "✓" : "copiar"}</button>
                      </div>
                      <div style={{ fontSize: 11.5, color: T3, marginBottom: 4 }}>{g.cuando}</div>
                      <pre style={{ paddingBottom: 0, fontSize: 12 }}>{g.txt}</pre>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        );
      })}
    </div>
  );
}

export default function FuxiaTrafico() {
  const initFuxia = getTodayFuxiaIdx();
  const initFp = getTodayFpIdx();
  const [tab, setTab] = useState(initialTabFromHash);
  const [idx, setIdx] = useState(initFuxia);
  const [fase, setFase] = useState((PLAN[initFuxia] && PLAN[initFuxia].fase) || "Setup");
  const [checks, setChecks] = useState({});
  const [fpChecks, setFpChecks] = useState({});
  const [redFuxia, setRedFuxia] = useState("Todas");
  const [semFuxia, setSemFuxia] = useState("Todas");
  const [fpSem, setFpSem] = useState((FERNEY_CALENDARIO[initFp] && FERNEY_CALENDARIO[initFp].sem) || "S1");
  const [fpIdx, setFpIdx] = useState(initFp);
  const [fpRed, setFpRed] = useState("Todas");
  const [copied, setCopied] = useState("");
  const [syncMsg, setSyncMsg] = useState("");
  const [pipe, setPipe] = useState({ pautaReal: 0, leads: [] });
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [form, setForm] = useState({
    tienda: "",
    contacto: "",
    canal: "DM IG",
    etapa: "Lead",
    plan: "Arranque ($1.5M)",
    valor: 1500000,
    seguimiento: "",
    nota: ""
  });

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("fuxia_marketing_checks_v1") || "{}");
      setChecks(s);
    } catch (e) {}
    try {
      const fp = JSON.parse(localStorage.getItem(FP_CHECKS_KEY) || "{}");
      setFpChecks(fp);
    } catch (e) {}
    try {
      const p = JSON.parse(localStorage.getItem(PIPE_KEY) || "null");
      if (p && Array.isArray(p.leads)) {
        setPipe({ pautaReal: Number(p.pautaReal) || 0, leads: p.leads });
      }
    } catch (e) {}
  }, []);
  function savePipe(next) {
    setPipe(next);
    try { localStorage.setItem(PIPE_KEY, JSON.stringify(next)); } catch (e) {}
  }
  function goToTodayFuxia() {
    const ti = getTodayFuxiaIdx();
    setIdx(ti);
    if (PLAN[ti]) setFase(PLAN[ti].fase);
  }
  function goStepFuxia(delta) {
    const nextIdx = Math.max(0, Math.min(PLAN.length - 1, idx + delta));
    setIdx(nextIdx);
    if (PLAN[nextIdx]) setFase(PLAN[nextIdx].fase);
  }
  function goToTodayFp() {
    const ti = getTodayFpIdx();
    setFpIdx(ti);
    if (FERNEY_CALENDARIO[ti]) setFpSem(FERNEY_CALENDARIO[ti].sem);
  }
  function goStepFp(delta) {
    const nextIdx = Math.max(0, Math.min(FERNEY_CALENDARIO.length - 1, fpIdx + delta));
    setFpIdx(nextIdx);
    if (FERNEY_CALENDARIO[nextIdx]) setFpSem(FERNEY_CALENDARIO[nextIdx].sem);
  }
  function addLead(e) {
    e.preventDefault();
    const tienda = form.tienda.trim();
    if (!tienda) return;
    const item = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      fecha: todayIso(),
      tienda,
      contacto: form.contacto.trim(),
      canal: form.canal,
      etapa: form.etapa,
      plan: form.plan,
      valor: Number(form.valor) || 0,
      seguimiento: form.seguimiento || "",
      nota: form.nota.trim()
    };
    savePipe({ pautaReal: pipe.pautaReal, leads: [item, ...pipe.leads] });
    setForm((prev) => Object.assign({}, prev, { tienda: "", contacto: "", seguimiento: "", nota: "" }));
  }
  function startEditLead(l) {
    setEditingId(l.id);
    setEditForm({
      tienda: l.tienda || "",
      contacto: l.contacto || "",
      canal: l.canal || "DM IG",
      etapa: l.etapa || "Lead",
      plan: l.plan || "Arranque ($1.5M)",
      valor: Number(l.valor) || 0,
      seguimiento: l.seguimiento || "",
      nota: l.nota || ""
    });
  }
  function saveEditLead(id) {
    if (!editForm || !editForm.tienda.trim()) return;
    savePipe({
      pautaReal: pipe.pautaReal,
      leads: pipe.leads.map((l) => (l.id === id ? Object.assign({}, l, {
        tienda: editForm.tienda.trim(),
        contacto: editForm.contacto.trim(),
        canal: editForm.canal,
        etapa: editForm.etapa,
        plan: editForm.plan,
        valor: Number(editForm.valor) || 0,
        seguimiento: editForm.seguimiento || "",
        nota: editForm.nota.trim()
      }) : l))
    });
    setEditingId(null);
    setEditForm(null);
  }
  function updateEtapa(id, nuevaEtapa) {
    savePipe({
      pautaReal: pipe.pautaReal,
      leads: pipe.leads.map((l) => (l.id === id ? Object.assign({}, l, { etapa: nuevaEtapa }) : l))
    });
  }
  function removeLead(id) {
    if (editingId === id) { setEditingId(null); setEditForm(null); }
    savePipe({ pautaReal: pipe.pautaReal, leads: pipe.leads.filter((l) => l.id !== id) });
  }
  function exportCsv() {
    const header = ["Fecha", "Negocio", "Contacto", "Canal", "Etapa", "Plan", "Valor_COP", "Proximo_Seguimiento", "Nota"];
    const rows = pipe.leads.map((l) => [l.fecha, l.tienda, l.contacto, l.canal, l.etapa, l.plan, l.valor, l.seguimiento || "", l.nota]);
    const csv = "\uFEFF" + [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
    try {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fuxia_tablero_leads_" + todayIso() + ".csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {}
  }
  function exportBackupJson() {
    const payload = {
      version: 1,
      app: "FUXIA_TRAFICO",
      exportedAt: new Date().toISOString(),
      pipe,
      checks,
      fpChecks
    };
    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fuxia_respaldo_completo_" + todayIso() + ".json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSyncMsg("✓ Respaldo JSON descargado (" + pipe.leads.length + " leads + checklists).");
      setTimeout(() => setSyncMsg(""), 4000);
    } catch (e) {
      setSyncMsg("No se pudo descargar el respaldo JSON.");
    }
  }
  function importBackupJson(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const data = JSON.parse(String(reader.result || "{}"));
        if (!data || typeof data !== "object") throw new Error("invalid");
        let importedLeads = 0;
        if (data.pipe && Array.isArray(data.pipe.leads)) {
          const nextPipe = { pautaReal: Number(data.pipe.pautaReal) || 0, leads: data.pipe.leads };
          savePipe(nextPipe);
          importedLeads = nextPipe.leads.length;
        }
        if (data.checks && typeof data.checks === "object") {
          setChecks(data.checks);
          try { localStorage.setItem("fuxia_marketing_checks_v1", JSON.stringify(data.checks)); } catch (err) {}
        }
        if (data.fpChecks && typeof data.fpChecks === "object") {
          setFpChecks(data.fpChecks);
          try { localStorage.setItem(FP_CHECKS_KEY, JSON.stringify(data.fpChecks)); } catch (err) {}
        }
        setSyncMsg("✓ Respaldo restaurado: " + importedLeads + " leads + progreso sincronizados.");
      } catch (err) {
        setSyncMsg("⚠ Archivo JSON no válido. Usa un respaldo exportado desde FUXIA.");
      }
      setTimeout(() => setSyncMsg(""), 5000);
    };
    reader.readAsText(file, "utf-8");
    e.target.value = "";
  }
  function toggle(k) {
    setChecks((prev) => {
      const n = Object.assign({}, prev, { [k]: !prev[k] });
      try { localStorage.setItem("fuxia_marketing_checks_v1", JSON.stringify(n)); } catch (e) {}
      return n;
    });
  }
  function toggleFp(k) {
    setFpChecks((prev) => {
      const n = Object.assign({}, prev, { [k]: !prev[k] });
      try { localStorage.setItem(FP_CHECKS_KEY, JSON.stringify(n)); } catch (e) {}
      return n;
    });
  }
  function copy(t, txt) {
    const done = () => {
      setCopied(t);
      setTimeout(() => setCopied(""), 1500);
    };
    const fallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = txt;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) done();
      } catch (e) {}
    };
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(txt).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  const day = PLAN[idx];
  const totalTasksFuxia = PLAN.reduce((a, p) => a + p.tareas.length, 0);
  const doneTasksFuxia = PLAN.reduce((a, p) => a + p.tareas.filter((_, ti) => !!checks[p.i + "-" + ti]).length, 0);
  const pctFuxia = totalTasksFuxia ? Math.round((doneTasksFuxia / totalTasksFuxia) * 100) : 0;

  const totalTasksFp = FERNEY_CALENDARIO.reduce((a, d) => a + d.tareas.length, 0);
  const doneTasksFp = FERNEY_CALENDARIO.reduce((a, d) => a + d.tareas.filter((_, ti) => !!fpChecks[d.id + "-" + ti]).length, 0);
  const pctFp = totalTasksFp ? Math.round((doneTasksFp / totalTasksFp) * 100) : 0;

  const multirredFiltrado = FUXIA_MULTIRRED.filter((item) =>
    (redFuxia === "Todas" || item.red === redFuxia) &&
    (semFuxia === "Todas" || item.sem === semFuxia)
  );
  const fpFiltrado = FERNEY_CALENDARIO.filter((item) =>
    (fpSem === "Todas" || item.sem === fpSem) &&
    (fpRed === "Todas" || item.redes.includes(fpRed))
  );
  const gastado = PLAN.filter((p) => p.i <= day.i).reduce((a, p) => a + gastoDia(p.i), 0);
  const baseTotal = PLAN.reduce((a, p) => a + gastoDia(p.i), 0);
  const pct = Math.min(100, Math.round((gastado / TECHO) * 100));
  const fases = ["Setup", "F1 · Base", "F2 · Tracción", "F3 · Conversión", "F4 · Escala"];
  const fDays = PLAN.filter((p) => p.fase === fase);
  const metas = {
    "Setup": "Oferta, nicho, landing, WhatsApp y medición listos",
    "F1 · Base": "20 leads · 10 conversaciones · 2 llamadas",
    "F2 · Tracción": "50 leads · 20 conversaciones · 5 llamadas · 2 propuestas",
    "F3 · Conversión": "80 leads · 30 conversaciones · 8 llamadas · 4 propuestas · 1-2 clientes",
    "F4 · Escala": "2-3 clientes · MRR $1.5M+ · sistema documentado"
  };

  // Métricas reales del tablero (acumulativas por avance en embudo)
  const totalLeads = pipe.leads.length;
  const totalConv = pipe.leads.filter((l) => (ETAPA_IDX[l.etapa] || 0) >= 2).length;
  const totalLlam = pipe.leads.filter((l) => (ETAPA_IDX[l.etapa] || 0) >= 3).length;
  const totalProp = pipe.leads.filter((l) => (ETAPA_IDX[l.etapa] || 0) >= 4).length;
  const totalCierres = pipe.leads.filter((l) => l.etapa === "Cierre").length;
  const valorCerrado = pipe.leads.filter((l) => l.etapa === "Cierre").reduce((a, l) => a + (Number(l.valor) || 0), 0);
  const cplReal = totalLeads > 0 && pipe.pautaReal > 0 ? Math.round(pipe.pautaReal / totalLeads) : 0;
  const cacReal = totalCierres > 0 && pipe.pautaReal > 0 ? Math.round(pipe.pautaReal / totalCierres) : 0;
  const tasaConv = totalLeads > 0 ? Math.round((totalConv / totalLeads) * 100) : 0;
  const tasaCierre = totalLlam > 0 ? Math.round((totalCierres / totalLlam) * 100) : 0;
  const todayStr = todayIso();
  const dueFollowups = pipe.leads.filter((l) => l.seguimiento && l.etapa !== "Cierre" && l.etapa !== "Perdido" && l.seguimiento <= todayStr).length;
  const qNorm = busqueda.trim().toLowerCase();
  const filteredLeads = pipe.leads.filter((l) => {
    if (filtro === "Seguimiento hoy") {
      if (!(l.seguimiento && l.etapa !== "Cierre" && l.etapa !== "Perdido" && l.seguimiento <= todayStr)) return false;
    } else if (filtro !== "Todos" && l.etapa !== filtro) {
      return false;
    }
    if (!qNorm) return true;
    return [l.tienda, l.contacto, l.canal, l.plan, l.nota].some((v) => String(v || "").toLowerCase().includes(qNorm));
  });

  return (
    <div className="fx">
      <div className="fx-sticky-prog">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, fontSize: 12 }}>
            <span className="fx-mono" style={{ color: T1 }}>
              <b style={{ color: F }}>{pctFuxia}%</b> FUXIA ({doneTasksFuxia}/{totalTasksFuxia}) · <b style={{ color: "#38BDF8" }}>{pctFp}%</b> @ferneypamplona ({doneTasksFp}/{totalTasksFp})
            </span>
            <span className="fx-mono" style={{ fontSize: 10.5, color: T3 }}>APP UNIFICADA</span>
          </div>
          <div className="fx-bar" style={{ marginTop: 6, height: 5 }}>
            <div style={{ width: (tab === "personal" ? pctFp : pctFuxia) + "%", background: tab === "personal" ? "#38BDF8" : F }} />
          </div>
        </div>
      </div>

      <div style={{ borderBottom: "0.5px solid " + B2, background: S1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "18px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
            <span className="fx-h1" style={{ color: F }}>FUXIA MARKETING</span>
            <span className="fx-mono" style={{ fontSize: 11, color: T2 }}>60d + Multi-Red + Marca Personal</span>
            <span className="fx-mono" style={{ fontSize: 10, color: T3, marginLeft: "auto" }}>PAUTA $500K</span>
          </div>
          <div className="fx-mono" style={{ fontSize: 10.5, color: T2, marginBottom: 10 }}>Marketing digital y campañas bien estructuradas · Medellín · @fuxia_oficial + @ferneypamplona</div>
          <div className="scrollx" style={{ display: "flex" }}>
            {[
              ["cal", "Calendario"],
              ["redes", "Redes FUXIA"],
              ["personal", "Marca Personal"],
              ["tab", "Tablero (" + totalLeads + ")"],
              ["camp", "Campañas"],
              ["wa", "Mensajes & DMs"],
              ["kpi", "KPIs"]
            ].map(([id, l]) => (
              <button key={id} className={"fx-tab" + (tab === id ? " on" : "")} onClick={() => setTab(id)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 70px" }}>
        {tab === "cal" && (() => {
          const pubsHoy = getPublicacionesDia(day.i, day.titulo);
          const dmHoy = getDmGuiaDia(day.i);
          const dmSalRec = DM_SALIENTES.find((x) => x.id === dmHoy.salienteId) || DM_SALIENTES[0];
          const dmEntRec = DM_ENTRANTES.find((x) => x.id === dmHoy.entranteId) || DM_ENTRANTES[0];
          return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="scrollx" style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + F, color: "#000", background: F, padding: "6px 13px", whiteSpace: "nowrap", fontWeight: 800 }} onClick={goToTodayFuxia}>📍 Ir a Hoy</button>
              <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + B2, color: T1, background: "transparent", padding: "6px 10px" }} onClick={() => goStepFuxia(-1)} title="Día anterior">←</button>
              <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + B2, color: T1, background: "transparent", padding: "6px 10px" }} onClick={() => goStepFuxia(1)} title="Día siguiente">→</button>
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
                  {gastoDia(day.i) ? money(gastoDia(day.i)) + " pauta" : (day.i < 7 ? "preparación" : "orgánico")}
                </span>
              </div>
              <div className="fx-h2" style={{ margin: "8px 0 10px" }}>{day.i < 7 ? "Setup D" + (day.i - 7) + " — " + day.titulo : day.titulo}</div>
              {day.tareas.map((t, ti) => {
                const k = day.i + "-" + ti;
                const on = !!checks[k];
                return (
                  <button key={k} type="button" className="fx-task" role="checkbox" aria-checked={on} onClick={() => toggle(k)}>
                    <span className={"fx-cb" + (on ? " on" : "")} aria-hidden="true">{on ? "✓" : ""}</span>
                    <span className={"fx-txt" + (on ? " on" : "")}>{t}</span>
                  </button>
                );
              })}

              <div style={{ marginTop: 16, padding: "14px 15px", background: S2, border: "1px solid rgba(224,64,251,0.3)", borderRadius: 10 }}>
                <div className="fx-label" style={{ color: F, marginBottom: 10 }}>📢 Qué publicar hoy — red por red (toca para ver texto / pregunta exacta)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {pubsHoy.map((pub) => {
                    const pieza = pub.refId ? FUXIA_MULTIRRED.find((m) => m.id === pub.refId) : null;
                    const textoExacto = pub.copy || (pieza ? pieza.copy : "");
                    return (
                      <div key={pub.red + "-" + day.i} style={{ padding: "9px 11px", background: S1, borderRadius: 8, border: "1px solid " + B2 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                          <span className="fx-badge" style={{ color: RED_COLOR[pub.red] || T1, borderColor: RED_COLOR[pub.red] || B2, minWidth: 84, textAlign: "center" }}>{pub.red}</span>
                          <div style={{ flex: 1, minWidth: 180, fontSize: 13.5, lineHeight: 1.55, color: T1 }}>{pub.accion}</div>
                          {textoExacto ? (
                            <button type="button" className="fx-copybtn" onClick={() => copy("pub-" + day.i + "-" + pub.red, textoExacto)}>
                              {copied === "pub-" + day.i + "-" + pub.red ? "✓ copy copiado" : "copiar copy"}
                            </button>
                          ) : null}
                        </div>
                        {textoExacto ? (
                          <details className="fx-doc" style={{ marginTop: 8, background: S2 }}>
                            <summary>Ver texto / preguntas / stickers exactos para {pub.red}</summary>
                            <pre style={{ fontSize: 12.5 }}>{textoExacto}</pre>
                          </details>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <DmGuiaGrid
                keyPrefix={"dm-" + day.i}
                enviarTexto={dmHoy.enviar}
                recibirTexto={dmHoy.recibir}
                outTitle="📤 DMs QUE TÚ ENVÍAS"
                inTitle="📥 DMs / WA QUE TE LLEGAN"
                outRec={dmSalRec}
                inRec={dmEntRec}
                outAll={DM_SALIENTES}
                inAll={DM_ENTRANTES}
                outSummary="Ver los 5 guiones de DMs salientes"
                inSummary="Ver las 4 respuestas entrantes (<1h)"
                copied={copied}
                onCopy={copy}
              />

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
          );
        })()}

        {tab === "redes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="fx-card" style={{ borderColor: "rgba(224,64,251,0.35)" }}>
              <div className="fx-label" style={{ color: F, marginBottom: 8 }}>Sistema 1→4 · FUXIA (@fuxia_oficial) en Instagram, TikTok, Threads y Facebook</div>
              <div className="fx-fgrid">
                {FUXIA_SISTEMA_1A4.map((s) => (
                  <div key={s.red} style={{ background: S2, border: "1px solid " + B2, borderRadius: 10, padding: "12px 13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span className="fx-badge" style={{ color: RED_COLOR[s.red] || T1, borderColor: RED_COLOR[s.red] || B2 }}>{s.red}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T1, marginBottom: 4 }}>{s.ritmo}</div>
                    <div style={{ fontSize: 12.5, color: T2, lineHeight: 1.5, marginBottom: 6 }}>{s.objetivo}</div>
                    <div className="fx-mono" style={{ fontSize: 11, color: WARN, lineHeight: 1.45 }}>▸ {s.regla}</div>
                  </div>
                ))}
              </div>
              <details className="fx-doc" style={{ marginTop: 12 }}>
                <summary>Bios optimizadas de FUXIA para las 4 redes (tocar copiar)</summary>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 14 }}>
                  {FUXIA_BIOS.map((b) => (
                    <div key={b.red} style={{ background: S1, border: "1px solid " + B2, borderRadius: 8, padding: "12px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span className="fx-mono" style={{ fontSize: 12, fontWeight: 700, color: RED_COLOR[b.red] || F }}>{b.red} · {b.handle}</span>
                        <button type="button" className="fx-copybtn" onClick={() => copy("bio-fx-" + b.red, b.txt)}>{copied === "bio-fx-" + b.red ? "✓ copiado" : "copiar"}</button>
                      </div>
                      <pre style={{ paddingBottom: 0 }}>{b.txt}</pre>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="scrollx" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Todas", "Instagram", "TikTok", "Threads", "Facebook"].map((r) => (
                <button key={r} type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + (redFuxia === r ? (RED_COLOR[r] || F) : B2), color: redFuxia === r ? (RED_COLOR[r] || F) : T2, background: redFuxia === r ? "rgba(224,64,251,0.12)" : "transparent", padding: "6px 13px" }} onClick={() => setRedFuxia(r)}>{r}</button>
              ))}
              {["Todas", "S1", "S2"].map((s) => (
                <button key={s} type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + (semFuxia === s ? WARN : B2), color: semFuxia === s ? WARN : T2, background: semFuxia === s ? "rgba(245,200,66,0.1)" : "transparent", padding: "6px 12px" }} onClick={() => setSemFuxia(s)}>{s === "Todas" ? "S1+S2" : s}</button>
              ))}
            </div>

            {multirredFiltrado.map((p) => (
              <div key={p.id} className="fx-card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <span className="fx-badge" style={{ color: RED_COLOR[p.red] || F, borderColor: RED_COLOR[p.red] || F }}>{p.red}</span>
                  <span className="fx-mono" style={{ fontSize: 11, color: WARN }}>{p.sem} · {p.dia}</span>
                  <button type="button" className="fx-copybtn" style={{ marginLeft: "auto" }} onClick={() => copy(p.id, p.copy)}>{copied === p.id ? "✓ copiado" : "copiar copy"}</button>
                </div>
                <div className="fx-h2" style={{ marginBottom: 4 }}>{p.titulo}</div>
                <div className="fx-mono" style={{ fontSize: 11.5, color: T3, marginBottom: 8 }}>{p.formato}</div>
                <div style={{ padding: "8px 12px", background: S2, borderLeft: "2px solid " + (RED_COLOR[p.red] || F), borderRadius: 4, fontSize: 13, color: T1, marginBottom: 10 }}>{p.hook}</div>
                <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.7, color: T2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{p.copy}</pre>
              </div>
            ))}
          </div>
        )}

        {tab === "personal" && (() => {
          const fpWeekDays = FERNEY_CALENDARIO.filter((item) => item.sem === fpSem);
          const fpDay = FERNEY_CALENDARIO[fpIdx] || fpWeekDays[0] || FERNEY_CALENDARIO[0];
          const fpPubsHoy = getFpPublicacionesDia(fpDay).filter((p) => fpRed === "Todas" || p.red === fpRed);
          const fpDmHoy = getFpDmGuiaDia(fpDay);
          const fpSalRec = FP_DM_SALIENTES.find((x) => x.id === fpDmHoy.salienteId) || FP_DM_SALIENTES[0];
          const fpEntRec = FP_DM_ENTRANTES.find((x) => x.id === fpDmHoy.entranteId) || FP_DM_ENTRANTES[0];
          return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="fx-card" style={{ borderColor: "rgba(56,189,248,0.4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div className="fx-label" style={{ color: "#38BDF8" }}>Marca Personal · Ferney Pamplona (@ferneypamplona)</div>
                  <div className="fx-h2" style={{ marginTop: 4 }}>Calendario ordenado día por día · IG, Facebook, Threads y LinkedIn</div>
                </div>
                <span className="fx-pill" style={{ color: "#38BDF8", border: "1px solid rgba(56,189,248,0.5)", background: "rgba(56,189,248,0.1)" }}>{pctFp}% completado ({doneTasksFp}/{totalTasksFp})</span>
              </div>
              <details className="fx-doc" style={{ marginTop: 10 }}>
                <summary>4 Pilares + Bios optimizadas de @ferneypamplona (IG · LinkedIn · Threads · Facebook)</summary>
                <div className="fx-fgrid" style={{ marginBottom: 12 }}>
                  {FERNEY_PILARES.map((pl) => (
                    <div key={pl.pilar} style={{ background: S1, border: "1px solid " + B2, borderRadius: 10, padding: "10px 12px" }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#38BDF8", marginBottom: 4 }}>{pl.pilar}</div>
                      <div style={{ fontSize: 12, color: T2, lineHeight: 1.5 }}>{pl.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 14 }}>
                  {FERNEY_BIOS.map((b) => (
                    <div key={b.red} style={{ background: S1, border: "1px solid " + B2, borderRadius: 8, padding: "12px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span className="fx-mono" style={{ fontSize: 12, fontWeight: 700, color: RED_COLOR[b.red] || "#38BDF8" }}>{b.red} · {b.handle}</span>
                        <button type="button" className="fx-copybtn" onClick={() => copy("bio-fp-" + b.red, b.txt)}>{copied === "bio-fp-" + b.red ? "✓ copiado" : "copiar"}</button>
                      </div>
                      <pre style={{ paddingBottom: 0 }}>{b.txt}</pre>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="scrollx" style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid #38BDF8", color: "#000", background: "#38BDF8", padding: "6px 13px", whiteSpace: "nowrap", fontWeight: 800 }} onClick={goToTodayFp}>📍 Ir a Hoy</button>
              <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + B2, color: T1, background: "transparent", padding: "6px 10px" }} onClick={() => goStepFp(-1)} title="Día anterior">←</button>
              <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + B2, color: T1, background: "transparent", padding: "6px 10px" }} onClick={() => goStepFp(1)} title="Día siguiente">→</button>
              {[["S1", "Semana 1 (30 nov–6 dic)"], ["S2", "Semana 2 (7–13 dic)"], ["S3", "Semana 3 (14–20 dic)"], ["S4", "Semana 4 (21–27 dic)"]].map(([id, lbl]) => (
                <button
                  key={id}
                  type="button"
                  className="fx-pill"
                  style={{ cursor: "pointer", border: "1px solid " + (fpSem === id ? "#38BDF8" : B2), color: fpSem === id ? "#38BDF8" : T2, background: fpSem === id ? "rgba(56,189,248,0.12)" : "transparent", padding: "6px 13px", whiteSpace: "nowrap" }}
                  onClick={() => {
                    setFpSem(id);
                    const first = FERNEY_CALENDARIO.findIndex((x) => x.sem === id);
                    if (first >= 0) setFpIdx(first);
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
              {fpWeekDays.map((d) => {
                const realIdx = FERNEY_CALENDARIO.indexOf(d);
                const shortDia = d.dia.split("·")[0].trim();
                const on = fpIdx === realIdx;
                return (
                  <button
                    key={d.id}
                    type="button"
                    className={"fx-day" + (on ? " on" : "")}
                    style={on ? { borderColor: "#38BDF8", color: "#38BDF8", background: "rgba(56,189,248,0.14)" } : undefined}
                    onClick={() => setFpIdx(realIdx)}
                  >
                    {shortDia}
                  </button>
                );
              })}
              <div style={{ marginLeft: "auto", display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Todas", "Instagram", "Facebook", "Threads", "LinkedIn"].map((r) => (
                  <button key={r} type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + (fpRed === r ? (RED_COLOR[r] || "#38BDF8") : B2), color: fpRed === r ? (RED_COLOR[r] || "#38BDF8") : T2, background: fpRed === r ? "rgba(255,255,255,0.08)" : "transparent", padding: "4px 10px", fontSize: 11 }} onClick={() => setFpRed(r)}>{r}</button>
                ))}
              </div>
            </div>

            <div className="fx-card" style={{ borderColor: "rgba(56,189,248,0.35)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                <span className="fx-label" style={{ color: WARN }}>{fpDay.sem} · {fpDay.dia}</span>
                <span className="fx-pill" style={{ marginLeft: "auto", color: "#38BDF8", border: "1px solid rgba(56,189,248,0.4)", background: "rgba(56,189,248,0.08)" }}>{fpDay.pilar}</span>
              </div>
              <div className="fx-h2" style={{ margin: "6px 0 10px" }}>{fpDay.titulo}</div>

              {fpDay.tareas.map((t, ti) => {
                const k = fpDay.id + "-" + ti;
                const on = !!fpChecks[k];
                return (
                  <button key={k} type="button" className="fx-task" role="checkbox" aria-checked={on} onClick={() => toggleFp(k)}>
                    <span className={"fx-cb" + (on ? " on" : "")} style={on ? { background: "#38BDF8", borderColor: "#38BDF8" } : undefined} aria-hidden="true">{on ? "✓" : ""}</span>
                    <span className={"fx-txt" + (on ? " on" : "")}>{t}</span>
                  </button>
                );
              })}

              <div style={{ marginTop: 16, padding: "14px 15px", background: S2, border: "1px solid rgba(56,189,248,0.35)", borderRadius: 10 }}>
                <div className="fx-label" style={{ color: "#38BDF8", marginBottom: 10 }}>📢 Qué publicar hoy — red por red (@ferneypamplona · toca para ver texto exacto)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {fpPubsHoy.map((pub) => (
                    <div key={pub.red + "-" + fpDay.id} style={{ padding: "9px 11px", background: S1, borderRadius: 8, border: "1px solid " + B2, opacity: pub.activa ? 1 : 0.62 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                        <span className="fx-badge" style={{ color: pub.activa ? (RED_COLOR[pub.red] || T1) : T3, borderColor: pub.activa ? (RED_COLOR[pub.red] || B2) : B2, minWidth: 84, textAlign: "center" }}>{pub.red}</span>
                        <div style={{ flex: 1, minWidth: 180, fontSize: 13.5, lineHeight: 1.55, color: pub.activa ? T1 : T3 }}>{pub.accion}</div>
                        {pub.activa && pub.copy ? (
                          <button type="button" className="fx-copybtn" onClick={() => copy("fppub-" + fpDay.id + "-" + pub.red, pub.copy)}>
                            {copied === "fppub-" + fpDay.id + "-" + pub.red ? "✓ copy copiado" : "copiar copy"}
                          </button>
                        ) : null}
                      </div>
                      {pub.activa && pub.copy ? (
                        <details className="fx-doc" style={{ marginTop: 8, background: S2 }}>
                          <summary>Ver texto / preguntas / guion exacto para {pub.red}</summary>
                          <pre style={{ fontSize: 12.5 }}>{pub.copy}</pre>
                        </details>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <DmGuiaGrid
                keyPrefix={"fpdm-" + fpDay.id}
                enviarTexto={fpDmHoy.enviar}
                recibirTexto={fpDmHoy.recibir}
                outTitle="📤 DMs / NETWORKING QUE TÚ ENVÍAS"
                inTitle="📥 DMs / COMENTARIOS QUE TE LLEGAN"
                outRec={fpSalRec}
                inRec={fpEntRec}
                outAll={FP_DM_SALIENTES}
                inAll={FP_DM_ENTRANTES}
                outSummary="Ver los 4 guiones salientes de Marca Personal"
                inSummary="Ver las 3 respuestas entrantes (<1h)"
                copied={copied}
                onCopy={copy}
              />

              <details className="fx-doc" style={{ marginTop: 12 }}>
                <summary>Ver texto completo del día (todas las redes juntas)</summary>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <button type="button" className="fx-copybtn" onClick={() => copy(fpDay.id, fpDay.copy)}>{copied === fpDay.id ? "✓ copiado" : "copiar todo"}</button>
                </div>
                <pre>{fpDay.copy}</pre>
              </details>
            </div>
          </div>
          );
        })()}

        {tab === "tab" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="fx-grid">
              {[
                ["Leads", totalLeads, "Meta 80-100", T1],
                ["Conversaciones", totalConv, "Meta 30 · " + tasaConv + "%", "#69C9D0"],
                ["Llamadas", totalLlam, "Meta 8-12", WARN],
                ["Propuestas", totalProp, "Meta 4-6", F],
                ["Cierres", totalCierres, "Meta 2-3 · " + tasaCierre + "%", OK],
                ["Cerrado COP", money(valorCerrado), cplReal ? "CPL " + money(cplReal) : "Sin pauta aún", OK]
              ].map(([lbl, val, sub, col]) => (
                <div key={lbl} className="fx-card" style={{ padding: "14px 16px" }}>
                  <div className="fx-label">{lbl}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: col, marginTop: 6 }}>{val}</div>
                  <div className="fx-mono" style={{ fontSize: 10, color: T2, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div className="fx-card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="fx-label" style={{ color: T2 }}>Pauta real invertida (COP)</span>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    className="fx-in"
                    style={{ width: 150 }}
                    value={pipe.pautaReal || ""}
                    placeholder="Ej. 150000"
                    onChange={(e) => savePipe({ pautaReal: Math.max(0, Number(e.target.value) || 0), leads: pipe.leads })}
                  />
                  <span className="fx-mono" style={{ fontSize: 11, color: cplReal > 15000 ? GASTO : (cplReal > 0 && cplReal <= 10000 ? OK : T2) }}>
                    {cplReal ? "CPL " + money(cplReal) : "CPL —"} · {cacReal ? "CAC " + money(cacReal) : "CAC —"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <button type="button" className="fx-copybtn" onClick={exportCsv}>⬇ CSV (Excel)</button>
                  <button type="button" className="fx-copybtn" style={{ borderColor: "rgba(224,64,251,0.55)", color: "#F072FF" }} onClick={exportBackupJson}>💾 Exportar respaldo JSON</button>
                  <label className="fx-copybtn" style={{ cursor: "pointer", borderColor: "rgba(138,232,160,0.55)", color: OK }}>
                    📂 Importar respaldo JSON
                    <input type="file" accept="application/json,.json" onChange={importBackupJson} style={{ display: "none" }} />
                  </label>
                </div>
              </div>
              {syncMsg ? <div className="fx-mono" style={{ fontSize: 12, color: OK, background: S2, padding: "8px 12px", borderRadius: 6, borderLeft: "2px solid " + OK }}>{syncMsg}</div> : null}
              <div className="fx-mono" style={{ fontSize: 11, color: T3 }}>
                Sincronización PC ↔ Celular: exporta tu respaldo JSON aquí e impórtalo en tu otro dispositivo (incluye todos los leads + checklists FUXIA y Marca Personal).
              </div>
            </div>

            <form className="fx-card" onSubmit={addLead} style={{ borderColor: "rgba(224,64,251,0.3)", display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="fx-label" style={{ color: F }}>+ Registrar lead / negocio</div>
              <div className="fx-fgrid">
                <input className="fx-in" required placeholder="Negocio / Cliente *" value={form.tienda} onChange={(e) => setForm(Object.assign({}, form, { tienda: e.target.value }))} />
                <input className="fx-in" placeholder="IG o WhatsApp" value={form.contacto} onChange={(e) => setForm(Object.assign({}, form, { contacto: e.target.value }))} />
                <select className="fx-in" value={form.canal} onChange={(e) => setForm(Object.assign({}, form, { canal: e.target.value }))}>
                  {CANALES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="fx-in" value={form.etapa} onChange={(e) => setForm(Object.assign({}, form, { etapa: e.target.value }))}>
                  {ETAPAS.map((et) => <option key={et} value={et}>{et}</option>)}
                </select>
                <select
                  className="fx-in"
                  value={form.plan}
                  onChange={(e) => {
                    const p = PLANES_VAL.find((x) => x.label === e.target.value);
                    setForm(Object.assign({}, form, { plan: e.target.value, valor: p ? p.val : form.valor }));
                  }}
                >
                  {PLANES_VAL.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
                </select>
                <input className="fx-in" type="number" min="0" step="50000" placeholder="Valor COP" value={form.valor} onChange={(e) => setForm(Object.assign({}, form, { valor: Number(e.target.value) || 0 }))} />
                <input className="fx-in" type="date" title="Fecha próximo seguimiento" value={form.seguimiento} onChange={(e) => setForm(Object.assign({}, form, { seguimiento: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input className="fx-in" style={{ flex: 1, minWidth: 200 }} placeholder="Nota rápida (ej: enviar propuesta 1 pág jueves 3pm)" value={form.nota} onChange={(e) => setForm(Object.assign({}, form, { nota: e.target.value }))} />
                <button type="submit" className="fx-btn">+ Agregar</button>
              </div>
            </form>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <input className="fx-in" style={{ flex: 1, minWidth: 200 }} placeholder="🔍 Buscar negocio, contacto, canal o nota..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
              {dueFollowups > 0 ? (
                <button type="button" className="fx-pill" style={{ cursor: "pointer", border: "1px solid " + GASTO, color: GASTO, background: "rgba(255,138,101,0.12)", padding: "7px 13px", fontWeight: 700 }} onClick={() => setFiltro("Seguimiento hoy")}>
                  ⏰ {dueFollowups} seguimiento{dueFollowups === 1 ? "" : "s"} hoy/vencido
                </button>
              ) : null}
            </div>

            <div className="scrollx" style={{ display: "flex", gap: 6 }}>
              {["Todos", "Seguimiento hoy", ...ETAPAS].map((et) => {
                const count = et === "Todos" ? totalLeads : (et === "Seguimiento hoy" ? dueFollowups : pipe.leads.filter((l) => l.etapa === et).length);
                return (
                <button
                  key={et}
                  type="button"
                  className="fx-pill"
                  style={{ cursor: "pointer", border: "0.5px solid " + (filtro === et ? (et === "Seguimiento hoy" ? GASTO : F) : B2), color: filtro === et ? (et === "Seguimiento hoy" ? GASTO : F) : T2, background: filtro === et ? "rgba(224,64,251,0.08)" : "transparent", padding: "6px 12px", whiteSpace: "nowrap" }}
                  onClick={() => setFiltro(et)}
                >
                  {et} ({count})
                </button>
                );
              })}
            </div>

            <div className="fx-card">
              <div className="fx-label" style={{ marginBottom: 6 }}>Pipeline activo ({filteredLeads.length})</div>
              {filteredLeads.length === 0 ? (
                <div className="fx-body" style={{ padding: "12px 0" }}>Aún no hay registros en esta vista. Agrega tu primer prospecto arriba y se guarda automático en este dispositivo.</div>
              ) : filteredLeads.map((l) => {
                const isEditing = editingId === l.id && editForm;
                const isDue = l.seguimiento && l.etapa !== "Cierre" && l.etapa !== "Perdido" && l.seguimiento <= todayStr;
                return (
                <div key={l.id} className="fx-row" style={isEditing ? { flexDirection: "column", alignItems: "stretch" } : undefined}>
                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", background: S2, padding: "12px", borderRadius: 8, border: "1px solid " + F }}>
                      <div className="fx-label" style={{ color: F }}>Editando lead</div>
                      <div className="fx-fgrid">
                        <input className="fx-in" value={editForm.tienda} onChange={(e) => setEditForm(Object.assign({}, editForm, { tienda: e.target.value }))} placeholder="Negocio *" />
                        <input className="fx-in" value={editForm.contacto} onChange={(e) => setEditForm(Object.assign({}, editForm, { contacto: e.target.value }))} placeholder="IG o WhatsApp" />
                        <select className="fx-in" value={editForm.canal} onChange={(e) => setEditForm(Object.assign({}, editForm, { canal: e.target.value }))}>
                          {CANALES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select className="fx-in" value={editForm.etapa} onChange={(e) => setEditForm(Object.assign({}, editForm, { etapa: e.target.value }))}>
                          {ETAPAS.map((et) => <option key={et} value={et}>{et}</option>)}
                        </select>
                        <select className="fx-in" value={editForm.plan} onChange={(e) => { const p = PLANES_VAL.find((x) => x.label === e.target.value); setEditForm(Object.assign({}, editForm, { plan: e.target.value, valor: p ? p.val : editForm.valor })); }}>
                          {PLANES_VAL.map((p) => <option key={p.label} value={p.label}>{p.label}</option>)}
                        </select>
                        <input className="fx-in" type="number" min="0" step="50000" value={editForm.valor} onChange={(e) => setEditForm(Object.assign({}, editForm, { valor: Number(e.target.value) || 0 }))} placeholder="Valor COP" />
                        <input className="fx-in" type="date" title="Próximo seguimiento" value={editForm.seguimiento} onChange={(e) => setEditForm(Object.assign({}, editForm, { seguimiento: e.target.value }))} />
                      </div>
                      <input className="fx-in" value={editForm.nota} onChange={(e) => setEditForm(Object.assign({}, editForm, { nota: e.target.value }))} placeholder="Nota / acuerdo" />
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button type="button" className="fx-copybtn" onClick={() => { setEditingId(null); setEditForm(null); }}>Cancelar</button>
                        <button type="button" className="fx-btn" onClick={() => saveEditLead(l.id)}>Guardar cambios</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          <span className="fx-h2" style={{ fontSize: 15 }}>{l.tienda}</span>
                          <span className="fx-pill" style={{ color: ETAPA_COLOR[l.etapa] || T2, border: "0.5px solid " + (ETAPA_COLOR[l.etapa] || B2) }}>{l.etapa}</span>
                          {l.seguimiento ? (
                            <span className="fx-pill" style={{ color: isDue ? GASTO : "#38BDF8", border: "0.5px solid " + (isDue ? GASTO : "rgba(56,189,248,0.45)"), background: isDue ? "rgba(255,138,101,0.12)" : "transparent" }}>
                              {isDue ? "⏰ Seg. HOY/VENCIDO: " : "📅 Seg: "}{l.seguimiento}
                            </span>
                          ) : null}
                          <span className="fx-mono" style={{ fontSize: 10, color: T2 }}>{l.canal} · {l.fecha}</span>
                        </div>
                        <div className="fx-mono" style={{ fontSize: 11, color: T2, marginTop: 4 }}>
                          {l.contacto ? l.contacto + " · " : ""}{l.plan}{l.valor ? " (" + money(l.valor) + ")" : ""}
                        </div>
                        {l.nota ? <div className="fx-body" style={{ fontSize: 12, marginTop: 2 }}>{l.nota}</div> : null}
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                        <select className="fx-in" style={{ width: 130, padding: "6px 8px" }} value={l.etapa} onChange={(e) => updateEtapa(l.id, e.target.value)}>
                          {ETAPAS.map((et) => <option key={et} value={et}>{et}</option>)}
                        </select>
                        <button type="button" className="fx-copybtn" onClick={() => startEditLead(l)} title="Editar lead">Editar</button>
                        <button type="button" className="fx-copybtn" onClick={() => removeLead(l.id)} title="Eliminar">✕</button>
                      </div>
                    </>
                  )}
                </div>
                );
              })}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="fx-label" style={{ color: WARN }}>📤 1. DMs QUE TÚ ENVÍAS (Prospección saliente — tocar copiar)</div>
            {DM_SALIENTES.map((g) => (
              <div key={g.id} className="fx-card" style={{ borderColor: "rgba(245,200,66,0.32)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="fx-h2" style={{ fontSize: 15.5 }}>{g.etiqueta}</span>
                  <button type="button" className="fx-copybtn" onClick={() => copy("tab-" + g.id, g.txt)}>{copied === "tab-" + g.id ? "✓ copiado" : "copiar"}</button>
                </div>
                <div className="fx-mono" style={{ fontSize: 11.5, color: T3, marginBottom: 8 }}>{g.cuando}</div>
                <div className="fx-body" style={{ whiteSpace: "pre-wrap" }}>{g.txt}</div>
              </div>
            ))}

            <div className="fx-label" style={{ color: OK, marginTop: 8 }}>📥 2. DMs / WHATSAPP QUE TE LLEGAN (Entrantes · responder &lt;1h)</div>
            {DM_ENTRANTES.map((g) => (
              <div key={g.id} className="fx-card" style={{ borderColor: "rgba(138,232,160,0.32)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="fx-h2" style={{ fontSize: 15.5 }}>{g.etiqueta}</span>
                  <button type="button" className="fx-copybtn" onClick={() => copy("tab-" + g.id, g.txt)}>{copied === "tab-" + g.id ? "✓ copiado" : "copiar"}</button>
                </div>
                <div className="fx-mono" style={{ fontSize: 11.5, color: T3, marginBottom: 8 }}>{g.cuando}</div>
                <div className="fx-body" style={{ whiteSpace: "pre-wrap" }}>{g.txt}</div>
              </div>
            ))}

            <div className="fx-label" style={{ color: F, marginTop: 8 }}>💬 3. Plantillas WhatsApp (Agendamiento y seguimiento)</div>
            {WA_T.map((w) => (
              <div key={w.t} className="fx-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span className="fx-h2">{w.t}</span>
                  <button type="button" className="fx-copybtn" onClick={() => copy(w.t, w.txt)}>{copied === w.t ? "✓ copiado" : "copiar"}</button>
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
