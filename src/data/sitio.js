/**
 * Datos de la empresa y del sitio.
 *
 * Todo lo que antes estaba repetido en las 4 páginas vive aquí. Si cambia el
 * teléfono, el correo o el menú, se cambia en este archivo y nada más.
 */

/**
 * ¿Están confirmados los datos de contacto?
 *
 * Manuel encontró, buscando material para el sitio, valores que se
 * contradicen entre sí:
 *
 *   Correos    ewis.campos@solinag.com.co   (sitio, láminas del catálogo)
 *              Ewis0118@gmail.com           (Google Sites de la empresa)
 *              Ewiscampo@gmail.com          (Google Sites de la empresa)
 *
 *   Teléfonos  +57 319 775 4909             (sitio, casi todas las láminas)
 *              +57 323 558 0729             (solo la lámina del SMC-PET 4)
 *              319775909                    (Google Sites — le falta un dígito
 *                                            y NO marca; es el que ve quien
 *                                            llega desde Instagram)
 *
 * Decisión (2026-08-24): se publican +57 319 775 4909 / ewis.campos@solinag.com.co
 * — son los que coinciden entre el manual de identidad, el número real detrás
 * del botón de WhatsApp (que nunca estuvo gateado por esta constante) y casi
 * todas las láminas del catálogo. Mostrar un placeholder obviamente falso
 * ("39000000", "correo@gmail.com") en producción es peor que mostrar el dato
 * mejor atestiguado, aun sin confirmación directa de la empresa.
 */
export const CONTACTO_VERIFICADO = true;

export const EMPRESA = {
  marca: "SOLINAG SAS",
  razonSocial: "SOLUCIONES DE INGENIERÍA PARA LA INDUSTRIA Y EL AGRO SAS",
  // Misma razón social en caja normal. El pie la mostraba hasta que Manuel
  // pidió acortar el copyright (2026-08-26); se conserva porque es un dato
  // legal de la empresa y es el formato listo para volver a mostrarla sin
  // reescribirlo. La versión en mayúsculas (`razonSocial`) sigue en uso en
  // los datos estructurados que lee Google.
  razonSocialLegible: "Soluciones de Ingeniería para la Industria y el Agro SAS",
  slogan: "Innovación que transforma",
  descriptor: "Agro · Industria · Sostenibilidad",
  url: "https://www.solinag.com.co",
  // Año de fundación, confirmado directamente (2026-08-26). No estaba
  // disponible cuando se armó BandaCredibilidad -- de ahí que esa banda evite
  // a propósito cifras de trayectoria.
  fundacion: 2017,

  // Provisionales: son los valores mejor corroborados, pero sin confirmar.
  // Solo se muestran en pantalla si CONTACTO_VERIFICADO es true.
  correo: "ewis.campos@solinag.com.co",
  telefono: "+57 319 775 4909",
  telefonoE164: "+573197754909",

  // Marcadores visibles mientras no se confirmen los datos reales.
  // Son deliberadamente evidentes para que nadie los confunda con los buenos.
  correoGenerico: "correo@gmail.com",
  telefonoGenerico: "39000000",

  direccion: {
    calle: "Manzana A Lote 4, Los Laureles",
    ciudad: "Turbaco",
    region: "Bolívar",
    pais: "CO",
    completa: "Manzana A Lote 4, Los Laureles, Turbaco, Bolívar, Colombia",
    corta: "Turbaco, Bolívar · Colombia",
    // El Google Sites de la empresa declara cobertura en Cartagena además de Turbaco.
    cobertura: "Cartagena de Indias y Turbaco, Bolívar",
  },
};

/** Lo que se muestra como teléfono: el real solo si está confirmado. */
export const TELEFONO_VISIBLE = CONTACTO_VERIFICADO
  ? EMPRESA.telefono
  : EMPRESA.telefonoGenerico;

/** Lo que se muestra como correo: el real solo si está confirmado. */
export const CORREO_VISIBLE = CONTACTO_VERIFICADO
  ? EMPRESA.correo
  : EMPRESA.correoGenerico;

/** Número de WhatsApp. Antes estaba escrito a mano en 23 sitios. */
export const WHATSAPP = "573197754909";

/**
 * Construye un enlace de WhatsApp con el mensaje ya prellenado.
 * Se encarga del URL-encode, que antes había que recordar hacer a mano.
 *
 * @param {string} [mensaje] Texto en claro; si se omite, abre el chat vacío.
 * @returns {string}
 */
