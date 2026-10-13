import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { NOMBRE, SOBRE } from "../data/contenido";
import { Destello, Fondo } from "./Adornos";
import "./SobreMi.css";

// leve inclinación de cada chip de habilidad, para que no parezca una lista de formulario
const GIRO = [-1.5, 1, -0.5, 2, -1, 1.5, 0.5, -2, 1, -1, 2, -0.5, 1, -1.5];

/* Quién es Emily y de dónde sale el nombre LYCH. Hechos, sin lore. */
export default function SobreMi() {
  const raiz = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      const st = { trigger: raiz.current, start: "top 65%" };
      gsap.from(".sobre__titulo", { xPercent: 12, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: st });
      gsap.from(".sobre__retrato", { clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "expo.inOut", scrollTrigger: st });
      gsap.from(".sobre__entra", { y: 40, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", scrollTrigger: st });
      gsap.from(".sobre__chip", {
        scale: 0.4,
        opacity: 0,
        rotate: () => gsap.utils.random(-25, 25),
        duration: 0.8,
        stagger: 0.035,
        ease: "back.out(2.2)",
        scrollTrigger: { trigger: ".sobre__chips", start: "top 85%" },
      });
      gsap.from(".sobre__chibi", { scale: 0, rotate: -30, duration: 1.2, ease: "back.out(1.8)", scrollTrigger: { trigger: ".sobre__nombre", start: "top 75%" } });
      gsap.from(".sobre__burbuja", { scale: 0.85, x: -30, opacity: 0, transformOrigin: "0% 50%", duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".sobre__nombre", start: "top 70%" } });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={raiz} className="sobre" aria-labelledby="sobre-titulo">

      <Fondo brillos={[["azul", -200, 100, 700, 600, 0.3, 220], ["azul", 600, 1100, 800, 500, 0.3, 220]]} />

      <div className="sobre__rejilla">
        <div className="sobre__foto">
          {/* levita muy despacio, casi sin notarse */}
          <div className="sobre__levita">
            <span className="sobre__marco" aria-hidden="true" />
            <figure className="sobre__retrato">
              <img src={SOBRE.foto} alt="Emily Chisaba" loading="lazy" />
            </figure>
          </div>
          <Destello tam={26} style={{ right: "-4%", top: "4%" }} />
          <Destello tam={14} violeta style={{ left: "-4%", top: "70%" }} />
        </div>

        <div className="sobre__textos">
          <h2 id="sobre-titulo" className="sobre__titulo contorno">
            Sobre mí
          </h2>
          <h3 className="sobre__saludo sobre__entra">{SOBRE.saludo}</h3>
          {SOBRE.texto.map((t, i) => (
            <p key={t} className={`sobre__parrafo sobre__entra ${i ? "sobre__parrafo--tenue" : ""}`}>
              {t}
            </p>
          ))}

          <h4 className="hud sobre__subtitulo sobre__entra">Habilidades</h4>
          <ul className="sobre__chips">
            {SOBRE.habilidades.map((h, i) => (
              <li key={h} className={`sobre__chip ${i % 4 === 0 || i % 7 === 2 ? "sobre__chip--lleno" : ""}`} style={{ "--g": `${GIRO[i % GIRO.length]}deg` }}>
                {h}
              </li>
            ))}
          </ul>

          <h4 className="hud sobre__subtitulo sobre__entra">Herramientas</h4>
          <dl className="sobre__herramientas">
            {SOBRE.herramientas.map((h) => (
              <div key={h.grupo} className="sobre__entra">
                <dt>{h.grupo}</dt>
                <dd>{h.lista}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="sobre__nombre">
        <img className="sobre__chibi" src={SOBRE.logo} alt="Logo de LYCH" loading="lazy" />
        <div className="sobre__burbuja">
          <h3>De dónde viene el nombre</h3>
          <p className="sobre__destacado">{NOMBRE.origen}</p>
          <p className="sobre__menor">{NOMBRE.curiosos.join(" ")}</p>
          <h3>Por qué me atrapó</h3>
          <p className="sobre__destacado">{NOMBRE.porque[0]}</p>
          <p className="sobre__menor">{NOMBRE.porque.slice(1).join(" ")}</p>
        </div>
      </div>
    </section>
  );
}
