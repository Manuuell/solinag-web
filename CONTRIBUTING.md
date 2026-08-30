# Guía para trabajar en el sitio

## Puesta en marcha

```bash
npm install
npm run dev
```

Y abrir http://localhost:4321.

Solo si vas a **recortar imágenes de producto** necesitás Python con Pillow:

```bash
pip install Pillow
```

---

## Lo que cambió respecto a la versión anterior

El sitio era HTML plano y cada página tenía su propia copia del encabezado, el
menú, el pie y la franja superior: el **64% de las líneas estaban duplicadas**
entre los cuatro archivos, y el número de WhatsApp aparecía escrito a mano en
**23 lugares**.

Ahora no hay nada de eso:

| Si querés cambiar… | Editá |
|---|---|
| El menú, el pie, la franja superior | `src/layouts/Base.astro` y sus componentes |
| El teléfono, el correo, la dirección | `src/data/sitio.js` |
| Un producto (tarjeta o ficha técnica) | `src/data/productos.js` |
| Un color, un radio, una sombra | El bloque `@theme` de `src/styles/global.css` |

Ninguno de esos cambios requiere tocar más de un archivo.

---

## Tres cosas que hay que saber

### 1. Los enlaces internos se arman con `ruta()`

No escribas `/soluciones/` a mano. Usá el helper de `src/data/sitio.js`:

```js
import { ruta } from "../data/sitio.js";

ruta("soluciones")             // /soluciones/
ruta("nosotros", "contacto")   // /nosotros/#contacto
ruta("inicio")                 // /
```

Misma forma en desarrollo y en producción (formato "directory" de Astro, ver
`astro.config.mjs`): no hace falta que el helper distinga entre los dos.

### 2. El WhatsApp también tiene helper

```js
import { whatsapp } from "../data/sitio.js";

whatsapp()                                  // abre el chat vacío
whatsapp("Hola SOLINAG, quiero...")         // con el mensaje ya escrito
```

Se encarga del URL-encode, que antes había que recordar hacer a mano.

### 3. Los colores salen de tokens, no de hex sueltos

Están en `@theme`, al principio de `src/styles/global.css`, y Tailwind los
expone como utilidades: `bg-blue-600`, `text-green-700`, `shadow-blue`,
`rounded-xl`, `ease-spring`.

> **El verde corporativo `#89f336` (`green-500`) no sirve para texto sobre
> fondo claro**: da 1.41:1 de contraste. Para texto verde en claro usá
> `green-700`. Sobre fondo oscuro, `green-500` va perfecto.

---

## Cómo agregar un producto nuevo

Un producto vive en **un solo lugar**: el array `PRODUCTOS` de
`src/data/productos.js`. De ahí salen tanto la tarjeta del catálogo como su
ficha técnica, así que ya no pueden desincronizarse.

```js
{
  clave: "mi-producto",          // identificador interno
  ancla: "maquinaria",           // id del <article>; null si no lleva
  categoriaCorta: "Maquinaria",  // etiqueta del menú de categorías (solo si hay ancla)
  tag: "Maquinaria y equipos",   // categoría que se muestra en la ficha
  titulo: "Nombre corto",        // título de la tarjeta
  tituloFicha: "Nombre comercial SOL-XX",
  img: "/assets/img/prod-mi-producto.jpg",
  alt: "Descripción de la foto",
  resumen: "Una frase de qué hace.",
  etiquetas: ["Etiqueta", "Otra etiqueta"],
  textoBoton: "Ver ficha técnica: SOL-XX",
  mensaje: "Hola SOLINAG, quiero información sobre...",   // texto del WhatsApp
  intro: "Una o dos frases sobre qué resuelve el equipo.",
  stats: [
    { v: "500", u: "kg/h de capacidad" },
    { v: "15 HP", u: "potencia del motor" },
  ],
  tabla: {                       // OPCIONAL: solo si hay varios modelos
    headers: ["Modelo", "Capacidad", "Motor"],
    rows: [
      ["SOL-XX-05", "50–100 kg/h", "5 HP"],
      ["SOL-XX-15", "200–250 kg/h", "15 HP"],
    ],
  },
  lista: [
    "Estructura en acero de alta resistencia",
    "Alimentación 220/440 V trifásico",
  ],
}
```

Eso es todo: la tarjeta, la ficha, el enlace de WhatsApp, la entrada del menú de
categorías y la columna "Soluciones" del pie aparecen solas.

**Sobre `ancla`:** los ids (`maquinaria`, `estructuras`, `movilidad`, `medida`)
los usan el menú de categorías, el pie y los enlaces desde inicio y proyectos.
No los renombres ni los borres. Si tu producto entra en una categoría que ya
existe, dejá `ancla: null`.

### La foto

Las fotos de producto salen recortadas del material del catálogo en
`brand/catalogo/`. El recorte se documenta en `scripts/crop_products.py`:

```python
crop_save(cat + "Nombre del archivo.jpeg", (x1, y1, x2, y2),
          out + "prod-mi-producto.jpg")
```

Guardá el resultado en `public/assets/img/` con el prefijo `prod-`. La
proporción no importa: la ficha usa `object-contain`, así que la foto se ve
completa sea vertical o panorámica.

---

## Componentes que ya existen

Antes de escribir markup nuevo, mirá si ya hay un componente:

| Componente | Para qué |
|---|---|
| `Boton` | Botones y enlaces con estilo de botón (`variante`, `tamano`, `bloque`) |
| `Icono` | Los SVG del sitio, por nombre: `<Icono nombre="whatsapp" />` |
| `Contenedor` | Ancho máximo y márgenes laterales |
| `Seccion` | Ritmo vertical de las secciones (`compacta` para el paso corto) |
| `CabeceraSeccion` | Antetítulo + título + entradilla |
| `HeroPagina` | Cabecera de páginas interiores, con migas |
| `TarjetaPilar` | Tarjeta con icono en degradado |
| `BannerCta` | Banner degradado de llamada a la acción |
| `Campo` | Campo de formulario (input, select, textarea) |
| `Chip` | Etiqueta con check verde |

Si agregás un icono, va en el objeto `ICONOS` de `src/components/Icono.astro`.

---

## Antes de hacer push

- [ ] `npm run build` termina sin errores.
- [ ] Probá las fichas técnicas: que abran, muestren la foto y cierren con Esc.
- [ ] Revisá en móvil (herramientas del navegador, ~375 px de ancho).
- [ ] Mirá la consola: no debería haber errores.

## Git y despliegue

```bash
git pull
# ...cambios...
git add -A
git commit -m "feat: descripción en español"
git push origin main
```

**Cada push a `main` despliega automáticamente** al VPS
(https://solinag.duckdns.org/). El workflow compila, verifica que las cinco
páginas se generaron y falla antes de subir si algo quedó roto — pero igual
revisá la pestaña *Actions* en GitHub después de subir.

Estilo de commits: prefijo en minúscula (`feat:`, `fix:`, `polish:`) y
descripción en español, para seguir el historial existente.
