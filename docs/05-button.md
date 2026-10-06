# Button

Los botones disparan acciones. Orali tiene tres variantes, cada una con un rol claro en el flujo de compra.

## Variantes

| Variante | Uso | Ejemplo |
|---|---|---|
| **Primary** | Acción principal de una sección. Una por bloque. | Ver todos los productos, Suscribirme |
| **Add to cart** | Agregar producto desde card o PDP. Al agregar, se reemplaza por el [Stepper](#) | Agregar |
| **Outline** | Acción de cuenta o alternativa | Ingresar |
| **Secondary** | Acción secundaria oscura | Aplicar cupón, Continuar en checkout |

## Anatomía y tokens

| Propiedad | Primary | Add to cart | Outline |
|---|---|---|---|
| Fondo | `button.primary.bg` → tomato.600 | `button.add-to-cart.bg` → tomato.600 | transparent |
| Texto | white | white | `text.brand` |
| Borde | — | — | 1px `border.brand` |
| Altura | 44px (`size.control.lg`) | 40px (`size.control.md`) | 44px (`size.control.lg`) |
| Padding | 12 / 32 | full-width | 12 / 16 |
| Radius | `radius.full` | `radius.full` | `radius.full` |
| Tipografía | 14 / 600 | 14 / 500 | 14 / 500 |

## Estados

| Estado | Spec |
|---|---|
| Default | Según tabla |
| Hover | Primary / Add to cart: `action.primary.bg-hover` (tomato.700). Outline: `action.outline.bg-hover` (tomato.50). Transición `motion.transition.fast` |
| Active | `action.primary.bg-active` (tomato.800) |
| Focus | `button.focus-ring` 2px (`border-width.focus`), offset 2px, solo con `:focus-visible` |
| Disabled | `opacity.disabled` (0.5), sin hover, `aria-disabled` |
| Loading | Spinner reemplaza el label, mantiene ancho |

## Uso

**Do**
- Un solo Primary por sección visible.
- Labels de 1–2 palabras en infinitivo o imperativo: "Agregar", "Ver productos".

**Don't**
- Usar sage como fondo de CTA de compra.
- Cambiar el radius de Add to cart sin cambiar el del Stepper: comparten slot y forma.

## Accesibilidad

- Contraste label/fondo 4.88:1 (AA).
- Targets: Primary y Outline 44px, Add to cart 40px dentro de card (ancho completo compensa).
- Botones de icono requieren `aria-label`.
