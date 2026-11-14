import { useState, useEffect } from "react";

const F = "#E040FB";
const F2 = "#9C27B0";
const BG = "#080808";
const S1 = "#111111";
const S2 = "#1A1A1A";
const S3 = "#222222";
const T1 = "#F5F5F0";
const T2 = "#999990";
const T3 = "#555550";
const BORDER = "rgba(224,64,251,0.15)";
const BORDER2 = "rgba(255,255,255,0.07)";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  .fx-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .fx-root { background: ${BG}; min-height: 100vh; font-family: 'Syne', sans-serif; color: ${T1}; }
  .fx-mono { font-family: 'JetBrains Mono', monospace; }
  .fx-tab-btn {
    background: transparent; border: none; color: ${T2}; font-family: 'Syne', sans-serif;
    font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; padding: 10px 16px;
    cursor: pointer; transition: color 0.2s; white-space: nowrap; font-weight: 500;
  }
  .fx-tab-btn:hover { color: ${T1}; }
  .fx-tab-btn.active { color: ${F}; border-bottom: 1.5px solid ${F}; }
  .fx-pill {
    display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px;
    letter-spacing: 0.1em; padding: 3px 10px; border-radius: 20px; font-weight: 400;
  }
  .fx-card {
    background: ${S1}; border: 0.5px solid ${BORDER2}; border-radius: 12px; padding: 20px 22px;
  }
  .fx-card-accent {
    background: ${S1}; border: 0.5px solid ${BORDER}; border-radius: 12px; padding: 20px 22px;
  }
  .fx-label {
    font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.2em;
    text-transform: uppercase; color: ${T3}; font-weight: 400;
  }
  .fx-h1 { font-size: 36px; font-weight: 800; letter-spacing: -1px; line-height: 1; }
  .fx-h2 { font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }
  .fx-h3 { font-size: 14px; font-weight: 500; }
  .fx-body { font-size: 13px; line-height: 1.7; color: ${T2}; }
  .fx-metric { font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: ${T1}; }
  .fx-reel-toggle { background: transparent; border: 0.5px solid ${BORDER2}; color: ${T1}; border-radius: 8px; padding: 14px 16px; cursor: pointer; width: 100%; text-align: left; font-family: 'Syne', sans-serif; font-size: 13px; display: flex; justify-content: space-between; align-items: center; transition: border-color 0.2s; }
  .fx-reel-toggle:hover { border-color: ${BORDER}; }
  .fx-reel-toggle.open { border-color: ${F}; }
  .fx-copy-btn { background: transparent; border: 0.5px solid ${BORDER2}; color: ${T2}; font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 5px 12px; border-radius: 6px; cursor: pointer; letter-spacing: 0.1em; transition: all 0.2s; }
  .fx-copy-btn:hover { border-color: ${F}; color: ${F}; }
  .scroll-tabs { overflow-x: auto; scrollbar-width: none; }
  .scroll-tabs::-webkit-scrollbar { display: none; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .fx-fade { animation: fadeIn 0.25s ease forwards; }
`;

const reels = [
  { id: 1, titulo: "B-roll de tu día", dificultad: 1, formato: "Sin hablar · clips + texto", duracion: "15–20 seg", por_que: "El de menor esfuerzo. Funciona siempre. Muestra quién sos sin que tengas que explicarlo.", hook: "Día normal en Medellín.", cuerpo: ["Clips cortos de tu rutina: café, laptop, ciudad, manos tecleando", "Texto en pantalla: '6am. Medellín.'", "Corte rápido a tu setup", "Texto: 'Construyendo lo que otros cobran caro.'", "Último clip: pantalla con código o dashboard abierto"], cierre: "Sin CTA. La imagen sola vende.", musica: "Minimal house o ambient oscuro. Que suene a ciudad de noche.", tip: "Graba 2 minutos random de tu día. Después en CapCut los editas en 15 seg." },
  { id: 2, titulo: "IA explicada en 30 seg", dificultad: 1, formato: "Texto animado + pantalla", duracion: "25–35 seg", por_que: "Educas sin hablar a cámara. El formato de texto animado sobre fondo negro es el más fácil de producir y uno de los más efectivos.", hook: "Lo que hace la IA por tu negocio mientras dormís.", cuerpo: ["Fondo negro, texto blanco", "Texto aparece: 'Responde mensajes de clientes'", "Corte: 'Actualiza tu CRM'", "Corte: 'Agenda reuniones'", "Corte: 'Genera reportes'", "Último: 'Todo sin que vos hagas nada.'"], cierre: "FUXIA. Automatización con actitud.", musica: "Techno minimal. Un loop de 8 tiempos. Sin letra.", tip: "CapCut tiene templates de texto animado. Elige el más limpio, no el más llamativo." },
  { id: 3, titulo: "Tu tatuaje te enseñó algo", dificultad: 2, formato: "Voz en off + close-up", duracion: "25–35 seg", por_que: "Lo personal vende. Tus tatuajes son parte de tu marca. Conectar uno con una lección de negocios es 80% personal + 20% profesional ejecutado perfectamente.", hook: "Este tatuaje me enseñó algo que ningún curso me enseñó.", cuerpo: ["Close-up del tatuaje, cámara lenta", "Tu voz en off: por qué te lo hiciste, qué representa", "Conectas la metáfora con tu trabajo: 'los buenos sistemas, como los buenos tatuajes, no se notan — se sienten'", "Plano medio, mirando hacia un lado"], cierre: "A veces lo que está en la piel es la marca más honesta.", musica: "Acústica melancólica, instrumental.", tip: "Graba el audio aparte con el celular pegado a la boca, en silencio. Después lo montas en CapCut." },
  { id: 4, titulo: "Mi setup de 0 pesos", dificultad: 2, formato: "Tour rápido + voz off", duracion: "30–40 seg", por_que: "Mostrar tu espacio te humaniza. Setup minimalista funcional = autoridad inmediata.", hook: "Mi oficina tiene 3 cosas. Eso es todo.", cuerpo: ["Plano de tu escritorio entero, lento", "Voz off: 'Laptop. Cuaderno. Café.'", "Close-up de cada cosa, 3 seg c/u", "Voz off: 'No necesito más para facturar lo que facturo.'", "Plano final de espalda en el escritorio"], cierre: "La gente cree que necesita más herramientas. Necesita más enfoque.", musica: "Minimal techno suave o piano instrumental.", tip: "Limpia el escritorio antes. Que no haya nada más. La estética minimalista comunica más que tus palabras." },
  { id: 5, titulo: "Antes de pagarle a una agencia", dificultad: 3, formato: "Talking head a cámara", duracion: "40–60 seg", por_que: "Cuando te animes a hablar a cámara, este es el reel. Sos directo, das valor, posicionás FUXIA sin venderla.", hook: "Antes de pagarle 5 millones a una agencia, leé esto.", cuerpo: ["(A cámara, plano medio cerrado, mirada directa)", "'Tres cosas que ninguna agencia en Medellín te va a decir.'", "'Una: una landing bien hecha cuesta entre 1 y 2 millones, no 5.'", "'Dos: si te cobran por proyecto y no por resultado, escapá.'", "'Tres: si no te muestran el código antes, te están armando un cuento.'"], cierre: "Si querés que te lo arme yo: FUXIA. DM y listo.", musica: "Sin música. Tu voz manda.", tip: "Pon el celular a la altura de tus ojos. Mirá al lente, no a tu imagen." },
  { id: 6, titulo: "La diferencia entre $1M y $5M", dificultad: 3, formato: "Talking head + pantalla", duracion: "45–60 seg", por_que: "Educás y vendés al mismo tiempo. Mostrar la diferencia con un caso real es el contenido que más mueve la aguja.", hook: "Te muestro la diferencia entre una landing de $1 millón y una de $5.", cuerpo: ["(A cámara) 'Esta es la landing de un cliente que pagó 5M a una agencia.'", "(Pantalla: landing genérica)", "'Ahora mirá la versión que le hice yo en una semana por menos.'", "(Pantalla: versión limpia con CTA claro)", "'La diferencia no es el precio. Es entender qué convierte.'"], cierre: "Si pagás por diseño, te van a estafar. Si pagás por conversión, vas a escalar.", musica: "Trap minimal de fondo, muy bajito.", tip: "Si no tenés cliente real todavía, usá V0.dev y creá 2 versiones — una 'agencia genérica' y una 'tuya'. Funciona igual." },
];

const kpiMeses = [
  { mes: "Mes 1 — Mayo", kpis: ["500 seguidores reales en Instagram", "200 en TikTok", "3 reels publicados", "1 cliente de prueba (puede ser gratis)", "Landing FUXIA online"] },
  { mes: "Mes 2 — Junio", kpis: ["1.000 seguidores IG", "500 TikTok", "2 reels/semana constantes", "2 clientes pagos activos", "$2M – $3M COP facturados"] },
  { mes: "Mes 3 — Julio", kpis: ["2.000 seguidores IG", "1.000 TikTok", "1 collab con otra cuenta Medellín", "3 clientes activos", "$3M – $5M COP / mes predecible"] },
];

const pilares = [
  { emoji: "🏙️", label: "Medellín", pct: "25%", desc: "La ciudad como personaje. Tu perspectiva local." },
  { emoji: "🧬", label: "Proceso", pct: "20%", desc: "Cómo trabajás. Cómo pensás. Sin filtro." },
  { emoji: "🎭", label: "Vida real", pct: "20%", desc: "Tatuajes, gym, música, lo que te mueve." },
  { emoji: "📚", label: "Aprendizajes", pct: "15%", desc: "Lo que aprendiste esta semana. Crudo." },
  { emoji: "⚡", label: "FUXIA", pct: "20%", desc: "Casos, resultados, lo que construís." },
];

const herramientas = [
  { nombre: "Notion", uso: "Todo centralizado", precio: "Gratis" },
  { nombre: "CapCut", uso: "Reels y edición", precio: "Gratis" },
  { nombre: "V0.dev", uso: "Landing pages rápidas", precio: "Gratis" },
  { nombre: "Make / n8n", uso: "Automatizaciones", precio: "Gratis plan básico" },
  { nombre: "Cal.com", uso: "Agendamiento de clientes", precio: "Gratis" },
  { nombre: "Canva", uso: "Assets visuales FUXIA", precio: "Gratis" },
];

export default function FuxiaDashboard() {
  const [tab, setTab] = useState("overview");
  const [openReel, setOpenReel] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const copyBio = () => {
    navigator.clipboard.writeText("Automatización + IA para negocios reales 🔌\nFundador @fuxia.co · Medellín\nLanding pages que venden mientras dormís\n↓ Trabajemos");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "overview", label: "Vista general" },
    { id: "personal", label: "@ferneypamplona" },
    { id: "fuxia", label: "FUXIA" },
    { id: "reels", label: "Reels" },
    { id: "plan", label: "Plan 90 días" },
  ];

  const dStar = (n) => Array.from({ length: 3 }, (_, i) => (
    <span key={i} style={{ color: i < n ? F : T3, fontSize: 11 }}>★</span>
  ));

  return (
    <div className="fx-root">
      {/* HEADER */}
      <div style={{ borderBottom: `0.5px solid ${BORDER2}`, background: S1 }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
            <div className="fx-h1" style={{ color: F }}>FUXIA</div>
            <div className="fx-mono" style={{ fontSize: 11, color: T3, letterSpacing: "0.15em" }}>×</div>
            <div className="fx-mono" style={{ fontSize: 11, color: T2, letterSpacing: "0.1em" }}>ferneypamplona</div>
            <div className="fx-mono" style={{ fontSize: 10, color: T3, marginLeft: "auto", letterSpacing: "0.1em" }}>2026 · MED</div>
          </div>
          <div className="scroll-tabs" style={{ display: "flex", gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} className={`fx-tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="fx-fade" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div className="fx-label" style={{ marginBottom: 8 }}>Diagnóstico</div>
              <div className="fx-card-accent" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                {[
                  { label: "Seguidores IG", val: "0→∞", sub: "arrancamos" },
                  { label: "Clientes", val: "0", sub: "mes 1: conseguir 1" },
                  { label: "Facturación", val: "$0", sub: "meta: $3M/mes" },
                  { label: "Contenido", val: "0", sub: "meta: 2/semana" },
                ].map((m, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div className="fx-label" style={{ marginBottom: 6 }}>{m.label}</div>
                    <div className="fx-metric" style={{ color: F }}>{m.val}</div>
                    <div className="fx-mono" style={{ fontSize: 10, color: T3, marginTop: 4 }}>{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#0F0A12", border: `0.5px solid ${F}`, borderRadius: 12, padding: "20px 22px" }}>
              <div className="fx-label" style={{ color: F, marginBottom: 14 }}>Esta semana — sin excusas</div>
              {[
                ["01", "Crear @fuxia en IG y TikTok. Foto de perfil + bio lista."],
                ["02", "Publicar el primer reel (B-roll del día, sin hablar, 15 seg)."],
                ["03", "Escribir la propuesta de valor de FUXIA en una oración."],
                ["04", "Identificar 3 negocios en Medellín que podrían ser clientes."],
              ].map(([n, t]) => (
                <div key={n} style={{ display: "flex", gap: 14, marginBottom: 12, alignItems: "flex-start" }}>
                  <div className="fx-mono" style={{ fontSize: 11, color: F, minWidth: 20, paddingTop: 2 }}>{n}</div>
                  <div style={{ fontSize: 13, color: T1, lineHeight: 1.6 }}>{t}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="fx-label" style={{ marginBottom: 12 }}>Stack gratuito para empezar</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                {herramientas.map((h, i) => (
                  <div key={i} className="fx-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T1 }}>{h.nombre}</div>
                      <div className="fx-body" style={{ fontSize: 11 }}>{h.uso}</div>
                    </div>
                    <div className="fx-pill" style={{ background: "#0F180F", color: "#5DCB6A", border: "0.5px solid #2A4A2A" }}>{h.precio}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fx-card" style={{ borderColor: BORDER2 }}>
              <div className="fx-label" style={{ marginBottom: 10 }}>Regla de oro FUXIA</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: T1, lineHeight: 1.6 }}>
                Nunca pagués por una herramienta antes de que un cliente pagado la pague por vos.
              </div>
            </div>
          </div>
        )}

        {/* PERSONAL */}
        {tab === "personal" && (
          <div className="fx-fade" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div className="fx-label" style={{ marginBottom: 6 }}>Marca personal</div>
                <div className="fx-h2">@ferneypamplona</div>
                <div className="fx-mono" style={{ fontSize: 11, color: T3, marginTop: 4 }}>80% personal · 20% profesional</div>
              </div>
              <div className="fx-pill" style={{ background: "#1A0F1A", color: F, border: `0.5px solid ${BORDER}` }}>Fundador de FUXIA</div>
            </div>

            <div className="fx-card-accent">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div className="fx-label">Bio para redes</div>
                <button className="fx-copy-btn" onClick={copyBio}>{copied ? "✓ copiado" : "copiar"}</button>
              </div>
              <div className="fx-mono" style={{ fontSize: 12, color: T1, lineHeight: 2, background: S2, padding: "14px 16px", borderRadius: 8 }}>
                Automatización + IA para negocios reales 🔌<br />
                Fundador @fuxia.co · Medellín<br />
                Landing pages que venden mientras dormís<br />
                ↓ Trabajemos
              </div>
            </div>

            <div>
              <div className="fx-label" style={{ marginBottom: 12 }}>Los 5 pilares de contenido</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {pilares.map((p, i) => (
                  <div key={i} className="fx-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 20 }}>{p.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T1 }}>{p.label}</div>
                      <div className="fx-body" style={{ fontSize: 12 }}>{p.desc}</div>
                    </div>
                    <div className="fx-mono" style={{ fontSize: 13, color: i === 4 ? F : T2, fontWeight: i === 4 ? 500 : 300 }}>{p.pct}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fx-card">
              <div className="fx-label" style={{ marginBottom: 12 }}>Tono de voz</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Hablás como con un parcero", "No como un speaker de LinkedIn"],
                  ["Contás el proceso, no el resultado", "No el highlight real"],
                  ["Usás el error como contenido", "No solo los logros"],
                  ["Nombrás a Medellín siempre", "No sos genérico"],
                ].map(([si, no], i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ fontSize: 12, color: "#5DCB6A" }}>✓ {si}</div>
                    <div style={{ fontSize: 11, color: T3 }}>✗ {no}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fx-card" style={{ background: "#0A0A12" }}>
              <div className="fx-label" style={{ marginBottom: 10 }}>Cadencia semanal</div>
              {[
                ["Lunes", "Reel educativo (IA, automatización, tip)"],
                ["Miércoles", "Reel personal (vida, Medellín, proceso)"],
                ["Viernes", "Story o carrusel: aprendizaje de la semana"],
              ].map(([dia, tipo]) => (
                <div key={dia} style={{ display: "flex", gap: 14, marginBottom: 10, alignItems: "flex-start" }}>
                  <div className="fx-mono" style={{ fontSize: 11, color: F, minWidth: 70 }}>{dia}</div>
                  <div style={{ fontSize: 13, color: T2, lineHeight: 1.5 }}>{tipo}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FUXIA AGENCIA */}
        {tab === "fuxia" && (
          <div className="fx-fade" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: F, letterSpacing: -1, lineHeight: 1 }}>FUXIA</div>
              <div className="fx-mono" style={{ fontSize: 11, color: T3, letterSpacing: "0.15em" }}>automatización con actitud</div>
            </div>

            <div style={{ background: "#0F0A12", border: `0.5px solid ${F}`, borderRadius: 12, padding: "20px 22px" }}>
              <div className="fx-label" style={{ color: F, marginBottom: 10 }}>Propuesta de valor</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: T1, lineHeight: 1.7 }}>
                En FUXIA no vendemos software. Vendemos tiempo de vuelta.
              </div>
              <div style={{ fontSize: 13, color: T2, lineHeight: 1.7, marginTop: 10 }}>
                Landing pages que venden mientras dormís. CRMs que se actualizan solos. Procesos que piensan por vos. Construido en Medellín, ejecutado en una semana, con la cara de la persona que lo arma — no una agencia anónima.
              </div>
            </div>

            <div>
              <div className="fx-label" style={{ marginBottom: 12 }}>Servicios · precios en COP</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { s: "Landing page que convierte", p: "$1M – $2M", t: "1 semana", tag: "más pedido" },
                  { s: "CRM automatizado", p: "$1.5M – $2.5M", t: "1–2 semanas", tag: "" },
                  { s: "Automatización de mensajes/leads", p: "$800K – $1.5M", t: "3–5 días", tag: "" },
                  { s: "Sistema de agendamiento inteligente", p: "$600K – $1M", t: "2–3 días", tag: "" },
                  { s: "Pack FUXIA completo", p: "$3M – $5M", t: "3–4 semanas", tag: "mejor valor" },
                ].map((item, i) => (
                  <div key={i} className="fx-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T1, display: "flex", alignItems: "center", gap: 8 }}>
                        {item.s}
                        {item.tag && <span className="fx-pill" style={{ background: "#1A0F1A", color: F, border: `0.5px solid ${BORDER}`, fontSize: 9 }}>{item.tag}</span>}
                      </div>
                      <div className="fx-mono" style={{ fontSize: 10, color: T3, marginTop: 3 }}>{item.t}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: F, whiteSpace: "nowrap" }}>{item.p}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fx-card">
              <div className="fx-label" style={{ marginBottom: 12 }}>Identidad visual</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                {[
                  { color: F, label: "FUXIA" },
                  { color: "#F5F5F0", label: "Blanco" },
                  { color: "#111111", label: "Negro" },
                  { color: "#9C27B0", label: "Profundo" },
                ].map((c, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: c.color, border: i === 1 ? `0.5px solid ${BORDER2}` : "none", marginBottom: 4 }} />
                    <div className="fx-mono" style={{ fontSize: 9, color: T3 }}>{c.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Syne (display)", "JetBrains Mono (datos)", "Futurista · Irreverente · Directo"].map((t, i) => (
                  <div key={i} className="fx-pill" style={{ background: S2, color: T2, border: `0.5px solid ${BORDER2}`, fontSize: 11 }}>{t}</div>
                ))}
              </div>
            </div>

            <div className="fx-card">
              <div className="fx-label" style={{ marginBottom: 10 }}>Lo que FUXIA NO hace</div>
              <div className="fx-body" style={{ lineHeight: 2 }}>
                No vendemos "paquetes de redes sociales". No manejamos pauta. No hacemos logos. No somos community managers. Somos el back-end del negocio — la parte que automatiza, conecta y hace que todo funcione sin que el dueño esté presente.
              </div>
            </div>
          </div>
        )}

        {/* REELS */}
        {tab === "reels" && (
          <div className="fx-fade" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div className="fx-label" style={{ marginBottom: 6 }}>6 reels listos para grabar</div>
              <div className="fx-mono" style={{ fontSize: 10, color: T3 }}>★ sin hablar · ★★ voz en off · ★★★ a cámara — empezá por los ★</div>
            </div>

            <div style={{ background: S1, border: `0.5px solid #2A1A0A`, borderRadius: 12, padding: "14px 16px" }}>
              <div className="fx-label" style={{ color: "#EF9F27", marginBottom: 10 }}>Antes de grabar — léelo una vez</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
                {[
                  ["Luz", "Frente a una ventana. Nunca con luz detrás."],
                  ["Audio", "Silencio total. Audífonos iPhone como micrófono."],
                  ["Encuadre", "Celular vertical, a la altura de tus ojos."],
                  ["App", "CapCut. Gratis. Tiene todo lo que necesitás."],
                  ["Subtítulos", "SIEMPRE. 80% ve sin sonido. 1 click en CapCut."],
                  ["Tomas", "Grabá 3 versiones. Elegí la más natural, no la perfecta."],
                ].map(([t, d]) => (
                  <div key={t}>
                    <div className="fx-mono" style={{ fontSize: 10, color: "#EF9F27", marginBottom: 3 }}>{t}</div>
                    <div style={{ fontSize: 12, color: T2, lineHeight: 1.5 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {reels.map((r, i) => (
              <div key={r.id}>
                <button className={`fx-reel-toggle ${openReel === i ? "open" : ""}`} onClick={() => setOpenReel(openReel === i ? null : i)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="fx-mono" style={{ fontSize: 10, color: T3, minWidth: 16 }}>0{r.id}</div>
                    <div style={{ fontWeight: 500 }}>{r.titulo}</div>
                    <div>{dStar(r.dificultad)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="fx-mono" style={{ fontSize: 10, color: T3 }}>{r.duracion}</div>
                    <div style={{ fontSize: 12, color: openReel === i ? F : T3, transition: "color 0.2s" }}>{openReel === i ? "▲" : "▼"}</div>
                  </div>
                </button>
                {openReel === i && (
                  <div className="fx-fade" style={{ background: S1, border: `0.5px solid ${BORDER}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <div className="fx-label" style={{ marginBottom: 6 }}>Por qué funciona</div>
                      <div className="fx-body">{r.por_que}</div>
                    </div>
                    <div>
                      <div className="fx-label" style={{ marginBottom: 6 }}>Hook</div>
                      <div style={{ fontSize: 13, color: F, fontWeight: 500, fontStyle: "italic" }}>"{r.hook}"</div>
                    </div>
                    <div>
                      <div className="fx-label" style={{ marginBottom: 8 }}>Guión</div>
                      {r.cuerpo.map((c, ci) => (
                        <div key={ci} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                          <div className="fx-mono" style={{ fontSize: 10, color: T3, paddingTop: 2, minWidth: 16 }}>{ci + 1}.</div>
                          <div style={{ fontSize: 12, color: T2, lineHeight: 1.6 }}>{c}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div>
                        <div className="fx-label" style={{ marginBottom: 6 }}>Cierre</div>
                        <div style={{ fontSize: 12, color: T2 }}>{r.cierre}</div>
                      </div>
                      <div>
                        <div className="fx-label" style={{ marginBottom: 6 }}>Música</div>
                        <div style={{ fontSize: 12, color: T2 }}>{r.musica}</div>
                      </div>
                    </div>
                    <div style={{ background: "#0F0A12", border: `0.5px solid ${BORDER}`, borderRadius: 8, padding: "10px 14px" }}>
                      <div className="fx-mono" style={{ fontSize: 10, color: F, marginBottom: 4 }}>TIP</div>
                      <div style={{ fontSize: 12, color: T2, lineHeight: 1.6 }}>{r.tip}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PLAN 90 DÍAS */}
        {tab === "plan" && (
          <div className="fx-fade" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div className="fx-label" style={{ marginBottom: 6 }}>Horizonte</div>
              <div className="fx-h2">90 días para el primer $5M COP / mes</div>
              <div className="fx-body" style={{ marginTop: 6 }}>Mayo → Julio 2026 · Medellín</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {kpiMeses.map((k, i) => (
                <div key={i} className="fx-card" style={{ borderLeft: `2px solid ${F}`, borderRadius: "0 12px 12px 0", paddingLeft: 20 }}>
                  <div className="fx-mono" style={{ fontSize: 10, color: F, letterSpacing: "0.15em", marginBottom: 10 }}>{k.mes}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {k.kpis.map((kp, ki) => (
                      <div key={ki} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ color: T3, fontSize: 11, paddingTop: 2 }}>—</div>
                        <div style={{ fontSize: 13, color: T2, lineHeight: 1.5 }}>{kp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="fx-card-accent">
              <div className="fx-label" style={{ marginBottom: 12 }}>Foco por semana</div>
              {[
                ["S1–S2", "Setup total: perfiles, bio, herramientas, primera pieza de contenido."],
                ["S3–S4", "Consistencia: 2 reels/semana. Prospectar 3 negocios."],
                ["S5–S6", "Primer cliente: aunque sea un favor. Documentar el proceso."],
                ["S7–S8", "Cobrar: $800K – $1.5M por el primer proyecto real."],
                ["S9–S10", "Escalar: 2 clientes simultáneos. Empezar a delegar."],
                ["S11–S12", "Sistema: que FUXIA funcione sin que vos estés pendiente todo el día."],
              ].map(([s, t]) => (
                <div key={s} style={{ display: "flex", gap: 14, marginBottom: 12, alignItems: "flex-start" }}>
                  <div className="fx-mono" style={{ fontSize: 10, color: F, minWidth: 40, paddingTop: 3 }}>{s}</div>
                  <div style={{ fontSize: 13, color: T2, lineHeight: 1.6 }}>{t}</div>
                </div>
              ))}
            </div>

            <div className="fx-card" style={{ textAlign: "center", padding: "28px 22px" }}>
              <div className="fx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.2em", marginBottom: 12 }}>EL ÚNICO KPI QUE IMPORTA HOY</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: F, lineHeight: 1.4 }}>
                ¿Publicaste algo esta semana?
              </div>
              <div className="fx-body" style={{ marginTop: 8 }}>
                Si la respuesta es sí, vas bien. Todo lo demás es consecuencia.
              </div>
            </div>

            <div style={{ borderTop: `0.5px solid ${BORDER2}`, paddingTop: 20, textAlign: "center" }}>
              <div className="fx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.2em" }}>FUXIA × FERNEYPAMPLONA · MEDELLÍN · 2026</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
