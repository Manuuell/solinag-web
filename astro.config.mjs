// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.solinag.com.co",
  // El VPS sirve archivos estáticos con nginx: el build debe ser HTML plano.
  output: "static",
  // Formato "directory" (el default de Astro): /soluciones/index.html,
  // servido en /soluciones/, sin extensión visible. Antes era "file"
  // (/soluciones.html) para conservar URLs ya indexadas en el subdominio de
  // pruebas -- pero ese subdominio nunca fue lo indexado de verdad (`site`,
  // arriba, ya apunta al dominio definitivo, que hoy no tiene nada propio) y
  // el sitio se va a mudar de dominio y de servidor de todos modos, así que
  // no hay nada que conservar (2026-08-27).
  vite: { plugins: [tailwindcss()] },
});
