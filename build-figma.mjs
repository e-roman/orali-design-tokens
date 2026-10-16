/**
 * Export para Figma Variables (import nativo DTCG de Figma).
 * Fuente: tokens/*.json. Salida: dist/figma/ — generado, no editar a mano.
 *
 *  - Una colección por set (primitive, semantic, component), un modo: Light.
 *  - Nombres: path con "/" (color/text/primary).
 *  - Alias: referencia DTCG {a.b} + com.figma.aliasData (colección destino).
 *  - Scopes por grupo, codeSyntax WEB = custom property real de dist/tokens.css.
 *  - Lo que Figma Variables no representa (shadow, typography, transition,
 *    duration, cubicBezier, textDecoration) va a styles.json / excluded.json.
 */
import StyleDictionary from 'style-dictionary';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const SETS = JSON.parse(readFileSync('tokens/$metadata.json', 'utf8')).tokenSetOrder;
const MODE = 'Light';
const OUT = 'dist/figma';

// Nombres CSS reales: mismos transforms que el build de tokens.css
const sd = new StyleDictionary({
  source: SETS.map((s) => `tokens/${s}.json`),
  usesDtcg: true,
  log: { verbosity: 'silent' },
  platforms: { css: { transformGroup: 'css' } },
});
const { allTokens } = await sd.getPlatformTokens('css');
const byPath = new Map(allTokens.map((t) => [t.path.join('.'), t]));
const setOf = (t) => SETS.find((s) => t.filePath.endsWith(`${s}.json`));

const FIGMA_TYPE = { color: 'color', dimension: 'number', number: 'number', fontWeight: 'number', fontFamily: 'string' };

/* ---------- scopes ---------- */
const FILL = ['FRAME_FILL', 'SHAPE_FILL'];
const TEXT = ['TEXT_FILL'];
const STROKE = ['STROKE_COLOR'];
const ICON = ['SHAPE_FILL', 'STROKE_COLOR'];
const last = (p) => p[p.length - 1];

function colorScopes(p, set) {
  const key = p.join('.');
  if (set === 'primitive') return []; // solo vía alias: la UI usa semánticos
  if (key.startsWith('color.surface.') || key === 'color.brand.subtle') return FILL;
  if (key.startsWith('color.brand.')) return [...FILL, ...TEXT, ...STROKE];
  if (key.startsWith('color.text.') || key.startsWith('color.commerce.price.')) return TEXT;
  if (key.startsWith('color.border.') || key.startsWith('color.focus.')) return STROKE;
  if (key.startsWith('color.icon.')) return ICON;
  const l = last(p);
  if (/^(icon|check|icon-disabled)$/.test(l)) return ICON;
  if (/border|focus-ring|^ring/.test(l)) return STROKE;
  if (/^(bg|solid|track|thumb|control-off)/.test(l)) return FILL;
  if (/^(fg|text|label|placeholder|helper|link-fg)/.test(l)) return TEXT;
  return null; // sin regla → se reporta
}

function numberScopes(p, t) {
  const key = p.join('.');
  const l = last(p);
  if (t.$type === 'fontWeight' || key.startsWith('font.weight') || l === 'font-weight') return ['FONT_WEIGHT'];
  if (key.startsWith('font.size') || l === 'font-size') return ['FONT_SIZE'];
  if (key.startsWith('font.line-height') || l === 'line-height') return ['LINE_HEIGHT'];
  if (key.startsWith('z-index') || key.startsWith('layer') || key.startsWith('breakpoint') || l === 'layer') return [];
  if (key.startsWith('opacity')) return ['OPACITY'];
  if (key.startsWith('space') || /^(padding|gap)/.test(l)) return ['GAP'];
  if (key.startsWith('radius') || /(radius|^default$|^pill$)/.test(l) && /radius|shape/.test(key)) return ['CORNER_RADIUS'];
  if (key.startsWith('border-width') || /(border-width|focus-width)$/.test(l)) return ['STROKE_FLOAT'];
  if (key.startsWith('size') || /(height|width|min-size|icon-size|hit-area|^thumb$)/.test(l)) return ['WIDTH_HEIGHT'];
  if (l === 'focus-offset') return [];
  return null;
}

const hidden = (p) => /^(z-index|layer|breakpoint)$/.test(p[0]) || last(p) === 'layer';

