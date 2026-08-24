/**
 * Catálogo de productos — fuente única.
 *
 * Antes cada producto vivía partido en dos sitios que había que mantener
 * sincronizados a mano: la tarjeta en soluciones.html y su ficha técnica en el
 * objeto SPECS de js/main.js, unidos por la clave de data-quicklook. Aquí cada
 * producto es un objeto y de él salen las dos cosas.
 *
 * Campos:
 *   clave       identificador interno (el antiguo data-quicklook)
 *   ancla       id del <article>, usado por el menú de categorías. No renombrar:
 *               hay enlaces entrantes desde index y proyectos.
 *   categoriaCorta  etiqueta del menú de categorías; solo la llevan los que
 *               tienen ancla.
 *   tag         categoría que se muestra arriba en la ficha
 *   titulo      título corto de la tarjeta
 *   tituloFicha nombre comercial completo, se muestra en la ficha técnica
 *   resumen     frase de la tarjeta
 *   etiquetas   chips de la tarjeta
 *   textoBoton  texto del botón que abre la ficha
 *   mensaje     texto prellenado del enlace de WhatsApp
 *   intro       párrafo de apertura de la ficha
 *   stats       cifras destacadas { v: valor, u: unidad }
 *   tabla       opcional; si falta, la ficha simplemente no la muestra
 *   lista       viñetas con check
 */

