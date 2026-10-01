import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// En GitHub Pages el sitio vive en https://madebylych.github.io/portfolio-lych-cd/,
// así que al compilar todas las rutas cuelgan de esa base. En desarrollo es "/".
// Si algún día se usa un dominio propio, basta con cambiar BASE_PUBLICADA a "/".
const BASE_PUBLICADA = "/portfolio-lych-cd/";

export default defineConfig(({ command, isPreview }) => ({
  // isPreview: "npm run preview" sirve la versión compilada con la misma base que GitHub Pages
  base: command === "build" || isPreview ? BASE_PUBLICADA : "/",
  plugins: [react()],
}));
