# Tokens

Los design tokens son la fuente única de verdad de las decisiones visuales de Orali. Diseño y código consumen los mismos valores.

## Arquitectura en 3 capas

| Capa | Archivo | Qué contiene | Quién la consume |
|---|---|---|---|
| **Primitive** | `primitive.json` | Valores crudos: paleta, escala, radios | Solo la capa semántica |
| **Semantic** | `semantic.json` | Intención: `text.muted`, `action.primary.bg` | Componentes, layouts |
| **Component** | `component.json` | Decisiones por componente: `button.primary.height` | Un componente específico |

Regla: **un componente nunca referencia un primitivo directo.** Si falta un semántico, se crea.

## Nomenclatura

`{categoría}.{rol}.{variante}.{estado}` → `color.action.primary.bg`

- kebab-case en todos los niveles.
- Escalas numéricas para color (50–900) y spacing (base 4px).
- Escalas de talla (`xs`–`6xl`) para tipografía y radios.

## Pipeline

Figma Variables → Tokens Studio → GitHub (`orali-design-tokens`) → Style Dictionary → `@orali/design-tokens` → Tienda Orali (Next.js + Tailwind)

| Output | Uso |
|---|---|
| `dist/tokens.css` | Variables CSS en `:root` con referencias + canales `-rgb` |
| `dist/tailwind.preset.js` | `presets: [oraliTokens]` en `tailwind.config.ts` |
| `dist/tokens.json` | Valores planos para JS / tests |

Los canales `-rgb` (`--color-bg-muted-rgb: 228 228 228`) permiten modificadores de opacidad en Tailwind (`bg-muted/70`, `from-scrim/95`). Sin ellos, Tailwind 3 descarta esas clases en silencio.

## Cómo usar

```tsx
// app/layout.tsx
import "@orali/design-tokens/tokens.css"
```

```ts
// tailwind.config.ts
import oraliTokens from "@orali/design-tokens/tailwind"
export default { presets: [oraliTokens], content: [...] }
```

```jsx
<button className="rounded-full bg-action-primary text-on-primary hover:bg-action-primary-hover">Agregar</button>
<p className="text-muted">$ 4.200 por unidad</p>
```

## Mapa token → utilidad

| Token | Utilidad |
|---|---|
| `color.bg.*` | `bg-*` |
| `color.text.*` | `text-*` |
| `color.border.*` | `border-*`, `ring-*`, `divide-*` |
| `color.action.{rol}.bg[-estado]` | `bg-action-{rol}[-estado]` |
| `color.action.{rol}.fg` | `text-on-{rol}` |
| `color.feedback.{tipo}.bg` / `.solid` / `.fg` / `.border` | `bg-{tipo}-subtle` / `bg-{tipo}` / `text-{tipo}` / `border-{tipo}` |
| `color.focus.ring` | `ring-focus`, `outline-focus` |
| `radius.*` | `rounded-*` |

## Formato

W3C Design Tokens (DTCG): `$value`, `$type`, `$description`. Compatible con Tokens Studio y Style Dictionary v4.
