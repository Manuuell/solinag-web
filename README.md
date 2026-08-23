# SOLINAG SAS — Sitio web corporativo

Sitio web estático (HTML + CSS + JS, sin frameworks ni build step) para
**SOLINAG SAS** — Soluciones de Ingeniería para la Industria y el Agro.

## Estructura

```
index.html        Inicio
soluciones.html    Catálogo de soluciones de ingeniería
proyectos.html      Proyectos destacados y proceso de trabajo
nosotros.html        Quiénes somos + formulario de contacto
css/styles.css      Sistema de diseño (variables, componentes, layout)
js/main.js          Navegación, animaciones, formulario de contacto
assets/img/         Logotipo procesado (versiones clara/oscura) e íconos
brand/              Material de referencia: manual de marca y mockups
scripts/            Scripts de Python usados para procesar el logo
```

## Marca

- Azul corporativo `#2144A1` · Verde corporativo `#89F336`
- Slogan: *Innovación que transforma* · Agro · Industria · Sostenibilidad
- Ver `brand/MANUAL DE IDENTIDAD CORPORATIVA.pdf` para el manual completo.

## Desarrollo local

No requiere instalación. Abre `index.html` en el navegador o sirve la carpeta
con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```
