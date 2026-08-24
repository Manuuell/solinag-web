/**
 * Catálogo de productos — fuente única.
 *
 * De cada objeto salen la tarjeta del catálogo, la galería de imágenes y la
 * ficha técnica completa. Antes había que mantener a mano dos copias que se
 * podían desincronizar.
 *
 * Campos:
 *   clave, ancla     identificador interno y id del <article>. El ancla la usan
 *                    el menú de categorías, el pie y los enlaces entrantes: no
 *                    renombrar.
 *   categoriaCorta   etiqueta del menú de categorías (solo si tiene ancla)
 *   tag              categoría que se muestra en la ficha
 *   titulo           título corto de la tarjeta
 *   tituloFicha      nombre comercial completo
 *   resumen          frase de la tarjeta
 *   etiquetas        chips de la tarjeta
 *   textoBoton       texto del botón que abre la ficha
 *   mensaje          texto prellenado del enlace de WhatsApp
 *   intro            párrafo de apertura de la ficha
 *   img / alt        imagen principal
 *   encuadre         "contener" para renders sobre blanco (se ven completos) o
 *                    "cubrir" para fotografía real (llena la tarjeta)
 *   img              null si todavía no hay fotografía: la tarjeta dibuja un
 *                    panel de marca con `icono` en su lugar
 *   galeria          imágenes adicionales { src, alt, pie }
 *   stats            cifras destacadas { v, u }
 *   especificaciones grupos de ficha técnica { grupo, filas: [[etiqueta, valor]] }
 *   tabla            comparativa de modelos { headers, rows }
 *   materiales       materiales compatibles
 *   lista            viñetas con check
 *
 * Las especificaciones salen de las láminas de brand/catalogo/.
 */

