# Guía para trabajar en el sitio

## Puesta en marcha

No hay dependencias que instalar ni build que correr. Después del `git pull`:

```bash
npx serve . -l 4173
```

Y abrir http://localhost:4173. Cualquier servidor estático sirve; también podés
abrir `index.html` directo en el navegador.

Solo si vas a **recortar imágenes de producto** necesitás Python con Pillow:

```bash
pip install Pillow
```

---

## Tres cosas que hay que saber antes de editar

### 1. El encabezado y el pie están duplicados en las 4 páginas

No hay plantillas ni includes: `index.html`, `soluciones.html`, `proyectos.html`
y `nosotros.html` tienen cada una su **propia copia** de la franja de servicios,
el header, el menú móvil, el footer y la barra inferior.

> Si cambiás el menú, el footer o la franja superior, **hay que replicarlo en
> las 4 páginas**. Es el error más fácil de cometer en este repo.

### 2. El número de WhatsApp está repetido en ~23 lugares

Aparece en `js/main.js` (constante `WHATSAPP_NUMBER`) y hardcodeado en los
`href` de las 4 páginas. Si cambia, buscá y reemplazá `573197754909` en **todo**
el proyecto, no solo en el JS.

### 3. Los colores salen de variables CSS

Están definidos en `:root`, al principio de `css/styles.css`. Usá siempre las
variables (`var(--blue-600)`, `var(--green-500)`), nunca el hex suelto, para no
romper la consistencia con el manual de marca.

---

## Cómo agregar un producto nuevo

Un producto vive en **dos lugares que deben coincidir**: la tarjeta visible en
`soluciones.html` y su ficha técnica en `js/main.js`. Los une la clave del
atributo `data-quicklook`.

### Paso 1 — La ficha técnica, en `js/main.js`

Agregá una entrada al objeto `SPECS`:

```js
"mi-producto": {
  tag: "Maquinaria y equipos",          // categoría que se muestra arriba
  title: "Nombre comercial SOL-XX",
  img: "assets/img/prod-mi-producto.jpg",
  intro: "Una o dos frases sobre qué resuelve el equipo.",
  stats: [                               // los números destacados
    { v: "500", u: "kg/h de capacidad" },
    { v: "15 HP", u: "potencia del motor" },
  ],
  table: {                               // OPCIONAL: solo si hay varios modelos
    headers: ["Modelo", "Capacidad", "Motor"],
    rows: [
      ["SOL-XX-05", "50–100 kg/h", "5 HP"],
      ["SOL-XX-15", "200–250 kg/h", "15 HP"],
    ],
  },
  list: [                                // viñetas con check
    "Estructura en acero de alta resistencia",
    "Alimentación 220/440 V trifásico",
  ],
},
```

`table` es opcional: si no la ponés, el modal simplemente no la muestra.

### Paso 2 — La tarjeta, en `soluciones.html`

Copiá un `<article>` existente y ajustalo. La clave de `data-quicklook` **tiene
que ser idéntica** a la que usaste en `SPECS`:

```html
<article class="card solution-card reveal" style="--i:6; scroll-margin-top:150px">
  <div class="solution-media">
    <img src="assets/img/prod-mi-producto.jpg" alt="Descripción de la foto" loading="lazy" />
  </div>
  <div>
    <h3>Título corto</h3>
    <p>Una frase de qué hace.</p>
    <div class="solution-tags">
      <span>Etiqueta</span><span>Otra etiqueta</span>
    </div>
    <button class="detail-btn" data-quicklook="mi-producto">
      Ver ficha técnica: SOL-XX
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </button>
  </div>
  <div class="cta">
    <a class="btn btn-dark btn-sm" href="https://wa.me/573197754909?text=Hola%20SOLINAG..." target="_blank" rel="noopener">Cotizar</a>
  </div>
</article>
```

Detalles a no pasar por alto:

- **`--i:` es el orden de la animación** de entrada. Numerá las tarjetas de
  forma correlativa (0, 1, 2…) según su posición.
- **Los `id`** (`#maquinaria`, `#estructuras`, `#movilidad`, `#medida`) los usa
  el menú de categorías y los enlaces desde `index.html` y `proyectos.html`. No
  los renombres ni los borres; si tu producto entra en una categoría que ya
  existe, no necesita `id` propio.
- El texto del enlace de WhatsApp va **URL-encodeado** (`%20` por espacio).

### Paso 3 — La foto

Las fotos de producto salen recortadas del material del catálogo en
`brand/catalogo/`. El recorte se documenta en `scripts/crop_products.py`, así
que se puede reproducir:

```python
crop_save(cat + "Nombre del archivo.jpeg", (x1, y1, x2, y2),
          out + "prod-mi-producto.jpg")
```

Guardá el resultado en `assets/img/` con el prefijo `prod-`. La proporción no
importa: el modal usa `object-fit: contain`, así que la foto se ve completa sea
vertical o panorámica.

---

## Antes de hacer push

- [ ] Si tocaste header, footer o franja superior, ¿lo replicaste en las 4 páginas?
- [ ] Si agregaste un producto, ¿la clave de `data-quicklook` coincide con la de `SPECS`?
- [ ] Probá las fichas técnicas en el navegador: que abran, muestren la foto y cierren bien.
- [ ] Revisá en móvil (las herramientas de desarrollo del navegador, ~375 px de ancho).
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
(https://solinag.duckdns.org/). El workflow verifica que el sitio responda y
falla si algo quedó roto, así que revisá la pestaña *Actions* en GitHub después
de subir.

Estilo de commits: prefijo en minúscula (`feat:`, `fix:`, `polish:`) y
descripción en español, para seguir el historial existente.
