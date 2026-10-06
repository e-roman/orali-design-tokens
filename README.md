# @orali/design-tokens

Design tokens de **Tienda Orali**. Es la fuente única de color, tipografía, espaciado, radios, motion y decisiones de componente.

```
Figma Variables → Tokens Studio → este repo → Style Dictionary → dist/ → tienda-orali (Next.js + Tailwind)
```

## Estructura

| Ruta | Contenido |
|---|---|
| `tokens/primitive.json` | Valores crudos: paleta, escalas, radios, motion |
| `tokens/semantic.json` | Intención: `color.text.muted`, `color.action.primary.bg-hover` |
| `tokens/component.json` | Decisiones por componente: `button.*`, `stepper.*`, `input.*`, `badge.*`, `card.*` |
| `tokens/$metadata.json`, `$themes.json` | Configuración de Tokens Studio (sync con GitHub) |
| `build.mjs` | Style Dictionary v4: CSS, JSON y preset de Tailwind |
| `dist/` | **Generado.** Se commitea para que el sitio lo consuma como dependencia de git |
| `docs/` | Contenido de las páginas de zeroheight |

Formato: [W3C Design Tokens (DTCG)](https://tr.designtokens.org/format/), con `$value`, `$type` y `$description`.

## Reglas

1. **Los componentes consumen semánticos, nunca primitivos.** Si falta un semántico, se crea acá.
2. **No se editan valores en el sitio.** Cada cambio pasa por este repo.
3. **`dist/` nunca se edita a mano.** Se regenera con `npm run build` y CI verifica que esté sincronizado.

## Uso en el sitio

```bash
npm i github:e-roman/orali-design-tokens
```

```tsx
// app/layout.tsx
import "@orali/design-tokens/tokens.css"
```

```ts
// tailwind.config.ts
import oraliTokens from "@orali/design-tokens/tailwind"
export default { presets: [oraliTokens], content: [/* … */] }
```

| Token | Utilidad de Tailwind |
|---|---|
| `color.bg.*` | `bg-default`, `bg-subtle`, `bg-muted`, `bg-brand`, `bg-accent`… |
| `color.text.*` | `text-default`, `text-muted`, `text-brand`, `text-accent`… |
| `color.border.*` | `border-default`, `border-strong`, `border-brand`… (también `ring-*`, `divide-*`) |
| `color.action.{rol}.bg[-estado]` | `bg-action-primary`, `hover:bg-action-primary-hover` |
| `color.action.{rol}.fg` | `text-on-primary` |
| `color.feedback.{tipo}.*` | `bg-success-subtle`, `text-error`, `border-warning`, `bg-success` |
| `radius.*` | `rounded-lg`, `rounded-2xl`, `rounded-full` (reemplaza la escala de Tailwind) |

Todos los colores opacos exponen canales RGB (`--color-bg-muted-rgb`), así funcionan los modificadores de opacidad (`bg-muted/70`, `from-scrim/95`).

Spacing y tamaños tipográficos siguen la escala de Tailwind 1:1. Por eso el preset no los redefine.

## Desarrollo

```bash
npm install
npm run build   # regenera dist/
```

Flujo con Tokens Studio: editás en Figma, hacés push a una rama desde el plugin, abrís un PR, CI hace el build y verifica, y mergeás. Después en el sitio corrés `npm update @orali/design-tokens`.
