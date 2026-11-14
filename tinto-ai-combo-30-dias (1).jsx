import React, { useState, useEffect } from "react";
import {
  Instagram, Facebook, ArrowLeft, Check, Copy, Lightbulb, ChevronRight,
  CheckCircle2, Clock, MessageCircle, User, CalendarDays, Compass, Coffee,
  Megaphone, Video, Layers, FileText, Users, Flame, Target, ChevronDown,
} from "lucide-react";

/* ============================================================
   TINTO AI × RESTREPO.LAB — Centro de Ejecución · 30 días
   Combina: marca personal (@restrepo.lab, con cara) + agencia (@tinto.ai)
   Campaña Meta (IG + FB) · Objetivo: MENSAJES (WhatsApp) · CPL = reunión-tinto
   ============================================================ */

const C = {
  base:"#0A0A0C", surface:"#121214", raised:"#1A1A1E", border:"rgba(255,255,255,0.06)",
  borderA:"rgba(255,107,53,0.22)", bone:"#F2EFE9", muted:"#92908A", t3:"#56544F", text:"#C6C4BE",
  naranja:"#FF6B35", turquesa:"#4ECDC4", crema:"#F0E6D2", verde:"#7FD18C", rojo:"#EF4444",
};

const CUENTA = {
  "restrepo.lab":{ color:C.naranja, icon:User, desc:"Marca personal — la cara" },
  "tinto.ai":{ color:C.turquesa, icon:Coffee, desc:"La agencia — la vitrina" },
  "Colaboración":{ color:C.verde, icon:Users, desc:"Post colab: sale en AMBAS cuentas" },
};

const FMT = {
  "Reel":{ icon:Video, color:C.naranja },
  "Carrusel":{ icon:Layers, color:C.turquesa },
  "Post":{ icon:FileText, color:C.turquesa },
  "Stories":{ icon:Coffee, color:"#94A3B8" },
  "Tríada / prep":{ icon:MessageCircle, color:"#94A3B8" },
};

const SEM_T = { 1:"Lanzamiento de identidad", 2:"Educación local + creativos", 3:"El caso + campaña activa", 4:"Conversión", 5:"Cierre + mes 2" };

/* ============================================================
   LOS 30 DÍAS
   ============================================================ */
