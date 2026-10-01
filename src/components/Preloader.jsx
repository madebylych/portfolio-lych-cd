import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { MEDEA } from "../data/contenido";
import LogoLiquido from "./LogoLiquido";
import "./Preloader.css";

/*
 * Pantalla de carga: el icono LYCH en el centro se llena de líquido según
 * lo que de verdad va cargando (fuentes e imágenes críticas). Nada más.
 */
const CRITICOS = [
  import.meta.env.BASE_URL + "media/hero/sentir.webp",
  import.meta.env.BASE_URL + "media/marca/lych-silueta.png",
  import.meta.env.BASE_URL + "media/marca/lych-trazos.png",
  MEDEA.frame(1),
];
const MINIMO = 1200; // ms: que alcance a verse el llenado

function precargar(src) {
  return new Promise((ok) => {
    const im = new Image();
    im.onload = im.onerror = ok;
    im.src = src;
  });
}

export default function Preloader({ alRevelar, alTerminar }) {
  const raiz = useRef(null);
  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    const inicio = performance.now();
    const tareas = [...CRITICOS.map(precargar), document.fonts?.ready ?? Promise.resolve()];
    let hechas = 0;
    let real = 0;
    tareas.forEach((p) => p.then(() => (real = ++hechas / tareas.length)));

    // el nivel visible nunca adelanta a la carga real ni al tiempo mínimo
    let raf;
    let salio = false;
    const tic = () => {
      const porTiempo = Math.min((performance.now() - inicio) / MINIMO, 1);
      const n = Math.min(real, porTiempo);
      setNivel(n);
      if (n >= 1 && !salio) {
        salio = true;
        salir();
        return;
      }
      raf = requestAnimationFrame(tic);
    };

    const salir = () => {
      if (reduceMotion) {
        alRevelar();
        alTerminar();
        return;
      }
      gsap
        .timeline({ delay: 0.35 })
        .to(".pre__logo", { scale: 1.15, opacity: 0, duration: 0.6, ease: "power2.in" })
        .add(() => alRevelar(), "-=0.2")
        .to(raiz.current, { opacity: 0, duration: 0.6, ease: "power1.out", onComplete: alTerminar }, "-=0.1");
    };

    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [alRevelar, alTerminar]);

  return (
    <div ref={raiz} className="pre" role="status" aria-label={`Cargando LYCH, ${Math.round(nivel * 100)} por ciento`}>
      <LogoLiquido nivel={nivel} className="pre__logo" />
    </div>
  );
}
