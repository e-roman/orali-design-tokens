# Changelog

## 2.0.0

Design system rebuilt from the Figma file. Breaking for consumers: class and variable names change, rendered values don't (site migration verified pixel-identical).

- Complete primitive scales (50–950) for neutral, tomato, sage, green, yellow, red, blue; `color.base.white|black`
- Brand steps renumbered: `tomato.500` = #E30613, `sage.600` = #15803D. Semantic values unchanged (AA)
- Radius scale: `sm 4 · md 8 · lg 12 · xl 16 · 2xl 20 · 3xl 24 · full`. Buttons, stepper, inputs and product cards use `md` (8px)
- Semantic groups: `surface`, `text`, `border`, `icon`, `brand`, `form`, `feedback.{kind}.{text,bg,border}`. `color.bg.*` → `color.surface.*`
- `border-width.focus` = 1px (fields recolor their border). Buttons keep a 2px outline (`border-width.lg`)
- Tailwind: `bg-*` from `surface`, `text-icon-*`, `bg-form`, `border-form*`, `text-form-*`
- `border.strong` (neutral.900) and `text.tertiary` (neutral.200, decorative only) keep v1 values
- CSS: font families get `system-ui, sans-serif` fallbacks; the token keeps a single family for Figma
- Figma: variable scopes set by use; primitive colors and type hidden from pickers

Migration map for consumers:

| v1 | v2 |
|---|---|
| `text-default` / `text-muted` / `text-decorative` | `text-primary` / `text-secondary` / `text-tertiary` |
| `text-brand-hover` / `text-warning-icon` | `text-link-hover` / `text-warning` |
| `bg-external-mercadopago` | `bg-mercadopago` |
| `rounded-lg` / `rounded-xl` / `rounded-2xl` | `rounded-md` / `rounded-lg` / `rounded-xl` (same px) |
| `--color-bg-*` / `--color-text-default` | `--color-surface-*` / `--color-text-primary` |
| `--color-feedback-{kind}-fg` | `--color-feedback-{kind}-text` |
| `--border-width-default` | `--border-width-sm` |

## 1.2.1

Changed
- `badge.{discount,dietary}.radius`: `radius.full` → `radius.sm` (4px). Labels stop competing with pill CTAs. `badge.counter` stays round.

## 1.2.0

Radius hierarchy: pill stops being the default button shape.

Added
- `button.shape.default` (`radius.lg`, 8px) and `button.shape.pill` (`radius.full`)
- `size.control.xs` (32px)
- `stepper.height-sm` and `stepper.hit-area-sm` for cart and drawer

Changed
- `button.{primary,add-to-cart,secondary,outline,neutral}.radius`: `radius.full` → `button.shape.default` (8px). `stepper.radius` follows add-to-cart.
- `button.inverse.radius` → `button.shape.pill` (stays pill: it sits on banner photos)

Migration: marketing CTAs (hero, category banners, newsletter) add `shape="pill"`. Cart and drawer steppers use `size="sm"`.

## 1.1.0

**Breaking for consumers:** `boxShadow` and `zIndex` now *replace* Tailwind's scales. `shadow-sm|lg|xl|2xl` and `z-40|z-50` stop generating. Update the dependency in the same PR that migrates those classes.

Added
- `shadow.*` (sm → 2xl) and semantic `elevation.*`: `subtle`, `card`, `card-hover`, `dropdown`, `overlay`
- `z-index.*` and semantic `layer.*`: `sticky`, `header`, `overlay`, `mobile-menu`, `drawer`, `modal`, `modal-top`, `progress`
- `typography.heading-xl` (36/40) and Tailwind utilities for every composite style: `text-heading-lg`, `text-body-sm`, `text-caption`…
- `color.focus.ring-inverse` for focus on dark, green and photographic surfaces
- `color.external.mercadopago` + `color.bg.external-mercadopago`
- `button.inverse`, `button.neutral`, `button.size.{md,lg}`, `button.secondary.{height,padding-x,font-weight}`
- `stepper.height-lg`
- `input.form` and `input.pill` (replace the single `input.*` group)
- `card.content`, `card.product.shadow`, `card.product.shadow-hover`
- `badge.counter`

Changed
- `card.product.radius`: `radius.2xl` → `radius.lg` (matches production)

## 1.0.1

- TypeScript declarations for the Tailwind preset

## 1.0.0

- Initial release: primitive → semantic → component, commerce group, CSS with references + RGB channels, Tailwind preset