const DIAS = [
  /* ── SEMANA 1 · LANZAMIENTO ── */
  { dia:1, diaSemana:"Lunes", sem:1, cuenta:"Colaboración", formato:"Reel", anuncio:"A",
    titulo:"La IA que le contesta a tus clientes (demo)",
    captacion:"Alcance doble (colab sale en @restrepo.lab Y @tinto.ai) + primeros seguidores para la agencia. Este reel será el ANUNCIO A de la campaña.",
    tip:"En IG: publica desde @restrepo.lab e invita a @tinto.ai como colaborador (el post aparece en ambos perfiles con ambos nombres). En FB: publica en la página TINTO AI y Juan lo comparte a su perfil.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (20-30 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): plano del tinto + celular. Texto: 'Mientras te tomás un tinto, esto le responde a tus clientes.'"},
        {n:2,t:"(3-15 seg): pantalla — un cliente escribe a un negocio por WhatsApp; la IA responde al instante, agenda, confirma"},
        {n:3,t:"(15-22 seg): texto: 'Esto trabaja 24/7. Vos te tomás el café.'"},
        {n:4,t:"CIERRE (22-28 seg): logo TINTO AI + 'Digitalizá tu negocio. El tinto lo ponés vos.'"}]},
      { kind:"caption", titulo:"Caption", text:"Mientras te tomás un tinto, esto le responde a tus clientes ☕🤖\n\nUn bot con IA contesta WhatsApp al instante, agenda y confirma — 24/7.\n\nLas pymes no pierden clientes por mal producto. Los pierden por no contestar a tiempo.\n\n¿Tu negocio contesta a las 8 p.m.?\n\nEscribinos y lo hablamos con un tinto ☕\n📍 Medellín · @tinto.ai" }]},

  { dia:2, diaSemana:"Martes", sem:1, cuenta:"tinto.ai", formato:"Carrusel",
    titulo:"Qué es TINTO AI (la presentación de la agencia)",
    captacion:"El perfil de @tinto.ai deja de estar vacío: quien llegue por la colab de ayer encuentra la vitrina completa. Fijar este post.",
    tip:"Canva con la paleta: naranja #FF6B35, turquesa #4ECDC4, negro. Screenshots o mockups reales de los sistemas.",
    bloques:[
      { kind:"slides", titulo:"Carrusel (7 slides)", items:[
        {n:1,t:"TINTO AI\nInteligencia artificial servida con un tinto ☕"},
        {n:2,t:"¿QUÉ HACEMOS?\nDigitalizamos pymes de Medellín con IA:\nbots que atienden, sistemas que automatizan,\nwebs que venden solas."},
        {n:3,t:"BOT DE WHATSAPP CON IA\nResponde, agenda y confirma 24/7.\nCero clientes en visto."},
        {n:4,t:"AUTOMATIZACIÓN DE PROCESOS\nLo que hoy hacés a mano\n(pedidos, citas, planillas), mañana solo."},
        {n:5,t:"WEB + PEDIDOS/RESERVAS\nTu negocio cierra a las 6.\nTu web vende a las 2 a.m."},
        {n:6,t:"¿POR QUÉ EL TINTO?\nPorque la IA asusta y un café no.\nLa primera reunión siempre es un tinto — va por nosotros."},
        {n:7,t:"Escribinos 'TINTO' por DM\ny agendamos ☕\n📍 Medellín"}]},
      { kind:"caption", titulo:"Caption", text:"Somos TINTO AI: digitalizamos negocios de Medellín con inteligencia artificial.\n\nSin tecnicismos, sin humo. La primera reunión es un tinto y va por nosotros ☕\n\nEscribinos 'TINTO' por DM y agendamos.\n\n#Medellín #pymes #inteligenciaartificial #automatización" }]},

  { dia:3, diaSemana:"Miércoles", sem:1, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"Del café a la IA: la historia de Juan",
    captacion:"Conexión emocional con los 839 seguidores existentes: entienden el cambio de @juanrestrepocafe a @restrepo.lab. Humaniza antes de vender.",
    tip:"Juan a cámara, tono cercano. El café en el plano SIEMPRE — es la firma visual de la marca.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (35-45 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Pasé de servir café a digitalizar negocios. Te explico cómo.'"},
        {n:2,t:"(3-15 seg): tu mundo del café y la administración — dónde empezó todo"},
        {n:3,t:"(15-30 seg): el momento en que viste que los negocios necesitaban tecnología + cómo aprendiste IA"},
        {n:4,t:"(30-40 seg): 'Por eso el café sigue en cada reunión: la gente confía en personas, no en sistemas'"},
        {n:5,t:"CIERRE: 'Hoy ayudo a pymes con IA. Pero la conversación siempre empieza con un tinto.'"}]},
      { kind:"caption", titulo:"Caption", text:"De servir café a digitalizar negocios ☕→🤖\n\nNo llegué a la IA desde la ingeniería. Llegué desde el mostrador, viendo negocios perder tiempo en tareas que una máquina hace sola.\n\nEl café me enseñó lo que la tecnología no: la gente confía en personas.\n\nPor eso fundé @tinto.ai — tecnología poderosa, servida con la calidez de un tinto.\n\nEsta es mi historia. ¿Cuál es la de tu negocio?" }]},

  { dia:4, diaSemana:"Jueves", sem:1, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Día de stories: detrás de cámaras + encuesta",
    captacion:"Cercanía diaria + dato de mercado gratis (la encuesta te dice qué dolor priorizar en el contenido).",
    tip:"15 minutos. Crudo, sin edición. Las stories mantienen viva la cuenta entre reels.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story 1: detrás de cámaras — armando un flujo en n8n o probando un bot. Texto: 'construyendo para un negocio de Medellín 🛠️☕'"},
        {n:2,t:"Story 2: encuesta — '¿Qué te quita más tiempo en tu negocio: responder mensajes o agendar citas?'"},
        {n:3,t:"Story 3: repost del carrusel de @tinto.ai de ayer con 'ya está viva la página de la agencia 🚀'"},
        {n:4,t:"Responder TODOS los DMs y comentarios de los días 1-3"}]}]},

  { dia:5, diaSemana:"Viernes", sem:1, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"3 tareas que tu negocio hace a mano (y la IA hace en segundos)",
    captacion:"Compartidos entre dueños de negocio (es el reel más 'enviable'). Los comentarios con '¿y para mi negocio?' son leads tempranos.",
    tip:"Texto animado, no requiere cámara. Ejemplos hiper-locales: la peluquería del cuaderno, el restaurante que copia pedidos.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (25-35 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Tu negocio pierde horas en esto. La IA lo hace en segundos.'"},
        {n:2,t:"(3-10 seg): '1. Responder los mismos mensajes mil veces' + visual del bot"},
        {n:3,t:"(10-17 seg): '2. Agendar citas en un cuaderno' + visual del calendario automático"},
        {n:4,t:"(17-24 seg): '3. Pasar pedidos a mano a Excel' + visual de n8n"},
        {n:5,t:"CIERRE (24-30 seg): 'Cada una se automatiza. Te ayudo — hablemos con un tinto ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"3 tareas que se roban las horas de tu negocio:\n\n1. Responder mensajes repetidos\n2. Agendar citas a mano\n3. Pasar pedidos a Excel\n\nLas 3 se automatizan con IA. En días, no meses.\n\n¿Cuál te quita más tiempo? 👇\n\n☕ @tinto.ai · Medellín" }]},

  { dia:6, diaSemana:"Sábado", sem:1, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Liviano: proceso + responder",
    captacion:"Presencia de fin de semana sin quemarse. Los dueños de negocio SÍ miran redes el sábado.",
    tip:"10-15 minutos máximo.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story: el tinto del sábado + qué estás construyendo. Casual."},
        {n:2,t:"Responder comentarios y DMs pendientes de la semana"},
        {n:3,t:"Anotar: ¿qué reel tuvo más guardados y compartidos esta semana?"}]}]},

  { dia:7, diaSemana:"Domingo", sem:1, cuenta:"restrepo.lab", formato:"Tríada / prep",
    titulo:"Prep semana 2 + métricas",
    captacion:"La preparación del domingo hace que la semana sea copiar/pegar/grabar sin estrés.",
    tip:"30 min. Deja grabado o al menos guionado lo del lunes.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Métricas semana 1: alcance por reel, seguidores nuevos en ambas cuentas, DMs recibidos"},
        {n:2,t:"Preparar el carrusel del martes (día 9) en Canva"},
        {n:3,t:"Guionar/grabar el reel del lunes (día 8)"},
        {n:4,t:"Comentar en 5 cuentas de negocios locales de Medellín (visibilidad en el nicho)"}]}]},

  /* ── SEMANA 2 · EDUCACIÓN + CREATIVOS ── */
  { dia:8, diaSemana:"Lunes", sem:2, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"La IA no es solo para Google. También es para la tienda de la esquina.",
    captacion:"Desmitifica y baja la barrera. Comentarios de dueños escépticos = oportunidades de responder con casos.",
    tip:"Tono de amigo, no de técnico. El tinto en mano refuerza la cercanía.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (30-40 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'La IA no es solo para Google. También es para la tienda de la esquina.'"},
        {n:2,t:"(3-12 seg): MITO: 'eso es caro y complicado' — lo que cree el dueño de pyme"},
        {n:3,t:"(12-24 seg): REALIDAD: herramientas simples y económicas + 2 ejemplos de negocios pequeños de Medellín"},
        {n:4,t:"(24-32 seg): 'cómo empezar sin gastar una fortuna'"},
        {n:5,t:"CIERRE: 'Te lo explico con un tinto ☕ @tinto.ai'"}]},
      { kind:"caption", titulo:"Caption", text:"Mito: \"la IA es para empresas grandes\".\nRealidad: el restaurante, la barbería y la tienda de barrio son los que MÁS la necesitan.\n\nNo necesitás una fortuna. Necesitás empezar.\n\n¿Querés saber por dónde? Un tinto y lo hablamos ☕\n\n@tinto.ai · Medellín" }]},

  { dia:9, diaSemana:"Martes", sem:2, cuenta:"tinto.ai", formato:"Carrusel",
    titulo:"5 automatizaciones que tu pyme puede montar este mes",
    captacion:"Guardados (contenido de referencia). El que guarda hoy escribe 'TINTO' en dos semanas.",
    tip:"Preparado el domingo. Una automatización por slide con su impacto concreto.",
    bloques:[
      { kind:"slides", titulo:"Carrusel (7 slides)", items:[
        {n:1,t:"5 AUTOMATIZACIONES\nque tu pyme puede montar este mes\n(sin contratar a nadie)"},
        {n:2,t:"1 · WHATSAPP QUE SE RESPONDE SOLO\nBot con IA: responde, agenda, confirma.\nImpacto: cero clientes perdidos por demora."},
        {n:3,t:"2 · AGENDA SIN CUADERNO\nEl cliente elige hora, el sistema confirma y recuerda.\nImpacto: adiós a las citas olvidadas."},
        {n:4,t:"3 · PEDIDOS DIRECTO A TU SISTEMA\nLa IA lee el pedido del chat y lo registra.\nImpacto: 10-15 horas semanales recuperadas."},
        {n:5,t:"4 · RECORDATORIOS DE PAGO\nFactura vence → mensaje automático.\nImpacto: cobrar sin la pena de cobrar."},
        {n:6,t:"5 · RESUMEN DIARIO DEL NEGOCIO\nVentas y pendientes en un mensaje a las 8 PM.\nImpacto: decidir con números."},
        {n:7,t:"Empezá por la #1 (es la que sangra plata).\n\nEscribinos 'TINTO' por DM ☕"}]},
      { kind:"caption", titulo:"Caption", text:"5 automatizaciones, 5 impactos concretos.\n\nGuardá este post y empezá por la #1.\n\n¿Cuál necesita tu negocio primero? 👇\n\nEscribinos 'TINTO' por DM y lo montamos ☕\n#pymes #Medellín #automatización" }]},

  { dia:10, diaSemana:"Miércoles", sem:2, cuenta:"Colaboración", formato:"Reel",
    titulo:"Tu negocio cierra a las 6. Tu web vende a las 2 a.m.",
    captacion:"Segundo colab: sigue pasando alcance del personal a la agencia. Muestra el servicio de digitalización (no solo bots).",
    tip:"Screen recording de una web demo con pedidos/reservas de noche. El contraste local cerrado / web activa es el hook.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (25-35 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): local con letrero 'CERRADO' + reloj 2:00 a.m."},
        {n:2,t:"(3-15 seg): pantalla — alguien entra a la web del negocio, hace un pedido/reserva sin que nadie conteste"},
        {n:3,t:"(15-25 seg): notificación al dueño: 'nueva venta'. Texto: 'Mientras dormís, tu web trabaja.'"},
        {n:4,t:"CIERRE: 'Te armo una web que vende sola. Hablemos con un tinto ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Tu negocio cierra a las 6. Tu web debería vender a las 2 a.m. 🌙\n\nMuchos clientes te buscan fuera del horario. Si no tenés dónde recibirlos, los perdés.\n\nUna web con pedidos o reservas cambia eso.\n\n¿Tu negocio vende de noche? ☕ @tinto.ai" }]},

  { dia:11, diaSemana:"Jueves", sem:2, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Stories: mini-tutorial + caja de preguntas",
    captacion:"La caja de preguntas revela objeciones reales → material para los anuncios y el contenido del mes 2.",
    tip:"Las respuestas a la caja se responden en stories el mismo día (con cara, 30 seg cada una).",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story 1-2: mini-tutorial de 2 pantallas — 'así se ve un flujo de n8n que registra pedidos'"},
        {n:2,t:"Story 3: caja de preguntas — 'preguntame lo que sea sobre IA para tu negocio'"},
        {n:3,t:"Responder cada pregunta en story (las mejores se vuelven reels después)"},
        {n:4,t:"⚠️ TAREA CLAVE: grabar HOY o mañana el reel del CASO (día 15) — es el Anuncio B y debe estar listo el día 14"}]}]},

  { dia:12, diaSemana:"Viernes", sem:2, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"Este error en WhatsApp te está costando clientes todos los días",
    captacion:"El ángulo del DOLOR (visto = venta perdida). Alto compartido entre dueños. Material del ángulo B de anuncios.",
    tip:"Caso reconocible en los primeros 3 segundos (peluquería, restaurante, tienda). Que el dueño se vea reflejado.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (20-30 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Este error en WhatsApp te está costando clientes. Todos los días.'"},
        {n:2,t:"(3-12 seg): un cliente escribe a las 8 p.m. → respuesta al otro día → ya compró en otro lado"},
        {n:3,t:"(12-20 seg): 'La mayoría espera respuesta en menos de 1 hora. Solución: un bot que contesta al instante, 24/7'"},
        {n:4,t:"CIERRE: 'Eso instalo. Tomémonos un tinto y te muestro ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Contestar tarde = perder la venta.\n\nUn cliente escribe a las 8 p.m. Si respondés mañana, ya compró en otro lado.\n\nLa IA contesta en segundos, agenda y confirma — vos solo cerrás.\n\n¿Cuántos mensajes dejaste fríos esta semana? ☕ @tinto.ai" }]},

  { dia:13, diaSemana:"Sábado", sem:2, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Liviano + terminar los creativos de la campaña",
    captacion:"Los 3 creativos de la campaña (A, B, C) deben quedar listos HOY.",
    tip:"El anuncio A ya existe (reel día 1). B es el caso (grabado ayer/hoy). C es la invitación tinto (grabar hoy, se publica el día 26 pero el anuncio arranca el 15).",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story casual del sábado + responder pendientes"},
        {n:2,t:"✅ Confirmar creativo A: reel demo del día 1 (descargado en calidad original, sin marca de agua)"},
        {n:3,t:"✅ Terminar creativo B: reel del CASO (se publica orgánico el día 15 Y entra a la campaña)"},
        {n:4,t:"✅ Grabar creativo C: invitación 'escribime TINTO' (20-30 seg, a cámara, ver guion en el día 26)"}]}]},

  { dia:14, diaSemana:"Domingo", sem:2, cuenta:"restrepo.lab", formato:"Tríada / prep",
    titulo:"MONTAR LA CAMPAÑA (se activa mañana)",
    captacion:"Hoy se construye la campaña completa en Ads Manager. Ver pestaña Tráfico para el paso a paso y los 3 anuncios.",
    tip:"30-45 min. La campaña queda programada para iniciar el lunes 15 a las 6 a.m. Verificá que el WhatsApp Business de TINTO AI esté conectado a la página.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Ads Manager → nueva campaña → objetivo: MENSAJES (WhatsApp). NUNCA 'promocionar publicación'"},
        {n:2,t:"1 conjunto de anuncios: dueños de pyme, Medellín +25km, 25-50 años, intereses emprendimiento/WhatsApp Business/comercio local"},
        {n:3,t:"3 anuncios adentro: A (demo bot), B (caso), C (invitación tinto) — textos en la pestaña Tráfico"},
        {n:4,t:"Presupuesto: 10-15K COP/día en el conjunto. Inicio: lunes 6 a.m."},
        {n:5,t:"Mensaje de bienvenida de WhatsApp configurado: '¡Hola! ☕ Contame de tu negocio y agendamos tu tinto'"},
        {n:6,t:"Preparar el carrusel del martes (día 16)"}]}]},

  /* ── SEMANA 3 · CASO + CAMPAÑA ACTIVA ── */
  { dia:15, diaSemana:"Lunes", sem:3, cuenta:"Colaboración", formato:"Reel", anuncio:"B",
    titulo:"Le digitalicé el negocio a una pyme de Medellín. Mirá qué pasó.",
    captacion:"El CASO: la pieza que más convierte. Sale orgánico en ambas cuentas Y corre como Anuncio B desde hoy. Campaña ACTIVA — no tocarla 6 días.",
    tip:"Si aún no hay cliente real, caso demo honesto: 'así se ve digitalizar una tienda de barrio'. El formato vende igual.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (40-55 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Esta tienda perdía clientes por no contestar a tiempo. Mirá qué hicimos.'"},
        {n:2,t:"(3-15 seg): EL PROBLEMA — negocio saturado, mensajes en visto, ventas perdidas"},
        {n:3,t:"(15-30 seg): LA SOLUCIÓN — bot + sistema digital funcionando en pantalla"},
        {n:4,t:"(30-45 seg): EL RESULTADO — más ventas, menos trabajo manual (números si hay)"},
        {n:5,t:"CIERRE: 'Tu negocio puede funcionar así. Te invito un tinto y lo planeamos ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"El problema: saturado, perdiendo ventas por no contestar.\nLa solución: IA + un sistema digital simple.\nEl resultado: más ventas, menos trabajo manual.\n\nLo que hicimos acá, cualquier pyme de Medellín puede tenerlo.\n\n¿Tu negocio está en las mismas? Te invito un tinto ☕\n\nEscribinos 'TINTO' por DM · @tinto.ai" }]},

  { dia:16, diaSemana:"Martes", sem:3, cuenta:"tinto.ai", formato:"Carrusel",
    titulo:"El desglose del caso (números y proceso)",
    captacion:"Profundidad para el que llegó por el reel de ayer o por el anuncio. La agencia demuestra proceso, no promesas.",
    tip:"Responde TODOS los comentarios de los anuncios (cuentan para la entrega y calientan leads).",
    bloques:[
      { kind:"slides", titulo:"Carrusel (6 slides)", items:[
        {n:1,t:"CASO: DIGITALIZACIÓN COMPLETA\nEl paso a paso (sin humo)"},
        {n:2,t:"SEMANA 1 · DIAGNÓSTICO\nUn tinto + mapa de las tareas que más tiempo roban.\nSin costo, sin compromiso."},
        {n:3,t:"SEMANA 2 · EL BOT\nWhatsApp con IA: responde, agenda, confirma.\nEl dueño aprueba cada respuesta tipo antes de salir."},
        {n:4,t:"SEMANA 3 · EL SISTEMA\nPedidos y citas directo a su base de datos.\nAdiós al cuaderno (con transición suave)."},
        {n:5,t:"RESULTADO\n→ Respuesta en segundos, 24/7\n→ 10-15 horas semanales recuperadas\n→ El dueño decide en vez de digitar"},
        {n:6,t:"¿Tu negocio necesita esto?\nEscribinos 'TINTO' ☕\nLa primera reunión va por nosotros."}]},
      { kind:"caption", titulo:"Caption", text:"Así se ve una digitalización por dentro: diagnóstico → bot → sistema → resultado.\n\nEn semanas, no en meses. Y siempre empezando con un tinto ☕\n\nEscribinos 'TINTO' por DM y agendamos.\n#Medellín #pymes" }]},

  { dia:17, diaSemana:"Miércoles", sem:3, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"Por qué toda reunión de TINTO AI empieza con un tinto",
    captacion:"La filosofía de marca. El que vio los anuncios y duda, acá conecta con la persona detrás.",
    tip:"A cámara, en un lugar real de Medellín, tinto de verdad. La autenticidad ES el mensaje.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (25-35 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Vendo IA. Pero la primera reunión siempre es con un tinto. Te explico por qué.'"},
        {n:2,t:"(3-14 seg): 'La IA asusta: la ven fría, cara, lejana. Un tinto rompe eso — es cercano, es nuestro.'"},
        {n:3,t:"(14-25 seg): 'Primero confían en mí. Después en la tecnología. Por eso no empiezo con cotización, empiezo con café.'"},
        {n:4,t:"CIERRE: '¿Tomamos un tinto y miramos tu negocio? Sin compromiso ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"No es marketing. Es cómo trabajo.\n\nLa IA se vende con confianza, y la confianza se construye con un tinto de por medio ☕\n\nSi tenés un negocio en Medellín, la invitación está abierta.\n\n@tinto.ai" }]},

  { dia:18, diaSemana:"Jueves", sem:3, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Stories: responder las preguntas que llegan de los anuncios",
    captacion:"Los anuncios ya generan DMs y comentarios: las dudas repetidas se responden en stories (escala tu tiempo).",
    tip:"NO toques la campaña (día 4 de aprendizaje). Solo anota en una hoja: leads que escribieron, con nombre y negocio.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story: 'me están llegando estas 3 preguntas — las respondo' (una story por pregunta, a cámara)"},
        {n:2,t:"Registrar cada lead de WhatsApp en una hoja: nombre, negocio, qué pidió, estado"},
        {n:3,t:"Responder WhatsApp en menos de 1 hora (la velocidad de respuesta ES el producto que vendés)"}]}]},

  { dia:19, diaSemana:"Viernes", sem:3, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"Una automatización que devolvió 10 horas a la semana",
    captacion:"Cuantifica el valor (número concreto). Refuerza a los leads tibios de la campaña.",
    tip:"Screen recording del flujo n8n. El número (10 horas) es el gancho — siempre cuantificar.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (30-40 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Esto le ahorró 10 horas a la semana a un negocio. Mirá.'"},
        {n:2,t:"(3-14 seg): EL PROBLEMA — copiar pedidos de WhatsApp a Excel, a mano, todos los días"},
        {n:3,t:"(14-28 seg): pantalla — la automatización toma el pedido y lo registra sola"},
        {n:4,t:"(28-35 seg): '10 horas a la semana = más de un día de trabajo. Recuperado.'"},
        {n:5,t:"CIERRE: 'Tu negocio seguro tiene una tarea así. Te ayudo ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Antes: copiar cada pedido a mano.\nAhora: la IA lo registra sola, al instante.\n\n10 horas semanales = más de un día completo. Recuperado.\n\n¿Qué tarea repetís todos los días sin pensar? Esa se automatiza ☕\n\n@tinto.ai · Medellín" }]},

  { dia:20, diaSemana:"Sábado", sem:3, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Liviano + seguimiento de leads",
    captacion:"El fin de semana es cuando el dueño de pyme tiene cabeza para pensar en su negocio: los leads del viernes se calientan hoy.",
    tip:"Seguimiento suave a los leads que no agendaron: 'quedamos pendientes del tinto ☕ ¿te sirve esta semana?'",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story del sábado (casual, con tinto)"},
        {n:2,t:"Seguimiento por WhatsApp a leads sin agendar (mensaje suave, sin presión)"},
        {n:3,t:"Actualizar la hoja de leads"}]}]},

  { dia:21, diaSemana:"Domingo", sem:3, cuenta:"restrepo.lab", formato:"Tríada / prep",
    titulo:"OPTIMIZAR LA CAMPAÑA (día 7) + prep semana 4",
    captacion:"Decisión con datos: el anuncio con mejor costo por conversación iniciada se queda con todo el presupuesto.",
    tip:"Métrica: 'costo por conversación de mensajería iniciada'. Y la real: ¿cuántos tintos agendados salieron de esos chats?",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Ads Manager: comparar costo por conversación de A vs B vs C"},
        {n:2,t:"Apagar los 2 perdedores. Todo el presupuesto al ganador"},
        {n:3,t:"Si el ganador es rentable (tintos agendados > costo): subir presupuesto 20-30%"},
        {n:4,t:"Contar: leads totales → tintos agendados → propuestas. Ese es el embudo real"},
        {n:5,t:"Preparar carrusel del martes (día 23)"}]}]},

  /* ── SEMANA 4 · CONVERSIÓN ── */
  { dia:22, diaSemana:"Lunes", sem:4, cuenta:"Colaboración", formato:"Reel",
    titulo:"Las 4 cosas que TINTO AI hace por tu negocio",
    captacion:"Colab de servicios: recap claro de la oferta para la audiencia ya calentada por 3 semanas + anuncios.",
    tip:"Directo y rápido: un servicio cada 5 segundos, con visual de cada uno.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (25-35 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Las 4 cosas que hacemos por tu negocio (en 30 segundos):'"},
        {n:2,t:"(3-9 seg): '1. Bot de WhatsApp con IA — responde 24/7' + visual"},
        {n:3,t:"(9-15 seg): '2. Automatización — lo manual, solo' + visual n8n"},
        {n:4,t:"(15-21 seg): '3. Web con pedidos — vende de noche' + visual"},
        {n:5,t:"(21-27 seg): '4. Digitalización integral — todo junto' + visual"},
        {n:6,t:"CIERRE: 'La primera reunión es un tinto y va por nosotros ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Bot de WhatsApp · Automatización · Web que vende · Digitalización completa.\n\nEso hacemos. Y siempre empezamos igual: un tinto, tu negocio sobre la mesa, y un plan claro ☕\n\nEscribinos 'TINTO' por DM.\n@tinto.ai × @restrepo.lab · Medellín" }]},

  { dia:23, diaSemana:"Martes", sem:4, cuenta:"tinto.ai", formato:"Carrusel",
    titulo:"Cómo es trabajar con TINTO AI (proceso + desde cuánto)",
    captacion:"Transparencia de proceso y rangos de inversión = filtra curiosos y acelera a los serios.",
    tip:"Mostrar rangos ('desde $800K') baja la fricción del '¿cuánto vale?' sin encasillarte.",
    bloques:[
      { kind:"slides", titulo:"Carrusel (6 slides)", items:[
        {n:1,t:"¿CÓMO ES TRABAJAR CON TINTO AI?\nProceso claro, sin sorpresas"},
        {n:2,t:"PASO 1 · EL TINTO ☕\nNos sentamos, miramos tu negocio,\nmapeamos qué te roba tiempo.\nGratis, sin compromiso."},
        {n:3,t:"PASO 2 · LA PROPUESTA\nQué montamos, en cuánto tiempo\ny cuánto cuesta. Por escrito."},
        {n:4,t:"PASO 3 · LA IMPLEMENTACIÓN\n1 a 4 semanas según el sistema.\nVos aprobás todo antes de que salga."},
        {n:5,t:"¿DESDE CUÁNTO?\nBot de WhatsApp: desde $800 mil\nAutomatizaciones: desde $1M\nWeb + pedidos: desde $1.2M\nMantenimiento mensual: desde $400 mil"},
        {n:6,t:"El primer paso no cuesta nada.\nEscribinos 'TINTO' ☕"}]},
      { kind:"caption", titulo:"Caption", text:"Proceso en 3 pasos: tinto → propuesta → implementación.\n\nSin letra chiquita, sin humo. Y el primer paso va por nosotros ☕\n\nEscribinos 'TINTO' por DM.\n#Medellín #pymes" }]},

  { dia:24, diaSemana:"Miércoles", sem:4, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"Demo en vivo: le pregunto al bot como si fuera un cliente",
    captacion:"La prueba definitiva: el bot funcionando en tiempo real, sin cortes. Mata la objeción 'seguro es un video editado'.",
    tip:"Una toma, pantalla real, sin cortes visibles. Si el bot se demora 2 segundos, mejor: es real.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (30-45 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Le voy a escribir al bot como si fuera un cliente difícil. En vivo.'"},
        {n:2,t:"(3-30 seg): pantalla real — preguntas de cliente: precio, horario, '¿tienen domicilio?', agendar. El bot responde todo"},
        {n:3,t:"(30-40 seg): 'Eso que viste toma una semana de montar. Y atiende así para siempre.'"},
        {n:4,t:"CIERRE: '¿Lo querés en tu negocio? Un tinto y lo planeamos ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Sin edición, sin guion: le escribí al bot como cliente difícil y respondió todo.\n\nEso atiende tu negocio 24/7 después de una semana de montaje.\n\n¿Lo probamos con tu caso? ☕ 'TINTO' por DM · @tinto.ai" }]},

  { dia:25, diaSemana:"Jueves", sem:4, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Stories: prueba social + countdown",
    captacion:"El testimonio (aunque sea del primer cliente/tinto) empuja a los indecisos de la campaña.",
    tip:"Si hay audio o chat de un cliente contento, ese es el contenido (con permiso). Si no, contar cómo va el mes en números.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Story: testimonio o resultado real ('esta semana montamos X para un negocio de Y')"},
        {n:2,t:"Story: '¿cuántos tintos llevamos este mes? [número] ☕' — prueba social de demanda"},
        {n:3,t:"Seguimiento a leads pendientes en la hoja"}]}]},

  { dia:26, diaSemana:"Viernes", sem:4, cuenta:"Colaboración", formato:"Reel", anuncio:"C",
    titulo:"¿Tenés un negocio en Medellín? Te invito un tinto.",
    captacion:"La invitación directa (creativo C de la campaña, ahora también orgánico). Una sola palabra — 'TINTO' — mide los leads.",
    tip:"Este es el creativo que grabaste el día 13. A cámara, directo, cálido. Cero presión.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (20-30 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): '¿Tenés un negocio en Medellín y sentís que la tecnología se te escapa? Te invito un tinto.'"},
        {n:2,t:"(3-14 seg): 'Un mes mostrándote cómo la IA ayuda a negocios como el tuyo. Ahora te toca a vos.'"},
        {n:3,t:"(14-22 seg): 'Sin cotizaciones, sin presión. Un café y una mirada honesta a tu negocio.'"},
        {n:4,t:"CIERRE: 'Escribime TINTO por DM y agendamos ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Cerramos el mes con una invitación real ☕\n\nSi querés digitalizar tu negocio con IA, la primera reunión es un tinto — y va por mi cuenta.\n\nSin presión. Solo un café y una mirada honesta.\n\nEscribime \"TINTO\" por DM.\n📍 Medellín · @tinto.ai × @restrepo.lab" }]},

  { dia:27, diaSemana:"Sábado", sem:4, cuenta:"restrepo.lab", formato:"Stories",
    titulo:"Liviano + cierre de leads de la semana",
    captacion:"El reel de ayer + el anuncio ganador trabajando juntos: hoy se agendan los tintos de la semana entrante.",
    tip:"Responder rápido lo del viernes. Cada 'TINTO' recibido = respuesta en menos de 1 hora.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Responder todos los 'TINTO' pendientes y proponer 2 horarios concretos"},
        {n:2,t:"Story: repost del reel de ayer + 'las agendas del tinto se están llenando ☕'"},
        {n:3,t:"Actualizar hoja de leads"}]}]},

  { dia:28, diaSemana:"Domingo", sem:4, cuenta:"restrepo.lab", formato:"Tríada / prep",
    titulo:"Recopilar los números del mes",
    captacion:"El recuento del día 29 necesita datos reales: alcance, seguidores, leads, tintos, propuestas, ¿primer cliente?",
    tip:"30 min. El embudo completo: inversión → conversaciones → tintos → propuestas → cierres.",
    bloques:[
      { kind:"acciones", titulo:"Checklist del día", items:[
        {n:1,t:"Números orgánicos: alcance total, seguidores ganados en ambas cuentas, reel más visto"},
        {n:2,t:"Números de campaña: inversión total, conversaciones iniciadas, costo por conversación del ganador"},
        {n:3,t:"Embudo comercial: leads → tintos agendados → propuestas → cierres"},
        {n:4,t:"Preparar el reel del recuento (día 29) con esos números"}]}]},

  /* ── DÍAS 29-30 · CIERRE ── */
  { dia:29, diaSemana:"Lunes", sem:5, cuenta:"restrepo.lab", formato:"Reel",
    titulo:"Un mes de TINTO AI: los números reales",
    captacion:"Transparencia = confianza. El recuento honesto convierte seguidores tibios y posiciona a Juan como alguien que mide (coherente con lo que vende).",
    tip:"Números REALES aunque sean pequeños. 'De 0 a X' es una historia; inflar números es humo.",
    bloques:[
      { kind:"guion", titulo:"Guion del reel (35-45 seg)", items:[
        {n:1,t:"HOOK (0-3 seg): 'Hace un mes lancé TINTO AI. Estos son los números reales.'"},
        {n:2,t:"(3-20 seg): [completar]: X reels publicados, X seguidores nuevos, X conversaciones, X tintos tomados, [¿primer cliente?]"},
        {n:3,t:"(20-35 seg): 'Lo que aprendí: [el reel que más funcionó] y [lo que cambio el mes 2]'"},
        {n:4,t:"CIERRE: 'Mes 2 arranca mañana. Y el tinto sigue en pie ☕'"}]},
      { kind:"caption", titulo:"Caption", text:"Un mes construyendo en público. Números reales, sin inflar:\n\n[Completar con datos del día 28]\n\nGracias a los que se tomaron un tinto con nosotros ☕\n\nMes 2: más casos, más demos, más café.\n\n@tinto.ai · Medellín" }]},

  { dia:30, diaSemana:"Martes", sem:5, cuenta:"tinto.ai", formato:"Post",
    titulo:"Cierre del mes + agenda de tintos del mes 2",
    captacion:"La agencia cierra el ciclo y abre el siguiente. Con los datos del mes armamos el calendario 2 sobre lo validado.",
    tip:"Trae los números al chat y diseñamos el mes 2: qué ángulo de anuncio ganó, qué formato repetimos, qué se corta.",
    bloques:[
      { kind:"caption", titulo:"Post de cierre (imagen: tinto + laptop)", text:"Mes 1: cerrado. ☕\n\n[X] negocios conocimos, [X] tintos compartimos, [X] sistemas en marcha.\n\nMes 2 viene con más casos reales y más demos en vivo.\n\nSi tu negocio quedó en la lista de 'algún día'... el tinto sigue siendo gratis.\n\nEscribinos 'TINTO' 📍 Medellín" },
      { kind:"acciones", titulo:"Cierre operativo", items:[
        {n:1,t:"Decidir con datos: ¿qué anuncio ganó (A/B/C)? Ese ángulo lidera el mes 2"},
        {n:2,t:"¿Pausar o continuar la campaña? Si el costo por tinto es rentable: continúa sin pausa"},
        {n:3,t:"Llevar los números al chat → armamos el calendario del mes 2 sobre lo validado"}]}]},
];

