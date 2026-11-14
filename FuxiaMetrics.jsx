import { useState, useEffect, useRef } from "react";

// ── TOKENS ─────────────────────────────────────────────────────────
const F   = "#E040FB";
const BG  = "#070707";
const S1  = "#101010";
const S2  = "#181818";
const S3  = "#222222";
const T1  = "#F0EFE8";
const T2  = "#888880";
const T3  = "#444440";
const B2  = "rgba(255,255,255,0.06)";
const BF  = "rgba(224,64,251,0.18)";

// ── METAS 90 DÍAS ──────────────────────────────────────────────────
const METAS = {
  ig_ferney:    [500,  1000, 2000],
  ig_fuxia:     [300,  800,  1500],
  tiktok:       [200,  500,  1000],
  facebook:     [100,  300,  600],
  threads:      [50,   200,  500],
  prospectos:   [3,    8,    15],
  clientes:     [0,    2,    4],
  facturacion:  [0,    2000, 5000],
  reels:        [3,    8,    16],
  guardados:    [20,   80,   200],
};

const SEMANAS = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];

const PLAT_COLORS = {
  ig_ferney:   "#E040FB",
  ig_fuxia:    "#C060E0",
  tiktok:      "#69C9D0",
  facebook:    "#5B8CF5",
  threads:     "#C8C8C0",
  prospectos:  "#F5C842",
  clientes:    "#8AE8A0",
  facturacion: "#FF8A65",
  reels:       "#E040FB",
  guardados:   "#69C9D0",
};

const METRIC_DEFS = [
  { id: "ig_ferney",   label: "@ferneypamplona IG",  cat: "redes",     unit: "seg",  icon: "◈" },
  { id: "ig_fuxia",    label: "FUXIA IG",             cat: "redes",     unit: "seg",  icon: "◈" },
  { id: "tiktok",      label: "TikTok",               cat: "redes",     unit: "seg",  icon: "▶" },
  { id: "facebook",    label: "Facebook",             cat: "redes",     unit: "seg",  icon: "◉" },
  { id: "threads",     label: "Threads",              cat: "redes",     unit: "seg",  icon: "◎" },
  { id: "reels",       label: "Reels publicados",     cat: "contenido", unit: "reels",icon: "⬡" },
  { id: "guardados",   label: "Guardados totales",    cat: "contenido", unit: "saves",icon: "◆" },
  { id: "prospectos",  label: "Prospectos DM",        cat: "negocio",   unit: "leads",icon: "◐" },
  { id: "clientes",    label: "Clientes activos",     cat: "negocio",   unit: "clts", icon: "◑" },
  { id: "facturacion", label: "Facturación COP (K)",  cat: "negocio",   unit: "K",    icon: "◒" },
];

const CATS = ["redes", "contenido", "negocio"];