export const PRODUCTOS = [
  {
    clave: "molino",
    ancla: "maquinaria",
    categoriaCorta: "Maquinaria",
    tag: "Maquinaria y equipos",
    titulo: "Molino triturador industrial",
    tituloFicha: "Molino Triturador Compacto SOL-MTC",
    img: "/assets/img/prod-compactadora.jpg",
    alt: "Molino triturador SOL-MTC de SOLINAG",
    resumen:
      "Trituración de plásticos PET, HDPE, PP y más, con corte progresivo tipo tijera, en tres capacidades según tu operación.",
    etiquetas: ["Molinos trituradores", "Reciclaje de plásticos", "Equipos agroindustriales"],
    textoBoton: "Ver ficha técnica y modelos: SOL-MTC",
    mensaje: "Hola SOLINAG, quiero información sobre el Molino triturador SOL-MTC",
    intro:
      "Molino triturador industrial para reciclaje de plásticos, con corte progresivo tipo tijera, disponible en tres capacidades según tu operación.",
    stats: [
      { v: "200–250", u: "kg/h de capacidad (MTC-15)" },
      { v: "15 HP", u: "potencia del motor" },
      { v: "500–520", u: "RPM del rotor" },
      { v: "4:1", u: "relación de corte" },
    ],
    tabla: {
      headers: ["Modelo", "Capacidad (PET)", "Motor", "RPM rotor"],
      rows: [
        ["SOL-MTC-05", "50–100 kg/h", "5 HP", "430–450"],
        ["SOL-MTC-15", "200–250 kg/h", "15 HP", "500–520"],
        ["SOL-MTC-30", "450–500 kg/h", "30 HP", "550–600"],
      ],
    },
    lista: [
      "Alimentación eléctrica 220/440 V trifásico – 60 Hz",
      "Sistema de trituración de corte progresivo tipo tijera",
      "Transmisión por poleas y doble banda tipo C",
    ],
  },

  {
    clave: "compactadora-vertical",
    ancla: null,
    tag: "Maquinaria y equipos",
    titulo: "Compactadora hidráulica vertical",
    tituloFicha: "Compactadora Hidráulica Vertical SOL-CV",
    img: "/assets/img/prod-compactadora-vertical.jpg",
    alt: "Compactadora hidráulica vertical SOL-CV de SOLINAG",
    resumen:
      "Reduce el volumen de cartón, PET, archivo, plásticos y latas, disponible en 15, 30 y 60 toneladas de fuerza.",
    etiquetas: ["Compactadoras verticales", "Prensas y fardos", "Equipos agroindustriales"],
    textoBoton: "Ver ficha técnica y modelos: SOL-CV",
    mensaje: "Hola SOLINAG, quiero información sobre la Compactadora vertical SOL-CV",
    intro:
      "Compactadora hidráulica vertical multipropósito para reducir el volumen de cartón, PET, archivo, plásticos y latas, disponible en tres capacidades de fuerza.",
    stats: [
      { v: "15–60", u: "toneladas de fuerza" },
      { v: "hasta 1.000", u: "kg por fardo" },
      { v: "220V", u: "trifásico según modelo" },
    ],
    tabla: {
      headers: ["Modelo", "Fuerza", "Cámara", "Peso equipo"],
      rows: [
        ["SOL-CV15M", "15 Ton", "1,0 m³", "1.050 kg"],
        ["SOL-CV30M", "30 Ton", "1,20 m³", "2.500 kg"],
        ["SOL-CV60M", "60 Ton · doble cilindro", "1,80 m³", "≈4.200 kg"],
      ],
    },
    lista: [
      "Estructura en acero reforzado de alta resistencia",
      "Sistema hidráulico de alta presión y operación eléctrica segura",
      "Compatible con PET, cartón, archivo, plásticos y latas",
      "Reduce volumen y costos logísticos de transporte",
    ],
  },

  {
    clave: "linea-pet",
    ancla: "estructuras",
    categoriaCorta: "Estructuras",
    tag: "Estructuras industriales",
    titulo: "Clasificación y estructuras industriales",
    tituloFicha: "Sistema modular de clasificación PET SMC-PET 4",
    img: "/assets/img/prod-linea-pet.jpg",
    alt: "Sistema modular de clasificación PET SMC-PET 4 de SOLINAG",
    resumen:
      "Estructuras metálicas para plantas y bodegas, y sistemas modulares de clasificación PET, con foco en seguridad y durabilidad.",
    etiquetas: ["Plataformas", "Mezanines", "Cubiertas", "Clasificación PET"],
    textoBoton: "Ver ficha técnica: SMC-PET 4",
    mensaje: "Hola SOLINAG, quiero información sobre Estructuras industriales",
    intro:
      "Sistema modular de clasificación para 4 operarios, que separa y recupera botellas PET postconsumo antes del lavado o la compactación.",
    stats: [
      { v: "150–400", u: "kg/h de PET mixto" },
      { v: "2100 mm", u: "altura de descarga" },
      { v: "1,0 m³", u: "capacidad de tolva" },
    ],
    lista: [
      "Estructura modular y escalable, banda transportadora de 5.000 mm",
      "4 tolvas de recolección desmontables en lámina galvanizada",
      "Ideal para cooperativas, plantas de aprovechamiento y proyectos municipales",
      "Compatible con molino, compactadora y Big Bag para completar la línea",
    ],
  },

  {
    clave: "lavado-pet",
    ancla: null,
    tag: "Estructuras industriales",
    titulo: "Líneas de lavado y secado PET",
    tituloFicha: "Líneas de Lavado y Secado PET SOL-LP",
    img: "/assets/img/prod-lavado-pet.jpg",
    alt: "Línea de lavado y secado de hojuelas PET SOL-LP de SOLINAG",
    resumen:
      "Lavado, enjuague y secado de hojuelas PET postconsumo, en tres capacidades, con skid de tratamiento de agua opcional.",
    etiquetas: ["Líneas de lavado PET", "Tratamiento de agua", "Reciclaje industrial"],
    textoBoton: "Ver ficha técnica y modelos: SOL-LP",
    mensaje: "Hola SOLINAG, quiero información sobre las Líneas de lavado PET SOL-LP",
    intro:
      "Línea modular de lavado, enjuague y secado de hojuelas PET postconsumo, que elimina impurezas, etiquetas y residuos para obtener hojuela limpia y seca de alta calidad.",
    stats: [
      { v: "100–500", u: "kg/h según modelo" },
      { v: "1,5–3,0", u: "m³/h de agua" },
      { v: "AISI 304", u: "en contacto con el material" },
    ],
    tabla: {
      headers: ["Modelo", "Capacidad", "Aplicación recomendada"],
      rows: [
        ["SOL-LP100", "Hasta 100 kg/h", "Recicladores y centros de acopio"],
        ["SOL-LP250", "Hasta 250 kg/h", "Reciclaje de pequeña y mediana escala"],
        ["SOL-LP500", "Hasta 500 kg/h", "Plantas de mediana y alta producción"],
      ],
    },
    lista: [
      "Estructura en acero ASTM A36 con pintura epóxica de alta resistencia",
      "Operación continua, requiere 1–2 operadores por turno",
      "Complemento opcional: Skid de tratamiento y recuperación de agua SOL-WR500, recircula hasta 70% del agua del proceso",
      "Garantía de 12 meses por defectos de fabricación",
    ],
  },

  {
    clave: "bicitriciclo",
    ancla: "movilidad",
    categoriaCorta: "Movilidad",
    tag: "Movilidad y reciclaje",
    titulo: "Bicitriciclos de carga",
    tituloFicha: "Bicitriciclo de carga SOL-BT",
    img: "/assets/img/prod-bicitriciclo.jpg",
    alt: "Bicitriciclo de carga SOL-BT de SOLINAG",
    resumen:
      "Vehículos de tracción manual o eléctrica para recolección y logística urbana o rural, de bajas emisiones.",
    etiquetas: ["Bicitriciclos", "Sistemas de recolección", "Soluciones de economía circular"],
    textoBoton: "Ver ficha técnica y modelos: SOL-BT",
    mensaje: "Hola SOLINAG, quiero información sobre Movilidad y reciclaje",
    intro:
      "Vehículo de tracción manual o eléctrica para recolección y logística urbana o rural, de bajas emisiones y bajo costo de operación.",
    stats: [
      { v: "250 kg", u: "carga útil" },
      { v: "1,0 m³", u: "capacidad canastilla" },
    ],
    tabla: {
      headers: ["Modelo", "Tracción", "Batería", "Autonomía"],
      rows: [
        ["SOL-BT-M01", "Manual (pedaleo)", "—", "—"],
        ["SOL-BT-ME01G", "Eléctrica", "GEL 48V", "Hasta 30 km"],
        ["SOL-BT-ME01L", "Eléctrica", "Litio 48V", "Hasta 50 km"],
      ],
    },
    lista: [
      "Frenos de disco delantero y trasero",
      "Suspensión delantera para mayor comodidad",
      "Estructura en acero al carbono de alta resistencia",
      "Carpa impermeable desmontable",
    ],
  },

  {
    clave: "medida",
    ancla: "medida",
    categoriaCorta: "A medida",
    tag: "Ingeniería a medida",
    titulo: "Ingeniería a medida",
    tituloFicha: "Del concepto al plano de fabricación",
    img: "/assets/img/prod-ingeniero.jpg",
    alt: "Ingeniero SOLINAG en planta de producción",
    resumen:
      "Del concepto al plano de fabricación: diseñamos la solución exacta que tu operación necesita.",
    etiquetas: ["Diseño mecánico", "Modelado 3D", "Ingeniería de detalle", "Fabricación"],
    textoBoton: "Ver cómo trabajamos",
    mensaje: "Hola SOLINAG, quiero información sobre Ingeniería a medida",
    intro:
      "Cuando la solución no existe en catálogo, la desarrollamos contigo: un mismo equipo te acompaña en las cuatro etapas del proyecto.",
    stats: [
      { v: "01–04", u: "etapas de trabajo" },
      { v: "3D", u: "modelado y validación" },
    ],
    lista: [
      "Diseño mecánico e ingeniería de detalle",
      "Modelado 3D y validación técnica",
      "Fabricación propia con estándares de calidad",
      "Acompañamiento en instalación y puesta en marcha",
    ],
  },
];
