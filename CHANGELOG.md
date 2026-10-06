# Changelog

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
