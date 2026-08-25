// SOLINAG SAS — interacciones del sitio
//
// Portado desde js/main.js. Tres bloques del original desaparecieron porque
// ahora se resuelven al compilar:
//   · el resaltado del enlace activo  -> lo decide Astro con la prop `actual`
//   · el año del pie de página        -> se escribe en el build
//   · el objeto SPECS y el armado del modal (~110 líneas) -> las fichas ahora
//     son HTML real generado desde src/data/productos.js, y el modal es un
//     <dialog> nativo, que ya trae foco atrapado, Esc y fondo.

import { WHATSAPP } from "../data/sitio.js";

const hayHover = window.matchMedia("(hover: hover)").matches;

/* Header: sombra y fondo más marcados al hacer scroll */
{
  const barra = document.querySelector("[data-header]");
  if (barra) {
    const alScroll = () => {
      // Solo se revela el borde inferior: nada de cambiar fondo ni sombra.
      barra.classList.toggle("border-line", window.scrollY > 8);
      barra.classList.toggle("border-transparent", window.scrollY <= 8);
    };
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
  }
}

/* Menú móvil */
{
  const menu = document.querySelector("[data-menu-movil]");
  const abrir = document.querySelector("[data-abrir-menu]");
  const cerrar = document.querySelector("[data-cerrar-menu]");

  if (menu && abrir) {
    const abrirMenu = () => {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      abrir.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    const cerrarMenu = () => {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      abrir.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    abrir.addEventListener("click", abrirMenu);
    cerrar?.addEventListener("click", cerrarMenu);
    // Clic en el fondo oscuro, fuera del panel.
    menu.addEventListener("click", (e) => {
      if (e.target === menu) cerrarMenu();
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrarMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarMenu();
    });
  }
}

/* Respaldo del desplazamiento a anclas.
 *
 * Al llegar con #ancla en la URL, el navegador salta antes de que terminen de
 * cargar las imágenes de arriba; cuando cargan, empujan el contenido y el
 * destino queda fuera de sitio. Safari además falla a veces con
 * scroll-behavior:smooth durante la carga inicial.
 *
 * Esto reposiciona una vez que la página se ha asentado. */
{
  const irAlAncla = () => {
    if (!location.hash || location.hash.length < 2) return;
    const destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!destino) return;
    // "auto" y no "smooth": es una corrección de posición, no una animación.
    destino.scrollIntoView({ behavior: "auto", block: "start" });
  };

  window.addEventListener("load", () => {
    irAlAncla();
    // Segunda pasada por si alguna imagen tardona movió el layout.
    setTimeout(irAlAncla, 350);
  });
}

/* Aparición al hacer scroll */
{
  const elementos = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && elementos.length) {
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("in");
            io.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    elementos.forEach((el, i) => {
      if (!el.style.getPropertyValue("--i")) el.style.setProperty("--i", i % 8);
      io.observe(el);
    });
  } else {
    elementos.forEach((el) => el.classList.add("in"));
  }
}

/* Fade-in de imágenes, para evitar el "pop-in" brusco */
document.querySelectorAll("img").forEach((img) => {
  if (img.complete && img.naturalWidth) return;
  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease-out";
  img.addEventListener("load", () => { img.style.opacity = "1"; }, { once: true });
});

/* Parallax de las manchas del hero */
{
  const blobs = document.querySelectorAll("[data-hero-bg] .blob");
  if (blobs.length && hayHover) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      blobs.forEach((b, i) => {
        b.style.transform = `translateY(${y * (i % 2 ? 0.12 : -0.08)}px)`;
      });
    }, { passive: true });
  }
}

/* Video de fondo del hero.
 *
 * Dos motivos para tocarlo desde JS y no dejarlo solo con el `autoplay` del
 * HTML:
 *   · quien pide "menos movimiento" en el sistema no debería recibir un video
 *     en bucle a pantalla completa; se queda en el `poster`.
 *   · fuera de pantalla no hay razón para seguir decodificando fotogramas —
 *     en móvil eso es batería.
 *
 * `play()` devuelve una promesa que el navegador rechaza si bloquea la
 * reproducción automática; el catch evita el error en consola. Cuando pasa,
 * el `poster` sigue visible, que es justo lo que queremos.
 */
{
  const video = document.querySelector("[data-hero-video]");
  if (video) {
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Se reproduce una sola vez. Una vez terminado se queda en el logotipo:
    // volver a reproducir desde el taller cada vez que alguien sube el scroll
    // convertiría la intro en un tic molesto.
    const terminado = () => video.ended;
    const reproducir = () => {
      if (menosMovimiento.matches || terminado()) return;
      video.play().catch(() => {});
    };

    const aplicarPreferencia = () => {
      if (menosMovimiento.matches) video.pause();
      else reproducir();
    };

    aplicarPreferencia();
    menosMovimiento.addEventListener("change", aplicarPreferencia);

    new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) reproducir();
      else if (!terminado()) video.pause();
    }).observe(video);
  }
}

/* Barra de progreso de scroll */
{
  const barra = document.querySelector("[data-progreso]");
  if (barra) {
    const actualizar = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      barra.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
    };
    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
  }
}

/* Spotlight que sigue al cursor dentro de las tarjetas */
if (hayHover) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* Fotos de la tarjeta de producto: si tiene más de una, rotan cada 2,5 s
 * mientras el cursor está encima. Gateado por hayHover (sin sentido en
 * mobile, que no tiene :hover) y por prefers-reduced-motion, igual que el
 * video del hero. Al salir el cursor, vuelve a la foto inicial en vez de
 * quedarse en la que tocó: cada visita a la tarjeta empieza igual. */
