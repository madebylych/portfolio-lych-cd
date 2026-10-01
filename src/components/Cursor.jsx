import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { useRuta } from "../lib/ruta";
import "./Cursor.css";

/*
 * Cursor propio: un punto que sigue al puntero y un anillo que lo persigue con
 * inercia. Sobre elementos con data-cursor="texto" el anillo crece y muestra
 * ese texto (por ejemplo "ver" o "arrastra"). No existe en pantallas táctiles.
 */
export default function Cursor() {
  const punto = useRef(null);
  const anillo = useRef(null);
  const [etiqueta, setEtiqueta] = useState("");
  const [activo] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion
  );

  // al cambiar de página el elemento bajo el cursor desaparece: limpiar la etiqueta
  const ruta = useRuta();
  useEffect(() => {
    setEtiqueta("");
    anillo.current?.classList.remove("cursor__anillo--sobre");
  }, [ruta]);

  useEffect(() => {
    if (!activo) return;
    document.documentElement.classList.add("con-cursor");
    const px = gsap.quickTo(punto.current, "x", { duration: 0.08 });
    const py = gsap.quickTo(punto.current, "y", { duration: 0.08 });
    const ax = gsap.quickTo(anillo.current, "x", { duration: 0.45, ease: "power3" });
    const ay = gsap.quickTo(anillo.current, "y", { duration: 0.45, ease: "power3" });

    const mover = (e) => {
      px(e.clientX);
      py(e.clientY);
      ax(e.clientX);
      ay(e.clientY);
    };
    const sobre = (e) => {
      const el = e.target.closest("[data-cursor], a, button");
      setEtiqueta(el ? el.dataset.cursor ?? "" : null);
      anillo.current.classList.toggle("cursor__anillo--sobre", Boolean(el));
    };
    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerover", sobre);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerover", sobre);
      document.documentElement.classList.remove("con-cursor");
    };
  }, [activo]);

  if (!activo) return null;
  return (
    <div aria-hidden="true">
      <div ref={anillo} className={`cursor__anillo ${etiqueta ? "cursor__anillo--texto" : ""}`}>
        <span>{etiqueta}</span>
      </div>
      <div ref={punto} className="cursor__punto" />
    </div>
  );
}
