import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// FUXIA MARKETING × FERNEY — SISTEMA 60 DÍAS + SETUP
// Setup: lun 23 – dom 29 nov 2026 · Día 1: lun 30 nov · Día 60: jue 28 ene 2027
// Nicho: tiendas de tecnología y accesorios en Medellín
// Pauta: retargeting d16-30 + frío d31-45 ($10k/d) + sostener F4
// Base $450k · Techo $500k
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
nicho: { t: "Nicho y cliente ideal (ICP)", txt:
`NICHO INICIAL — TIENDAS DE TECNOLOGÍA EN MEDELLÍN

Quién es el cliente:
- Tienda de celulares, accesorios, computadores o electrodomésticos.
- 1 a 3 sedes en Medellín o área metropolitana.
- Dueño o administrador que atiende WhatsApp e Instagram.
- Entre 5 y 50 mensajes diarios.
- Sin CRM, sin seguimiento sistematizado y con pauta irregular.

Dolores que le quitamos:
- Responde tarde y el cliente compra en otro lado.
- Anota leads en cuaderno o los pierde en el chat.
- Publica todos los días, pero no tiene oferta clara.
- Pauta sin medición: no sabe qué anuncio trae ventas.

Señales de buen prospecto:
- Vende por WhatsApp o Instagram.
- Tiene catálogo o página web desactualizada.
- Publica contenido, pero no tiene estrategia.
- Ya invirtió en pauta, aunque sea poco.

Promesa FUXIA:
"Te montamos un sistema de captación y seguimiento por WhatsApp en 30 días. No solo posts: clientes."

Frase de ascensor:
"Soy Ferney, de FUXIA. Ayudo a tiendas de tecnología en Medellín a vender más por WhatsApp con contenido, anuncios y seguimiento."` },

precios: { t: "Packs, precios y add-ons", txt:
`PACKS FUXIA MARKETING (COP, sin IVA · +19% si requiere factura con IVA)

DIAGNÓSTICO — Gratis (15 min)
- Auditoría express de Instagram, WhatsApp y pauta actual.
- 3 oportunidades concretas. Sin compromiso.

1) ARRANQUE — $1.500.000 (pago único)
- Landing de conversión + WhatsApp + pixel + UTMs.
- Perfiles optimizados (IG/FB) + highlights.
- 4 piezas de contenido + guion de 2 reels.
- Campaña de Meta Ads configurada (pauta aparte).

2) CRECIMIENTO — $1.500.000 setup + $750.000/mes (recomendado)
- Todo lo de Arranque.
- 8 piezas/mes + stories + guiones.
- Gestión de Meta Ads (pauta aparte: $300k-$600k/mes).
- Respuestas y seguimiento por WhatsApp con plantillas.
- Reporte mensual: leads, conversaciones, CPL y ventas.

3) ESCALA — $2.500.000 setup + $1.200.000/mes
- Todo lo de Crecimiento.
- 12 piezas/mes + 4 reels.
- CRM simple + automatización con n8n + IA de respuesta.
- Dashboard de métricas y reunión quincenal.
- Onboarding del equipo de ventas.

PRODUCTOS DE ENTRADA (puente para tiendas pequeñas)
- Links Pro: $250.000 · Google Maps: $300.000 · Combo: $550.000.
- Piloto fundador (1-2 cupos por DM/llamada): descuento por caso documentado + testimonio.

PAUTA
- Se paga directo a Meta con tarjeta del cliente.
- Inicio recomendado: $300.000-$600.000/mes.
- FUXIA no cobra comisión sobre pauta.

ADD-ONS
- Sesión de fotos: $350.000.
- Reel extra: $250.000.
- Email marketing: $450.000/mes.
- Auditoría de embudo: $300.000.

REGLA
No vender horas. Vender sistema, entregables y resultados.` },

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

