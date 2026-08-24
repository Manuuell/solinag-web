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
  const barra = document.querySelector("[data-barra]");
  if (barra) {
    const alScroll = () => {
      const activo = window.scrollY > 8;
      barra.classList.toggle("shadow-md", activo);
      barra.classList.toggle("shadow-sm", !activo);
      barra.classList.toggle("bg-white/86", activo);
      barra.classList.toggle("bg-white/72", !activo);
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

/* Inclinación 3D de la tarjeta del hero */
{
  const zona = document.querySelector("[data-hero-visual]");
  const tarjeta = document.querySelector("[data-hero-card]");
  if (zona && tarjeta && hayHover) {
    zona.addEventListener("mousemove", (e) => {
      const r = zona.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tarjeta.style.transform =
        `rotateY(${px * 14}deg) rotateX(${py * -14}deg) translateZ(10px)`;
    });
    zona.addEventListener("mouseleave", () => {
      tarjeta.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }
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
