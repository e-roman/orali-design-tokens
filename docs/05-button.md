# Button

Los botones disparan acciones. Orali tiene siete jerarquías y cuatro tamaños, cada uno con un rol claro en el flujo de compra.

## Propiedades del componente

El botón tiene tres ejes independientes. En Figma son propiedades del componente; en código, props.

| Propiedad | Valores |
|---|---|
| **Hierarchy** | primary, add-to-cart, secondary, outline, neutral, inverse, link |
| **Size** | sm, md, lg, xl |
| **State** | default, hover, active, focus, disabled |

La jerarquía define **colores, radius y peso**. El tamaño define **alto, padding, gap, tipografía e ícono**. Ningún token de jerarquía define medidas.

## Jerarquías

| Jerarquía | Uso | Tamaño habitual | Ejemplo |
|---|---|---|---|
| **Primary** | Acción principal de una sección. Una por bloque | lg | Ver todos los productos, Suscribirme |
| **Add to cart** | Agregar desde card o PDP. Al agregar se reemplaza por el Stepper | md | Agregar |
| **Secondary** | Acción secundaria oscura | md | Aplicar cupón, Continuar en checkout |
| **Outline** | Acción de cuenta o alternativa | lg | Ingresar |
| **Neutral** | Acción terciaria sobre superficie clara | md | Cancelar, Ver más |
| **Inverse** | Botón blanco sobre foto. Siempre pill | md | Ver productos (banners) |
| **Link** | Acción con peso de texto, sin fondo | según contexto | Ver detalle, Editar dirección |

## Colores por jerarquía

| Jerarquía | Fondo · hover · active | Texto | Borde |
|---|---|---|---|
| Primary / Add to cart | `action.primary.bg` tomato.500 · 600 · 700 | white | — |
| Secondary | `action.secondary.bg` neutral.900 · 500 · 700 | white | — |
| Outline | transparent · tomato.50 · tomato.100 | `text.brand` | `border.brand` |
| Neutral | `action.neutral.bg` white · neutral.100 · neutral.200 | `text.primary` | `border.default` |
| Inverse | white · neutral.100 · neutral.200 | `text.primary` | — |
| Link | — | `action.link.fg` tomato.500 · 600 · 700 | — |

## Tamaños

El alto sale de **interlineado + padding vertical × 2**. `button.size.{size}.height` se usa como `min-height`, no como fuente de verdad.

| Size | Alto | Padding (y / x) | Gap | Tipografía | Ícono |
|---|---|---|---|---|---|
| **sm** | 36px | 8 / 12 | 6 | 14 / 20 | 16 |
| **md** | 40px | 10 / 16 | 8 | 14 / 20 | 16 |
| **lg** | 44px | 12 / 20 | 8 | 14 / 20 | 20 |
| **xl** | 48px | 12 / 24 | 8 | 16 / 24 | 20 |

Tokens: `button.size.{sm|md|lg|xl}.{height|padding-y|padding-x|gap|font-size|line-height|icon-size}`.

Link ignora `padding-x` del tamaño (`button.link.padding-x` → 0) para alinearse con el texto que lo rodea.

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
| Hover | `button.{hierarchy}.bg-hover`. Link: `fg-hover` + subrayado. Transición `motion.transition.fast` |
| Active | `button.{hierarchy}.bg-active`. Link: `fg-active` |
| Focus | `button.focus-ring` 2px (`button.focus-width` → `border-width.lg`), offset `button.focus-offset` 2px, solo con `:focus-visible`. Los campos usan 1px (`border-width.focus`) recoloreando el borde |
| Disabled | Set compartido: fondo `button.disabled.bg` (neutral.100), texto e ícono `button.disabled.fg` (neutral.400), borde `button.disabled.border` (neutral.200) en outline y neutral. Link: solo `button.disabled.link-fg`. Sin hover, `aria-disabled`. **No usar opacidad** |
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

- Contraste label/fondo 4.88:1 (AA). Deshabilitados exentos de contraste mínimo (WCAG 1.4.3), pero el label debe seguir legible.
- Targets: lg y xl cumplen 44px. sm y md solo en desktop o con ancho completo (Add to cart en card).
- Link: si navega es `<a>`; si ejecuta una acción es `<button>` con estilo de link.
- Botones de icono requieren `aria-label`.
