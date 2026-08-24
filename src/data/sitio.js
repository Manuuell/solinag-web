/**
 * Datos de la empresa y del sitio.
 *
 * Todo lo que antes estaba repetido en las 4 páginas vive aquí. Si cambia el
 * teléfono, el correo o el menú, se cambia en este archivo y nada más.
 */

export const EMPRESA = {
  marca: "SOLINAG SAS",
  razonSocial: "SOLUCIONES DE INGENIERÍA PARA LA INDUSTRIA Y EL AGRO SAS",
  // Misma razón social en caja normal, para el pie de página.
  razonSocialLegible: "Soluciones de Ingeniería para la Industria y el Agro SAS",
  slogan: "Innovación que transforma",
  descriptor: "Agro · Industria · Sostenibilidad",
  url: "https://www.solinag.com.co",
  correo: "ewis.campos@solinag.com.co",
  telefono: "+57 319 775 4909",
  telefonoE164: "+573197754909",
  direccion: {
    calle: "Manzana A Lote 4, Los Laureles",
    ciudad: "Turbaco",
    region: "Bolívar",
    pais: "CO",
    completa: "Manzana A Lote 4, Los Laureles, Turbaco, Bolívar, Colombia",
    corta: "Turbaco, Bolívar · Colombia",
  },
};

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
 * OJO: hoy apuntan a la página de inicio de cada plataforma, no a los perfiles
 * de SOLINAG — venían así del sitio original. Falta la URL real de cada uno.
 */
export const SOCIAL = [
  { id: "facebook", nombre: "Facebook", href: "https://facebook.com" },
  { id: "instagram", nombre: "Instagram", href: "https://instagram.com" },
  { id: "linkedin", nombre: "LinkedIn", href: "https://linkedin.com" },
  { id: "youtube", nombre: "YouTube", href: "https://youtube.com" },
];

/** Textos que rotan en la franja azul superior. */
export const FRANJA = [
  "Servicio y soluciones · Ingeniería agroindustrial",
  "Servicio y soluciones · Procesos industriales",
  "Servicio y soluciones · Sostenibilidad",
];
