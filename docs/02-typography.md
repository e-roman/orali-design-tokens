# Typography

Orali usa una sola familia, **Montserrat**, en cuatro pesos. La jerarquía se construye con tamaño y peso, no con más familias.

## Familia y pesos

| Token | Valor |
|---|---|
| `font.family.sans` | Montserrat, system-ui, sans-serif |
| `font.weight.regular` | 400 — cuerpo |
| `font.weight.medium` | 500 — botones, controles |
| `font.weight.semibold` | 600 — títulos |
| `font.weight.bold` | 700 — badges, énfasis puntual |

## Estilos tipográficos

| Token | Tailwind | Tamaño / Interlínea | Peso | Uso |
|---|---|---|---|---|
| `typography.display` | `text-display` | 60 / 60 | 600 | Hero (h1) |
| `typography.heading-xl` | `text-heading-xl` | 36 / 40 | 600 | Títulos de página (h1) desde md |
| `typography.heading-lg` | `text-heading-lg` | 30 / 36 | 600 | Títulos de página en mobile y de sección (h2) |
| `typography.heading-md` | `text-heading-md` | 20 / 28 | 600 | Subtítulos de bloque |
| `typography.heading-sm` | `text-heading-sm` | 14 / 20 | 600 | Nombre de producto (h3 en card) |
| `typography.body-md` | `text-body-md` | 16 / 24 | 400 | Texto base |
| `typography.body-sm` | `text-body-sm` | 14 / 20 | 400 | Descripciones, footer |
| `typography.label` | `text-label` | 14 / 20 | 500 | Botones y controles |
| `typography.caption` | `text-caption` | 12 / 16 | 400 | Precio por unidad, legales |

## Escala de tamaños

`2xs 11` · `xs 12` · `sm 14` · `md 16` · `lg 18` · `xl 20` · `2xl 24` · `3xl 30` · `4xl 36` · `6xl 60`

## Reglas

- Un solo `display` por página.
- `heading-sm` en cards: máximo 2 líneas, truncar con ellipsis.
- Precios: `body-md` semibold para el precio final, `caption` + `text.muted` para el precio por unidad.
- **Don't:** usar 11px (`2xs`) para información crítica; queda solo para metadatos decorativos.