creativoA: { t: "Creativo A — Reel caso real (25-30s)", txt:
`9:16 · Orgánico día 18 + anuncio en todas las campañas.

[0-3s] Texto: "Una tienda, dos problemas: WhatsApp y seguimiento."
[3-8s] Dueño con celular: "Respondía a las 11 PM y perdía ventas."
[8-18s] Pantalla real: respuesta automática, calificación y agenda (sin datos sensibles).
[18-24s] Texto: "KATOBO: 8 horas/semana recuperadas. DB Digital: 3 leads calificados el primer mes."
[24-30s] CTA: "Diagnóstico gratis. DM o comentá SISTEMA."

Reglas:
- No inventar resultados.
- Mostrar pantalla real, sin cortes.
- Subtítulos quemados y música sin copyright al 20%.

CAPTION:
No es magia, es sistema. Dos casos reales de Medellín: automatización y captación.
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
`Ads Manager → Crear → Objetivo Interacción → "FUXIA | Retargeting | D16-30 | WhatsApp". Sin Advantage+ presupuesto, sin A/B.

CONJUNTO "Caliente | WhatsApp": Conversión Mensajes → WhatsApp. $10.000/día. Medellín +25 km, 25-50, todos.
PÚBLICOS NATIVOS META (base principal, no dependen del banner de cookies/Pixel):
- Interactuaron IG @fuxia_oficial 30d + interactuaron IG @ferneypamplona 30d + vieron 50%+ reels 30d.
- Complemento: visitantes web 30d (solo quienes aceptaron cookies).
Ubicaciones Advantage+. ARRANCAR CON 2 ANUNCIOS GANADORES DEL ORGÁNICO (no diluir $10k/día en 3; rotar el 3º si hay volumen):
1A Reel caso/auditoría tech (A): "En temporada tu WhatsApp te está costando ventas. Mirá el sistema." Titular: Diagnóstico gratis.
1B Carrusel señales (B): "3 señales de que perdés ventas por WhatsApp." Titular: ¿Te pasa?
1C (reserva) Reel proceso (C): "Diagnóstico, estrategia, implementación y reporte." Titular: Sistema en 30 días.
Botón: Enviar mensaje. URL: https://wa.me/${WA_NUM}?text=Hola,%20quiero%20el%20diagnostico

D16-21 NO TOCAR (responder <1h, anotar). D21: comparar costo/conversación, ganador +30%, pausar el perdedor.` },

camp2: { t: "Campaña 2 — Frío controlado enero (d31-45, $150k)", txt:
`Misma estructura. "FUXIA | Frío | D31-45 | WhatsApp". $10.000/día.
Ángulo enero: "Pasó diciembre: arrancá el año con un sistema que traiga clientes por WhatsApp todas las semanas."

PÚBLICO: Medellín +25 km, 25-50. Intereses (O): dueños de pequeños negocios, emprendimiento, WhatsApp Business, marketing digital, tiendas de telefonía.
EXCLUIR: retargeting (IG/video/web) + seguidores.

ARRANCAR CON 2 ANUNCIOS (1 dolor + 1 prueba; reservar el 3º para rotar):
2A "Pasó diciembre y bajaron los chats: 3 errores que frenan tus ventas por WhatsApp." Titular: Vendé más por WhatsApp.
2B "Caso real: sistema de captación y seguimiento." Titular: Casos reales.
2C (reserva) "5 cupos fundador: diagnóstico + estrategia." Titular: 5 cupos.

D31-36 NO TOCAR. D37: pausar el peor; ganador +30% SOLO si CPA < $10.000; si todo > $15.000, pausar C2 y reforzar C1.
D45 DECISIÓN: ¿escalar ganadora +20%? ¿cambiar creativos? ¿pausar y esperar mes 2?` },

plantillas: { t: "Plantillas copy-paste Ads Manager", txt:
`CAMPAÑA: Interacción · FUXIA Marketing | [Retargeting/Frío] | WhatsApp · $10.000/día · Mensajes → WhatsApp.
RETARGETING (priorizar nativos Meta por consentimiento de cookies): Medellín +25 km, 25-50, todos. O: IG Fuxia 30d + IG Ferney 30d + video 50% 30d (+ web 30d como extra).
FRÍO: igual geo/edad. O: dueños de pequeños negocios, emprendimiento, WhatsApp Business, marketing digital, tiendas de telefonía. Excluir retargeting + seguidores.

COPIES (texto/titular/descripción/botón — usar 2 activos por conjunto con $10k/día):
1A "En temporada tu WhatsApp te está costando ventas…" / Diagnóstico gratis / Marketing para tiendas de tecnología / Enviar mensaje
1B "3 señales de que perdés ventas…" / ¿Te pasa? / Auditoría gratis en 15 min / Enviar mensaje
1C "Diagnóstico, estrategia, implementación…" / Sistema en 30 días / Marketing + automatización / Enviar mensaje
2A "Pasó diciembre y bajaron los chats: 3 errores…" / Vendé más por WhatsApp / Diagnóstico gratis · Medellín / Enviar mensaje
2B "Caso real: captación y seguimiento…" / Casos reales / Estrategia + contenido + pauta / Enviar mensaje
2C "5 cupos fundador…" / 5 cupos · Precio fundador / Diagnóstico sin costo / Enviar mensaje
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

contenido30: { t: "Calendario de contenido 30 días", txt:
`SEMANA 1 — CONFIANZA
Lun: Reel "3 errores que te cuestan ventas".
Mar: Carrusel "3 señales de que perdés ventas por WhatsApp".
Mié: Stories detrás de cámara + encuesta.
Jue: Reel caso real (KATOBO / DB Digital).
Vie: Post de oferta + diagnóstico gratis.
Sáb: Stories Q&A.
Dom: Descanso / grabar banco.

SEMANA 2 — AUTORIDAD
Lun: Reel "Cómo responder rápido sin estar pegado al celular".
Mar: Carrusel "Antes/después de un sistema de captación".
Mié: Stories de proceso + caja de preguntas.
Jue: Reel "3 tareas que podés automatizar esta semana".
Vie: Testimonio o caso de cliente.
Sáb: Stories de resultados.
Dom: Descanso / editar.

SEMANA 3 — OFERTA
Lun: Reel "Qué incluye el diagnóstico gratis".
Mar: Carrusel "Arranque vs Crecimiento vs Escala".
Mié: Stories de objeciones ("es caro", "no tengo tiempo").
Jue: Reel caso de éxito + CTA.
Vie: Post de escasez real (5 cupos).
Sáb: Stories de cierre de cupos.
Dom: Descanso.

SEMANA 4 — PRUEBA
Lun: Reel "Esto aprendí en 30 días".
Mar: Carrusel resultados del mes.
Mié: Stories de agradecimiento.
Jue: Reel "El error que yo cometía".
Vie: Post balance + próximo ciclo.
Sáb: Stories de behind the scenes.
Dom: Descanso.

RITMO: 3 reels/semana · 2 carruseles/semana · stories diarias · 5 DMs/día.` },

propuesta: { t: "Propuesta de 1 página (plantilla)", txt:
`PROPUESTA FUXIA MARKETING — [NOMBRE DEL NEGOCIO]

1. Diagnóstico
- Qué venden, cómo llegan los clientes y dónde se pierden.
- 3 hallazgos concretos de Instagram/WhatsApp/pauta.

2. Objetivo
- [Ej: 30 leads calificados/mes y 10 conversaciones por WhatsApp].
- Plazo: 60 días.

3. Qué hacemos
- Contenido: X piezas/mes + stories + reels.
- Anuncios: campaña de mensajes + retargeting.
- WhatsApp: plantillas, calificación y seguimiento.
- Reporte: leads, conversaciones, CPL y ventas.

4. Inversión
- Pack [Arranque/Crecimiento/Escala]: $[valor].
- Pauta aparte: $[300k-600k]/mes directo a Meta.
- Sin contratos de 12 meses. Sin cobro por hora.

5. Próximos pasos
1) Aprobación de propuesta.
2) Onboarding y accesos.
3) Implementación en 2-4 semanas.
4) Primer reporte a los 30 días.

Firma: Ferney Pamplona · FUXIA · WhatsApp +57 300 537 0203` },

dm: { t: "Guion de prospección por DM", txt:
`DM 1 (sin vender):
"Hola [nombre], vi que venden [producto] por Instagram. Estoy haciendo un estudio de tiendas de tecnología en Medellín. ¿Puedo hacerte una pregunta rápida?"

DM 2 (diagnóstico):
"¿Cuántos mensajes te llegan al día por WhatsApp y quién los responde?"

DM 3 (dolor):
"El 80% de las tiendas que veo pierde ventas por responder tarde o no hacer seguimiento. ¿Te está pasando?"

DM 4 (oferta):
"Estoy abriendo 5 diagnósticos gratis de 15 min para tiendas de tecnología. Te muestro 3 mejoras concretas, sin compromiso. ¿Te sirve esta semana?"

Reglas:
- No mandar audio sin permiso.
- No enviar precio en el primer mensaje.
- Personalizar con el nombre y un detalle real del negocio.
- Máximo 5 DMs nuevos por día + seguimiento.` },

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
[ ] Responsable de responder leads y horario.` }
};

const WA_T = [
{ t: "Bienvenida automática", txt: `Hola, gracias por escribir a FUXIA Marketing. Contame en 2 líneas qué vendés y por dónde te llegan los clientes hoy. Te respondo en menos de 1 hora. — Ferney` },
{ t: "Calificación (3 preguntas)", txt: `Perfecto. Para no hacerte perder tiempo, 3 cortas: 1) ¿Qué vendés exactamente? 2) ¿Cuántos mensajes te llegan al día por WhatsApp/Instagram? 3) ¿Quién los responde y en qué horario?` },
{ t: "Agendamiento", txt: `Con eso ya veo por dónde va. Te propongo un diagnóstico gratis de 15 min. Salís con 3 oportunidades concretas, sin compromiso. ¿Te sirve mañana AM o PM?` },
{ t: "Seguimiento 48h", txt: `Hola [nombre], te escribí por el diagnóstico gratis de FUXIA. ¿Lo pudiste ver? Si no es el momento, todo bien, me decís y lo dejamos para después.` },
{ t: "Reactivación leads fríos", txt: `Hola [nombre], soy Ferney de FUXIA (Medellín). Hace un tiempo hablamos de mejorar las ventas por WhatsApp de [negocio]. Abrí 5 diagnósticos gratis esta semana. ¿Te sirve uno de 15 min?` }
];

// ─── PLAN: setup idx 0-6 (23-29 nov) + días 1-60 (30 nov - 28 ene) ───
// d: -7..-1 setup · 1..60 · tareas: máx 5 · docs: claves de DOCS
const PLAN = [
{ i: 0, fase: "Setup", titulo: "Nicho, oferta y precios", tareas: ["Definir nicho: tiendas de tecnología y accesorios en Medellín", "Elegir 2-3 dolores: respuesta lenta, seguimiento manual, pauta sin medición", "Fijar oferta: diagnóstico gratis + Arranque/Crecimiento/Escala", "Escribir promesa en 1 frase + 3 pruebas reales"], kpi: "Oferta clara en 1 página", tip: "Si no lo explicás en 15 segundos, no está listo.", docs: ["nicho", "precios"] },
{ i: 1, fase: "Setup", titulo: "Auditoría + 20 prospectos", tareas: ["Auditar 10 tiendas de tecnología en Instagram/WhatsApp", "Listar 20 prospectos con nombre, negocio y canal", "Anotar 3 dolores por prospecto", "Elegir los 10 primeros para DM"], kpi: "20 prospectos calificados", tip: "La lista vale más que el logo." },
{ i: 2, fase: "Setup", titulo: "Perfiles y WhatsApp Business", tareas: ["Bio IG/FB: qué hacés, para quién y CTA a WhatsApp", "Highlights: casos, precios, proceso y diagnóstico", "WhatsApp Business: perfil, catálogo con 3 packs, bienvenida y ausencia", "Probar wa.me/" + WA_NUM + " con mensaje precargado"], kpi: "Perfiles y WA listos", tip: "3 segundos: qué, para quién, cómo contactar." },
{ i: 3, fase: "Setup", titulo: "Landing de marketing", tareas: ["Actualizar hero: promesa para tiendas de tecnología", "Sección de casos y prueba social", "Oferta con packs y CTA a WhatsApp", "SEO local: Medellín + marketing digital + WhatsApp"], kpi: "Landing publicada", tip: "Una landing, una promesa, un CTA." },
{ i: 4, fase: "Setup", titulo: "Medición y seguimiento", tareas: ["Pixel + eventos Lead/Contact en la landing", "UTMs por CTA (hero, packs, popup)", "Formulario/WhatsApp conectado a aviso interno", "Tablero simple: leads, conversaciones, llamadas, cierres"], kpi: "Medición funcionando", tip: "Sin medición, la pauta es adivinanza." },
{ i: 5, fase: "Setup", titulo: "Lead magnet + contenido base", tareas: ["Crear PDF '5 puntos que frenan tus ventas por WhatsApp'", "Diseñar calendario de contenido de 30 días", "Escribir 3 guiones de reels", "Preparar banco de 5 piezas"], kpi: "Magnet + calendario listos", tip: "1 problema, 1 promesa, 2 páginas." },
{ i: 6, fase: "Setup", titulo: "Grabar creativos + campaña en borrador", tareas: ["Grabar reels A, B y C con guiones", "Subtítulos quemados + música sin copyright", "Business Manager + método de pago activo", "Dejar campaña de retargeting en borrador"], kpi: "Creativos listos + C1 en borrador", tip: "Nada se publica hoy.", docs: ["reel1", "creativoA", "creativoB", "creativoC", "checklist16"] },

{ i: 7, fase: "F1 · Base", titulo: "Día 1 — Reel de lanzamiento", tareas: ["Publicar reel día 1 (12:00-14:00) + historias", "Enviar 5 DMs con el guion de prospección", "Responder TODO en menos de 1 hora"], kpi: "Reel vivo + 5 DMs", tip: "Tu WhatsApp es el mostrador.", docs: ["reel1", "dm"] },
{ i: 8, fase: "F1 · Base", titulo: "Día 2 — Carrusel de señales", tareas: ["Publicar carrusel B + caption día 2", "5 DMs nuevos", "Historias anunciando el carrusel"], kpi: "Carrusel vivo", docs: ["creativoB"] },
{ i: 9, fase: "F1 · Base", titulo: "Día 3 — Detrás de cámara", tareas: ["Stories de proceso + encuesta", "5 DMs nuevos", "Comentar 5 cuentas de tiendas aliadas"], kpi: "Alcance orgánico" },
{ i: 10, fase: "F1 · Base", titulo: "Día 4 — Reel educativo", tareas: ["Publicar reel '3 tareas que podés automatizar'", "5 DMs", "Registrar leads en el tablero"], kpi: "Pipeline al día" },
{ i: 11, fase: "F1 · Base", titulo: "Día 5 — Encuesta + seguimiento", tareas: ["Historia encuesta: ¿cuántos mensajes te llegan al día?", "5 DMs", "Follow-up a los leads del día 1"], kpi: "Follow-ups hechos" },
{ i: 12, fase: "F1 · Base", titulo: "Día 6 — Banco de contenido", tareas: ["Grabar 2 reels crudos", "4 DMs", "Editar 1 para mañana"], kpi: "Banco +2" },
{ i: 13, fase: "F1 · Base", titulo: "Día 7 — Revisión S1", tareas: ["Contar leads / conversaciones / llamadas", "Anotar qué pieza generó conversaciones", "Planear la semana 2"], kpi: "Informe S1" },
{ i: 14, fase: "F1 · Base", titulo: "Día 8 — Reel de objeciones", tareas: ["Publicar reel 'es caro vs cuánto te cuesta no vender'", "5 DMs", "Historias con caja de preguntas"], kpi: "Reel vivo" },
{ i: 15, fase: "F1 · Base", titulo: "Día 9 — Caso real", tareas: ["Publicar carrusel de caso (KATOBO / DB Digital)", "5 DMs", "Calificar leads con las 3 preguntas"], kpi: "Leads calificados", docs: ["creativoA"] },
{ i: 16, fase: "F1 · Base", titulo: "Día 10 — Historias + DMs", tareas: ["Historias cotidianas + link a WhatsApp", "5 DMs", "Agendar llamadas que salgan"], kpi: "Calls en agenda" },
{ i: 17, fase: "F1 · Base", titulo: "Día 11 — Reel + follow-ups", tareas: ["Publicar reel del banco", "5 DMs", "Follow-up a los leads de días 2-4"], kpi: "Segunda vuelta lista" },
{ i: 18, fase: "F1 · Base", titulo: "Día 12 — Historias Q&A", tareas: ["Historias + caja de preguntas", "5 DMs", "Responder todo en menos de 1 hora"], kpi: "Engagement" },
{ i: 19, fase: "F1 · Base", titulo: "Día 13 — Banco + magnet", tareas: ["Grabar 2 reels crudos", "4 DMs", "Revisar descargas del lead magnet"], kpi: "Banco +2" },
{ i: 20, fase: "F1 · Base", titulo: "Día 14 — Revisión 2 semanas", tareas: ["Totales 14 días vs meta F1 (20/10/2)", "Ajustar hooks flojos", "Descanso"], kpi: "Informe 14d" },
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
.fx-copybtn:hover { border-color: ${F}; color: ${F}; }
.fx-btn { background: ${F}; border: none; color: #000; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 800; padding: 9px 16px; border-radius: 8px; cursor: pointer; }
.fx-btn:hover { opacity: 0.9; }
.fx-in { background: ${S2}; border: 0.5px solid ${B2}; color: ${T1}; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 8px 10px; border-radius: 8px; width: 100%; outline: none; }
.fx-in:focus { border-color: ${F}; }
.fx-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
.fx-fgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; }
.fx-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; padding: 12px 0; border-bottom: 0.5px solid ${B2}; }
.fx-row:last-child { border-bottom: none; }
.scrollx { overflow-x: auto; scrollbar-width: none; }
.scrollx::-webkit-scrollbar { display: none; }
`;

