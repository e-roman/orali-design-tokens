# Color

El color en Orali comunica marca, acción y estado. Un rojo de marca para todo lo accionable, un verde para lo natural y lo confirmado, y neutros para estructura. Las escalas primitivas son completas (50–950) para poder escalar; la UI solo usa la capa semántica.

## Principios

- **El rojo es acción.** `tomato.500` (#E30613) se reserva para CTAs, precios en oferta y links. Si todo es rojo, nada es prioritario.
- **El verde es producto y confirmación.** `sage.500` (#1A9139) es el verde de marca para ilustración; `sage.600` (#15803D) se usa para texto y fondos con texto porque `sage.500` no llega a AA. No se usa en CTAs de compra.
- **Siempre semánticos en UI.** Los componentes consumen `surface`, `text`, `border`, `icon`, `action`, `form`, `feedback`. Los primitivos están ocultos en los selectores de Figma y solo se referencian desde la capa semántica.

## Paleta primitiva

Siete escalas de 11 pasos (50–950): `neutral`, `tomato`, `sage`, `green`, `yellow`, `red`, `blue`. Más `base.white`, `base.black`, `alpha.*` (negro y blanco con transparencia) y `external.mercadopago`.

| Escala | Pasos de referencia | Rol |
|---|---|---|
| `tomato` | 500 = #E30613 · 600 = #C20510 · 700 = #9A040D | Rojo de marca, hover, activo |
| `sage` | 500 = #1A9139 · 600 = #15803D · 700 = #126528 | Verde de marca (ilustración), verde accesible, hover |
| `neutral` | 100 = #F5F5F5 · 200 = #E4E4E4 · 500 = #6B6B6B · 900 = #1A1A1A | Fondo subtle, bordes, texto secundario, texto principal |
| `green` | 700 = #15803D | Feedback de éxito |
| `yellow` | 700 = #A16207 | Feedback de advertencia |
| `red` | — | Reserva para escalar feedback |
| `blue` | 700 = #1D4ED8 | Feedback informativo |

> Embed sugerido en zeroheight: bloque **Color palette** conectado al set `primitive` vía Tokens Studio / GitHub.

## Tokens semánticos

### Superficies (`color.surface.*`)
| Token | Tailwind | Referencia | Cuándo usarlo |
|---|---|---|---|
| `surface.default` | `bg-default` | base.white | Página, nav, cards, modales |
| `surface.page` | `bg-page` | neutral.50 | Fondo de página alternativo |
| `surface.subtle` | `bg-subtle` | neutral.100 | Bandas de sección, hover neutro |
| `surface.muted` | `bg-muted` | neutral.200 | Skeletons, chips inactivos |
| `surface.brand` | `bg-brand` | tomato.500 | Contador del carrito, barra de progreso |
| `surface.brand-subtle` | `bg-brand-subtle` | tomato.50 | Paso destacado de "¿Cómo funciona?", empty states |
| `surface.accent` | `bg-accent` | sage.600 | Barra superior, superficies verdes con texto |
| `surface.inverse` | `bg-inverse` | neutral.900 | Footer, superficies oscuras |
| `surface.overlay` / `overlay-strong` | `bg-overlay` / `bg-overlay-strong` | negro 50% / 60% | Scrim de modales y drawers |
| `surface.mercadopago` | `bg-mercadopago` | external.mercadopago | Botón de Mercado Pago |

Gradientes sobre fotos: `from-scrim/75 via-scrim/45 to-scrim/5`.

### Texto (`color.text.*`)
| Token | Tailwind | Referencia | Cuándo usarlo |
|---|---|---|---|
| `text.primary` | `text-primary` | neutral.900 | Títulos y cuerpo |
| `text.secondary` | `text-secondary` | neutral.500 | Gramaje, "por unidad", metadatos |
| `text.tertiary` | `text-tertiary` | neutral.200 | Solo decorativo: numerales y flechas. Nunca información |
| `text.disabled` | `text-disabled` | neutral.300 | Texto deshabilitado |
| `text.brand` / `text.link` | `text-brand` / `text-link` | tomato.500 | Links, precio en oferta, íconos de acción |
| `text.link-hover` | `text-link-hover` | tomato.600 | Hover de links |
| `text.accent` | `text-accent` | sage.600 | Eyebrows, etiquetas veganas |
| `text.inverse` / `on-brand` | `text-inverse` / `text-on-brand` | base.white | Sobre superficies de marca u oscuras |
| `text.inverse-muted` | `text-inverse-muted` | blanco 80% | Texto secundario sobre superficies oscuras |

### Bordes (`color.border.*`) e íconos (`color.icon.*`)
| Token | Tailwind | Referencia | Cuándo usarlo |
|---|---|---|---|
| `border.default` | `border-default` | neutral.200 | Divisores, cards |
| `border.strong` | `border-strong` | neutral.900 | Hover y selección de chips y filtros |
| `border.focus` | `border-focus` | tomato.500 | Campo en foco |
| `border.brand` / `brand-subtle` | `border-brand` / `border-brand-subtle` | tomato.500 / tomato.200 | Botón outline, stepper / tintes de marca |
| `border.accent` | `border-accent` | sage.600 | Bordes verdes |
| `border.inverse` | `border-inverse` | blanco 30% | Sobre fotos y superficies oscuras |
| `icon.default` / `subtle` | `text-icon-default` / `text-icon-subtle` | neutral.600 / neutral.500 | Íconos de UI |
| `icon.brand` / `inverse` | `text-icon-brand` / `text-icon-inverse` | tomato.500 / base.white | Íconos de acción / sobre oscuro |

### Acciones y foco
| Token | Referencia | Cuándo usarlo |
|---|---|---|
| `action.primary.bg` / `.fg` | tomato.500 / white | Agregar, Ver productos, Suscribirme |
| `action.primary.bg-hover` / `-active` | tomato.600 / tomato.700 | Estados de CTA |
| `action.outline.bg-hover` / `-active` | tomato.50 / tomato.100 | Hover de outline y stepper |
| `action.secondary.bg` / `.fg` | neutral.900 / white | Acción secundaria oscura (aplicar cupón) |
| `action.accent.bg` / `.fg` / `-hover` | sage.600 / white / sage.700 | Confirmaciones |
| `focus.ring` | tomato.500 | Foco de teclado en links y botones: 2px, offset 2px |
| `focus.ring-inverse` | white | Foco sobre fotos y superficies oscuras o de marca |

### Formularios (`color.form.*`)
| Token | Tailwind | Referencia |
|---|---|---|
| `form.bg` / `bg-disabled` / `bg-error` | `bg-form` / `bg-form-disabled` / `bg-form-error` | white / neutral.100 / tomato.50 |
| `form.border` / `border-hover` | `border-form` / `border-form-hover` | neutral.200 / neutral.400 |
| `form.border-focus` | `focus:border-form-focus` | tomato.500. **En foco el borde de 1px cambia de color, sin línea extra** |
| `form.border-error` | `border-form-error` | tomato.600 |
| `form.placeholder` / `text-disabled` | `placeholder:text-form-placeholder` / `text-form-text-disabled` | neutral.500 / neutral.400 |

## Feedback (`color.feedback.{tipo}.*`)

| Tipo | Fondo (`bg-*-subtle`) | Borde (`border-*`) | Texto (`text-*`) | Sólido (`bg-*`) |
|---|---|---|---|---|
| success | green.50 | green.300 | green.700 | green.700 |
| warning | yellow.50 | yellow.300 | yellow.700 | — |
| error | tomato.50 | tomato.200 | tomato.600 | — |
| info | blue.50 | blue.300 | blue.700 | — |

## Commerce

Tokens propios del e-commerce. Aunque resuelven al mismo valor que un semántico genérico, existen para poder cambiar el precio o el descuento sin tocar el resto de la UI.

| Token | Tailwind | Valor | Uso |
|---|---|---|---|
| `commerce.price.current` | `text-price-current` | neutral.900 | Precio final del pack |
| `commerce.price.previous` | `text-price-previous` | neutral.500 | Precio anterior (tachado) |
| `commerce.price.unit` | `text-price-unit` | neutral.500 | "$ 4.200 por unidad" |
| `commerce.discount.{bg,fg,border}` | `bg-discount text-discount border-discount` | white / tomato.500 / tomato.500 | Badge "-15%" |
| `commerce.badge-dietary.{bg,fg}` | `bg-badge-dietary text-badge-dietary` | sage.600 / white | Vegano, Sin TACC, Premium |
| `commerce.shipping-free.fg` | `text-shipping-free` | sage.600 | "Gratis" en el resumen |

## Accesibilidad (WCAG 2.2 AA)

| Combinación | Ratio | Resultado |
|---|---|---|
| text.primary / surface.default | 17.40:1 | ✅ AA/AAA |
| text.secondary / surface.default | 5.33:1 | ✅ AA |
| text.secondary / surface.subtle | 4.89:1 | ✅ AA |
| text.secondary / surface.muted | 4.19:1 | ⚠️ Solo texto grande |
| white / action.primary.bg | 4.88:1 | ✅ AA |
| white / action.primary.bg-hover | 6.32:1 | ✅ AA |
| white / action.accent.bg (sage.600) | 5.02:1 | ✅ AA |
| white / sage.500 | 4.08:1 | ⚠️ Solo decorativo → por eso accent usa sage.600 |
| feedback success / warning / error / info (texto sobre su fondo) | 4.79 / 4.76 / 5.75 / 6.16 | ✅ AA |
| icon.default / icon.subtle sobre blanco | 7.81 / 5.33 | ✅ (mínimo 3:1) |
| text.tertiary / surface.default | 1.27:1 | Solo decorativo, con `aria-hidden` |

**Do:** texto o fondos verdes con texto → siempre `sage.600` (vía `text.accent`, `surface.accent`, `action.accent`).
**Don't:** `text.secondary` sobre `surface.muted`; usar `text.primary` en ese fondo.
