# Stepper

Control de cantidad. Reemplaza al botón **Agregar** en la card de producto una vez que el producto está en el carrito.

## Comportamiento

| Estado del producto | Control visible |
|---|---|
| No está en el carrito | Button / Add to cart |
| Cantidad ≥ 1 | Stepper (− cantidad +) |
| Cantidad llega a 0 con − | Vuelve a Button / Add to cart |

El cambio botón ↔ stepper es un **cambio de estado del mismo control**, no dos componentes distintos. Por eso, en la card, comparten forma y altura: el slot no salta.

## Anatomía

`[ − ]   cantidad   [ + ]`

1. Botón decrementar (icono)
2. Valor de cantidad (centrado)
3. Botón incrementar (icono)
4. Contenedor con borde

## Tokens

| Propiedad | Token | Valor |
|---|---|---|
| Fondo | `stepper.bg` | white |
| Texto cantidad | `stepper.fg` | neutral.900 |
| Iconos −/+ | `stepper.icon` | tomato.600 |
| Borde | `stepper.border` / `stepper.border-width` | tomato.600 / 1px |
| Radius | `stepper.radius` → `button.add-to-cart.radius` | 8px |
| Altura sm | `stepper.height-sm` → `size.control.xs` | 32px (carrito, drawer) |
| Altura md | `stepper.height` → `button.add-to-cart.height` | 40px (card) |
| Altura lg | `stepper.height-lg` → `size.control.lg` | 44px (PDP) |
| Padding horizontal | `stepper.padding-x` | 12px |
| Área táctil −/+ | `stepper.hit-area` / `stepper.hit-area-sm` | 40×40px / 32×32px en sm |
| Tipografía | `typography.label` | 14 / 500 |
| Transición | `stepper.transition` | 150ms standard |

`stepper.radius` y `stepper.height` **referencian** los tokens del botón: si cambia el botón, el stepper lo sigue.

## Un control, tres tamaños

En la card, el Stepper hereda altura y radio del botón Agregar por referencia: comparten slot y el cambio de estado no lo hace saltar.

En el carrito esa regla no aplica. El Stepper es una línea más de la fila y a 40px quedaba demasiado grande, así que usa su propio tamaño: 32px (`stepper.height-sm`). En la página de producto es la acción principal y sube a 44px (`stepper.height-lg`).

| Tamaño | Token | Altura | Dónde |
|---|---|---|---|
| sm | `stepper.height-sm` → `size.control.xs` | 32px | Carrito, drawer |
| md | `stepper.height` → `button.add-to-cart.height` | 40px | Card de producto |
| lg | `stepper.height-lg` → `size.control.lg` | 44px | Página de producto |

## Estados

| Estado | Spec |
|---|---|
| Default | Según tabla |
| Mínimo (1) | − sigue activo: llevar a 0 elimina del carrito |
| Máximo (stock) | + deshabilitado, opacidad 50% |
| Loading | Valor reemplazado por spinner mientras se actualiza el carrito; −/+ bloqueados |
| Hover −/+ | `stepper.bg-hover` (tomato.50) |
| Focus | `color.focus.ring` 2px en cada botón −/+, no en el contenedor |

## Uso

**Do**

- Mismo ancho que el botón Agregar (full-width de la card).
- Actualizar el contador del carrito en el header en cada cambio.

**Don't**

- Usar radius distinto al del botón Agregar.
- Permitir edición por teclado del número sin validar stock.

## Accesibilidad

- `role="group"` con `aria-label="Cantidad de {producto}"`.
- Botones: `aria-label="Quitar uno"` / `"Agregar uno"`.
- Valor con `aria-live="polite"` para anunciar el cambio.
- Contraste iconos tomato sobre blanco: 4.88:1 (AA).
