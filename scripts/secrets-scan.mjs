// Escaneo de secretos sobre los archivos trackeados por git.
// Uso: node scripts/secrets-scan.mjs  → exit 1 si encuentra hallazgos.
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';

const IGNORE_EXT = /\.(png|jpe?g|gif|webp|glb|ttf|woff2?|exe|docx|pdf|zip)$/i;
const IGNORE_PATH = /(^|\/)(node_modules|\.vercel|\.claude|desde-Documents-FUXIA|propuestas c)|three\.module\.min\.js$|package-lock\.json$/i;

const PATTERNS = [
  { id: 'telegram-bot-token', re: /\b\d{8,10}:[A-Za-z0-9_-]{30,42}\b/ },
  { id: 'github-token', re: /\bgh[pousr]_[A-Za-z0-9]{36,255}\b/ },
  { id: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'slack-token', re: /\bxox[abposr]-[A-Za-z0-9-]{10,}\b/ },
  { id: 'openai-key', re: /\bsk-(proj-)?[A-Za-z0-9_-]{20,}\b/ },
  { id: 'stripe-key', re: /\b[sr]k_(live|test)_[0-9a-zA-Z]{10,}\b/ },
  { id: 'wompi-key', re: /\b(pub|prv)_(test|prod)_[0-9a-zA-Z]{16,}\b/ },
  { id: 'jwt', re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ },
  {
    id: 'credencial-generica',
    re: /\b(api[_-]?key|apikey|secret|token|password|passwd)\b\s*[:=]\s*["'`][^"'`\n]{12,}["'`]/i,
    skip: (line) =>
      /process\.env|import\.meta\.env|os\.environ|\{\{|\$\{|your[_-]|<[^>]+>|\bxxx\b|placeholder|example|\.env|GIT_|\bGITHUB_TOKEN\b|SONAR_TOKEN/i.test(line)
  }
];

function mask(m) {
  const s = m.length > 24 ? m.slice(0, 16) + '…' + m.slice(-4) : m;
  return s.replace(/[A-Za-z0-9]/g, (c, i) => (i < 4 ? c : '*'));
}

function trackedFiles() {
  try {
    return execSync('git ls-files --deduplicate', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] })
      .split(/\r?\n/).filter(Boolean);
  } catch {
    // Sin repo: recorre el árbol filtrado manualmente (fallback).
    const out = [];
    const walk = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = resolve(dir, e.name);
        if (e.isDirectory()) {
          if (!/^(node_modules|\.vercel|\.claude|\.git|desde-Documents-FUXIA|propuestas c)$/.test(e.name)) walk(p);
        } else out.push(p);
      }
    };
    walk(process.cwd());
    return out;
  }
}

const findings = [];
for (const f of trackedFiles()) {
  const file = isAbsolute(f) ? f : resolve(f);
  if (IGNORE_EXT.test(file) || IGNORE_PATH.test(f)) continue;
  let lines;
  try { lines = readFileSync(file, 'utf8').split(/\r?\n/); } catch { continue; }
  lines.forEach((line, i) => {
    if (line.length > 4096) return;
    for (const p of PATTERNS) {
      const m = line.match(p.re);
      if (m && !(p.skip && p.skip(line))) {
        findings.push({ file: f, line: i + 1, id: p.id, sample: mask(m[0]) });
      }
    }
  });
}

if (findings.length) {
  console.error('✖ SECRETOS DETECTADOS (' + findings.length + '):');
  for (const h of findings) console.error('  ' + h.file + ':' + h.line + ' [' + h.id + '] ' + h.sample);
  console.error('  Mueve el secreto a .env / variables del proveedor y vuelve a intentar.');
  process.exit(1);
}
console.log('✔ Sin secretos en ' + 'los archivos trackeados.');
