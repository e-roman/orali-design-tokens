import StyleDictionary from 'style-dictionary';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';

const HEX = /^#([0-9a-f]{6})$/i;
const toChannels = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};
const isOpaque = (t) => t.$type === 'color' && HEX.test(String(t.$value));
const ref = (t) => (isOpaque(t) ? `rgb(var(--${t.name}-rgb) / <alpha-value>)` : `var(--${t.name})`);

/**
 * CSS: variables con referencias (cadena primitive → semantic → component)
 * + canales RGB (--x-rgb: r g b) para que Tailwind soporte modificadores de opacidad (bg-muted/70).
 */
StyleDictionary.registerFormat({
  name: 'css/variables-with-rgb',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file });
    const vars = formattedVariables({ format: 'css', dictionary, outputReferences: true, usesDtcg: true });
    const rgb = dictionary.allTokens
      .filter(isOpaque)
      .map((t) => `  --${t.name}-rgb: ${toChannels(t.$value)};`)
      .join('\n');
    return `${header}:root {\n${vars}\n\n  /* Canales RGB para modificadores de opacidad de Tailwind */\n${rgb}\n}\n`;
  },
});

/**
 * Tailwind preset (CJS). Los nombres de utilidades siguen a los tokens semánticos:
 *   color.surface.subtle   → bg-subtle
 *   color.text.secondary   → text-secondary
 *   color.icon.brand       → text-icon-brand
 *   color.form.*           → bg-form, border-form, border-form-focus, text-form-placeholder
 *   color.border.default   → border-default
 *   color.action.primary.* → bg-action-primary, hover:bg-action-primary-hover, text-on-primary
 *   color.feedback.*       → bg-success-subtle, text-error, border-warning …
 *   color.commerce.*       → text-price-current, bg-discount, bg-badge-dietary, text-shipping-free
 *   elevation.*            → shadow-card, shadow-dropdown, shadow-overlay (reemplaza la escala)
 *   layer.*                → z-header, z-drawer, z-modal (reemplaza la escala)
 *   typography.*           → text-heading-lg, text-body-sm, text-caption (tamaño + interlineado + peso)
 */
StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: ({ dictionary }) => {
    const all = dictionary.allTokens;
    const sem = all.filter((t) => t.filePath.includes('semantic') && t.$type === 'color');
    const by = (prefix) => sem.filter((t) => t.path.slice(0, prefix.length).join('.') === prefix.join('.'));

    const backgroundColor = {};
    const textColor = {};
    const borderColor = {};
    const ringColor = {};

    // Fondos: color.surface.* → bg-default, bg-subtle, bg-page, bg-brand, bg-accent…
    for (const t of by(['color', 'surface'])) backgroundColor[t.path[2]] = ref(t);
    for (const t of by(['color', 'text'])) textColor[t.path[2]] = ref(t);
    for (const t of by(['color', 'border'])) borderColor[t.path[2]] = ref(t);
    // Íconos (lucide usa currentColor): text-icon-default, text-icon-brand…
    for (const t of by(['color', 'icon'])) textColor[`icon-${t.path[2]}`] = ref(t);
    // Formularios: bg-form, border-form, focus:border-form-focus, placeholder:text-form-placeholder…
    for (const t of by(['color', 'form'])) {
      const k = t.path[2];
      if (k === 'bg') backgroundColor.form = ref(t);
      else if (k.startsWith('bg-')) backgroundColor[`form-${k.slice(3)}`] = ref(t);
      else if (k === 'border') borderColor.form = ref(t);
      else if (k.startsWith('border-')) borderColor[`form-${k.slice(7)}`] = ref(t);
      else textColor[`form-${k}`] = ref(t);
    }

    for (const t of by(['color', 'action'])) {
      const [, , role, prop] = t.path; // color.action.primary.bg-hover
      if (prop.startsWith('bg')) backgroundColor[`action-${role}${prop.slice(2)}`] = ref(t);
      if (prop === 'fg') textColor[`on-${role}`] = ref(t);
    }
    for (const t of by(['color', 'feedback'])) {
      const [, , kind, prop] = t.path; // color.feedback.success.bg
      if (prop === 'bg') backgroundColor[`${kind}-subtle`] = ref(t);
      if (prop === 'solid') backgroundColor[kind] = ref(t);
      if (prop === 'text') textColor[kind] = ref(t);
      if (prop === 'border') borderColor[kind] = ref(t);
    }
    for (const t of by(['color', 'commerce'])) {
      const [, , group, prop] = t.path; // color.commerce.discount.bg | color.commerce.price.current
      if (prop === 'bg') backgroundColor[group] = ref(t);
      else if (prop === 'border') borderColor[group] = ref(t);
      else if (prop === 'fg') textColor[group] = ref(t);
      else textColor[`${group}-${prop}`] = ref(t);
    }
    const focus = sem.find((t) => t.path.join('.') === 'color.focus.ring');
    Object.assign(ringColor, borderColor);
    ringColor.focus = ref(focus);
    const focusInverse = sem.find((t) => t.path.join('.') === 'color.focus.ring-inverse');
    ringColor['focus-inverse'] = ref(focusInverse);

    // Primitivos: disponibles para casos puntuales (ilustración, gradientes). La UI usa semánticos.
    const colors = {};
    for (const t of all.filter((t) => t.filePath.includes('primitive') && t.$type === 'color' && t.path[1] !== 'alpha')) {
      (colors[t.path[1]] ??= {})[t.path[2]] = ref(t);
    }
    colors.tomato.DEFAULT = colors.tomato['500'];
    colors.sage.DEFAULT = colors.sage['500'];

    const neutral900 = all.find((t) => t.path.join('.') === 'color.neutral.900');
    const gradientColorStops = { scrim: ref(neutral900) };

    // Radius: reemplaza la escala de Tailwind (no extend) → solo existen los valores del sistema.
    const borderRadius = {};
    for (const t of all.filter((t) => t.path[0] === 'radius')) {
      borderRadius[t.path[1] === 'sm' ? 'DEFAULT' : t.path[1]] = `var(--${t.name})`;
    }

    // Elevación y capas: reemplazan las escalas de Tailwind → solo existen los niveles del sistema.
    const boxShadow = { none: 'none' };
    for (const t of all.filter((t) => t.path[0] === 'elevation')) boxShadow[t.path[1]] = `var(--${t.name})`;
    const zIndex = { auto: 'auto', 0: '0' };
    for (const t of all.filter((t) => t.path[0] === 'layer')) zIndex[t.path[1]] = `var(--${t.name})`;

    // Estilos tipográficos compuestos → text-heading-lg, text-body-sm… (tamaño + interlineado + peso)
    const fontSize = {};
    for (const t of all.filter((t) => t.path[0] === 'typography')) {
      const v = t.original.$value;
      const r = (x) => `var(--${x.slice(1, -1).replace(/\./g, '-')})`;
      fontSize[t.path[1]] = [r(v.fontSize), { lineHeight: r(v.lineHeight), fontWeight: r(v.fontWeight) }];
    }

    const preset = {
      theme: {
        borderRadius,
        boxShadow,
        zIndex,
        extend: {
          colors,
          backgroundColor,
          textColor,
          borderColor,
          ringColor,
          outlineColor: { focus: ref(focus), 'focus-inverse': ref(focusInverse) },
          gradientColorStops,
          fontSize,
          fontFamily: { sans: ['var(--font-family-sans)', 'system-ui', 'sans-serif'] },
          maxWidth: { container: 'var(--size-container)' },
        },
      },
    };
    return `/** Generado por Style Dictionary desde tokens/ — no editar a mano */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
  },
});

const sd = new StyleDictionary({
  source: ['tokens/primitive.json', 'tokens/semantic.json', 'tokens/component.json'],
  usesDtcg: true,
  log: { verbosity: 'default' },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.css', format: 'css/variables-with-rgb' }],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.json', format: 'json/flat' }],
    },
    tailwind: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [{ destination: 'tailwind.preset.js', format: 'tailwind/preset' }],
    },
  },
});

await sd.buildAllPlatforms();

// Tipos para consumidores TypeScript (tailwind.config.ts): el preset es CJS sin declaraciones.
import { writeFileSync } from 'node:fs';
writeFileSync(
  'dist/tailwind.preset.d.ts',
  `/** Generado por build.mjs — no editar a mano */\nimport type { Config } from "tailwindcss";\ndeclare const preset: Partial<Config>;\nexport = preset;\n`,
);
