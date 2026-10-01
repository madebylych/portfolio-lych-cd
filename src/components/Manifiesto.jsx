import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import "./Manifiesto.css";

const TEXTO =
  "El lugar donde junto mi ilustración, 3D, animación, diseño y storytelling.";

export default function Manifiesto() {
  const raiz = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      // cada palabra se enciende cuando el scroll la alcanza
      gsap.fromTo(
        ".manifiesto__palabra",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".manifiesto__texto", start: "top 78%", end: "bottom 42%", scrub: 0.6 },
        }
      );
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifiesto" ref={raiz} className="manifiesto" aria-label="Qué es LYCH">
      <p className="manifiesto__texto">
        {TEXTO.split(" ").map((p, i) => (
          <span key={i} className="manifiesto__palabra">
            {p}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
