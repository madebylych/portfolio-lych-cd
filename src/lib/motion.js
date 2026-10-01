import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

/** Scroll suave con Lenis, sincronizado con el reloj de GSAP para que ScrollTrigger no tiemble. */
export function iniciarScroll() {
  if (lenis || reduceMotion) return lenis;
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* destino: selector ("#obras") o número de píxeles; inmediato salta sin animar */
export function irA(destino, inmediato = false) {
  if (lenis) {
    lenis.scrollTo(destino, inmediato ? { immediate: true, force: true } : { duration: 1.6, offset: 0 });
    return;
  }
  if (typeof destino === "number") window.scrollTo(0, destino);
  else document.querySelector(destino)?.scrollIntoView();
}

export function pausarScroll(pausa) {
  if (!lenis) return;
  if (pausa) lenis.stop();
  else lenis.start();
}

export { gsap, ScrollTrigger };
