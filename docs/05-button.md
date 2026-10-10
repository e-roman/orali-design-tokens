# Button

Los botones disparan acciones. Orali tiene cuatro variantes, cada una con un rol claro en el flujo de compra.

## Variantes

| Variante | Uso | Ejemplo |
|---|---|---|
| **Primary** | Acción principal de una sección. Una por bloque. | Ver todos los productos, Suscribirme |
| **Add to cart** | Agregar producto desde card o PDP. Al agregar, se reemplaza por el Stepper | Agregar |
| **Outline** | Acción de cuenta o alternativa | Ingresar |
| **Secondary** | Acción secundaria oscura | Aplicar cupón, Continuar en checkout |

## Anatomía y tokens

| Propiedad | Primary | Add to cart | Outline |
|---|---|---|---|
| Fondo | `button.primary.bg` → tomato.500 | `button.add-to-cart.bg` → tomato.500 | transparent |
| Texto | white | white | `text.brand` |
| Borde | — | — | 1px `border.brand` |
| Altura | 44px (`size.control.lg`) | 40px (`size.control.md`) | 44px (`size.control.lg`) |
| Padding | 12 / 32 | full-width | 12 / 16 |
| Radius | `button.shape.default` → 8px | `button.shape.default` → 8px | `button.shape.default` → 8px |
| Tipografía | 14 / 600 | 14 / 500 | 14 / 500 |

## Forma: jerarquía de radius

El radius separa **marketing** de **compra**. Mezclar las dos formas en una misma pantalla de compra borra la jerarquía.

| Forma | Token | Dónde |
|---|---|---|
| **Default, 8px** | `button.shape.default` → `radius.md` | Agregar, Stepper, Finalizar compra, Continuar con el pago, Aplicar cupón, Ingresar, estados vacíos, formularios |
| **Pill** | `button.shape.pill` → `radius.full` | CTAs de hero, banners de categoría ("Ver productos"), newsletter ("Suscribirme"), filtros/chips |

En código: `<Button shape="pill">` o `buttonClasses({ shape: "pill" })`. La variante `inverse` (botón blanco sobre foto) ya es pill.

Badges (`-15%`, Vegano, Sin TACC) no son botones: usan `radius.sm` y no compiten con los CTAs.

## Estados

| Estado | Spec |
|---|---|
| Default | Según tabla |
| Hover | Primary / Add to cart: `action.primary.bg-hover` (tomato.600). Outline: `action.outline.bg-hover` (tomato.50). Transición `motion.transition.fast` |
| Active | `action.primary.bg-active` (tomato.700) |
| Focus | `button.focus-ring` 2px (`button.focus-width` → `border-width.lg`), offset 2px, solo con `:focus-visible`. Los campos usan 1px (`border-width.focus`) recoloreando el borde |
| Disabled | `opacity.disabled` (0.5), sin hover, `aria-disabled` |
| Loading | Spinner reemplaza el label, mantiene ancho |

## Uso

**Do**

- Un solo Primary por sección visible.
- Labels de 1–2 palabras en infinitivo o imperativo: "Agregar", "Ver productos".

**Don't**

- Usar sage como fondo de CTA de compra.
- Cambiar el radius de Add to cart sin cambiar el del Stepper: comparten slot y forma.
- Usar pill en acciones de compra o de formulario. Pill es solo marketing y filtros.

## Accesibilidad

- Contraste label/fondo 4.88:1 (AA).
- Targets: Primary y Outline 44px, Add to cart 40px dentro de card (ancho completo compensa).
- Botones de icono requieren `aria-label`.