/* ============================================================
   TRÁFICO — Campaña Meta (IG + FB)
   ============================================================ */
const FASES = [
  { f:"Días 1–13", t:"Orgánico + grabar creativos", d:"Se construyen los perfiles (colabs pasan alcance del personal a la agencia) y se graban los 3 creativos: A (día 1), B (caso, día 11-13), C (invitación, día 13)." },
  { f:"Día 14", t:"Montar la campaña", d:"Ads Manager → objetivo MENSAJES (WhatsApp) → 1 conjunto → 3 anuncios (A/B/C). Programada para el lunes 15, 6 a.m. NUNCA 'promocionar publicación'." },
  { f:"Días 15–20", t:"Aprendizaje", d:"10–15K COP/día. NO se toca por 6 días. Solo responder comentarios de anuncios y WhatsApp en <1 hora (la velocidad ES el producto)." },
  { f:"Día 21", t:"Optimización", d:"Comparar costo por conversación iniciada de A vs B vs C. Apagar los 2 perdedores. Si el ganador es rentable (tintos agendados > costo): +20-30% presupuesto." },
  { f:"Días 22–30", t:"Refuerzo + cierre", d:"El ganador corre mientras el orgánico de conversión (días 22-26) empuja. Día 30: decidir con datos si la campaña continúa al mes 2." },
];

