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
| `radius.sm` | `rounded` | 4px | Skeletons, elementos chicos |
| `radius.lg` | `rounded-lg` | 8px | Cards de producto, inputs, botones secundarios |
| `radius.xl` | `rounded-xl` | 12px | Modales, bloques de checkout |
| `radius.2xl` | `rounded-2xl` | 16px | Cards de contenido, "¿Cómo funciona?" |
| `radius.3xl` | `rounded-3xl` | 24px | Contenedores destacados |
| `radius.full` | `rounded-full` | 9999px | CTAs, Add to cart, stepper, badges |

`rounded-md` (6px) se eliminó: los 5 usos pasaron a `rounded-lg`.

## Elevación y movimiento

| Token | Valor |
|---|---|
| `shadow.sm` | 0 1px 2px rgba(0,0,0,.05) — única elevación; Orali separa con borde, no con sombra |
| `motion.transition.fast` | 150ms cubic-bezier(.4,0,.2,1) — hover |
| `motion.transition.base` | 300ms cubic-bezier(.4,0,.2,1) — drawers |

Respetar `prefers-reduced-motion`: desactivar transiciones de 300ms o más.
