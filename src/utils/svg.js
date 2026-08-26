/**
 * Los SVG exportados de Illustrator traen clases genéricas (cls-1, cls-2...)
 * definidas en su propio <style>. Al incrustar el SVG con set:html ese
 * <style> deja de estar aislado: pasa a ser una etiqueta más del documento,
 * así que dos SVG del mismo paquete de marca —que reusan los mismos nombres
 * de clase por venir del mismo exportador— se pisan entre sí. Gana el que
 * quede más abajo en el DOM, y gana para TODO el documento, no solo para su
 * propio SVG (así se rompió el texto de FranjaSuperior: el cls-1 de
 * Footer, más abajo en el HTML, le impuso su font-size).
 */
export function escoparClasesSvg(svg, prefijo) {
  return svg.replace(/\bcls-(\d+)\b/g, `${prefijo}-cls-$1`);
}
