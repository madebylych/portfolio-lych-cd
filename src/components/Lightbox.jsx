import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { gsap, pausarScroll, reduceMotion } from "../lib/motion";
import "./Lightbox.css";

const Ctx = createContext(() => {});
export const useLightbox = () => useContext(Ctx);

/* Visor de imagen a pantalla completa, compartido por todas las secciones. */
export function LightboxProvider({ children }) {
  const [item, setItem] = useState(null);
  const origen = useRef(null);
  const caja = useRef(null);

  const abrir = useCallback((src, titulo) => {
    origen.current = document.activeElement;
    setItem({ src, titulo });
  }, []);

  const cerrar = useCallback(() => {
    setItem(null);
    origen.current?.focus();
  }, []);

  useEffect(() => {
    pausarScroll(Boolean(item));
    if (!item) return;
    caja.current?.focus();
    if (!reduceMotion)
      gsap.fromTo(".visor__img", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" });
    const esc = (e) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [item, cerrar]);

  return (
    <Ctx.Provider value={abrir}>
      {children}
      {item && (
        <div
          ref={caja}
          className="visor"
          role="dialog"
          aria-modal="true"
          aria-label={item.titulo}
          tabIndex={-1}
          onClick={cerrar}
          data-cursor="cerrar"
        >
          <img className="visor__img" src={item.src} alt={item.titulo} />
          <p className="visor__titulo">{item.titulo}</p>
          <button className="visor__cerrar" onClick={cerrar}>
            Cerrar
          </button>
        </div>
      )}
    </Ctx.Provider>
  );
}