/* ---------- valores ---------- */
function toColor(v) {
  const s = String(v).trim();
  let m = s.match(/^#([0-9a-f]{6})$/i);
  let r, g, b, a = 1;
  if (m) { const n = parseInt(m[1], 16); [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  else if ((m = s.match(/^rgba?\(([^)]+)\)$/))) { [r, g, b, a = 1] = m[1].split(',').map(Number); }
  else throw new Error(`Color no soportado: ${s}`);
  const hex = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  return { colorSpace: 'srgb', components: [r / 255, g / 255, b / 255], alpha: a, hex };
}
function toNumber(v, key) {
  if (typeof v === 'number') return key.startsWith('opacity') ? +(v * 100).toFixed(4) : v; // Figma: opacidad 0–100
  const m = String(v).match(/^(-?[\d.]+)(px)?$/);
  if (!m) throw new Error(`Número no soportado en ${key}: ${v}`);
  return Number(m[1]);
}

/* ---------- export ---------- */
const files = Object.fromEntries(SETS.map((s) => [s, {}]));
const excluded = [];
const noScope = [];
const counts = Object.fromEntries(SETS.map((s) => [s, { exported: 0, excluded: 0 }]));

for (const t of allTokens) {
  const set = setOf(t);
  const key = t.path.join('.');
  const ftype = FIGMA_TYPE[t.$type];
  if (!ftype) { excluded.push({ set, token: key, type: t.$type, css: `var(--${t.name})` }); counts[set].excluded++; continue; }

  const orig = t.original.$value;
  const ref = typeof orig === 'string' && orig.match(/^\{([^}]+)\}$/)?.[1];
  const target = ref && byPath.get(ref);

  let scopes = ftype === 'color' ? colorScopes(t.path, set) : ftype === 'number' ? numberScopes(t.path, t) : ['FONT_FAMILY'];
  if (scopes === null) { noScope.push(key); scopes = []; }

  const node = {
    $type: ftype,
    $value: ref ? `{${ref}}` : ftype === 'color' ? toColor(t.$value) : ftype === 'number' ? toNumber(t.$value, key) : String(t.original.$value),
    ...(t.$description ? { $description: t.$description } : {}),
    $extensions: {
      'com.figma.scopes': scopes,
      'com.figma.codeSyntax': { WEB: `var(--${t.name})` },
      ...(hidden(t.path) ? { 'com.figma.hiddenFromPublishing': true } : {}),
      ...(target ? { 'com.figma.aliasData': { targetVariableName: ref.split('.').join('/'), targetVariableSetName: setOf(target) } } : {}),
    },
  };
  let o = files[set];
  for (const seg of t.path.slice(0, -1)) o = o[seg] ??= {};
  o[last(t.path)] = node;
  counts[set].exported++;
}

/* ---------- styles (no representables como variable) ---------- */
const varName = (r) => r.slice(1, -1).split('.').join('/');
const styles = { effect: [], text: [] };
for (const t of allTokens) {
  if (t.path[0] === 'elevation') {
    const src = byPath.get(t.original.$value.slice(1, -1));
    const layers = [].concat(src.$value).map((l) => ({ type: 'DROP_SHADOW', ...l }));
    styles.effect.push({ name: t.path.join('/'), description: t.$description ?? '', source: t.original.$value, layers, codeSyntax: `var(--${t.name})` });
  }
  if (t.$type === 'typography') {
    const v = t.original.$value;
    styles.text.push({
      name: t.path.join('/'), description: t.$description ?? '',
      bind: { fontFamily: varName(v.fontFamily), fontSize: varName(v.fontSize), fontWeight: varName(v.fontWeight), lineHeight: varName(v.lineHeight) },
    });
  }
}

mkdirSync(OUT, { recursive: true });
for (const s of SETS) writeFileSync(`${OUT}/${s}.${MODE}.tokens.json`, JSON.stringify(files[s], null, 2) + '\n');
writeFileSync(`${OUT}/styles.json`, JSON.stringify(styles, null, 2) + '\n');
writeFileSync(`${OUT}/manifest.json`, JSON.stringify({ mode: MODE, importOrder: SETS, counts, excluded, noScope }, null, 2) + '\n');

console.log('figma');
for (const s of SETS) console.log(`✔︎ ${OUT}/${s}.${MODE}.tokens.json  ${counts[s].exported} variables (${counts[s].excluded} a styles/excluidos)`);
console.log(`✔︎ ${OUT}/styles.json  ${styles.effect.length} effect · ${styles.text.length} text`);
if (noScope.length) { console.error(`✖ Sin regla de scope: ${noScope.join(', ')}`); process.exit(1); }