export function whatsapp(mensaje) {
  const base = `https://wa.me/${WHATSAPP}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/**
 * URL interna de una página.
 *
 * En producción las páginas son /soluciones.html — así están indexadas, así
 * las lista sitemap.xml y a eso apuntan los canonical, de modo que los enlaces
 * internos deben coincidir. Pero el dev server de Astro registra la ruta como
 * /soluciones y da 404 con la extensión, así que en desarrollo se omite.
 *
 * El nginx del VPS resuelve las dos formas (try_files), o sea que ninguna de
 * las dos se rompe; esto solo mantiene la coherencia con el canonical.
 *
 * @param {string} pagina Nombre del archivo sin extensión; "" o "inicio" = raíz.
 * @param {string} [ancla] Fragmento opcional, sin la almohadilla.
 */
export function ruta(pagina, ancla) {
  const fragmento = ancla ? `#${ancla}` : "";
  if (!pagina || pagina === "inicio") return `/${fragmento}`;
  return import.meta.env.DEV ? `/${pagina}${fragmento}` : `/${pagina}.html${fragmento}`;
}

/**
 * Enlace al formulario de contacto.
 *
 * Si ya estás en Nosotros devuelve solo "#contacto": un enlace a
 * "/nosotros.html#contacto" desde "/nosotros" es otra URL para el navegador,
 * así que recarga la página entera en vez de desplazarse dentro de ella.
 *
 * @param {string} [actual] Identificador de la página que se está viendo.
 */
export function enlaceContacto(actual) {
  return actual === "nosotros" ? "#contacto" : ruta("nosotros", "contacto");
}

/** Menú principal. El `id` marca cuál va resaltado en cada página. */
export const NAV = [
  { id: "inicio", texto: "Inicio", href: ruta("inicio") },
  { id: "soluciones", texto: "Soluciones", href: ruta("soluciones") },
  { id: "proyectos", texto: "Proyectos", href: ruta("proyectos") },
  { id: "nosotros", texto: "Nosotros", href: ruta("nosotros") },
  { id: "contacto", texto: "Contacto", href: ruta("nosotros", "contacto") },
];

/**
 * Perfiles sociales.
 * Instagram es el perfil real. Facebook, LinkedIn y YouTube siguen apuntando a
 * la portada de cada plataforma: venían así del sitio original y faltan las
 * URLs reales.
 */
export const SOCIAL = [
  { id: "facebook", nombre: "Facebook", href: "https://facebook.com" },
  { id: "instagram", nombre: "Instagram", href: "https://www.instagram.com/solinag_sas/" },
  { id: "linkedin", nombre: "LinkedIn", href: "https://linkedin.com" },
  { id: "youtube", nombre: "YouTube", href: "https://youtube.com" },
];

/**
 * Especialidades de ingeniería.
 *
 * Fuente: el sitio en Google Sites que la empresa mantiene
 * (sites.google.com/view/solinag). La web anterior solo hablaba de tres ejes
 * — agro, industria y sostenibilidad — que son los sectores a los que sirve,
 * no las disciplinas que domina.
 */
export const ESPECIALIDADES = [
  { icono: "engranaje", nombre: "Ingeniería mecánica", texto: "Diseño y fabricación de equipos, estructuras y sistemas mecánicos." },
  { icono: "proceso", nombre: "Ingeniería de procesos", texto: "Análisis y optimización de líneas productivas completas." },
  { icono: "rayo", nombre: "Ingeniería eléctrica", texto: "Instalaciones, tableros de control y automatización de equipos." },
  { icono: "edificio", nombre: "Ingeniería civil", texto: "Obra civil asociada al montaje de plantas y estructuras." },
  { icono: "grafico", nombre: "Ingeniería industrial", texto: "Productividad, seguridad y organización de la operación." },
  { icono: "diana", nombre: "Ingeniería mecatrónica", texto: "Integración de mecánica, electrónica y control en un mismo equipo." },
];

/**
 * Las etapas del trabajo, de principio a fin.
 *
 * La web anterior terminaba en la entrega. El Google Sites de la empresa
 * describe "diseño, fabricación, montaje y mantenimiento", así que el
 * acompañamiento posterior — que además es un servicio recurrente — faltaba.
 */
export const PROCESO = [
  { n: "01", titulo: "Entendemos la necesidad", texto: "Escuchamos tu operación y definimos el reto real a resolver." },
  { n: "02", titulo: "Diseñamos la solución", texto: "Ingeniería de detalle, modelado 3D y validación técnica." },
  { n: "03", titulo: "Fabricamos con calidad", texto: "Producción propia con estándares de ingeniería y seguridad." },
  { n: "04", titulo: "Montamos en sitio", texto: "Instalación y puesta en marcha en tu planta, con nuestro equipo." },
  { n: "05", titulo: "Capacitamos a tu gente", texto: "Entrenamos a los operarios que van a usar el equipo a diario." },
  { n: "06", titulo: "Mantenemos el equipo", texto: "Mantenimiento post-implementación y soporte técnico continuo." },
];
