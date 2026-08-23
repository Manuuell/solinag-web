// SOLINAG SAS — interacciones del sitio
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "573197754909";

  /* Header: sombra/blur más fuerte al hacer scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Menú móvil */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (toggle && mobileNav) {
    var closeBtn = mobileNav.querySelector(".mobile-nav-close");
    var open = function () {
      mobileNav.classList.add("open");
      mobileNav.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      mobileNav.classList.remove("open");
      mobileNav.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    mobileNav.addEventListener("click", function (e) {
      if (e.target === mobileNav) close();
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* Resaltar el enlace de navegación activo según la página actual */
  var current = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll("[data-nav]").forEach(function (a) {
    var target = a.getAttribute("data-nav");
    if (target === current || (target === "index.html" && current === "")) {
      a.classList.add("active");
    }
  });

  /* Animaciones de aparición al hacer scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Año actual en el pie de página */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Formulario de contacto -> mensaje de WhatsApp prellenado */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nombre = (data.get("nombre") || "").toString().trim();
      var empresa = (data.get("empresa") || "").toString().trim();
      var telefono = (data.get("telefono") || "").toString().trim();
      var correo = (data.get("correo") || "").toString().trim();
      var necesidad = (data.get("necesidad") || "").toString().trim();
      var mensaje = (data.get("mensaje") || "").toString().trim();
      var status = form.querySelector(".form-status");

      if (!nombre || !telefono || !mensaje) {
        if (status) {
          status.textContent = "Por favor completa nombre, WhatsApp y el detalle de tu proyecto.";
          status.classList.remove("ok");
        }
        return;
      }

      var lines = [
        "Hola SOLINAG, quiero solicitar información.",
        "Nombre: " + nombre,
        empresa ? "Empresa: " + empresa : null,
        "WhatsApp: " + telefono,
        correo ? "Correo: " + correo : null,
        necesidad ? "Interés: " + necesidad : null,
        "Necesidad: " + mensaje,
      ].filter(Boolean);

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;

      if (status) {
        status.textContent = "¡Listo! Te llevamos a WhatsApp para enviar tu solicitud.";
        status.classList.add("ok");
      }
      window.open(url, "_blank", "noopener");
      form.reset();
    });
  }
})();
