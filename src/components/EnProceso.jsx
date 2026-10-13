import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { EN_PROCESO } from "../data/contenido";
import { Destello, Letras, Fondo } from "./Adornos";
import "./EnProceso.css";

// inclinación y altura de cada tarjeta: un tablero, no una rejilla
const POSE = [
  { r: -2, y: 30 },
  { r: 1.5, y: 80 },
  { r: -1, y: 0 },
  { r: 2, y: 60 },
  { r: -1.5, y: -10 },
];

/* Lo que está vivo ahora mismo, contado en su etapa real. */
export default function EnProceso() {
  const raiz = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".proceso__letra", {
        yPercent: 115,
        stagger: 0.035,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current, start: "top 75%" },
      });
      // las tarjetas caen desde arriba, giradas, y se pegan en su sitio
      gsap.utils.toArray(".proceso__tarjeta").forEach((t, i) => {
        gsap.fromTo(
          t,
          { y: -260 - i * 40, rotate: i % 2 ? 18 : -18, opacity: 0 },
          // termina en su pose del tablero (GSAP absorbe el rotate y el translate del CSS)
          { y: window.innerWidth < 860 ? 0 : POSE[i % 5].y, rotate: POSE[i % 5].r, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: ".proceso__tablero", start: `top ${92 - i * 4}%`, end: `top ${45 - i * 3}%`, scrub: 1 } }
        );
      });
      gsap.from(".proceso__cinta-adhesiva", { scaleX: 0, stagger: 0.08, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: ".proceso__tablero", start: "top 40%" } });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={raiz} className="proceso" aria-labelledby="proceso-titulo">
      <Fondo brillos={[["violeta", 300, 300, 900, 500, 0.35, 220]]} cortes={[[-200, 420, 2000, 300, -6]]} />
      <header className="proceso__cabeza">
        <h2 id="proceso-titulo" className="proceso__titulo">
          <span className="solo-lector">En proceso</span>
          <span aria-hidden="true">
            <Letras texto="En proceso" clase="proceso__letra" />
          </span>
        </h2>
        <span className="hud proceso__cuenta">({String(EN_PROCESO.length).padStart(2, "0")})</span>
        <p className="proceso__bajada">Lo que estoy construyendo ahora, con la etapa en la que va.</p>
      </header>

      <ul className="proceso__tablero">
        {EN_PROCESO.map((p, i) => (
          <li key={p.titulo} className="proceso__tarjeta" style={{ "--r": `${POSE[i % 5].r}deg`, "--y": `${POSE[i % 5].y}px` }}>
            <span className={`proceso__cinta-adhesiva ${i % 2 ? "proceso__cinta-adhesiva--violeta" : ""}`} aria-hidden="true" />
            <span className="proceso__etapa">
              <span className="proceso__latido" aria-hidden="true" />
              {p.etapa}
            </span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ul>
      <Destello tam={22} violeta style={{ left: "20%", top: "34%" }} />
      <Destello tam={14} style={{ right: "24%", bottom: "12%" }} />
    </section>
  );
}