const ANUNCIOS = [
  { n:"A", angulo:"El resultado (demo del bot)", visual:"Reel del Día 1 — el bot respondiendo mientras el tinto humea",
    texto:"Mientras te tomás un tinto, esto le responde a tus clientes ☕\n\nUn bot con IA contesta WhatsApp al instante, agenda y confirma — 24/7, sin que toques nada.\n\nLas pymes no pierden clientes por mal producto. Los pierden por no contestar a tiempo.\n\nLa primera reunión es un tinto y va por nosotros.",
    titular:"Tu WhatsApp se responde solo", desc:"Digitalizamos pymes en Medellín", boton:"Enviar mensaje (WhatsApp)" },
  { n:"B", angulo:"La prueba (el caso)", visual:"Reel del Día 15 — problema → solución → resultado",
    texto:"Esta pyme de Medellín perdía clientes por no contestar a tiempo.\n\nLe montamos un bot con IA + un sistema digital simple.\n\nResultado: respuesta en segundos, 10-15 horas semanales recuperadas, y el dueño decidiendo en vez de digitando.\n\nTu negocio puede funcionar así. El primer tinto va por nosotros ☕",
    titular:"Así se digitaliza un negocio local", desc:"Caso real · Medellín", boton:"Enviar mensaje (WhatsApp)" },
  { n:"C", angulo:"La invitación (el tinto)", visual:"Reel del Día 26 — Juan a cámara, directo y cálido",
    texto:"¿Tenés un negocio en Medellín y sentís que la tecnología se te escapa?\n\nTe invito un tinto ☕\n\nSin cotizaciones, sin presión: un café y una mirada honesta a tu negocio, para ver qué se puede automatizar y qué no vale la pena.\n\nEscribinos y agendamos.",
    titular:"El primer tinto va por nosotros", desc:"Diagnóstico gratis · Medellín", boton:"Enviar mensaje (WhatsApp)" },
];