const PIPE_KEY = "fuxia_marketing_pipeline_v1";
const ETAPAS = ["Lead", "Conversación", "Llamada", "Propuesta", "Cierre", "Perdido"];
const ETAPA_IDX = { "Lead": 1, "Conversación": 2, "Llamada": 3, "Propuesta": 4, "Cierre": 5, "Perdido": 0 };
const CANALES = ["DM IG", "Reel / Orgánico", "Meta Ads Retargeting", "Meta Ads Frío", "Landing / Web", "WhatsApp Directo", "Referido"];
const PLANES_VAL = [
  { label: "Diagnóstico ($0)", val: 0 },
  { label: "Arranque ($1.5M)", val: 1500000 },
  { label: "Crecimiento ($1.5M + $750k/m)", val: 2250000 },
  { label: "Escala ($2.5M + $1.2M/m)", val: 3700000 },
  { label: "Combo Entrada ($550k)", val: 550000 },
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

export { PLAN, DOCS, WA_T };

export default function FuxiaTrafico() {
  const [tab, setTab] = useState("cal");
  const [idx, setIdx] = useState(0);
  const [fase, setFase] = useState("Setup");
  const [checks, setChecks] = useState({});
  const [copied, setCopied] = useState("");
  const [pipe, setPipe] = useState({ pautaReal: 0, leads: [] });
  const [filtro, setFiltro] = useState("Todos");
  const [form, setForm] = useState({
    tienda: "",
    contacto: "",
    canal: "DM IG",
    etapa: "Lead",
    plan: "Arranque ($1.5M)",
    valor: 1500000,
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
      nota: form.nota.trim()
    };
    savePipe({ pautaReal: pipe.pautaReal, leads: [item, ...pipe.leads] });
    setForm((prev) => Object.assign({}, prev, { tienda: "", contacto: "", nota: "" }));
  }
  function updateEtapa(id, nuevaEtapa) {
    savePipe({
      pautaReal: pipe.pautaReal,
      leads: pipe.leads.map((l) => (l.id === id ? Object.assign({}, l, { etapa: nuevaEtapa }) : l))
    });
  }
  function removeLead(id) {
    savePipe({ pautaReal: pipe.pautaReal, leads: pipe.leads.filter((l) => l.id !== id) });
  }
  function exportCsv() {
    const header = ["Fecha", "Tienda", "Contacto", "Canal", "Etapa", "Plan", "Valor_COP", "Nota"];
    const rows = pipe.leads.map((l) => [l.fecha, l.tienda, l.contacto, l.canal, l.etapa, l.plan, l.valor, l.nota]);
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
  function toggle(k) {
    setChecks((prev) => {
      const n = Object.assign({}, prev, { [k]: !prev[k] });
      try { localStorage.setItem("fuxia_marketing_checks_v1", JSON.stringify(n)); } catch (e) {}
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
  const filteredLeads = filtro === "Todos" ? pipe.leads : pipe.leads.filter((l) => l.etapa === filtro);

  return (
    <div className="fx">
      <div style={{ borderBottom: "0.5px solid " + B2, background: S1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
            <span className="fx-h1" style={{ color: F }}>FUXIA MARKETING</span>
            <span className="fx-mono" style={{ fontSize: 11, color: T2 }}>60 días + setup</span>
            <span className="fx-mono" style={{ fontSize: 10, color: T3, marginLeft: "auto" }}>PAUTA $500K</span>
          </div>
          <div className="fx-mono" style={{ fontSize: 10, color: T2, marginBottom: 10 }}>Marketing digital para tiendas de tecnología · Medellín</div>
          <div className="scrollx" style={{ display: "flex" }}>
            {[["cal", "Calendario"], ["tab", "Tablero (" + totalLeads + ")"], ["camp", "Campañas"], ["wa", "WhatsApp"], ["kpi", "KPIs"]].map(([id, l]) => (
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
              <div className="fx-h2" style={{ margin: "8px 0 10px" }}>{day.i < 7 ? "Setup D" + (day.i - 7) + " — " + day.titulo : day.titulo}</div>
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

            <div className="fx-card" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
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
              <button type="button" className="fx-copybtn" onClick={exportCsv}>⬇ Exportar CSV (Excel)</button>
            </div>

            <form className="fx-card" onSubmit={addLead} style={{ borderColor: "rgba(224,64,251,0.3)", display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="fx-label" style={{ color: F }}>+ Registrar lead / tienda</div>
              <div className="fx-fgrid">
                <input className="fx-in" required placeholder="Tienda / Negocio *" value={form.tienda} onChange={(e) => setForm(Object.assign({}, form, { tienda: e.target.value }))} />
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
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input className="fx-in" style={{ flex: 1, minWidth: 200 }} placeholder="Nota rápida o próximo seguimiento (ej: enviar diagnóstico jueves 3pm)" value={form.nota} onChange={(e) => setForm(Object.assign({}, form, { nota: e.target.value }))} />
                <button type="submit" className="fx-btn">+ Agregar</button>
              </div>
            </form>

            <div className="scrollx" style={{ display: "flex", gap: 6 }}>
              {["Todos", ...ETAPAS].map((et) => (
                <button
                  key={et}
                  type="button"
                  className="fx-pill"
                  style={{ cursor: "pointer", border: "0.5px solid " + (filtro === et ? F : B2), color: filtro === et ? F : T2, background: filtro === et ? "rgba(224,64,251,0.08)" : "transparent", padding: "6px 12px", whiteSpace: "nowrap" }}
                  onClick={() => setFiltro(et)}
                >
                  {et} ({et === "Todos" ? totalLeads : pipe.leads.filter((l) => l.etapa === et).length})
                </button>
              ))}
            </div>

            <div className="fx-card">
              <div className="fx-label" style={{ marginBottom: 6 }}>Pipeline activo ({filteredLeads.length})</div>
              {filteredLeads.length === 0 ? (
                <div className="fx-body" style={{ padding: "12px 0" }}>Aún no hay registros en esta vista. Agrega tu primer prospecto arriba y se guarda automático en este dispositivo.</div>
              ) : filteredLeads.map((l) => (
                <div key={l.id} className="fx-row">
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span className="fx-h2" style={{ fontSize: 15 }}>{l.tienda}</span>
                      <span className="fx-pill" style={{ color: ETAPA_COLOR[l.etapa] || T2, border: "0.5px solid " + (ETAPA_COLOR[l.etapa] || B2) }}>{l.etapa}</span>
                      <span className="fx-mono" style={{ fontSize: 10, color: T2 }}>{l.canal} · {l.fecha}</span>
                    </div>
                    <div className="fx-mono" style={{ fontSize: 11, color: T2, marginTop: 4 }}>
                      {l.contacto ? l.contacto + " · " : ""}{l.plan}{l.valor ? " (" + money(l.valor) + ")" : ""}
                    </div>
                    {l.nota ? <div className="fx-body" style={{ fontSize: 12, marginTop: 2 }}>{l.nota}</div> : null}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <select className="fx-in" style={{ width: 135, padding: "6px 8px" }} value={l.etapa} onChange={(e) => updateEtapa(l.id, e.target.value)}>
                      {ETAPAS.map((et) => <option key={et} value={et}>{et}</option>)}
                    </select>
                    <button type="button" className="fx-copybtn" onClick={() => removeLead(l.id)} title="Eliminar">✕</button>
                  </div>
                </div>
              ))}
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
