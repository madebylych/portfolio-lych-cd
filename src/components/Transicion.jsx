import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { registrarCortina, useRuta } from "../lib/ruta";
import LogoLiquido from "./LogoLiquido";
import "./Transicion.css";

/*
 * Pantalla entre páginas: negro con el icono LYCH llenándose de líquido.
 * Aparece antes de cambiar de ruta y se va cuando la página nueva ya montó.
 */
export default function Transicion() {
  const cortina = useRef(null);
  const ruta = useRuta();
  const primera = useRef(true);
  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    registrarCortina(() => {
      if (reduceMotion) return Promise.resolve();
      return new Promise((ok) => {
        const estado = { n: 0 };
        gsap
          .timeline({ onComplete: ok })
          .set(cortina.current, { visibility: "visible" })
          .fromTo(cortina.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" })
          .to(estado, { n: 1, duration: 0.7, ease: "power2.inOut", onUpdate: () => setNivel(estado.n) }, 0.1);
      });
    });
    return () => registrarCortina(null);
  }, []);

  // la ruta ya cambió: desvanecer la pantalla y vaciar el icono para la próxima vez
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (reduceMotion) return;
    gsap.to(cortina.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.15,
      ease: "power1.out",
      onComplete: () => {
        gsap.set(cortina.current, { visibility: "hidden" });
        setNivel(0);
      },
    });
  }, [ruta]);

  return (
    <div ref={cortina} className="cortina" aria-hidden="true">
      <LogoLiquido nivel={nivel} />
    </div>
  );
}
