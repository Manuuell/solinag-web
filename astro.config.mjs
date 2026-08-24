// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.solinag.com.co",
  // El VPS sirve archivos estáticos con nginx: el build debe ser HTML plano.
  output: "static",
  // Genera /soluciones.html en vez de /soluciones/index.html, para conservar
  // las URLs ya indexadas y listadas en sitemap.xml.
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
});
