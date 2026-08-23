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
    var openMobileNav = function () {
      mobileNav.classList.add("open");
      mobileNav.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    var closeMobileNav = function () {
      mobileNav.classList.remove("open");
      mobileNav.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", openMobileNav);
    if (closeBtn) closeBtn.addEventListener("click", closeMobileNav);
    mobileNav.addEventListener("click", function (e) {
      if (e.target === mobileNav) closeMobileNav();
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobileNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  /* Resaltar el enlace de navegación activo según la página actual */
  var current = location.pathname.split("/").pop() || "index.html";
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

  /* Fade-in suave de imágenes al cargar (evita el "pop-in" brusco) */
  document.querySelectorAll("img").forEach(function (img) {
    if (img.complete && img.naturalWidth) return;
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease-out";
    img.addEventListener("load", function () { img.style.opacity = "1"; }, { once: true });
  });

  /* Parallax sutil de los blobs del hero al hacer scroll */
  var blobs = document.querySelectorAll(".hero-bg .blob");
  if (blobs.length && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        blobs.forEach(function (b, i) {
          b.style.transform = "translateY(" + y * (i % 2 ? 0.12 : -0.08) + "px)";
        });
      },
      { passive: true }
    );
  }

  /* Copiar al portapapeles (teléfono / correo) con confirmación */
  document.querySelectorAll("[data-copy]").forEach(function (el) {
    el.style.cursor = "pointer";
    el.addEventListener("click", function () {
      var value = el.getAttribute("data-copy");
      var done = function () { showToast("Copiado", value); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, done);
      } else {
        done();
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /* Barra de progreso de scroll                                         */
  /* ------------------------------------------------------------------ */
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);
  var updateProgress = function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  /* ------------------------------------------------------------------ */
  /* Spotlight en tarjetas (sigue el cursor)                             */
  /* ------------------------------------------------------------------ */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Tilt 3D en la tarjeta del hero                                      */
  /* ------------------------------------------------------------------ */
  var heroVisual = document.querySelector(".hero-visual");
  var heroCard = document.querySelector(".hero-card");
  if (heroVisual && heroCard && window.matchMedia("(hover: hover)").matches) {
    heroVisual.addEventListener("mousemove", function (e) {
      var r = heroVisual.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      heroCard.style.transform =
        "rotateY(" + (px * 14) + "deg) rotateX(" + (py * -14) + "deg) translateZ(10px)";
    });
    heroVisual.addEventListener("mouseleave", function () {
      heroCard.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }

  /* ------------------------------------------------------------------ */
  /* Widget stack: chips que rotan automáticamente (estilo iOS widget)   */
  /* ------------------------------------------------------------------ */
  var stack = document.querySelector(".widget-stack");
  if (stack) {
    var items = stack.querySelectorAll(".w-item");
    var wi = 0;
    if (items.length) {
      items[0].classList.add("show");
      setInterval(function () {
        items[wi].classList.remove("show");
        wi = (wi + 1) % items.length;
        items[wi].classList.add("show");
      }, 2600);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Sub-nav tipo segmented control con scroll-spy                       */
  /* ------------------------------------------------------------------ */
  var subnav = document.querySelector(".subnav");
  if (subnav) {
    var subLinks = subnav.querySelectorAll("a");
    var targets = Array.prototype.map.call(subLinks, function (a) {
      return document.querySelector(a.getAttribute("href"));
    }).filter(Boolean);

    subLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.querySelector(a.getAttribute("href"));
        if (target) {
          var y = target.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });

    if ("IntersectionObserver" in window && targets.length) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = "#" + entry.target.id;
              subLinks.forEach(function (a) {
                a.classList.toggle("active", a.getAttribute("href") === id);
              });
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      targets.forEach(function (t) { spy.observe(t); });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Quick look: modal de ficha técnica con datos reales de producto     */
  /* ------------------------------------------------------------------ */
  var SPECS = {
    compactadora: {
      tag: "Maquinaria y equipos",
      title: "Compactadora SOL-MTC-15",
      img: "assets/img/prod-compactadora.jpg",
      intro: "Trituradora/compactadora industrial para reciclaje, diseñada para trabajo pesado y operación continua.",
      stats: [
        { v: "200–250", u: "kg/h de capacidad" },
        { v: "15 HP", u: "potencia del motor" },
        { v: "500–520", u: "RPM del rotor" },
        { v: "4:1", u: "relación de corte" },
      ],
      list: [
        "Alimentación eléctrica 220/440 V trifásico – 60 Hz",
        "Sistema de trituración de corte progresivo tipo tijera",
        "Transmisión por poleas y doble banda tipo C",
      ],
    },
    bicitriciclo: {
      tag: "Movilidad y reciclaje",
      title: "Bicitriciclo SOL-BT-M01",
      img: "assets/img/prod-bicitriciclo.jpg",
      intro: "Vehículo de tracción manual para recolección y logística urbana o rural, de bajas emisiones.",
      stats: [
        { v: "250 kg", u: "carga útil" },
        { v: "1,0 m³", u: "capacidad canastilla" },
      ],
      list: [
        "Tracción manual por pedaleo",
        "Frenos de disco delantero y trasero",
        "Suspensión delantera para mayor comodidad",
        "Estructura en acero al carbono de alta resistencia",
        "Carpa impermeable desmontable",
      ],
    },
    "linea-pet": {
      tag: "Estructuras industriales",
      title: "Línea de reciclaje SMC-PET 4",
      img: "assets/img/prod-linea-pet.jpg",
      intro: "Línea modular para clasificación y transformación de botellas PET, escalable según el volumen de operación.",
      stats: [
        { v: "150–400", u: "kg/h de PET mixto" },
        { v: "2100 mm", u: "altura de descarga" },
        { v: "1,0 m³", u: "capacidad de tolva" },
      ],
      list: [
        "Estructura modular y escalable",
        "Estructura industrial robusta para trabajo pesado",
        "Ideal para cooperativas y plantas de aprovechamiento",
        "Ideal para empresas de gestión de residuos y proyectos municipales",
      ],
    },
    medida: {
      tag: "Ingeniería a medida",
      title: "Del concepto al plano de fabricación",
      img: "assets/img/prod-ingeniero.jpg",
      intro: "Cuando la solución no existe en catálogo, la desarrollamos contigo: un mismo equipo te acompaña en las cuatro etapas del proyecto.",
      stats: [
        { v: "01–04", u: "etapas de trabajo" },
        { v: "3D", u: "modelado y validación" },
      ],
      list: [
        "Diseño mecánico e ingeniería de detalle",
        "Modelado 3D y validación técnica",
        "Fabricación propia con estándares de calidad",
        "Acompañamiento en instalación y puesta en marcha",
      ],
    },
  };

  var modalOverlay = null;
  function buildModal() {
    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.innerHTML =
      '<div class="modal-sheet" role="dialog" aria-modal="true">' +
      '<div class="modal-handle"></div>' +
      '<div class="modal-head">' +
      '<div><span class="tag" data-m-tag></span><h3 data-m-title></h3></div>' +
      '<button class="modal-close" aria-label="Cerrar">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      "</button>" +
      "</div>" +
      '<div class="modal-media"><img data-m-img alt="" /></div>' +
      '<p data-m-intro style="color:var(--ink-soft)"></p>' +
      '<div class="spec-grid" data-m-stats></div>' +
      '<ul class="modal-list" data-m-list></ul>' +
      '<div class="modal-actions">' +
      '<a class="btn btn-primary" data-m-cta target="_blank" rel="noopener">Cotizar por WhatsApp</a>' +
      '<button class="btn btn-ghost" data-m-close-btn>Cerrar</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    modalOverlay.querySelector(".modal-close").addEventListener("click", closeModal);
    modalOverlay.querySelector("[data-m-close-btn]").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  function openModal(key) {
    var spec = SPECS[key];
    if (!spec) return;
    if (!modalOverlay) buildModal();

    modalOverlay.querySelector("[data-m-tag]").textContent = spec.tag;
    modalOverlay.querySelector("[data-m-title]").textContent = spec.title;
    var img = modalOverlay.querySelector("[data-m-img]");
    img.src = spec.img;
    img.alt = spec.title;
    modalOverlay.querySelector("[data-m-intro]").textContent = spec.intro;

    var statsWrap = modalOverlay.querySelector("[data-m-stats]");
    statsWrap.innerHTML = spec.stats
      .map(function (s, i) { return '<div class="spec-item" style="--si:' + i + '"><b>' + s.v + "</b><span>" + s.u + "</span></div>"; })
      .join("");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        statsWrap.querySelectorAll(".spec-item").forEach(function (el) { el.classList.add("in"); });
      });
    });

    var listWrap = modalOverlay.querySelector("[data-m-list]");
    listWrap.innerHTML = spec.list
      .map(function (item) {
        return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg><span>' + item + "</span></li>";
      })
      .join("");

    var cta = modalOverlay.querySelector("[data-m-cta]");
    cta.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Hola SOLINAG, quiero información sobre " + spec.title);

    modalOverlay.classList.add("open");
    document.body.classList.add("modal-lock");
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("open");
      document.body.classList.remove("modal-lock");
    }
  }

  document.querySelectorAll("[data-quicklook]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(btn.getAttribute("data-quicklook"));
    });
  });

  /* ------------------------------------------------------------------ */
  /* Toast notifications                                                  */
  /* ------------------------------------------------------------------ */
  var toastStack = document.createElement("div");
  toastStack.className = "toast-stack";
  document.body.appendChild(toastStack);

  function showToast(title, message) {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML =
      '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg></span>' +
      "<div><b>" + title + "</b><span>" + message + "</span></div>";
    toastStack.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add("show"); });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 400);
    }, 4200);
  }

  /* ------------------------------------------------------------------ */
  /* Formulario de contacto -> mensaje de WhatsApp prellenado             */
  /* ------------------------------------------------------------------ */
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

      if (!nombre || !telefono || !mensaje) {
        showToast("Faltan datos", "Completa nombre, WhatsApp y el detalle de tu proyecto.");
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

      showToast("¡Listo!", "Te llevamos a WhatsApp para enviar tu solicitud.");
      window.open(url, "_blank", "noopener");
      form.reset();
    });
  }
})();
