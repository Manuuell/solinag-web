# SOLINAG SAS — Sitio web corporativo

Sitio web estático (HTML + CSS + JS, sin frameworks ni build step) para
**SOLINAG SAS** — Soluciones de Ingeniería para la Industria y el Agro.

| Entorno | URL |
|---|---|
| Producción | https://www.solinag.com.co/ |
| Staging (VPS) | https://solinag.duckdns.org/ |

## Stack

Archivos estáticos servidos por nginx. **No hay backend, ni base de datos, ni
variables de entorno, ni build step.** El formulario de contacto no envía datos
a ningún servidor: arma un mensaje y abre WhatsApp con el texto prellenado.

## Estructura

```
index.html            Inicio
soluciones.html       Catálogo de soluciones (6 fichas de producto)
proyectos.html        Proyectos destacados y proceso de trabajo
nosotros.html         Quiénes somos + formulario de contacto
404.html              Página de error

css/styles.css        Sistema de diseño: variables, componentes, layout
js/main.js            Navegación, animaciones, fichas técnicas, formulario
assets/img/           Logotipos, íconos y fotos de producto (lo que se publica)

brand/                Material fuente interno: manual de identidad, catálogo
scripts/              Utilidades de Python para procesar imágenes
.github/workflows/    Despliegue automático al VPS
```

`brand/` y `scripts/` son material de trabajo: quedan versionados en el repo
pero **no se publican** en el sitio.

## Desarrollo local

No requiere instalación ni dependencias. Abre `index.html` en el navegador, o
sirve la carpeta con cualquier servidor estático:

```bash
npx serve . -l 4173
```

Antes de tocar el código, lee **[CONTRIBUTING.md](CONTRIBUTING.md)**: explica
cómo agregar un producto y advierte sobre los bloques que están duplicados en
las cuatro páginas.

## Despliegue

Automático: cada push a `main` dispara el workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que sincroniza
los archivos al VPS por rsync y verifica que el sitio responda.

No hay que reiniciar nada — al ser estático, los archivos nuevos se sirven de
inmediato.

## Marca

- Azul corporativo `#2144A1` · Verde corporativo `#89F336`
- Slogan: *Innovación que transforma* · Agro · Industria · Sostenibilidad
- Dos versiones de logo: `logo-full.png` (fondo claro) y `logo-dark-bg.png`
  (fondo oscuro).
- Manual completo en `brand/MANUAL DE IDENTIDAD CORPORATIVA.pdf`.
