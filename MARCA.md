# SOLINAG SAS — Tokens de marca para web

Fuente: *Manual de Identidad Corporativa*, SOLINAG SAS, v2026 (8 pp.).
Brief completo: https://claude.ai/code/artifact/5ce32a07-96ae-43e5-a820-e9b52a1764d4

## Identidad

| | |
|---|---|
| Marca comercial | SOLINAG SAS |
| Razón social | SOLUCIONES DE INGENIERÍA PARA LA INDUSTRIA Y EL AGRO SAS |
| Slogan | INNOVACIÓN QUE TRANSFORMA |
| Descriptor | AGRO · INDUSTRIA · SOSTENIBILIDAD |
| Web | www.solinag.com.co |
| Dirección | Manzana A Lote 4 Los Laureles, Turbaco, Bolívar, Colombia |
| Tel. | +57 319 775 4909 |
| Correo | ewis.campos@solinag.com.co |

## Color

⚠️ **Pendiente de confirmar con el diseñador de la identidad.** Los HEX de la sección 4
del manual no coinciden con el arte del logo (muestreado del PDF):

| | Manual | Arte real |
|---|---|---|
| Azul | `#2144A1` | ~`#00408F` |
| Verde | `#89F336` | ~`#7DC623` |

Además `#89F336` sobre blanco da **1.41:1** — inusable para texto (WCAG AA pide 4.5).
Sobre `#0C1626` da 12.9:1. Es un color de modo oscuro.

Tokens propuestos mientras se resuelve:

```css
:root {
  --blue:       #2144A1; /* 8.7:1 en blanco — titulares, enlaces, botón primario */
  --blue-deep:  #0E2A5C; /* 14:1 con blanco — footer, secciones oscuras, overlays */
  --green-sig:  #89F336; /* SOLO sobre fondo oscuro — acentos, cifras, estados */
  --green-mark: #7DC623; /* 2.1:1 — reglas, iconos, bordes. NUNCA texto */
  --green-text: #3E7A12; /* 5.3:1 en blanco — única variante verde legible en claro */
  --paper:      #F4F6F2; /* fondo alterno */
}
```

Proporción: ~70% blanco/papel · ~25% azul · ~5% verde.

## Tipografía

El manual no fija familia: pide sans serif limpia con jerarquía clara.

- Titulares: grotesca ancha (Archivo / Barlow), 700–800, tracking −0.02em
- Texto: misma familia 400/500, 16–18px, medida 65–70 caracteres
- Slogan: mayúsculas, tracking +0.08em
- Descriptor: mayúsculas, tracking +0.16em (sirve de eyebrow en toda la web)
- Datos técnicos: monoespaciada

## Reglas del manual

**Hacer**
- Azul + verde sobre blanco / fondos muy claros
- Blanco + verde sobre negro, azul oscuro, jean
- Fotografía real de fabricación, equipos y proyectos
- Área libre generosa alrededor del logo

**Evitar**
- Deformar el logo, cambiar colores, añadir sombras/degradados/contornos
- Separar los elementos del logotipo
- Reducirlo hasta perder legibilidad; fondos cargados
- Reconstruir el logotipo escribiendo el nombre — usar siempre el arte original

## Assets pendientes

- [ ] SVG maestros de las dos versiones (azul+verde, blanco+verde)
- [ ] Isotipo suelto (engranaje + hoja) para favicon, avatar y header móvil
- [ ] Confirmación de HEX corporativos
- [ ] Banco de fotografía propia: planta, equipos, proyectos
- [ ] Decisión: rediseño sobre solinag.com.co o sitio nuevo