export const PRODUCTOS = [
  {
    clave: "molino",
    encuadre: "contener",
    ancla: "maquinaria",
    categoriaCorta: "Maquinaria",
    tag: "Maquinaria y equipos",
    titulo: "Molino triturador industrial",
    tituloFicha: "Molino Triturador Compacto SOL-MTC",
    img: "/assets/img/prod-mtc-15.jpg",
    alt: "Molino triturador SOL-MTC-15 de SOLINAG",
    galeria: [
      { src: "/assets/img/prod-mtc-05.jpg", alt: "Molino triturador SOL-MTC-05", pie: "SOL-MTC-05 · 5 HP" },
      { src: "/assets/img/prod-mtc-15.jpg", alt: "Molino triturador SOL-MTC-15", pie: "SOL-MTC-15 · 15 HP" },
      { src: "/assets/img/prod-mtc-30.jpg", alt: "Molino triturador SOL-MTC-30", pie: "SOL-MTC-30 · 30 HP" },
    ],
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
      headers: ["Modelo", "Capacidad (PET)", "Motor", "RPM rotor", "Peso"],
      rows: [
        ["SOL-MTC-05", "50–100 kg/h", "5 HP", "430–450", "350–450 kg"],
        ["SOL-MTC-15", "200–250 kg/h", "15 HP", "500–520", "650–750 kg"],
        ["SOL-MTC-30", "450–500 kg/h", "30 HP", "550–600", "1.100–1.300 kg"],
      ],
    },
    especificaciones: [
      {
        grupo: "Capacidad por material (kg/h)",
        filas: [
          ["PET (botellas)", "50–100 · 200–250 · 450–500"],
          ["PVC / CPVC", "30–70 · 120–180 · 250–350"],
          ["PEAD (polietileno alta densidad)", "40–80 · 180–220 · 400–450"],
          ["PP (polipropileno)", "50–90 · 200–240 · 450–500"],
          ["ABS", "35–70 · 150–180 · 320–380"],
          ["Policarbonato (PC)", "30–60 · 120–160 · 280–330"],
          ["Nylon (PA)", "30–60 · 120–160 · 250–320"],
        ],
        nota: "Valores para SOL-MTC-05 · SOL-MTC-15 · SOL-MTC-30 respectivamente.",
      },
      {
        grupo: "Sistema",
        filas: [
          ["Sistema de trituración", "Corte progresivo tipo tijera"],
          ["Relación de corte", "4:1"],
          ["Tipo de rotor", "Abierto"],
          ["Transmisión", "Poleas y doble banda (tipo B en MTC-05, tipo C en MTC-15 y MTC-30)"],
          ["Alimentación eléctrica", "220 V monofásico (MTC-05) · 220/440 V trifásico (MTC-15 y MTC-30) – 60 Hz"],
        ],
      },
    ],
    lista: [
      "Alimentación eléctrica 220/440 V trifásico – 60 Hz",
      "Sistema de trituración de corte progresivo tipo tijera",
      "Transmisión por poleas y doble banda tipo C",
      "Guardas en transmisión, tolva con protección y paro de emergencia",
    ],
  },

  {
    clave: "compactadora-vertical",
    encuadre: "cubrir",
    ancla: null,
    tag: "Maquinaria y equipos",
    titulo: "Compactadora hidráulica vertical",
    tituloFicha: "Compactadora Hidráulica Vertical SOL-CV",
    img: "/assets/img/planta-compactadora.jpg",
    alt: "Compactadora hidráulica vertical SOLINAG fabricada en planta",
    galeria: [
      { src: "/assets/img/planta-compactadora.jpg", alt: "Compactadora vertical SOLINAG con unidad hidráulica", pie: "Equipo completo con unidad hidráulica" },
      { src: "/assets/img/planta-compactadora-frontal.jpg", alt: "Vista frontal de la compactadora vertical SOLINAG", pie: "Cámara de carga y puerta de expulsión" },
      { src: "/assets/img/planta-tablero.jpg", alt: "Tablero de control de la compactadora SOLINAG", pie: "Tablero de control e instrucciones de operación" },
      { src: "/assets/img/prod-compactadora-vertical.jpg", alt: "Compactadora vertical SOL-CV60M de doble cilindro", pie: "SOL-CV60M · doble cilindro" },
    ],
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
      { v: "180 Bar", u: "presión máxima" },
      { v: "1,80 m³", u: "cámara (CV60M)" },
    ],
    tabla: {
      headers: ["Modelo", "Fuerza", "Cámara", "Motor", "Peso equipo"],
      rows: [
        ["SOL-CV15M", "15 Ton", "1,0 m³", "—", "1.050 kg"],
        ["SOL-CV30M", "30 Ton", "1,20 m³", "10 HP / 7,5 kW", "2.500 kg"],
        ["SOL-CV60M", "60 Ton · doble cilindro", "1,80 m³", "20 HP", "≈4.200 kg"],
      ],
    },
    materiales: ["Papel de archivo", "Cartón", "PET", "HDPE", "Latas y metales", "Tetra Pak", "Textiles"],
    especificaciones: [
      {
        grupo: "SOL-CV30M · multipropósito",
        filas: [
          ["Fuerza de compactación", "30 Ton"],
          ["Presión máxima", "18 MPa / 2610 PSI / 180 Bar"],
          ["Capacidad de cámara", "1,20 m³"],
          ["Motor", "10 HP / 7,5 kW"],
          ["Voltaje", "220 V · 3 fases · 60 Hz"],
          ["Corriente nominal", "32 A"],
          ["Dimensiones (Al × An × L)", "215 × 120 × 130 cm"],
          ["Peso del equipo", "2.500 kg"],
        ],
      },
      {
        grupo: "SOL-CV60M · doble cilindro",
        filas: [
          ["Fuerza de compactación", "60 Ton"],
          ["Presión máxima", "180 Bar / 2610 PSI"],
          ["Capacidad de cámara", "1,80 m³"],
          ["Motor", "20 HP"],
          ["Voltaje", "Trifásico · 3 fases · 60 Hz"],
          ["Dimensiones (Al × An × L)", "350 × 150 × 180 cm"],
          ["Peso del equipo", "≈4.200 kg"],
        ],
      },
      {
        grupo: "Peso objetivo del fardo por material",
        filas: [
          ["Papel de archivo", "800 – 1.000 kg"],
          ["Cartón corrugado", "500 – 700 kg"],
          ["Envases PET", "250 – 350 kg"],
          ["HDPE (envases plásticos)", "350 – 500 kg"],
          ["Film plástico (PEBD)", "250 – 400 kg"],
          ["Latas de aluminio", "350 – 500 kg"],
          ["Envases metálicos livianos", "500 – 700 kg"],
          ["Tetra Pak", "300 – 450 kg"],
          ["Textiles", "350 – 600 kg"],
        ],
        nota: "Valores del SOL-CV60M. No recomendado para chatarra pesada ni acero macizo.",
      },
    ],
    lista: [
      "Estructura en acero reforzado de alta resistencia",
      "Sistema hidráulico de alta presión y operación eléctrica segura",
      "Compactación incremental con aproximación rápida y prensado a alta presión",
      "Expulsión hidráulica del fardo y guiados laterales para máxima estabilidad",
      "Parada de emergencia, protecciones eléctricas e hidráulicas y guardas de seguridad",
    ],
  },

  {
    clave: "linea-pet",
    encuadre: "contener",
    ancla: "estructuras",
    categoriaCorta: "Estructuras",
    tag: "Estructuras industriales",
    titulo: "Clasificación y estructuras industriales",
    tituloFicha: "Sistema modular de clasificación PET SMC-PET 4",
    img: "/assets/img/prod-smc-pet4.jpg",
    alt: "Sistema modular de clasificación PET SMC-PET 4 con cuatro operarios",
    galeria: [
      { src: "/assets/img/prod-smc-pet4.jpg", alt: "Sistema SMC-PET 4 completo", pie: "Línea completa para 4 operarios" },
      { src: "/assets/img/prod-linea-pet.jpg", alt: "Detalle del sistema de clasificación PET", pie: "Banda de separación y tolvas" },
    ],
    resumen:
      "Estructuras metálicas para plantas y bodegas, y sistemas modulares de clasificación PET, con foco en seguridad y durabilidad.",
    etiquetas: ["Plataformas", "Mezanines", "Cubiertas", "Clasificación PET"],
    textoBoton: "Ver ficha técnica: SMC-PET 4",
    mensaje: "Hola SOLINAG, quiero información sobre Estructuras industriales",
    intro:
      "Sistema modular de clasificación para 4 operarios, que separa y recupera botellas PET postconsumo antes del lavado o la compactación.",
    stats: [
      { v: "150–400", u: "kg/h de PET mixto" },
      { v: "5.000 mm", u: "largo total" },
      { v: "4", u: "operarios (2 por lado)" },
      { v: "650–900", u: "kg de peso" },
    ],
    especificaciones: [
      {
        grupo: "Dimensiones",
        filas: [
          ["Largo total", "5.000 mm"],
          ["Ancho útil de banda", "800 mm"],
          ["Ancho total de estructura", "1.300 mm"],
          ["Altura de trabajo", "900 mm"],
          ["Altura de descarga de tolva", "2.100 mm"],
          ["Peso aproximado", "650 – 900 kg"],
        ],
      },
      {
        grupo: "Accionamiento",
        filas: [
          ["Velocidad de banda", "8 – 18 m/min (óptima 12 m/min)"],
          ["Motorreductor", "1 HP – trifásico"],
          ["Control de velocidad", "Variador de frecuencia"],
          ["Voltaje", "220 / 440 V – 60 Hz"],
          ["Banda transportadora", "PVC verde, 2 mm"],
        ],
      },
      {
        grupo: "Construcción",
        filas: [
          ["Estructura", 'Tubo cuadrado 2" × 2", cal. 2 mm, acero al carbón'],
          ["Iluminación", "LED blanca 6500 K – IP65"],
          ["Tolvas de recolección", "4 unidades, lámina galvanizada, inclinación 45°, ancho útil 400 mm"],
          ["Tolva de alimentación", "Elevada, 1,0 m³, descarga a 2.100 mm"],
          ["Descarga final", "A tolva pulmón, molino o big bag"],
        ],
      },
    ],
    lista: [
      "Estructura modular y escalable, banda transportadora de 5.000 mm",
      "4 tolvas de recolección desmontables en lámina galvanizada",
      "Ideal para cooperativas, plantas de aprovechamiento y proyectos municipales",
      "Opcionales: tolva pulmón, molino PET, separador magnético, prensa compactadora, big bag e imán de ferrosos",
    ],
  },

  {
    clave: "lavado-pet",
    encuadre: "contener",
    ancla: null,
    tag: "Estructuras industriales",
    titulo: "Líneas de lavado y secado PET",
    tituloFicha: "Líneas de Lavado y Secado PET SOL-LP",
    img: "/assets/img/prod-lp-linea.jpg",
    alt: "Línea completa de lavado y secado de hojuelas PET SOL-LP",
    galeria: [
      { src: "/assets/img/prod-lp-linea.jpg", alt: "Línea SOL-LP completa", pie: "Los siete equipos de la línea" },
      { src: "/assets/img/prod-lavado-pet.jpg", alt: "Detalle de los equipos de lavado PET", pie: "Lavadora por fricción y desaguadores" },
    ],
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
      { v: "7", u: "equipos en línea" },
    ],
    tabla: {
      headers: ["Modelo", "Capacidad nominal", "Aplicación recomendada"],
      rows: [
        ["SOL-LP100", "Hasta 100 kg/h", "Recicladores, microempresas y centros de acopio"],
        ["SOL-LP250", "Hasta 250 kg/h", "Empresas de reciclaje de pequeña y mediana escala"],
        ["SOL-LP500", "Hasta 500 kg/h", "Plantas de reciclaje de mediana y alta producción"],
      ],
    },
    proceso: [
      "Tanque de lavado (TL)",
      "Tornillo desaguador A (SC-A)",
      "Lavadora por fricción (FW)",
      "Tornillo desaguador B (SC-B)",
      "Tanque de enjuague (RT)",
      "Tornillo desaguador C (SC-C)",
      "Centrífuga (CE)",
    ],
    especificaciones: [
      {
        grupo: "Operación",
        filas: [
          ["Consumo de agua", "1,5 – 3,0 m³/h (según modelo y operación)"],
          ["Voltaje de operación", "Trifásico 220 / 440 V"],
          ["Frecuencia", "60 Hz"],
          ["Tipo de operación", "Continua"],
          ["Personal requerido", "1 – 2 operadores por turno"],
          ["Instalación", "Requiere conexión de agua, energía eléctrica y drenaje"],
          ["Garantía", "12 meses por defectos de fabricación"],
        ],
      },
      {
        grupo: "Materiales de construcción",
        filas: [
          ["Partes en contacto con el material", "Acero inoxidable AISI 304"],
          ["Estructura principal", "Acero al carbono ASTM A36 con pintura epóxica"],
        ],
      },
    ],
    lista: [
      "Proceso completo de lavado y secado de hojuelas PET",
      "Eliminación efectiva de etiquetas, adhesivos, tierra y residuos orgánicos",
      "Diseño modular, compacto y de fácil mantenimiento",
      "Complemento opcional: skid SOL-WR500, que recircula hasta el 70% del agua del proceso",
    ],
  },

  {
    clave: "wr500",
    encuadre: "contener",
    ancla: null,
    tag: "Estructuras industriales",
    titulo: "Skid de tratamiento de agua",
    tituloFicha: "Skid de Tratamiento y Recuperación de Agua SOL-WR500",
    img: "/assets/img/prod-wr500.jpg",
    alt: "Skid de tratamiento y recuperación de agua SOL-WR500",
    galeria: [
      { src: "/assets/img/prod-wr500.jpg", alt: "Skid SOL-WR500 completo", pie: "Sedimentación, filtrado y recirculación" },
    ],
    resumen:
      "Recupera y recircula hasta el 70% del agua de la línea de lavado PET, reduciendo consumo y carga contaminante.",
    etiquetas: ["Tratamiento de agua", "Economía circular", "Complemento SOL-LP"],
    textoBoton: "Ver ficha técnica: SOL-WR500",
    mensaje: "Hola SOLINAG, quiero información sobre el Skid de tratamiento de agua SOL-WR500",
    intro:
      "Sistema compacto para el tratamiento, recuperación y recirculación del agua de la línea de lavado de hojuelas PET, diseñado específicamente para la línea SOL-LP500.",
    stats: [
      { v: "500 kg/h", u: "de hojuelas PET" },
      { v: "hasta 70%", u: "del agua recirculada" },
      { v: "≥ 90%", u: "remoción de sólidos" },
      { v: "1,5–3,0", u: "m³/h tratados" },
    ],
    proceso: [
      "Entrada de agua residual",
      "Tanque de sedimentación (TK-6001)",
      "Filtro autolimpiante (FA-6001)",
      "Tanque de agua limpia (TK-6002)",
      "Recirculación a la línea de lavado",
    ],
    especificaciones: [
      {
        grupo: "Generales",
        filas: [
          ["Capacidad de diseño", "500 kg/h de hojuelas PET"],
          ["Caudal de agua tratada", "1,5 – 3,0 m³/h (según operación)"],
          ["Remoción de sólidos", "≥ 90% (sólidos suspendidos)"],
          ["Voltaje de operación", "Trifásico 220 / 440 V – 60 Hz"],
          ["Potencia instalada", "7,5 – 11 kW (según configuración)"],
          ["Tipo de operación", "Continua"],
          ["Personal requerido", "1 operador por turno"],
          ["Dimensiones (L × A × H)", "2.800 × 1.200 × 1.900 mm"],
          ["Peso aproximado", "1.000 – 1.200 kg"],
        ],
      },
      {
        grupo: "Equipos principales",
        filas: [
          ["TK-6001 · Tanque de sedimentación", "Retiene y sedimenta sólidos pesados · ASTM A36 con pintura epóxica"],
          ["FA-6001 · Filtro autolimpiante", "Retiene sólidos finos por filtración automática · AISI 304"],
          ["TK-6002 · Tanque de agua limpia", "Almacena el agua tratada para recirculación · ASTM A36 con pintura epóxica"],
          ["Bomba de recirculación", "Impulsa el agua limpia a la línea de lavado · AISI 304 / hierro fundido"],
          ["Tablero eléctrico", "Control y protección de los equipos del skid · Gabinete metálico"],
        ],
      },
    ],
    lista: [
      "Reduce el consumo de agua fresca hasta en un 70% según operación",
      "Disminuye la carga contaminante en los efluentes",
      "Sistema compacto y modular, listo para conectar y operar",
      "Mejora la sostenibilidad y el cumplimiento de la normativa ambiental",
    ],
  },

  {
    clave: "estructuras-metalicas",
    ancla: null,
    tag: "Estructuras industriales",
    titulo: "Plataformas y estructuras metálicas",
    tituloFicha: "Plataformas, barandas y estructuras metálicas",
    // PENDIENTE: hay fotografía de obra ejecutada en el Google Sites de la
    // empresa (plataformas industriales montadas, estructura en azotea con
    // barandas, módulo para espacios confinados). Google bloquea la descarga
    // directa; en cuanto lleguen los archivos, basta con poner aquí la ruta.
    img: null,
    icono: "edificio",
    alt: "Plataformas y estructuras metálicas fabricadas por SOLINAG",
    resumen:
      "Plataformas industriales, mezanines, barandas, cubiertas y escaleras, diseñadas, fabricadas y montadas en sitio.",
    etiquetas: ["Plataformas", "Mezanines", "Barandas", "Cubiertas", "Escaleras"],
    textoBoton: "Ver alcance del servicio",
    mensaje: "Hola SOLINAG, quiero información sobre plataformas y estructuras metálicas",
    intro:
      "Diseñamos, fabricamos y montamos estructura metálica a la medida de cada planta: desde plataformas de operación y mezanines hasta barandas de seguridad, cubiertas y escaleras.",
    stats: [
      { v: "Diseño", u: "cálculo y planos de detalle" },
      { v: "Montaje", u: "instalación en tu planta" },
    ],
    especificaciones: [
      {
        grupo: "Qué fabricamos",
        filas: [
          ["Plataformas industriales", "Superficies de operación y mantenimiento a distinto nivel"],
          ["Mezanines", "Entrepisos para aprovechar la altura libre de la bodega"],
          ["Barandas y pasamanos", "Protección perimetral y de escaleras, según normativa"],
          ["Cubiertas", "Techos y coberturas para zonas de proceso y almacenamiento"],
          ["Escaleras y accesos", "Escaleras de servicio, peldaños y accesos a equipos"],
          ["Estructura para espacios confinados", "Módulos prefabricados para centros de entrenamiento"],
        ],
      },
      {
        grupo: "Alcance del trabajo",
        filas: [
          ["Diseño", "Ingeniería de detalle y planos de fabricación"],
          ["Fabricación", "Producción propia en la planta de Turbaco"],
          ["Montaje", "Instalación en sitio con equipo propio"],
          ["Mantenimiento", "Inspección y mantenimiento posterior"],
        ],
      },
    ],
    lista: [
      "Acero estructural con acabado según ambiente de operación",
      "Diseño ajustado al espacio y la operación real de cada planta",
      "Montaje en sitio, coordinado para no detener tu producción",
      "Foco en seguridad: protección perimetral y accesos normalizados",
    ],
  },

  {
    clave: "bicitriciclo",
    encuadre: "contener",
    ancla: "movilidad",
    categoriaCorta: "Movilidad",
    tag: "Movilidad y reciclaje",
    titulo: "Bicitriciclos de carga",
    tituloFicha: "Bicitriciclo de carga SOL-BT",
    img: "/assets/img/prod-bt-me01l.jpg",
    alt: "Bicitriciclo de carga eléctrico SOL-BT-ME01L de SOLINAG",
    galeria: [
      { src: "/assets/img/prod-bt-m01.jpg", alt: "Bicitriciclo manual SOL-BT-M01", pie: "SOL-BT-M01 · manual" },
      { src: "/assets/img/prod-bt-me01g.jpg", alt: "Bicitriciclo eléctrico SOL-BT-ME01G", pie: "SOL-BT-ME01G · batería GEL" },
      { src: "/assets/img/prod-bt-me01l.jpg", alt: "Bicitriciclo eléctrico SOL-BT-ME01L", pie: "SOL-BT-ME01L · batería litio" },
    ],
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
      { v: "hasta 50 km", u: "autonomía (litio)" },
      { v: "1000 W", u: "motor eléctrico 48 V" },
    ],
    tabla: {
      headers: ["Característica", "SOL-BT-M01", "SOL-BT-ME01G", "SOL-BT-ME01L"],
      rows: [
        ["Tracción", "Pedaleo", "Eléctrica", "Eléctrica"],
        ["Motor", "—", "1000 W / 48 V", "1000 W / 48 V"],
        ["Batería", "—", "GEL 48 V", "Litio 48 V"],
        ["Autonomía", "—", "Hasta 30 km", "Hasta 50 km"],
        ["Carga útil", "250 kg", "250 kg", "250 kg"],
        ["Capacidad volumétrica", "1,0 m³", "1,0 m³", "1,0 m³"],
      ],
    },
    especificaciones: [
      {
        grupo: "Comunes a los tres modelos",
        filas: [
          ["Número de ruedas", "3"],
          ["Frenos", "Disco delantero y trasero"],
          ["Suspensión", "Delantera, para mayor comodidad"],
          ["Estructura", "Acero al carbono estructural de alta resistencia"],
          ["Carpa", "Impermeable desmontable, protege del sol y la lluvia"],
        ],
      },
    ],
    lista: [
      "Frenos de disco delantero y trasero",
      "Suspensión delantera para mayor comodidad",
      "Estructura en acero al carbono de alta resistencia",
      "Ideales para programas de reciclaje, centros de acopio y logística urbana sostenible",
    ],
  },

  {
    clave: "medida",
    encuadre: "cubrir",
    ancla: "medida",
    categoriaCorta: "A medida",
    tag: "Ingeniería a medida",
    titulo: "Ingeniería a medida",
    tituloFicha: "Del concepto al plano de fabricación",
    img: "/assets/img/prod-ingeniero.jpg",
    alt: "Ingeniero de SOLINAG en planta de reciclaje",
    galeria: [
      { src: "/assets/img/prod-ingeniero.jpg", alt: "Ingeniero de SOLINAG en planta", pie: "Diagnóstico en operación real" },
    ],
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
    proceso: ["Diagnóstico", "Diseño", "Implementación", "Seguimiento"],
    especificaciones: [
      {
        grupo: "Áreas de trabajo",
        filas: [
          ["Logística y recolección", "Diseñamos rutas eficientes, optimizamos flotas y mejoramos la planificación de recolección"],
          ["Compactación", "Evaluamos y diseñamos sistemas de compactación adecuados para cada tipo de material"],
          ["Separación", "Diseñamos estaciones de clasificación y flujos de trabajo que mejoran la calidad del material"],
          ["Procesos integrales", "Analizamos y optimizamos todo el proceso para aumentar eficiencia y rentabilidad"],
        ],
      },
      {
        grupo: "Para quién es este servicio",
        filas: [
          ["Empresas de reciclaje", "—"],
          ["Cooperativas y asociaciones", "—"],
          ["Entidades públicas y privadas", "—"],
          ["Centros de acopio y estaciones de transferencia", "—"],
        ],
      },
    ],
    lista: [
      "Diseño mecánico e ingeniería de detalle",
      "Modelado 3D y validación técnica",
      "Fabricación propia con estándares de calidad",
      "Acompañamiento en instalación y puesta en marcha",
    ],
  },
];