if (hayHover) {
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-galeria-tarjeta]").forEach((pila) => {
    const fotos = [...pila.querySelectorAll("[data-galeria-img]")];
    if (fotos.length < 2) return;

    const inicio = Math.max(fotos.findIndex((f) => f.classList.contains("opacity-100")), 0);
    let i = inicio;
    let intervalo = null;

    const mostrar = (siguiente) => {
      fotos[i].classList.replace("opacity-100", "opacity-0");
      i = siguiente;
      fotos[i].classList.replace("opacity-0", "opacity-100");
    };

    pila.addEventListener("mouseenter", () => {
      if (menosMovimiento.matches || intervalo) return;
      intervalo = setInterval(() => mostrar((i + 1) % fotos.length), 2500);
    });
    pila.addEventListener("mouseleave", () => {
      clearInterval(intervalo);
      intervalo = null;
      if (i !== inicio) mostrar(inicio);
    });
  });
}

/* Textos que rotan (franja superior y chips del hero) */
document.querySelectorAll(".widget-stack").forEach((pila) => {
  const items = pila.querySelectorAll(".w-item");
  if (!items.length) return;
  let i = 0;
  items[0].classList.add("show");
  setInterval(() => {
    items[i].classList.remove("show");
    i = (i + 1) % items.length;
    items[i].classList.add("show");
  }, 2600);
});

/* Sub-navegación con scroll-spy */
{
  const subnav = document.querySelector("[data-subnav]");
  if (subnav) {
    const enlaces = [...subnav.querySelectorAll("a")];
    const destinos = enlaces
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    enlaces.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const destino = document.querySelector(a.getAttribute("href"));
        if (destino) {
          window.scrollTo({
            top: destino.getBoundingClientRect().top + window.scrollY - 130,
            behavior: "smooth",
          });
        }
      });
    });

    if ("IntersectionObserver" in window && destinos.length) {
      const spy = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            const id = `#${entrada.target.id}`;
            enlaces.forEach((a) => {
              a.classList.toggle("activo", a.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      destinos.forEach((d) => spy.observe(d));
    }
  }
}

/* Fichas técnicas: cada producto tiene su <dialog> ya renderizado */
document.querySelectorAll("[data-abrir-ficha]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById(`ficha-${btn.dataset.abrirFicha}`)?.showModal();
  });
});

/* Galería de la ficha: las miniaturas intercambian la imagen grande */
document.querySelectorAll("dialog[data-ficha]").forEach((dialogo) => {
  const principal = dialogo.querySelector("[data-ficha-principal]");
  const pie = dialogo.querySelector("[data-ficha-pie]");
  const miniaturas = [...dialogo.querySelectorAll("[data-ficha-miniatura]")];

  miniaturas.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (!principal) return;
      principal.src = boton.dataset.fichaMiniatura;
      const img = boton.querySelector("img");
      principal.alt = img?.alt || principal.alt;
      if (pie) pie.textContent = boton.getAttribute("aria-label")?.replace(/^Ver: /, "") ?? "";

      miniaturas.forEach((otra) => {
        const activa = otra === boton;
        otra.classList.toggle("border-blue-600", activa);
        otra.classList.toggle("border-transparent", !activa);
        otra.classList.toggle("opacity-60", !activa);
      });
    });
  });
});

document.querySelectorAll("dialog[data-ficha]").forEach((dialogo) => {
  dialogo.querySelector("[data-cerrar-ficha]")?.addEventListener("click", () => dialogo.close());
  // Clic fuera del panel (sobre el ::backdrop) cierra.
  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) dialogo.close();
  });
});

/* Avisos flotantes */
const avisos = document.createElement("div");
avisos.className = "toast-stack";
document.body.appendChild(avisos);

function avisar(titulo, mensaje) {
  const aviso = document.createElement("div");
  aviso.className = "toast";
  aviso.innerHTML =
    '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.6" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg></span>' +
    `<div><b></b><span></span></div>`;
  // textContent y no innerHTML: el mensaje puede venir de un campo del formulario.
  aviso.querySelector("b").textContent = titulo;
  aviso.querySelector("div span").textContent = mensaje;
  avisos.appendChild(aviso);
  requestAnimationFrame(() => aviso.classList.add("show"));
  setTimeout(() => {
    aviso.classList.remove("show");
    setTimeout(() => aviso.remove(), 400);
  }, 4200);
}

/* Copiar al portapapeles */
document.querySelectorAll("[data-copiar]").forEach((el) => {
  el.style.cursor = "pointer";
  el.addEventListener("click", async () => {
    const valor = el.dataset.copiar;
    try {
      await navigator.clipboard?.writeText(valor);
    } finally {
      avisar("Copiado", valor);
    }
  });
});

/* Formulario de contacto -> WhatsApp con el mensaje ya escrito */
{
  const form = document.querySelector("#form-contacto");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const val = (k) => (d.get(k) || "").toString().trim();

    const nombre = val("nombre");
    const telefono = val("telefono");
    const mensaje = val("mensaje");

    if (!nombre || !telefono || !mensaje) {
      avisar("Faltan datos", "Completa nombre, WhatsApp y el detalle de tu proyecto.");
      return;
    }

    const lineas = [
      "Hola SOLINAG, quiero solicitar información.",
      `Nombre: ${nombre}`,
      val("empresa") && `Empresa: ${val("empresa")}`,
      `WhatsApp: ${telefono}`,
      val("correo") && `Correo: ${val("correo")}`,
      val("necesidad") && `Interés: ${val("necesidad")}`,
      `Necesidad: ${mensaje}`,
    ].filter(Boolean);

    avisar("¡Listo!", "Te llevamos a WhatsApp para enviar tu solicitud.");
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join("\n"))}`,
      "_blank",
      "noopener"
    );
    form.reset();
  });
}