const SEGMENTACION = [
  "Dueños de pyme / administradores — 25 a 50 años",
  "Medellín + área metropolitana (radio 25 km)",
  "Intereses: emprendimiento, WhatsApp Business, comercio local, marketing digital",
  "Comportamiento: administradores de página de empresa en Facebook",
  "Ubicaciones: feed + reels de IG y FB (dejar Advantage+ activado al inicio)",
];

const EMBUDO = [
  { p:"Anuncio (reel)", m:"CPM · alcance", d:"El creativo con la cara de Juan y el tinto. CTA a WhatsApp." },
  { p:"Conversación iniciada", m:"Costo por conversación", d:"El lead escribe. Respuesta en <1 hora, humana y cálida." },
  { p:"Tinto agendado", m:"CPL real", d:"La conversión que importa: fecha y hora del café." },
  { p:"Propuesta", m:"% tinto → propuesta", d:"Por escrito, después del diagnóstico." },
  { p:"Cierre", m:"Costo por cliente · ROAS", d:"Desde $800K (bot) hasta $5M (integral) + mensualidad." },
];

const REGLAS_COMBO = [
  { q:"@restrepo.lab = el motor", r:"La cara, la historia, la confianza. Publica la mayoría del contenido. Las marcas personales crecen más rápido que las de empresa — se aprovecha." },
  { q:"@tinto.ai = la vitrina", r:"Servicios, casos, proceso, precios. El que llega del anuncio o del colab encuentra acá la agencia seria. Martes es su día fijo." },
  { q:"Colaboración de IG = el puente", r:"Los posts clave (días 1, 10, 15, 22, 26) se publican como COLAB: aparecen en ambas cuentas con ambos nombres. Así la agencia crece con el alcance del personal sin duplicar trabajo." },
  { q:"En Facebook", r:"La página TINTO AI publica; Juan comparte a su perfil personal. Los anuncios salen SIEMPRE desde la página TINTO AI (con la cara de Juan en el creativo: identidad de empresa + confianza de persona)." },
  { q:"El WhatsApp es uno solo", r:"Todos los caminos (anuncios, DMs, 'TINTO') llegan al WhatsApp Business de TINTO AI. Una sola hoja de leads, un solo embudo." },
];

