# Spacing

Spacing sobre una grilla base de **4px**. Los tokens usan la misma escala que Tailwind (`space.4` = 16px = `p-4`), por eso el preset no redefine spacing: Figma y código hablan el mismo idioma sin duplicar valores.

## Escala

| Token | Valor | Uso típico |
|---|---|---|
| `space.1` | 4px | Ícono + texto compacto |
| `space.1-5` | 6px | Gap en chips y badges |
| `space.2` | 8px | Gap entre elementos relacionados |
| `space.3` | 12px | Gap interno de card, padding vertical de input |
| `space.4` | 16px | Gutter mobile, padding de controles |
| `space.5` | 20px | Padding de cards de beneficio |
| `space.6` | 24px | Gutter desktop, padding de bloques |
| `space.8` | 32px | Padding horizontal de CTA principal |
| `space.10` | 40px | Separación entre grupos |
| `space.12` | 48px | Separación entre bloques |
| `space.16` | 64px | Separación entre secciones |

## Alturas de control

| Token | Valor | Uso |
|---|---|---|
| `size.control.xs` | 32px | Stepper en carrito y drawer |
| `size.control.md` | 40px | Agregar y Stepper en card |
| `size.control.lg` | 44px | Primary, Outline, Stepper en página de producto |

## Layout

| Token | Valor |
|---|---|
| `size.container` | 1280px — ancho máximo de contenido |
| `breakpoint.sm` | 640px |
| `breakpoint.md` | 768px |
| `breakpoint.lg` | 1024px |

## Radius

La escala usa los mismos nombres que Tailwind y **reemplaza** la de Tailwind: solo existen estos valores.

| Token | Tailwind | Valor | Uso |
|---|---|---|---|
| `radius.sm` | `rounded` | 4px | Badges de descuento y dietarios, skeletons |
| `radius.lg` | `rounded-lg` | 8px | Botones de compra y formulario, stepper, inputs, cards de producto |
| `radius.xl` | `rounded-xl` | 12px | Modales, bloques de checkout |
| `radius.2xl` | `rounded-2xl` | 16px | Cards de contenido, "¿Cómo funciona?" |
| `radius.3xl` | `rounded-3xl` | 24px | Contenedores destacados |
| `radius.full` | `rounded-full` | 9999px | CTAs de marketing, filtros, contador del carrito |

`rounded-md` (6px) se eliminó: los 5 usos pasaron a `rounded-lg`.

## Elevación

Cinco sombras primitivas y cinco usos semánticos. Reemplazan la escala de Tailwind.

| Token | Tailwind | Uso |
|---|---|---|
| `elevation.subtle` | `shadow-subtle` | Cards de contenido en reposo |
| `elevation.card` | `shadow-card` | Card de producto en reposo |
| `elevation.card-hover` | `shadow-card-hover` | Card de producto en hover, barra flotante |
| `elevation.dropdown` | `shadow-dropdown` | Menús del nav, resultados de búsqueda |
| `elevation.overlay` | `shadow-overlay` | Drawers, modales, bottom sheets |

## Capas

| Token | Valor | Uso |
|---|---|---|
| `layer.sticky` | 40 | Barra de mínimo de compra |
| `layer.header` | 50 | Header, dropdowns del nav |
| `layer.overlay` | 60 | Scrim del carrito |
| `layer.drawer` | 70 | Panel del carrito |
| `layer.modal` | 100 | Bottom sheet, confirmaciones |
| `layer.modal-top` | 110 | Login (puede abrirse sobre otro modal) |
| `layer.progress` | 200 | Barra de progreso de navegación |

## Movimiento

| Token | Valor |
|---|---|
| `motion.transition.fast` | 150ms cubic-bezier(.4,0,.2,1) — hover |
| `motion.transition.base` | 300ms cubic-bezier(.4,0,.2,1) — drawers, acordeones |

Respetar `prefers-reduced-motion`: desactivar transiciones de 300ms o más.
