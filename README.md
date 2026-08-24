# SOLINAG SAS — Sitio web corporativo

Sitio web de **SOLINAG SAS** — Soluciones de Ingeniería para la Industria y el
Agro. Construido con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com);
el resultado del build son archivos HTML estáticos, sin backend ni base de datos.

| Entorno | URL |
|---|---|
| Producción | https://www.solinag.com.co/ |
| Staging (VPS) | https://solinag.duckdns.org/ |

## Stack

- **Astro** genera las páginas al compilar. No se envía JavaScript de framework
  al navegador: el poco JS que hay es propio (modal, animaciones, formulario).
- **Tailwind CSS v4**. Los colores, radios, sombras y breakpoints de la marca
  están declarados como tokens en `src/styles/global.css`, dentro de `@theme`.
- El formulario de contacto **no envía datos a ningún servidor**: arma un
  mensaje y abre WhatsApp con el texto prellenado.

## Estructura

```
src/
  pages/            Una página por archivo -> index.html, soluciones.html…
  layouts/Base.astro  <head>, header, menú móvil, pie, barra inferior
  components/       Piezas reutilizables (Header, Footer, Icono, Boton…)
  data/
    sitio.js        Datos de la empresa, WhatsApp, menú, redes
    productos.js    Catálogo: tarjeta y ficha técnica de cada producto
  styles/global.css Tokens de marca y estilos de componente
  scripts/sitio.js  Interacciones del cliente

public/             Se copia tal cual a la raíz del sitio (imágenes, robots…)
brand/              Material fuente interno: manual de identidad, catálogo
scripts/            Utilidades de Python para procesar imágenes
```

`brand/` y `scripts/` quedan versionados pero **no entran al build**, así que no
se publican.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:4321. Los comandos disponibles son `dev`, `build` y
`preview`.

Antes de tocar el código, lee **[CONTRIBUTING.md](CONTRIBUTING.md)**: explica
cómo agregar un producto y dónde vive cada cosa.

## Despliegue

Automático: cada push a `main` dispara
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que instala
dependencias, compila y sincroniza **`dist/`** al VPS por rsync.

El sitio sigue siendo estático, así que nginx no necesita configuración nueva y
no hay ningún proceso que reiniciar.

### Al pasar a producción

Hay configuración que **vive en el servidor, no en el repo**, y por lo tanto no
viaja con el despliegue. Al montar el vhost de `www.solinag.com.co`:

- **El vhost de producción NO debe llevar `X-Robots-Tag`.** El de staging sí lo
  tiene (`noindex, nofollow`), que es lo que evita que los dos sitios compitan
  como contenido duplicado mientras sirven lo mismo. Si el vhost nuevo se copia
  del de staging, se arrastra la cabecera y el sitio real queda desindexado sin
  que nada parezca roto.
- El paso *Verificar el despliegue* del workflow apunta a `solinag.duckdns.org`
  por URL fija: hay que decidir si sigue validando staging o pasa a producción.
- Lo que ya está listo y no hay que tocar: los `canonical`, `og:url` y
  `og:image` se generan desde `site` en `astro.config.mjs`, y `robots.txt` y
  `sitemap.xml` (en `public/`) apuntan a `https://www.solinag.com.co/`.

## Marca

- Azul corporativo `#2144a1` · Verde corporativo `#89f336`
- Slogan: *Innovación que transforma* · Agro · Industria · Sostenibilidad
- **Ojo con el verde:** `#89f336` da 1.41:1 sobre blanco y no es usable para
  texto en fondo claro. Para eso está `green-700` (`#4f9c17`). Los tokens lo
  documentan en `src/styles/global.css`.
- Manual completo en `brand/MANUAL DE IDENTIDAD CORPORATIVA.pdf`.
