# Color

El color en Orali comunica marca, acción y estado. La paleta es corta a propósito: un rojo de marca para todo lo accionable, un verde para lo natural y lo confirmado, y una escala de neutros cálidos para estructura.

## Principios

- **El rojo es acción.** `tomato.600` se reserva para CTAs, precios en oferta y links. Si todo es rojo, nada es prioritario.
- **El verde es producto y confirmación.** `sage.600` es el verde de marca para fondos e ilustración; `sage.700` se usa para texto y botones porque `sage.600` no llega a AA con texto chico. No se usa en CTAs de compra.
- **Siempre semánticos en UI.** Los componentes consumen `color.text.*`, `color.bg.*`, `color.border.*`, `color.action.*`. Los primitivos solo se referencian desde la capa semántica.

## Paleta primitiva

| Token | Valor | Nombre de marca | Uso |
|---|---|---|---|
| `color.tomato.800` | #9A040D | — | Active / pressed |
| `color.tomato.700` | #C20510 | — | Hover, texto de descuento |
| `color.tomato.600` | #E30613 | Tomato | Rojo de marca |
| `color.tomato.200` | #FECACA | — | Bordes de tinte de marca |
| `color.tomato.100` | #FEE2E2 | — | Active de outline |
| `color.tomato.50` | #FEF2F2 | — | Fondo de descuento |
| `color.sage.800` | #146C33 | — | Hover de acciones accent |
| `color.sage.700` | #15803D | — | Verde accesible: texto y botones |
| `color.sage.600` | #1A9139 | Sage | Verde de marca: solo ilustración y superficies sin texto chico |
| `color.sage.200` / `.50` | #BFE0C8 / #EFF7F1 | — | Borde / fondo de éxito |
| `color.neutral.900` | #1A1A1A | Charcoal | Texto principal |
| `color.neutral.500` | #6B6B6B | — | Texto secundario |
| `color.neutral.100` | #E4E4E4 | Dough | Bordes, fondos muted |
| `color.neutral.50` | #F5F5F5 | Cream | Bandas de sección |
| `color.neutral.0` | #FFFFFF | White | Superficies |

> Embed sugerido en zeroheight: bloque **Color palette** conectado al set `primitive` vía Tokens Studio / GitHub.

## Tokens semánticos

### Fondos
| Token | Tailwind | Referencia | Cuándo usarlo |
|---|---|---|---|
| `color.bg.default` | `bg-default` | neutral.0 | Página, nav, cards |
| `color.bg.subtle` | `bg-subtle` | neutral.50 | Bandas de sección, inputs secundarios |
| `color.bg.muted` | `bg-muted` | neutral.100 | Skeletons, placeholders, chips inactivos |
| `color.bg.brand` | `bg-brand` | tomato.600 | Contador del carrito, barra de progreso |
| `color.bg.brand-subtle` | `bg-brand-subtle` | tomato.50 | Iconos de empty state, paso activo de "¿Cómo funciona?" |
| `color.bg.accent` | `bg-accent` | sage.700 | Topbar, badges dietarios |
| `color.bg.inverse` | `bg-inverse` | neutral.900 | Superficies oscuras |
| `color.bg.overlay` / `-strong` | `bg-overlay` / `bg-overlay-strong` | black 50% / 60% | Scrim de modales, carrito y fotos |

Gradientes sobre fotos: `from-scrim/95 via-scrim/60 to-scrim/10`.

### Texto
| Token | Tailwind | Referencia | Cuándo usarlo |
|---|---|---|---|
| `color.text.default` | `text-default` | neutral.900 | Títulos y cuerpo |
| `color.text.muted` | `text-muted` | neutral.500 | Gramaje, "por unidad", metadatos |
| `color.text.decorative` | `text-decorative` | neutral.100 | Numerales y flechas decorativas. Nunca información |
| `color.text.brand` | `text-brand` | tomato.600 | Links, precio en oferta, iconos de acción |
| `color.text.accent` | `text-accent` | sage.700 | Eyebrows, etiquetas veganas |
| `color.text.inverse` | `text-inverse` | neutral.0 | Sobre superficies de marca u oscuras |

