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
 *   color.bg.subtle        → bg-subtle
 *   color.text.muted       → text-muted
 *   color.border.default   → border-default
 *   color.action.primary.* → bg-action-primary, hover:bg-action-primary-hover, text-on-primary
 *   color.feedback.*       → bg-success-subtle, text-error, border-warning …
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

    for (const t of by(['color', 'bg'])) backgroundColor[t.path[2]] = ref(t);
    for (const t of by(['color', 'text'])) textColor[t.path[2]] = ref(t);
    for (const t of by(['color', 'border'])) borderColor[t.path[2]] = ref(t);

    for (const t of by(['color', 'action'])) {
      const [, , role, prop] = t.path; // color.action.primary.bg-hover
      if (prop.startsWith('bg')) backgroundColor[`action-${role}${prop.slice(2)}`] = ref(t);
      if (prop === 'fg') textColor[`on-${role}`] = ref(t);
    }
    for (const t of by(['color', 'feedback'])) {
      const [, , kind, prop] = t.path; // color.feedback.success.bg
      if (prop === 'bg') backgroundColor[`${kind}-subtle`] = ref(t);
      if (prop === 'solid') backgroundColor[kind] = ref(t);
      if (prop === 'fg') textColor[kind] = ref(t);
      if (prop === 'icon') textColor[`${kind}-icon`] = ref(t);
      if (prop === 'border') borderColor[kind] = ref(t);
    }
    const focus = sem.find((t) => t.path.join('.') === 'color.focus.ring');
    Object.assign(ringColor, borderColor);
    ringColor.focus = ref(focus);

    // Primitivos: disponibles para casos puntuales (ilustración, gradientes). La UI usa semánticos.
    const colors = {};
    for (const t of all.filter((t) => t.filePath.includes('primitive') && t.$type === 'color' && t.path[1] !== 'alpha')) {
      (colors[t.path[1]] ??= {})[t.path[2]] = ref(t);
    }
    colors.tomato.DEFAULT = colors.tomato['600'];
    colors.sage.DEFAULT = colors.sage['600'];

    const neutral900 = all.find((t) => t.path.join('.') === 'color.neutral.900');
    const gradientColorStops = { scrim: ref(neutral900) };

    // Radius: reemplaza la escala de Tailwind (no extend) → solo existen los valores del sistema.
    const borderRadius = {};
    for (const t of all.filter((t) => t.path[0] === 'radius')) {
      borderRadius[t.path[1] === 'sm' ? 'DEFAULT' : t.path[1]] = `var(--${t.name})`;
    }

    const preset = {
      theme: {
        borderRadius,
        extend: {
          colors,
          backgroundColor,
          textColor,
          borderColor,
          ringColor,
          outlineColor: { focus: ref(focus) },
          gradientColorStops,
          fontFamily: { sans: ['var(--font-family-sans)'] },
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
