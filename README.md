![Orali Design System](./assets/cover-tokens.svg)

# Orali Design System: Token Infrastructure

Design token pipeline for [Tienda Orali](https://staging.tiendaorali.com), an Argentine artisanal fresh-pasta e-commerce. Tokens are authored once in DTCG format, synced from Figma via Tokens Studio, built with Style Dictionary v4, and consumed by the Next.js + Tailwind site as an npm dependency.

---

## What's in this repo

```
tokens/
  primitive.json        ← raw values: 50–950 color scales, spacing, radius, type, motion
  semantic.json         ← intent: surface, text, border, icon, brand, action, form, feedback, commerce
  component.json        ← per-component decisions: button, stepper, input, badge, card
  $metadata.json        ← Tokens Studio set order
  $themes.json          ← Tokens Studio theme config
build.mjs               ← Style Dictionary v4 config + custom formats
dist/                   ← generated, committed (consumed via git dependency)
  tokens.css            ← CSS custom properties with references + RGB channels
  tokens.json           ← flat values for JS / tests
  tailwind.preset.js    ← Tailwind preset with semantic utility names
docs/                   ← zeroheight page sources (Color, Typography, Spacing, Tokens, Button, Stepper)
.github/workflows/
  build-tokens.yml      ← rebuilds dist/ when tokens/ changes
```

---

## Token architecture

Three layers, each depending only on the one above it:

```
Primitive   →  color.tomato.500 = #E30613
                 ↓
Semantic    →  color.action.primary.bg = {color.tomato.500}
                 ↓
Component   →  button.add-to-cart.bg = {color.action.primary.bg}
```

Components consume semantic tokens only. The CSS output keeps the reference chain:

```css
--color-tomato-500: #e30613;
--color-action-primary-bg: var(--color-tomato-500);
--button-add-to-cart-bg: var(--color-action-primary-bg);
```

---

## Collections (390 tokens)

| Collection | Tokens | Description |
|---|---|---|
| `color` (primitive) | 86 | 7 scales × 11 steps (neutral, tomato, sage, green, yellow, red, blue), base, alpha, external (Mercado Pago) |
| `color` (semantic) | 82 | surface, text, border, icon, brand, action, form, feedback, focus, commerce |
| `font` + `typography` | 35 | Montserrat, 4 weights, size and line-height scales, 9 composite styles |
| `space` + `size` + `breakpoint` | 30 | base-4 scale (0–256), control heights, container, breakpoints |
| `radius` | 8 | none · sm 4 · md 8 · lg 12 · xl 16 · 2xl 20 · 3xl 24 · full |
| `shadow` + `elevation` | 10 | 5 primitives → subtle, card, card-hover, dropdown, overlay |
| `z-index` + `layer` | 16 | sticky → header → overlay → drawer → modal → progress |
| `border-width` + `opacity` | 7 | sm/md/lg/focus widths, disabled/overlay/hover opacity |
| `duration` + `easing` + `motion` | 8 | 150–1000 ms, standard easing, transitions |
| component | 108 | button (shape, primary, add-to-cart, secondary, outline, neutral, inverse, sizes), stepper (sm/md/lg), input (form, pill), badge (discount, dietary, counter), card (product, content) |

---

## Semantic token groups

| Group | Tokens | Tailwind |
|---|---|---|
| `color.surface` | default, page, subtle, muted, inverse, overlay, overlay-strong, brand, brand-subtle, accent, mercadopago | `bg-*` |
| `color.text` | primary, secondary, tertiary (decorative only), disabled, inverse, inverse-muted, on-brand, link, link-hover, brand, accent | `text-*` |
| `color.border` | default, strong, focus, brand, brand-subtle, accent, inverse | `border-*`, `ring-*`, `divide-*` |
| `color.icon` | default, subtle, brand, inverse | `text-icon-*` |
| `color.brand` | default, hover, active, subtle | CSS variables |
| `color.action` | primary, secondary, outline, accent (bg, bg-hover, bg-active, fg) | `bg-action-*`, `text-on-*` |
| `color.form` | bg, border, border-hover, border-focus, border-error, bg-error, bg-disabled, placeholder, text-disabled | `bg-form`, `border-form*`, `text-form-*` |
| `color.feedback` | success, warning, error, info → text, bg, border (+ success solid) | `text-success`, `bg-success-subtle`, `border-error`… |
| `color.commerce` | price (current, previous, unit), discount, badge-dietary, shipping-free | `text-price-current`, `bg-discount`… |
| `color.focus` | ring, ring-inverse | `outline-focus`, `outline-focus-inverse` |

### Key values
| Token | Value | Use |
|---|---|---|
| `color.action.primary.bg` | `tomato.500` (#E30613) | CTAs: Agregar, Ver productos |
| `color.action.primary.bg-hover` / `-active` | `tomato.600` (#C20510) / `tomato.700` (#9A040D) | Hover, pressed |
| `color.surface.accent` | `sage.600` (#15803D) | Top bar, green surfaces with text (5.02:1) |
| `color.text.secondary` | `neutral.500` (#6B6B6B) | Metadata, unit price (5.33:1) |
| `button.shape.default` | `radius.md` (8px) | Purchase and UI actions |
| `button.shape.pill` | `radius.full` | Marketing only: hero, category banners, newsletter |
| `border-width.focus` | 1px | Fields: focus recolors the border, no extra outline |
| `button.focus-width` | `border-width.lg` (2px) | Buttons and links: outline with 2px offset |

---

## How to use tokens in code

### Install

```bash
npm i github:e-roman/orali-design-tokens
```

### CSS custom properties

```tsx
// app/layout.tsx: import once
import "@orali/design-tokens/tokens.css"
```

```css
.price-unit {
  color: var(--color-commerce-price-unit);
  font: var(--typography-caption);
}
```

### Tailwind

```ts
// tailwind.config.ts
import oraliTokens from "@orali/design-tokens/tailwind"

export default {
  presets: [oraliTokens],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
}
```

```tsx
<button className="h-10 w-full rounded-md bg-action-primary text-on-primary hover:bg-action-primary-hover">
  Agregar
</button>
<span className="text-price-current">$ 12.600</span>
<span className="text-price-unit">$ 4.200 por unidad</span>
```

| Token | Tailwind utility |
|---|---|
| `color.surface.*` | `bg-default`, `bg-subtle`, `bg-muted`, `bg-brand`, `bg-accent`… |
| `color.text.*` | `text-primary`, `text-secondary`, `text-brand`, `text-accent`… |
| `color.border.*` | `border-default`, `border-strong`, `border-brand`… (also `ring-*`, `divide-*`) |
| `color.icon.*` | `text-icon-default`, `text-icon-brand`… |
| `color.form.*` | `bg-form`, `border-form`, `focus:border-form-focus`, `placeholder:text-form-placeholder` |
| `color.action.{role}.bg[-state]` | `bg-action-primary`, `hover:bg-action-primary-hover` |
| `color.action.{role}.fg` | `text-on-primary` |
| `color.feedback.{kind}.*` | `bg-success-subtle`, `bg-success`, `text-error`, `border-warning` |
| `color.commerce.*` | `text-price-current`, `bg-discount`, `bg-badge-dietary`, `text-shipping-free` |
| `radius.*` | `rounded`, `rounded-md`, `rounded-xl`, `rounded-full` (replaces Tailwind's scale) |
| `elevation.*` | `shadow-subtle`, `shadow-card`, `shadow-card-hover`, `shadow-dropdown`, `shadow-overlay` (replaces Tailwind's scale) |
| `layer.*` | `z-sticky`, `z-header`, `z-overlay`, `z-drawer`, `z-modal`, `z-modal-top`, `z-progress` (replaces Tailwind's scale) |
| `typography.*` | `text-display`, `text-heading-xl`, `text-heading-lg`, `text-body-md`, `text-label`, `text-caption`… (size + line-height + weight) |
| `color.focus.ring-inverse` | `outline-focus-inverse`, `ring-focus-inverse` (focus on dark/green surfaces and photos) |

**Opacity modifiers work.** Every opaque color also ships as RGB channels (`--color-surface-muted-rgb: 228 228 228`), so `bg-muted/70` and `from-scrim/75` compile. With plain `var()` colors, Tailwind 3 drops those classes without a warning.

Spacing and font sizes follow Tailwind's scale 1:1, so the preset doesn't redefine them. Font families keep a single name for Figma; the CSS appends `system-ui, sans-serif`.

---

## Sync workflow

```
Tokens Studio (edit tokens)  ──push──▶  GitHub branch (figma-ds)
        │                                     │
        ▼                                     ▼  GitHub Actions
Export to Figma Variables            Style Dictionary → dist/
                                              │
                                              ▼  tag (v2.0.0)
                                 Tienda Orali (Next.js + Tailwind)
```

To update tokens:
1. Edit tokens **in Tokens Studio** (not in Figma's variables panel: those edits don't reach GitHub on the free plan)
2. Push to a branch, never to `main`
3. Export styles & variables to Figma (by token sets, without removing unlinked variables)
4. Merge, tag, and point the site to the tag

Local build:

```bash
npm install
npm run build
```

---

## Site migration (tienda-orali)

| Before | After |
|---|---|
| 6 brand colors in `globals.css`, used directly (`text-charcoal`, `bg-tomato`) | Semantic utilities only (`text-primary`, `bg-action-primary`) |
| Tailwind's default palette mixed in (`green-600`, `red-50`, `amber-*`, `blue-*`) | Mapped to `feedback.*`, `commerce.*` and brand-tint tokens |
| 12 opacity-modified classes (39 usages) silently dropped | Compiled via RGB channels |
| Hover = `opacity: 0.9` | Hover = `action.primary.bg-hover` |
| 7 border radii, including Tailwind's `md` (6px) | 6 radii, enforced by the preset |
| Mixed radii with no rule: pill on some purchase actions, 8px on others | Two shapes with a rule: 8px (`button.shape.default`) for purchase and UI actions, pill (`button.shape.pill`) only for marketing CTAs and filters |
| One stepper size everywhere | Stepper sm 32px (cart, drawer), md 40px (card, shares slot with Add to cart), lg 44px (product page) |
| Green text on white at 4.08:1 | `sage.600` at 5.02:1 |
| v2: `bg`/`text` names and partial scales | `surface`, `text.primary/secondary`, `icon`, `form`; full 50–950 scales; radius `md` added |

Verified with before/after screenshots across 9 routes × 2 viewports. The v2 migration (33 files) is pixel-identical to v1.

---

## Accessibility

Color tokens are audited against WCAG 2.2 AA:
- `text.primary` on `surface.default`: 17.40:1
- `text.secondary` on `surface.default`: 5.33:1, on `surface.subtle`: 4.89:1
- White on `action.primary.bg`: 4.88:1
- White on `action.accent.bg` / `commerce.badge-dietary.bg` (`sage.600`): 5.02:1
- `sage.500` (#1A9139) is kept as a brand color for illustration only: 4.08:1 with white
- `text.tertiary` (1.27:1) is decorative only, always with `aria-hidden`
- Focus: buttons and links 2px `focus.ring` with 2px offset; fields recolor their 1px border (`form.border-focus`)
- Touch targets: primary and outline buttons 44px (`size.control.lg`); compact stepper buttons 32×32 (above the 24px WCAG 2.2 minimum)

---

## Figma file

- **Design System:** [Figma: Orali Ecommerce DS](https://www.figma.com/design/0JYNJACp8FxPdfAT1OgHig)
- **Live site:** [staging.tiendaorali.com](https://staging.tiendaorali.com)

---

## Stack

| Tool | Role |
|---|---|
| Figma + Variables | Single source of truth for design |
| Tokens Studio | Token editing, GitHub sync, export to Figma Variables |
| Style Dictionary v4 | DTCG → CSS / JSON / Tailwind preset |
| GitHub Actions | Auto-build pipeline |
| Tailwind CSS 3 | Frontend consumption via preset |
| Next.js 14 / React | Site implementation |
| zeroheight | Documentation |

---

*Emiliano Román, UX/UI Designer & Design Technologist, Buenos Aires, Argentina*
*[emilianoroman.com.ar](https://www.emilianoroman.com.ar)*
