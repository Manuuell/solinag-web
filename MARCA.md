# SOLINAG SAS — Tokens de marca para web

Fuente: *Manual de Identidad Corporativa*, SOLINAG SAS, v2026 (8 pp.).

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

## Decisiones de marca (2026-08-24)

Manuel migró el sitio de HTML plano a Astro y, en el proceso, propuso varios
cambios de identidad sin coordinarlos primero. Quedaron resueltos así:

**Modo claro, no oscuro.** El sitio vuelve al fondo claro que ya estaba
validado contra el wireframe del cliente — es además el "uso preferente" que
marca el manual ("azul + verde sobre blanco o fondos muy claros"). El fondo
oscuro se mantiene como excepción puntual en tres secciones: el hero de cada
página, el footer y la banda "¿Por qué SOLINAG?" — ahí sí aplica la otra regla
del manual ("blanco + verde sobre negro, azul oscuro").

**HEX oficiales: los del manual, no los del arte.** Al revisar el logo
original sin procesar (`brand/logo.jpeg`) se confirmó, muestreando píxeles en
zonas sólidas, que el arte real usa `#024395` (azul) / `#88CD22` (verde) — no
`#2144A1` / `#89F336` como dice la tabla de la sección 4 del manual. Es una
discrepancia real entre el documento formal y el archivo que lo acompaña, no
un error de muestreo. Se decidió mantener oficiales los HEX del manual, que
además eran los que ya usaba el CSS desde antes de esta migración. El logotipo
en sí (los archivos `logo-*.png`) se usa tal cual, sin recolorearlo — el
manual también prohíbe "cambiar los colores corporativos" del arte.

**Verde para texto: ni green-500 ni green-700.** Verificando contraste real
(no solo por regla general) salió que `green-700` (`#4f9c17`), que el CSS ya
señalaba como "el verde legible en claro", en realidad da ~3.2:1 sobre el
fondo — no alcanza las 4.5:1 que pide WCAG AA. El tono que sí alcanza
(`#3E7A12`, ~4.9-5.3:1 según el fondo exacto) está cableado como
`--color-green-800` en `global.css` y es el que hay que usar para *texto e
íconos pequeños* verdes sobre fondo claro. `green-500` sigue siendo el
correcto sobre las bandas oscuras (12.9:1 ahí).

**Contacto: se publican los datos mejor atestiguados.** `CONTACTO_VERIFICADO`
en `src/data/sitio.js` pasó a `true`: se muestran `+57 319 775 4909` /
`ewis.campos@solinag.com.co`, que coinciden entre el manual, el número real
detrás del botón de WhatsApp y casi todas las láminas del catálogo. La
investigación de Manuel sobre los datos contradictorios (Google Sites de la
empresa vs. catálogo) sigue documentada en ese archivo — si la empresa
confirma otro dato, se corrige ahí.

**Contenido nuevo, conservado.** Las seis especialidades de ingeniería, el
proceso de seis pasos y la cobertura en Cartagena que Manuel agregó (sacados
del Google Sites de la empresa) se mantienen — es contenido razonable que no
contradice nada del manual, solo lo amplía.

## Tipografía

El manual no fija familia: pide sans serif limpia con jerarquía clara.
`global.css` usa **Montserrat** (geométrica), con la pila de sistema como
respaldo si no carga. Manuel la pidió el 2026-08-25 en sustitución de Archivo.

Ojo si alguna vez se vuelve a cambiar: Archivo tenía eje de anchura (wdth) y
los titulares iban con `font-stretch: 112%`. Montserrat no lo tiene, así que
esa declaración se retiró — con una familia sin eje wdth no hace nada.

- Titulares: 700–800, tracking −0.02em
- Slogan: mayúsculas, tracking +0.08em
- Descriptor: mayúsculas, tracking +0.16em (es el "eyebrow" en toda la web)

## Reglas del manual

**Hacer**
- Azul + verde sobre blanco / fondos muy claros (uso preferente)
- Blanco + verde sobre negro, azul oscuro, jean (hero, footer, feature-band)
- Fotografía real de fabricación, equipos y proyectos
- Área libre generosa alrededor del logo

**Evitar**
- Deformar el logo, cambiar sus colores, añadir sombras/degradados/contornos
- Separar los elementos del logotipo; reducirlo hasta perder legibilidad
- Fondos cargados detrás del logo
- Reconstruir el logotipo escribiendo el nombre — usar siempre el arte original.
  `Marca.astro` (header/menú móvil) sí escribe "SOLINAG SAS" junto al ícono en
  vez de usar el lockup completo — evaluado y aceptado a propósito: el lockup
  vertical (`logo-full.png`) no cabe legible en una barra horizontal, y
  ícono+texto del sistema es práctica estándar de navbar, no una
  reconstrucción del arte del logotipo.

## Pendientes reales (sin resolver, no bloquean el sitio)

- Confirmar con la empresa el teléfono/correo definitivos (ver nota en
  `src/data/sitio.js`) — lo publicado hoy es el dato mejor atestiguado, no una
  confirmación directa.
- SVG maestros de las dos versiones del logo (hoy solo hay PNG).
- Banco de fotografía propia más amplio: planta, equipos, proyectos.