/* ============================================================ */
function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(()=>setDone(false),1500); } catch(e){}
  };
  return (
    <button onClick={copy} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all"
      style={{ backgroundColor: done?"rgba(127,209,140,0.12)":C.raised, border:`0.5px solid ${done?C.verde:C.border}`, color: done?C.verde:C.muted, cursor:"pointer" }}>
      {done ? <Check size={12}/> : <Copy size={12}/>}{done?"copiado":"copiar"}
    </button>
  );
}

export default function TintoCombo30() {
  const [tab, setTab] = useState("calendario");
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState({});

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap');
      .mono{font-family:'JetBrains Mono',monospace}
      *{-webkit-tap-highlight-color:transparent}
      .wsp{white-space:pre-wrap}`;
    document.head.appendChild(el);
    return () => { try{document.head.removeChild(el)}catch(e){} };
  }, []);

  useEffect(() => {
    (async () => { try { const r = await window.storage.get("tinto-30"); if(r&&r.value) setDone(JSON.parse(r.value)); } catch(e){} })();
  }, []);

  const toggle = async (n, e) => {
    e && e.stopPropagation();
    const next = { ...done, [n]: !done[n] };
    setDone(next);
    try { await window.storage.set("tinto-30", JSON.stringify(next)); } catch(e){}
  };

  const completed = Object.values(done).filter(Boolean).length;
  const d = selected ? DIAS.find(x=>x.dia===selected) : null;
  const grouped = {}; DIAS.forEach(x=>{ (grouped[x.sem]=grouped[x.sem]||[]).push(x); });

  const TABS = [
    { id:"calendario", label:"Calendario", icon:CalendarDays },
    { id:"trafico", label:"Tráfico", icon:Megaphone },
    { id:"combo", label:"Las 2 marcas", icon:Users },
  ];

  const label = (txt, color) => (
    <div className="mono text-[10px] uppercase tracking-wider mb-2" style={{ color:color||C.t3, letterSpacing:"0.16em" }}>{txt}</div>
  );

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor:C.base, fontFamily:"'Space Grotesk',system-ui,sans-serif", color:C.bone }}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* HEADER */}
        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
          <span className="text-2xl font-bold" style={{ color:C.naranja }}>TINTO<span style={{ color:C.turquesa }}> AI</span></span>
          <span style={{ color:C.t3, fontSize:11 }}>×</span>
          <span className="mono text-[12px]" style={{ color:C.text }}>restrepo.lab</span>
        </div>
        <p className="text-[12px] mb-4" style={{ color:C.muted }}>30 días · 2 marcas, 1 sistema · Campaña Meta (IG+FB) → tintos agendados</p>

        {/* TABS */}
        <div className="flex gap-1.5 mb-6">
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id); setSelected(null);}}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[12px] font-semibold transition-all"
              style={{ backgroundColor: tab===t.id?C.raised:"transparent",
                border:`0.5px solid ${tab===t.id?C.naranja:C.border}`,
                color: tab===t.id?C.bone:C.muted, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif" }}>
              <t.icon size={14} style={{ color: tab===t.id?C.naranja:C.muted }}/>{t.label}
            </button>
          ))}
        </div>

        {/* ============ CALENDARIO ============ */}
        {tab==="calendario" && !d && (
          <>
            <div className="rounded-xl p-4 mb-4" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="mono text-[11px] uppercase tracking-wider" style={{ color:C.t3 }}>Completados</span>
                <span className="text-sm font-bold">{completed}/30</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor:C.raised }}>
                <div className="h-full rounded-full transition-all" style={{ width:`${(completed/30)*100}%`, background:`linear-gradient(90deg,${C.naranja},${C.turquesa})` }}/>
              </div>
              <div className="flex gap-3 mt-3 flex-wrap">
                {Object.entries(CUENTA).map(([k,v])=>(
                  <span key={k} className="flex items-center gap-1.5 text-[11px]" style={{ color:C.muted }}>
                    <v.icon size={12} style={{ color:v.color }}/>{k}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-3.5 mb-5 flex gap-3 items-start" style={{ backgroundColor:"#140C08", border:`0.5px solid ${C.naranja}` }}>
              <Flame size={16} style={{ color:C.naranja, flexShrink:0, marginTop:2 }}/>
              <p className="text-[12px] leading-relaxed" style={{ color:C.text }}>
                Los días marcados <strong style={{ color:C.naranja }}>A · B · C</strong> son los 3 creativos de la campaña. La campaña se monta el <strong style={{ color:C.bone }}>día 14</strong> y corre del 15 al 30 con objetivo <strong style={{ color:C.turquesa }}>Mensajes (WhatsApp)</strong>.
              </p>
            </div>

            {Object.keys(grouped).map(w=>(
              <section key={w} className="mb-6">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="mono text-[11px] font-medium uppercase tracking-wider px-2 py-1 rounded"
                    style={{ backgroundColor:C.raised, color:C.naranja, border:`0.5px solid ${C.borderA}` }}>S{w}</span>
                  <span className="text-[12px]" style={{ color:C.muted }}>{SEM_T[w]}</span>
                  <div className="flex-1 h-px" style={{ backgroundColor:C.border }}/>
                </div>
                <div className="space-y-2">
                  {grouped[w].map(x=>{
                    const A = CUENTA[x.cuenta]; const F = FMT[x.formato]; const isDone = !!done[x.dia];
                    return (
                      <div key={x.dia} onClick={()=>setSelected(x.dia)}
                        className="rounded-xl p-3 flex items-center gap-3 cursor-pointer"
                        style={{ backgroundColor:C.surface, border:`0.5px solid ${x.anuncio?C.naranja+"60":C.border}`, opacity:isDone?0.55:1 }}>
                        <button onClick={(e)=>toggle(x.dia,e)} className="flex-shrink-0" style={{ color:isDone?C.naranja:C.muted, background:"none", border:"none", cursor:"pointer", padding:0 }}>
                          {isDone ? <CheckCircle2 size={23}/> : <div className="w-[21px] h-[21px] rounded-full" style={{ border:`2px solid ${C.t3}` }}/>}
                        </button>
                        <div className="flex-shrink-0 w-9 text-center">
                          <div className="mono text-[9px] uppercase" style={{ color:C.t3 }}>Día</div>
                          <div className="text-lg font-bold leading-none" style={{ textDecoration:isDone?"line-through":"none" }}>{String(x.dia).padStart(2,"0")}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className="mono text-[10px]" style={{ color:C.muted }}>{x.diaSemana}</span>
                            <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                              style={{ backgroundColor:`${A.color}1A`, color:A.color, border:`0.5px solid ${A.color}40` }}>
                              <A.icon size={8}/>{x.cuenta}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                              style={{ backgroundColor:`${F.color}12`, color:F.color, border:`0.5px solid ${F.color}30` }}>
                              <F.icon size={8}/>{x.formato}
                            </span>
                            {x.anuncio && (
                              <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase"
                                style={{ backgroundColor:`${C.naranja}1A`, color:C.naranja, border:`0.5px solid ${C.naranja}50` }}>
                                <Flame size={8}/>Anuncio {x.anuncio}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] leading-snug truncate" style={{ color:C.bone }}>{x.titulo}</p>
                        </div>
                        <ChevronRight size={17} style={{ color:C.t3, flexShrink:0 }}/>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        )}

        {/* ============ DETALLE DÍA ============ */}
        {tab==="calendario" && d && (()=>{
          const A = CUENTA[d.cuenta]; const F = FMT[d.formato]; const isDone = !!done[d.dia];
          return (
            <>
              <button onClick={()=>setSelected(null)} className="inline-flex items-center gap-1.5 mb-4 text-[13px] font-medium"
                style={{ color:C.muted, background:"none", border:"none", cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif" }}>
                <ArrowLeft size={16}/> Volver
              </button>

              <div className="flex items-start gap-3 mb-4">
                <button onClick={(e)=>toggle(d.dia,e)} className="flex-shrink-0 mt-1" style={{ color:isDone?C.naranja:C.muted, background:"none", border:"none", cursor:"pointer", padding:0 }}>
                  {isDone ? <CheckCircle2 size={27}/> : <div className="w-[25px] h-[25px] rounded-full" style={{ border:`2px solid ${C.t3}` }}/>}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="mono text-[12px]" style={{ color:C.muted }}>Día {String(d.dia).padStart(2,"0")} · {d.diaSemana} · S{d.sem}</span>
                    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                      style={{ backgroundColor:`${A.color}1A`, color:A.color, border:`0.5px solid ${A.color}40` }}><A.icon size={8}/>{d.cuenta}</span>
                    <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                      style={{ backgroundColor:`${F.color}12`, color:F.color, border:`0.5px solid ${F.color}30` }}><F.icon size={8}/>{d.formato}</span>
                    {d.anuncio && <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase"
                      style={{ backgroundColor:`${C.naranja}1A`, color:C.naranja, border:`0.5px solid ${C.naranja}50` }}><Flame size={8}/>Anuncio {d.anuncio}</span>}
                  </div>
                  <h1 className="text-[17px] font-bold leading-tight mb-1">{d.titulo}</h1>
                  <p className="text-[11px]" style={{ color:C.t3 }}>{A.desc}</p>
                </div>
              </div>

              <div className="rounded-lg p-3 mb-4" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.turquesa}40` }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Target size={13} style={{ color:C.turquesa }}/>
                  <span className="mono text-[10px] uppercase tracking-wider" style={{ color:C.turquesa }}>Captación — qué logra este día</span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color:C.text }}>{d.captacion}</p>
              </div>

              {d.bloques.map((b,bi)=>(
                <div key={bi} className="mb-4">
                  {b.kind==="guion" && (<>
                    {label(b.titulo, C.naranja)}
                    <div className="space-y-2">
                      {b.items.map(it=>(
                        <div key={it.n} className="rounded-lg p-3 flex gap-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
                          <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center mono text-[12px] font-bold"
                            style={{ backgroundColor:`${C.naranja}15`, color:C.naranja, border:`0.5px solid ${C.naranja}30` }}>{it.n}</div>
                          <p className="wsp text-[13px] leading-relaxed flex-1" style={{ color:C.text }}>{it.t}</p>
                        </div>
                      ))}
                    </div>
                  </>)}
                  {b.kind==="slides" && (<>
                    {label(b.titulo, C.turquesa)}
                    <div className="space-y-2">
                      {b.items.map(it=>(
                        <div key={it.n} className="rounded-lg p-3 flex gap-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
                          <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center mono text-[12px] font-bold"
                            style={{ backgroundColor:C.raised, border:`0.5px solid ${C.border}` }}>{it.n}</div>
                          <div className="flex-1 min-w-0">
                            <p className="wsp text-[13px] leading-relaxed" style={{ color:C.text }}>{it.t}</p>
                            <div className="mt-2"><CopyBtn text={it.t}/></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>)}
                  {b.kind==="caption" && (
                    <div className="rounded-lg p-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
                      <div className="flex items-center justify-between mb-2">
                        {label(b.titulo)}
                        <CopyBtn text={b.text}/>
                      </div>
                      <p className="wsp text-[13px] leading-relaxed" style={{ color:C.text }}>{b.text}</p>
                    </div>
                  )}
                  {b.kind==="acciones" && (<>
                    {label(b.titulo, "#94A3B8")}
                    <div className="space-y-2">
                      {b.items.map(it=>(
                        <div key={it.n} className="rounded-lg p-3 flex gap-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
                          <Check size={14} style={{ color:C.verde, flexShrink:0, marginTop:2 }}/>
                          <p className="wsp text-[13px] leading-relaxed flex-1" style={{ color:C.text }}>{it.t}</p>
                        </div>
                      ))}
                    </div>
                  </>)}
                </div>
              ))}

              <div className="rounded-lg p-3 mb-6" style={{ backgroundColor:"#140C08", border:`0.5px solid ${C.borderA}` }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Lightbulb size={13} style={{ color:C.naranja }}/>
                  <span className="mono text-[10px] uppercase tracking-wider" style={{ color:C.naranja }}>Tip</span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color:C.text }}>{d.tip}</p>
              </div>

              <button onClick={(e)=>toggle(d.dia,e)}
                className="w-full rounded-xl py-3.5 flex items-center justify-center gap-2 text-[14px] font-semibold mb-4"
                style={{ backgroundColor:isDone?C.raised:C.naranja, color:isDone?C.muted:C.base, border:`0.5px solid ${isDone?C.border:C.naranja}`, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif" }}>
                {isDone ? <><Check size={16}/> Completado</> : "Marcar como completado"}
              </button>
            </>
          );
        })()}

        {/* ============ TRÁFICO ============ */}
        {tab==="trafico" && (
          <>
            <div className="rounded-xl p-4 mb-5" style={{ backgroundColor:"#140C08", border:`0.5px solid ${C.naranja}` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <Megaphone size={14} style={{ color:C.naranja }}/>
                <span className="mono text-[10px] uppercase tracking-wider" style={{ color:C.naranja }}>La campaña en una línea</span>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color:C.text }}>
                Meta Ads (IG + FB) · Objetivo: <strong style={{ color:C.turquesa }}>Mensajes → WhatsApp</strong> · desde la página TINTO AI, con la cara de Juan en los creativos · 10-15K COP/día · la conversión real es el <strong style={{ color:C.bone }}>tinto agendado</strong>, no la venta directa.
              </p>
            </div>

            {label("Línea de tiempo")}
            <div className="space-y-2 mb-6">
              {FASES.map((f,i)=>(
                <div key={i} className="rounded-lg p-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}`, borderLeft:`3px solid ${i===1||i===3?C.naranja:C.turquesa}` }}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="mono text-[11px]" style={{ color:i===1||i===3?C.naranja:C.turquesa }}>{f.f}</span>
                    <span className="text-[13px] font-semibold">{f.t}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color:C.muted }}>{f.d}</p>
                </div>
              ))}
            </div>

            {label("Los 3 anuncios del test A/B", C.naranja)}
            <div className="space-y-2 mb-6">
              {ANUNCIOS.map((a,i)=>(
                <div key={i} className="rounded-lg p-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.borderA}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="mono text-[13px] font-bold w-7 h-7 rounded-md flex items-center justify-center"
                      style={{ backgroundColor:`${C.naranja}15`, color:C.naranja, border:`0.5px solid ${C.naranja}40` }}>{a.n}</span>
                    <span className="text-[13px] font-semibold">{a.angulo}</span>
                  </div>
                  <div className="mono text-[10px] uppercase tracking-wider mb-1" style={{ color:C.t3 }}>Texto principal</div>
                  <p className="wsp text-[12px] leading-relaxed mb-2" style={{ color:C.text }}>{a.texto}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                    <span className="text-[11px]" style={{ color:C.muted }}>Titular: <strong style={{ color:C.bone }}>{a.titular}</strong></span>
                    <span className="text-[11px]" style={{ color:C.muted }}>Descripción: <strong style={{ color:C.bone }}>{a.desc}</strong></span>
                    <span className="text-[11px]" style={{ color:C.muted }}>Botón: <strong style={{ color:C.turquesa }}>{a.boton}</strong></span>
                  </div>
                  <p className="text-[11px] mb-2" style={{ color:C.t3 }}>Visual: {a.visual}</p>
                  <CopyBtn text={a.texto}/>
                </div>
              ))}
            </div>

            {label("Segmentación")}
            <div className="rounded-lg p-3 mb-6" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
              {SEGMENTACION.map((s,i)=>(
                <div key={i} className="flex gap-2 items-start mb-1.5">
                  <span style={{ color:C.turquesa, fontSize:12, flexShrink:0 }}>→</span>
                  <span className="text-[13px] leading-relaxed" style={{ color:C.text }}>{s}</span>
                </div>
              ))}
            </div>

            {label("El embudo — del anuncio al cliente")}
            <div className="space-y-2 mb-6">
              {EMBUDO.map((e,i)=>(
                <div key={i} className="rounded-lg p-3 flex items-center gap-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
                  <span className="mono text-[13px] font-bold" style={{ color:C.naranja, minWidth:20 }}>{i+1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold">{e.p}</div>
                    <p className="text-[11px]" style={{ color:C.muted }}>{e.d}</p>
                  </div>
                  <span className="mono text-[9px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor:C.raised, color:C.turquesa, border:`0.5px solid ${C.border}` }}>{e.m}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.borderA}` }}>
              <p className="text-[13px] leading-relaxed" style={{ color:C.text }}>
                <strong style={{ color:C.naranja }}>Reglas duras:</strong> nunca "promocionar publicación" (siempre Ads Manager) · no tocar la campaña en los 6 días de aprendizaje · WhatsApp respondido en menos de 1 hora (la velocidad de respuesta ES el producto que Juan vende) · el costo que importa no es el clic: es el tinto agendado.
              </p>
            </div>
          </>
        )}

        {/* ============ LAS 2 MARCAS ============ */}
        {tab==="combo" && (
          <>
            {label("Cómo se combinan las dos marcas")}
            <div className="space-y-2 mb-6">
              {REGLAS_COMBO.map((c,i)=>(
                <div key={i} className="rounded-lg p-3" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}`, borderLeft:`3px solid ${i%2===0?C.naranja:C.turquesa}` }}>
                  <div className="text-[13px] font-semibold mb-1">{c.q}</div>
                  <p className="text-[12px] leading-relaxed" style={{ color:C.muted }}>{c.r}</p>
                </div>
              ))}
            </div>

            {label("Reparto del mes")}
            <div className="rounded-lg p-3 mb-6" style={{ backgroundColor:C.surface, border:`0.5px solid ${C.border}` }}>
              {[
                ["@restrepo.lab", "14 días (reels, stories, prep) — el motor de alcance", C.naranja],
                ["@tinto.ai", "5 días (martes: carruseles de servicios/casos/proceso) — la vitrina", C.turquesa],
                ["Colaboración", "5 días (posts clave en ambas cuentas) — el puente", C.verde],
                ["Campaña Meta", "Días 15-30 (A/B/C → WhatsApp) — el acelerador", C.naranja],
              ].map(([a,b,col],i)=>(
                <div key={i} className="flex gap-3 items-start mb-2.5">
                  <span className="mono text-[12px] font-semibold flex-shrink-0" style={{ color:col, minWidth:110 }}>{a}</span>
                  <span className="text-[12px] leading-relaxed" style={{ color:C.text }}>{b}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 text-center" style={{ backgroundColor:"#140C08", border:`0.5px solid ${C.naranja}` }}>
              <p className="text-[15px] font-semibold leading-relaxed" style={{ color:C.bone }}>
                "La gente no compra IA. Compra confianza.<br/>Y la confianza se construye con un tinto de por medio." ☕
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
