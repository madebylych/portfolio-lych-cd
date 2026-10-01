# LYCH: portafolio de Emily Chisaba

Sitio publicado: https://madebylych.github.io/portfolio-lych-cd/

Ilustración, 3D, animación y diseño digital.

## Desarrollo

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # compila en dist/ con la base /portfolio-lych-cd/
npm run preview   # sirve la versión compilada con la misma base que GitHub Pages
```

Hecho con React, Vite, GSAP y Lenis.

## Contenido

- Textos y lista de proyectos: `src/data/contenido.js`.
- Imágenes optimizadas: `public/media/` (los originales no están en el repositorio).

## Publicación

Cada push a `master` publica el sitio con GitHub Actions (`.github/workflows/pages.yml`).
Para usar un dominio propio, cambiar `BASE_PUBLICADA` a `"/"` en `vite.config.js`.