// ── CSS ─────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
  .mx * { box-sizing: border-box; margin: 0; padding: 0; }
  .mx { background:${BG}; min-height:100vh; font-family:'Syne',sans-serif; color:${T1}; }
  .mx-mono { font-family:'JetBrains Mono',monospace; }
  .mx-input {
    background:${S3}; border:0.5px solid ${B2}; color:${T1}; font-family:'JetBrains Mono',monospace;
    font-size:14px; padding:8px 12px; border-radius:8px; width:100%; outline:none;
    transition:border-color 0.2s; -moz-appearance:textfield;
  }
  .mx-input::-webkit-outer-spin-button,.mx-input::-webkit-inner-spin-button{-webkit-appearance:none;}
  .mx-input:focus { border-color:${F}; }
  .mx-input::placeholder { color:${T3}; }
  .tab-btn { background:transparent; border:none; color:${T2}; font-family:'Syne',sans-serif;
    font-size:12px; letter-spacing:0.12em; text-transform:uppercase; padding:10px 14px;
    cursor:pointer; transition:color 0.2s; white-space:nowrap; font-weight:500;
    border-bottom:1.5px solid transparent; }
  .tab-btn:hover { color:${T1}; }
  .tab-btn.on { color:${F}; border-bottom-color:${F}; }
  .week-btn { background:transparent; border:0.5px solid ${B2}; color:${T2};
    font-family:'JetBrains Mono',monospace; font-size:11px; padding:7px 14px;
    border-radius:20px; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .week-btn:hover { border-color:${BF}; color:${T1}; }
  .week-btn.on { border-color:${F}; color:${F}; background:rgba(224,64,251,0.08); }
  .save-btn { background:${F}; border:none; color:#fff; font-family:'Syne',sans-serif;
    font-size:12px; font-weight:700; letter-spacing:0.1em; padding:10px 22px;
    border-radius:8px; cursor:pointer; transition:opacity 0.2s; }
  .save-btn:hover { opacity:0.85; }
  .save-btn:active { opacity:0.7; }
  .saved-badge { background:rgba(138,232,160,0.1); border:0.5px solid rgba(138,232,160,0.3);
    color:#8AE8A0; font-family:'JetBrains Mono',monospace; font-size:11px;
    padding:8px 16px; border-radius:8px; }
  .scroll-x { overflow-x:auto; scrollbar-width:none; }
  .scroll-x::-webkit-scrollbar { display:none; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .fade { animation:fadeUp 0.2s ease forwards; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .pulse { animation:pulse 1.5s infinite; }
  .cat-pill { font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:0.15em;
    text-transform:uppercase; padding:2px 8px; border-radius:20px; }
`;

// ── MINI BAR CHART ──────────────────────────────────────────────────
function MiniBar({ values, color, meta, maxVal }) {
  const max = maxVal || Math.max(...values, meta, 1);
  const w = 48;
  const h = 32;
  const pad = 3;
  const barW = 8;
  const gap = 4;
  const totalW = values.length * (barW + gap) - gap;
  const startX = (w - totalW) / 2;

  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {/* meta line */}
      <line
        x1={0} y1={pad + (h - 2 * pad) * (1 - meta / max)}
        x2={w} y2={pad + (h - 2 * pad) * (1 - meta / max)}
        stroke={color} strokeWidth={0.5} strokeDasharray="2,2" opacity={0.4}
      />
      {values.map((v, i) => {
        const barH = Math.max(2, ((h - 2 * pad) * v) / max);
        const x = startX + i * (barW + gap);
        const y = h - pad - barH;
        return (
          <rect key={i} x={x} y={y} width={barW} height={barH}
            fill={v > 0 ? color : S3} rx={2} opacity={v > 0 ? 1 : 0.4} />
        );
      })}
    </svg>
  );
}

// ── SPARKLINE ───────────────────────────────────────────────────────
function Sparkline({ values, color }) {
  const w = 80; const h = 28; const pad = 4;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => {
    const x = pad + (i / Math.max(values.length - 1, 1)) * (w - 2 * pad);
    const y = h - pad - ((v / max) * (h - 2 * pad));
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h}>
      {values.length > 1 && (
        <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      )}
      {values.length > 0 && (() => {
        const last = values[values.length - 1];
        const lx = pad + ((values.length - 1) / Math.max(values.length - 1, 1)) * (w - 2 * pad);
        const ly = h - pad - ((last / max) * (h - 2 * pad));
        return <circle cx={lx} cy={ly} r={3} fill={color} />;
      })()}
    </svg>
  );
}

// ── RADIAL PROGRESS ─────────────────────────────────────────────────
function RadialPct({ pct, color, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(pct / 100, 1) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={S3} strokeWidth={4} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={4} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
    </svg>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────
export default function FuxiaMetrics() {
  const emptyWeek = () => Object.fromEntries(METRIC_DEFS.map(m => [m.id, ""]));
  const [data, setData] = useState([emptyWeek(), emptyWeek(), emptyWeek(), emptyWeek()]);
  const [tab, setTab] = useState("ingresar");
  const [semana, setSemana] = useState(0);
  const [saved, setSaved] = useState(false);
  const [editNote, setEditNote] = useState(["", "", "", ""]);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const set = (s, id, val) => {
    const v = val === "" ? "" : Math.max(0, Number(val));
    setData(prev => {
      const next = prev.map(w => ({ ...w }));
      next[s][id] = v;
      return next;
    });
  };

  const saveWeek = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const numVal = (s, id) => {
    const v = data[s][id];
    return v === "" ? 0 : Number(v);
  };

  const weekValues = (id) => SEMANAS.map((_, i) => numVal(i, id));

  const metaSemana = (id, s) => METAS[id]?.[Math.min(s, 2)] ?? 0;

  const pctMeta = (id, s) => {
    const m = metaSemana(id, s);
    if (!m) return 0;
    return Math.min(100, Math.round((numVal(s, id) / m) * 100));
  };

  const totalPct = (s) => {
    const ids = METRIC_DEFS.map(m => m.id);
    const sum = ids.reduce((a, id) => a + pctMeta(id, s), 0);
    return Math.round(sum / ids.length);
  };

  const semanaStatus = (s) => {
    const filled = METRIC_DEFS.filter(m => data[s][m.id] !== "").length;
    return { filled, total: METRIC_DEFS.length };
  };

  const catColor = { redes: "#69C9D0", contenido: "#E040FB", negocio: "#8AE8A0" };

  const formatK = (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}M` : v >= 1 ? `${v}K` : `${v}`;

  return (
    <div className="mx">
      {/* HEADER */}
      <div style={{ background: S1, borderBottom: `0.5px solid ${B2}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "18px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: F, letterSpacing: -0.5 }}>FUXIA</span>
            <span className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.2em" }}>METRICS</span>
            <span className="mx-mono" style={{ fontSize: 10, color: T3, marginLeft: "auto" }}>90 DÍAS · MED 2026</span>
          </div>
          <div className="scroll-x" style={{ display: "flex" }}>
            {[
              { id: "ingresar", label: "Ingresar datos" },
              { id: "overview", label: "Overview" },
              { id: "redes", label: "Redes" },
              { id: "negocio", label: "Negocio" },
              { id: "metas", label: "Metas 90 días" },
            ].map(t => (
              <button key={t.id} className={`tab-btn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* ── INGRESAR ──────────────────────────────────────────── */}
        {tab === "ingresar" && (
          <div className="fade">
            <div style={{ marginBottom: 20 }}>
              <div className="mx-mono" style={{ fontSize: 10, color: F, letterSpacing: "0.2em", marginBottom: 6 }}>REGISTRO SEMANAL</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: T1 }}>Ingresá tus números reales al final de cada semana.</div>
            </div>

            {/* Week selector */}
            <div className="scroll-x" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {SEMANAS.map((s, i) => {
                const st = semanaStatus(i);
                return (
                  <button key={i} className={`week-btn ${semana === i ? "on" : ""}`} onClick={() => setSemana(i)}>
                    {s}
                    {st.filled > 0 && (
                      <span className="mx-mono" style={{ marginLeft: 6, fontSize: 9, color: st.filled === st.total ? "#8AE8A0" : T3 }}>
                        {st.filled}/{st.total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Progress de la semana */}
            <div style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em", marginBottom: 6 }}>
                  PROGRESO VS META · {SEMANAS[semana].toUpperCase()}
                </div>
                <div style={{ background: S3, borderRadius: 2, height: 4, overflow: "hidden" }}>
                  <div style={{ height: 4, background: F, borderRadius: 2, width: `${totalPct(semana)}%`, transition: "width 0.4s" }} />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: F }}>{totalPct(semana)}%</div>
                <div className="mx-mono" style={{ fontSize: 9, color: T3 }}>de metas</div>
              </div>
            </div>

            {/* Inputs por categoría */}
            {CATS.map(cat => (
              <div key={cat} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="cat-pill" style={{ background: `${catColor[cat]}15`, color: catColor[cat], border: `0.5px solid ${catColor[cat]}40` }}>
                    {cat}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  {METRIC_DEFS.filter(m => m.cat === cat).map(m => {
                    const pct = pctMeta(m.id, semana);
                    const meta = metaSemana(m.id, semana);
                    return (
                      <div key={m.id} style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: T1 }}>{m.label}</div>
                            <div className="mx-mono" style={{ fontSize: 10, color: T3, marginTop: 2 }}>
                              Meta: {meta} {m.unit}
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: pct >= 100 ? "#8AE8A0" : pct >= 60 ? F : T2 }}>
                              {pct}%
                            </div>
                          </div>
                        </div>
                        <input
                          type="number"
                          className="mx-input"
                          placeholder={`0 ${m.unit}`}
                          value={data[semana][m.id]}
                          onChange={e => set(semana, m.id, e.target.value)}
                          min="0"
                        />
                        {/* micro bar */}
                        <div style={{ marginTop: 8, background: S3, borderRadius: 2, height: 3, overflow: "hidden" }}>
                          <div style={{
                            height: 3, borderRadius: 2, transition: "width 0.3s",
                            background: pct >= 100 ? "#8AE8A0" : PLAT_COLORS[m.id] || F,
                            width: `${Math.min(pct, 100)}%`
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Nota de la semana */}
            <div style={{ marginBottom: 20 }}>
              <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em", marginBottom: 8 }}>NOTA DE LA SEMANA (opcional)</div>
              <textarea
                className="mx-input"
                style={{ height: 80, resize: "vertical", fontFamily: "'Syne', sans-serif", fontSize: 13, lineHeight: 1.6 }}
                placeholder="¿Qué funcionó? ¿Qué cambiarías? ¿Algún aprendizaje clave..."
                value={editNote[semana]}
                onChange={e => setEditNote(prev => prev.map((n, i) => i === semana ? e.target.value : n))}
              />
            </div>

            {/* Save */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="save-btn" onClick={saveWeek}>
                Guardar semana {semana + 1}
              </button>
              {saved && <div className="saved-badge">✓ Guardado</div>}
            </div>
          </div>
        )}

        {/* ── OVERVIEW ──────────────────────────────────────────── */}
        {tab === "overview" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="mx-mono" style={{ fontSize: 10, color: F, letterSpacing: "0.2em", marginBottom: 4 }}>PANORAMA GENERAL · 4 SEMANAS</div>

            {/* KPI cards grandes */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
              {[
                { id: "ig_ferney", label: "@ferneypamplona IG", color: F },
                { id: "tiktok",    label: "TikTok",             color: "#69C9D0" },
                { id: "prospectos",label: "Prospectos totales", color: "#F5C842" },
                { id: "facturacion",label: "Facturación (K COP)", color: "#FF8A65" },
              ].map(k => {
                const vals = weekValues(k.id);
                const last = vals.filter(v => v > 0).slice(-1)[0] || 0;
                const meta3 = METAS[k.id]?.[2] || 1;
                const pct = Math.min(100, Math.round((last / meta3) * 100));
                return (
                  <div key={k.id} style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, padding: "16px 14px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 10, right: 10 }}>
                      <RadialPct pct={pct} color={k.color} size={44} />
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 9, fontFamily: "JetBrains Mono", color: k.color, fontWeight: 500 }}>
                        {pct}%
                      </div>
                    </div>
                    <div className="mx-mono" style={{ fontSize: 9, color: T3, letterSpacing: "0.15em", marginBottom: 8 }}>{k.label.toUpperCase()}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: T1, letterSpacing: -0.5 }}>
                      {k.id === "facturacion" ? formatK(last) : last.toLocaleString()}
                    </div>
                    <div className="mx-mono" style={{ fontSize: 9, color: T2, marginTop: 4 }}>
                      meta 90d: {k.id === "facturacion" ? formatK(meta3) : meta3.toLocaleString()}
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <Sparkline values={vals} color={k.color} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tabla semana a semana */}
            <div style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `0.5px solid ${B2}` }}>
                <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em" }}>EVOLUCIÓN POR SEMANA</div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                  <thead>
                    <tr style={{ borderBottom: `0.5px solid ${B2}` }}>
                      <th style={{ padding: "10px 18px", textAlign: "left", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>Métrica</th>
                      {SEMANAS.map((s, i) => (
                        <th key={i} style={{ padding: "10px 14px", textAlign: "right", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>{s}</th>
                      ))}
                      <th style={{ padding: "10px 14px", textAlign: "right", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>Tendencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {METRIC_DEFS.map((m, mi) => {
                      const vals = weekValues(m.id);
                      const hasData = vals.some(v => v > 0);
                      const last = vals.filter(v => v > 0).slice(-1)[0] || 0;
                      const prev = vals.filter(v => v > 0).slice(-2, -1)[0] || 0;
                      const trend = last > prev ? "↑" : last < prev ? "↓" : "—";
                      const trendColor = last > prev ? "#8AE8A0" : last < prev ? "#FF6B6B" : T3;
                      return (
                        <tr key={m.id} style={{ borderBottom: `0.5px solid ${B2}`, opacity: hasData ? 1 : 0.4 }}>
                          <td style={{ padding: "10px 18px", fontSize: 12, color: T2 }}>{m.label}</td>
                          {vals.map((v, vi) => (
                            <td key={vi} style={{ padding: "10px 14px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: v > 0 ? T1 : T3 }}>
                              {v > 0 ? (m.id === "facturacion" ? `${v}K` : v.toLocaleString()) : "—"}
                            </td>
                          ))}
                          <td style={{ padding: "10px 14px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: trendColor }}>
                            {hasData ? trend : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notas */}
            {editNote.some(n => n.trim()) && (
              <div style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "14px 18px", borderBottom: `0.5px solid ${B2}` }}>
                  <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em" }}>NOTAS SEMANALES</div>
                </div>
                {editNote.map((n, i) => n.trim() ? (
                  <div key={i} style={{ padding: "12px 18px", borderBottom: `0.5px solid ${B2}` }}>
                    <div className="mx-mono" style={{ fontSize: 9, color: F, letterSpacing: "0.15em", marginBottom: 6 }}>{SEMANAS[i].toUpperCase()}</div>
                    <div style={{ fontSize: 13, color: T2, lineHeight: 1.7 }}>{n}</div>
                  </div>
                ) : null)}
              </div>
            )}
          </div>
        )}

        {/* ── REDES ─────────────────────────────────────────────── */}
        {tab === "redes" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="mx-mono" style={{ fontSize: 10, color: F, letterSpacing: "0.2em", marginBottom: 4 }}>CRECIMIENTO EN REDES SOCIALES</div>

            {[
              { id: "ig_ferney",  label: "@ferneypamplona",   plat: "Instagram", metas: METAS.ig_ferney },
              { id: "ig_fuxia",   label: "FUXIA",             plat: "Instagram", metas: METAS.ig_fuxia },
              { id: "tiktok",     label: "@ferneypamplona",   plat: "TikTok",    metas: METAS.tiktok },
              { id: "facebook",   label: "FUXIA Page",        plat: "Facebook",  metas: METAS.facebook },
              { id: "threads",    label: "@ferneypamplona",   plat: "Threads",   metas: METAS.threads },
            ].map(net => {
              const vals = weekValues(net.id);
              const color = PLAT_COLORS[net.id];
              const lastVal = vals.filter(v => v > 0).slice(-1)[0] || 0;
              const semActual = vals.filter(v => v > 0).length - 1;
              const metaActual = net.metas[Math.min(semActual, 2)] || net.metas[0];
              const pct = metaActual > 0 ? Math.min(100, Math.round((lastVal / metaActual) * 100)) : 0;

              return (
                <div key={net.id} style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: T1 }}>{net.label}</div>
                      <div className="mx-mono" style={{ fontSize: 10, color, marginTop: 3 }}>{net.plat}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: T1 }}>{lastVal.toLocaleString()}</div>
                      <div className="mx-mono" style={{ fontSize: 10, color: pct >= 100 ? "#8AE8A0" : color }}>
                        {pct}% de meta
                      </div>
                    </div>
                  </div>

                  {/* Barras por semana */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }}>
                    {SEMANAS.map((s, i) => {
                      const v = numVal(i, net.id);
                      const m = net.metas[Math.min(i, 2)];
                      const p = m > 0 ? Math.min(100, (v / m) * 100) : 0;
                      return (
                        <div key={i}>
                          <div className="mx-mono" style={{ fontSize: 9, color: T3, marginBottom: 4, letterSpacing: "0.1em" }}>S{i + 1}</div>
                          <div style={{ background: S3, borderRadius: 3, height: 6, overflow: "hidden" }}>
                            <div style={{ height: 6, background: color, borderRadius: 3, width: `${p}%`, transition: "width 0.4s" }} />
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                            <div className="mx-mono" style={{ fontSize: 9, color: v > 0 ? T1 : T3 }}>{v > 0 ? v.toLocaleString() : "—"}</div>
                            <div className="mx-mono" style={{ fontSize: 9, color: T3 }}>{m}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Meta badges */}
                  <div style={{ display: "flex", gap: 6 }}>
                    {net.metas.map((m, i) => (
                      <div key={i} style={{ background: S2, borderRadius: 6, padding: "4px 10px" }}>
                        <div className="mx-mono" style={{ fontSize: 8, color: T3, letterSpacing: "0.1em" }}>MES {i + 1}</div>
                        <div className="mx-mono" style={{ fontSize: 11, color: color }}>{m.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Contenido */}
            <div style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, padding: "16px 18px" }}>
              <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em", marginBottom: 14 }}>CONTENIDO PUBLICADO</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { id: "reels", label: "Reels publicados", meta: METAS.reels, color: F },
                  { id: "guardados", label: "Guardados totales", meta: METAS.guardados, color: "#69C9D0" },
                ].map(c => {
                  const vals = weekValues(c.id);
                  const total = vals.reduce((a, v) => a + v, 0);
                  const metaFinal = c.meta[2];
                  const pct = Math.min(100, Math.round((total / metaFinal) * 100));
                  return (
                    <div key={c.id} style={{ background: S2, borderRadius: 10, padding: "14px" }}>
                      <div className="mx-mono" style={{ fontSize: 9, color: T3, letterSpacing: "0.15em", marginBottom: 8 }}>{c.label.toUpperCase()}</div>
                      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: T1 }}>{total}</div>
                        <div>
                          <MiniBar values={vals} color={c.color} meta={c.meta[0]} />
                        </div>
                      </div>
                      <div style={{ marginTop: 10, background: S3, borderRadius: 2, height: 3, overflow: "hidden" }}>
                        <div style={{ height: 3, background: c.color, borderRadius: 2, width: `${pct}%`, transition: "width 0.4s" }} />
                      </div>
                      <div className="mx-mono" style={{ fontSize: 9, color: T3, marginTop: 4 }}>meta 90d: {metaFinal} · {pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── NEGOCIO ───────────────────────────────────────────── */}
        {tab === "negocio" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="mx-mono" style={{ fontSize: 10, color: F, letterSpacing: "0.2em", marginBottom: 4 }}>MÉTRICAS DE NEGOCIO · FUXIA</div>

            {/* Facturación grande */}
            <div style={{ background: S1, border: `0.5px solid ${BF}`, borderRadius: 12, padding: "20px 18px" }}>
              <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em", marginBottom: 10 }}>FACTURACIÓN ACUMULADA · COP (miles)</div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#FF8A65", letterSpacing: -1 }}>
                    {weekValues("facturacion").reduce((a, v) => a + v, 0)}K
                  </div>
                  <div className="mx-mono" style={{ fontSize: 11, color: T2, marginTop: 4 }}>meta 90 días: 5.000K COP</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  {weekValues("facturacion").map((v, i) => {
                    const h = Math.max(8, (v / Math.max(...weekValues("facturacion"), 1)) * 80);
                    return (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div className="mx-mono" style={{ fontSize: 9, color: v > 0 ? "#FF8A65" : T3, marginBottom: 4 }}>{v > 0 ? `${v}K` : "—"}</div>
                        <div style={{ width: 24, height: h, background: v > 0 ? "#FF8A65" : S3, borderRadius: "4px 4px 0 0", transition: "height 0.4s" }} />
                        <div className="mx-mono" style={{ fontSize: 8, color: T3, marginTop: 4 }}>S{i + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ marginTop: 16, background: S3, borderRadius: 2, height: 4, overflow: "hidden" }}>
                <div style={{
                  height: 4, background: "#FF8A65", borderRadius: 2, transition: "width 0.4s",
                  width: `${Math.min(100, Math.round((weekValues("facturacion").reduce((a, v) => a + v, 0) / 5000) * 100))}%`
                }} />
              </div>
            </div>

            {/* Pipeline */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { id: "prospectos", label: "Prospectos DM", color: "#F5C842", meta: METAS.prospectos, desc: "Personas contactadas" },
                { id: "clientes",   label: "Clientes activos", color: "#8AE8A0", meta: METAS.clientes,  desc: "Con proyecto en curso" },
              ].map(k => {
                const vals = weekValues(k.id);
                const last = vals.filter(v => v > 0).slice(-1)[0] || 0;
                const semI = Math.max(0, vals.filter(v => v > 0).length - 1);
                const meta = k.meta[Math.min(semI, 2)];
                const pct = meta > 0 ? Math.min(100, Math.round((last / meta) * 100)) : 0;
                const conversion = numVal(semI, "prospectos") > 0
                  ? Math.round((numVal(semI, "clientes") / numVal(semI, "prospectos")) * 100)
                  : 0;
                return (
                  <div key={k.id} style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, padding: "16px" }}>
                    <div className="mx-mono" style={{ fontSize: 9, color: T3, letterSpacing: "0.15em", marginBottom: 8 }}>{k.label.toUpperCase()}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: T1, marginBottom: 4 }}>{last}</div>
                    <div className="mx-mono" style={{ fontSize: 10, color: T2, marginBottom: 12 }}>{k.desc}</div>
                    <div style={{ background: S3, borderRadius: 2, height: 3, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ height: 3, background: k.color, borderRadius: 2, width: `${pct}%`, transition: "width 0.4s" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="mx-mono" style={{ fontSize: 9, color: T3 }}>meta: {meta}</div>
                      <div className="mx-mono" style={{ fontSize: 9, color: k.color }}>{pct}%</div>
                    </div>
                    {k.id === "clientes" && numVal(semI, "prospectos") > 0 && (
                      <div style={{ marginTop: 10, background: S2, borderRadius: 6, padding: "6px 10px" }}>
                        <div className="mx-mono" style={{ fontSize: 9, color: T3 }}>Tasa de conversión</div>
                        <div className="mx-mono" style={{ fontSize: 14, color: "#8AE8A0", fontWeight: 500 }}>{conversion}%</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pipeline funnel visual */}
            <div style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, padding: "16px 18px" }}>
              <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em", marginBottom: 14 }}>EMBUDO FUXIA · SEMANA ACTUAL</div>
              {(() => {
                const lastSem = Math.max(0, SEMANAS.map((_, i) => i).filter(i => METRIC_DEFS.some(m => numVal(i, m.id) > 0)).slice(-1)[0] || 0);
                const pasos = [
                  { label: "Alcance estimado", val: (numVal(lastSem, "ig_ferney") + numVal(lastSem, "ig_fuxia") + numVal(lastSem, "tiktok")) * 8, color: "#69C9D0" },
                  { label: "Contenido publicado", val: numVal(lastSem, "reels") * 100, color: F },
                  { label: "Prospectos DM", val: numVal(lastSem, "prospectos"), color: "#F5C842" },
                  { label: "Clientes activos", val: numVal(lastSem, "clientes"), color: "#8AE8A0" },
                ];
                const maxVal = Math.max(...pasos.map(p => p.val), 1);
                return pasos.map((p, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontSize: 12, color: T2 }}>{p.label}</div>
                      <div className="mx-mono" style={{ fontSize: 11, color: p.color }}>{p.val.toLocaleString()}</div>
                    </div>
                    <div style={{ background: S3, borderRadius: 3, height: 8, overflow: "hidden" }}>
                      <div style={{ height: 8, background: p.color, borderRadius: 3, width: `${Math.min(100, (p.val / maxVal) * 100)}%`, opacity: 0.8, transition: "width 0.5s" }} />
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* ── METAS 90 DÍAS ─────────────────────────────────────── */}
        {tab === "metas" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="mx-mono" style={{ fontSize: 10, color: F, letterSpacing: "0.2em", marginBottom: 4 }}>METAS DEL PLAN 90 DÍAS</div>

            {/* Resumen estado actual */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 6 }}>
              {["Mes 1 — Mayo", "Mes 2 — Junio", "Mes 3 — Julio"].map((mes, mi) => {
                const semI = mi === 0 ? Math.min(1, 3) : mi === 1 ? Math.min(3, 3) : 3;
                const ids = METRIC_DEFS.map(m => m.id);
                const avg = ids.reduce((a, id) => {
                  const m = METAS[id]?.[mi] ?? 0;
                  const v = numVal(Math.min(mi * 2 + 1, 3), id);
                  return a + (m > 0 ? Math.min(100, (v / m) * 100) : 0);
                }, 0) / ids.length;
                return (
                  <div key={mi} style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                    <div className="mx-mono" style={{ fontSize: 8, color: T3, letterSpacing: "0.15em", marginBottom: 8 }}>{mes.toUpperCase()}</div>
                    <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
                      <RadialPct pct={Math.round(avg)} color={avg >= 80 ? "#8AE8A0" : avg >= 50 ? F : T2} size={56} />
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 11, fontFamily: "JetBrains Mono", color: avg >= 80 ? "#8AE8A0" : avg >= 50 ? F : T2, fontWeight: 500 }}>
                        {Math.round(avg)}%
                      </div>
                    </div>
                    <div className="mx-mono" style={{ fontSize: 9, color: avg >= 80 ? "#8AE8A0" : avg >= 50 ? F : T3 }}>
                      {avg >= 80 ? "En meta" : avg >= 50 ? "En progreso" : "Sin datos"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tabla completa de metas */}
            <div style={{ background: S1, border: `0.5px solid ${B2}`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `0.5px solid ${B2}` }}>
                <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.15em" }}>METAS DETALLADAS VS ACTUAL</div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                  <thead>
                    <tr style={{ borderBottom: `0.5px solid ${B2}` }}>
                      <th style={{ padding: "10px 18px", textAlign: "left", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>KPI</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace" }}>Mes 1</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace" }}>Mes 2</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace" }}>Mes 3</th>
                      <th style={{ padding: "10px 12px", textAlign: "right", fontSize: 11, color: T3, fontWeight: 400, fontFamily: "JetBrains Mono, monospace" }}>Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {METRIC_DEFS.map((m, i) => {
                      const last = weekValues(m.id).filter(v => v > 0).slice(-1)[0] || 0;
                      const meta3 = METAS[m.id]?.[2] ?? 0;
                      const pct = meta3 > 0 ? Math.min(100, Math.round((last / meta3) * 100)) : 0;
                      const statusColor = pct >= 100 ? "#8AE8A0" : pct >= 60 ? F : pct > 0 ? "#F5C842" : T3;
                      return (
                        <tr key={m.id} style={{ borderBottom: `0.5px solid ${B2}` }}>
                          <td style={{ padding: "10px 18px" }}>
                            <div style={{ fontSize: 12, color: T2 }}>{m.label}</div>
                            <span className="cat-pill" style={{ background: `${catColor[m.cat]}15`, color: catColor[m.cat], border: `0.5px solid ${catColor[m.cat]}30`, marginTop: 3, display: "inline-block" }}>{m.cat}</span>
                          </td>
                          {[0, 1, 2].map(mi => (
                            <td key={mi} style={{ padding: "10px 12px", textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: T2 }}>
                              {METAS[m.id]?.[mi]?.toLocaleString() ?? "—"}
                            </td>
                          ))}
                          <td style={{ padding: "10px 12px", textAlign: "right" }}>
                            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: statusColor, fontWeight: 500 }}>
                              {last > 0 ? last.toLocaleString() : "—"}
                            </div>
                            {last > 0 && (
                              <div className="mx-mono" style={{ fontSize: 9, color: statusColor }}>{pct}%</div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Leyenda colores */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { color: "#8AE8A0", label: "En meta o superada (≥100%)" },
                { color: F,          label: "En progreso (≥60%)" },
                { color: "#F5C842", label: "Por debajo (>0%)" },
                { color: T3,         label: "Sin datos aún" },
              ].map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                  <div className="mx-mono" style={{ fontSize: 10, color: T2 }}>{l.label}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ borderTop: `0.5px solid ${B2}`, paddingTop: 16, textAlign: "center" }}>
              <div className="mx-mono" style={{ fontSize: 10, color: T3, letterSpacing: "0.2em" }}>FUXIA × FERNEYPAMPLONA · MEDELLÍN · 2026</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
