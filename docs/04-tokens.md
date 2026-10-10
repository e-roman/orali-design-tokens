# Tokens

Los design tokens son la fuente única de verdad de las decisiones visuales de Orali. Diseño y código consumen los mismos valores.

## Arquitectura en 3 capas

| Capa | Archivo | Qué contiene | Quién la consume |
|---|---|---|---|
| **Primitive** | `primitive.json` | Valores crudos: escalas de color 50–950, spacing, radios, tipografía | Solo la capa semántica (ocultos en los selectores de Figma) |
| **Semantic** | `semantic.json` | Intención: `text.secondary`, `surface.subtle`, `action.primary.bg` | Componentes, layouts |
| **Component** | `component.json` | Decisiones por componente: `button.primary.height` | Un componente específico |

Regla: **un componente nunca referencia un primitivo de color directo.** Si falta un semántico, se crea.

## Nomenclatura

`{categoría}.{grupo}.{rol}.{estado}` → `color.action.primary.bg-hover`

- kebab-case y minúsculas en todos los niveles.
- Sin prefijos repetidos: `text.primary`, no `text.text-primary` (en código quedaría `text-text-primary`).
- Escalas numéricas para color (50–950) y spacing (base 4px).
- Escalas de talla (`xs`–`6xl`) para tipografía y radios.

## Flujo de trabajo

```
Tokens Studio (editar tokens) → push a una rama de GitHub
        ↓                                ↓
Export a Figma Variables         GitHub Actions: Style Dictionary
                                         ↓
                          dist/ → @orali/design-tokens (tag) → Tienda Orali
```

- Los cambios se hacen **en Tokens Studio**, no en el panel de variables de Figma: así llegan a GitHub.
- Siempre en una rama (`figma-ds`), nunca directo a `main`. El sitio consume tags (`#v2.0.0`).

| Output | Uso |
|---|---|
| `dist/tokens.css` | Variables CSS en `:root` con referencias + canales `-rgb` |
| `dist/tailwind.preset.js` | `presets: [oraliTokens]` en `tailwind.config.ts` |
| `dist/tokens.json` | Valores planos para JS / tests |

Los canales `-rgb` (`--color-surface-muted-rgb: 228 228 228`) permiten modificadores de opacidad en Tailwind (`bg-muted/70`, `from-scrim/75`). Sin ellos, Tailwind 3 descarta esas clases en silencio.

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
<button className="rounded-md bg-action-primary text-on-primary hover:bg-action-primary-hover">Agregar</button>
<p className="text-secondary">$ 4.200 por unidad</p>
```

## Mapa token → utilidad

| Token | Utilidad |
|---|---|
| `color.surface.*` | `bg-*` (`bg-default`, `bg-subtle`, `bg-brand`…) |
| `color.text.*` | `text-*` (`text-primary`, `text-secondary`…) |
| `color.border.*` | `border-*`, `ring-*`, `divide-*` |
| `color.icon.*` | `text-icon-*` |
| `color.form.*` | `bg-form`, `border-form`, `focus:border-form-focus`, `placeholder:text-form-placeholder` |
| `color.action.{rol}.bg[-estado]` | `bg-action-{rol}[-estado]` |
| `color.action.{rol}.fg` | `text-on-{rol}` |
| `color.feedback.{tipo}.bg` / `.solid` / `.text` / `.border` | `bg-{tipo}-subtle` / `bg-{tipo}` / `text-{tipo}` / `border-{tipo}` |
| `color.focus.ring` / `ring-inverse` | `outline-focus` / `outline-focus-inverse`, `ring-focus` |
| `radius.*` | `rounded-*` (reemplaza la escala de Tailwind) |
| `elevation.*` / `layer.*` / `typography.*` | `shadow-*` / `z-*` / `text-{estilo}` |

## Scopes en Figma

Cada variable aparece solo donde tiene sentido: colores de superficie en rellenos, de texto en texto, de borde en trazos; `space` en gaps y padding, `radius` en esquinas. Los primitivos de color y tipografía están ocultos para obligar a usar semánticos.

## Formato

W3C Design Tokens (DTCG): `$value`, `$type`, `$description`. Compatible con Tokens Studio y Style Dictionary v4. Las familias tipográficas guardan un solo nombre (`Montserrat`) para Figma; el CSS agrega `system-ui, sans-serif` como fallback.