### Bordes y acciones
| Token | Referencia | Cuándo usarlo |
|---|---|---|
| `color.border.default` | neutral.100 | Divisores, inputs, cards |
| `color.border.strong` | neutral.900 | Hover/focus de inputs y chips |
| `color.border.brand` | tomato.600 | Botón outline |
| `color.action.primary.bg` / `.fg` | tomato.600 / white | Agregar, Ver productos, Suscribirme |
| `color.action.primary.bg-hover` / `-active` | tomato.700 / tomato.800 | Estados de CTA |
| `color.action.outline.bg-hover` | tomato.50 | Hover de outline y stepper |
| `color.action.secondary.bg` / `.fg` | neutral.900 / white | Acción secundaria oscura (aplicar cupón, confirmar paso) |
| `color.action.accent.bg` / `.fg` | sage.700 / white | Confirmaciones |
| `color.action.accent.bg-hover` | sage.800 | Hover de accent |
| `color.focus.ring` | tomato.600 | Focus visible: 2px, offset 2px |

## Feedback

| Rol | Fondo (`bg-*-subtle`) | Borde | Texto | Sólido |
|---|---|---|---|---|
| success | sage.50 | sage.200 | sage.700 | sage.700 (`bg-success`) |
| error | tomato.50 | tomato.200 | tomato.700 | — |
| warning | amber.50 | amber.200 | amber.800 (icono amber.700) | — |
| info | blue.50 | — | blue.700 | — |

Amber y blue no son colores de marca: existen solo para feedback.

## Commerce

Tokens propios del e-commerce. Aunque hoy algunos resuelven al mismo valor que un semántico genérico, existen para poder cambiar el precio o el descuento sin tocar el resto de la UI.

| Token | Tailwind | Valor | Uso |
|---|---|---|---|
| `color.commerce.price.current` | `text-price-current` | neutral.900 | Precio final del pack |
| `color.commerce.price.previous` | `text-price-previous` | neutral.500 | Precio anterior (tachado) |
| `color.commerce.price.unit` | `text-price-unit` | neutral.500 | "$ 4.200 por unidad" |
| `color.commerce.discount.{bg,fg,border}` | `bg-discount text-discount border-discount` | white / tomato.600 / tomato.600 | Badge "-15%" |
| `color.commerce.badge-dietary.{bg,fg}` | `bg-badge-dietary text-badge-dietary` | sage.700 / white | Vegano, Sin TACC, Premium |
| `color.commerce.shipping-free.fg` | `text-shipping-free` | sage.700 | "Gratis" en el resumen |

## Accesibilidad (WCAG 2.1 AA)

| Combinación | Ratio | Resultado |
|---|---|---|
| text.default / bg.default | 17.40:1 | ✅ AA/AAA |
| text.muted / bg.default | 5.33:1 | ✅ AA |
| text.muted / bg.subtle | 4.89:1 | ✅ AA |
| text.muted / bg.muted | 4.19:1 | ⚠️ Solo texto grande |
| text.inverse / action.primary | 4.88:1 | ✅ AA |
| text.brand / bg.default | 4.88:1 | ✅ AA |
| text.inverse / sage.600 | 4.08:1 | ⚠️ Solo decorativo → por eso action.accent usa sage.700 |
| text.inverse / action.accent (sage.700) | 5.02:1 | ✅ AA |
| text.inverse / action.primary.bg-hover | 6.32:1 | ✅ AA |
| commerce.discount.fg / bg (tomato.600 / white) | 4.88:1 | ✅ AA |
| commerce.badge-dietary.fg / bg (white / sage.700) | 5.02:1 | ✅ AA |

**Do:** para texto verde o botones verdes usar siempre `sage.700` (vía `text.accent` / `action.accent`).
**Don't:** texto muted sobre `bg.muted`; usar `text.default` en ese fondo.
