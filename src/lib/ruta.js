import { useSyncExternalStore } from "react";

/*
 * Router mínimo con la History API: "/" y "/proyecto/:id".
 * Los enlaces son <a href> de verdad (Ctrl+clic abre otra pestaña); el clic
 * normal pasa por navegar(), que deja tiempo a la cortina de transición.
 *
 * El código usa rutas "lógicas" que empiezan en "/" ("/proyecto/medea",
 * "/#obras"). url() les antepone la base del sitio (en GitHub Pages el sitio
 * vive en /portfolio-lych-cd/) y useRuta() se la quita al leer.
 */
const BASE = import.meta.env.BASE_URL; // "/" en desarrollo, "/portfolio-lych-cd/" publicado

export function url(logica) {
  return BASE + logica.replace(/^\//, "");
}

function rutaActual() {
  const camino = window.location.pathname;
  const sinBase = camino.startsWith(BASE) ? camino.slice(BASE.length - 1) : camino;
  return (sinBase || "/") + window.location.hash;
}

const oyentes = new Set();
let antesDeNavegar = null; // la cortina registra aquí su animación de entrada

function avisar() {
  oyentes.forEach((fn) => fn());
}

if (typeof window !== "undefined") window.addEventListener("popstate", avisar);

export function useRuta() {
  return useSyncExternalStore(
    (fn) => {
      oyentes.add(fn);
      return () => oyentes.delete(fn);
    },
    rutaActual
  );
}

export function leerRuta(ruta) {
  const [camino, ancla] = ruta.split("#");
  const m = camino.match(/^\/proyecto\/([\w-]+)\/?$/);
  return { pagina: m ? "proyecto" : "inicio", id: m?.[1] ?? null, ancla: ancla ? `#${ancla}` : null };
}

export function registrarCortina(fn) {
  antesDeNavegar = fn;
}

export async function navegar(destino) {
  if (destino === rutaActual()) return;
  if (antesDeNavegar) await antesDeNavegar();
  window.history.pushState({}, "", url(destino));
  avisar();
}

/* onClick para <a href>: respeta Ctrl/Cmd/clic medio (nueva pestaña) */
export function alClicEnlace(e, destino) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navegar(destino);
}
