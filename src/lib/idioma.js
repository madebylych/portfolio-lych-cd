import { useSyncExternalStore } from "react";
import * as ES from "../data/contenido";
import * as EN from "../data/contenido-en";
import { TEXTOS } from "../data/textos";

/*
 * Idioma del sitio: "es" (por defecto) o "en". La elección se guarda en el
 * navegador para la próxima visita y se refleja en <html lang>.
 */
const CLAVE = "lych-idioma";
const VALIDOS = ["es", "en"];

function leerGuardado() {
  try {
    const v = localStorage.getItem(CLAVE);
    return VALIDOS.includes(v) ? v : "es";
  } catch {
    return "es";
  }
}

let actual = typeof window !== "undefined" ? leerGuardado() : "es";
const oyentes = new Set();
if (typeof document !== "undefined") document.documentElement.lang = actual;

export function cambiarIdioma(idioma) {
  if (!VALIDOS.includes(idioma) || idioma === actual) return;
  actual = idioma;
  try {
    localStorage.setItem(CLAVE, idioma);
  } catch {
    // sin almacenamiento (modo privado): el cambio dura solo esta visita
  }
  document.documentElement.lang = idioma;
  oyentes.forEach((fn) => fn());
}

export function useIdioma() {
  return useSyncExternalStore(
    (fn) => {
      oyentes.add(fn);
      return () => oyentes.delete(fn);
    },
    () => actual
  );
}

/* textos fijos de la interfaz */
export const useT = () => TEXTOS[useIdioma()];

/* contenido (proyectos, laboratorio, sobre mí...) en el idioma activo */
export const useContenido = () => (useIdioma() === "en" ? EN : ES);

/* para código fuera de React (por ejemplo, el cursor) */
export const textosActuales = () => TEXTOS[actual];
