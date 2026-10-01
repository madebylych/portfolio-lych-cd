import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { EN_PROCESO } from "../data/contenido";
import "./EnProceso.css";

/* Lo que está vivo ahora mismo, contado en su etapa real. */
export default function EnProceso() {
  const raiz = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".proceso__fila", {
        x: -40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current, start: "top 70%" },
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={raiz} className="proceso" aria-labelledby="proceso-titulo">
      <h2 id="proceso-titulo" className="proceso__titulo">
        En proceso
      </h2>
      <ul className="proceso__lista">
        {EN_PROCESO.map((p) => (
          <li key={p.titulo} className="proceso__fila">
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
            <span className="proceso__etapa">
              <span className="proceso__latido" aria-hidden="true" />
              {p.etapa}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
