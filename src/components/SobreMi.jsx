import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { NOMBRE, SOBRE } from "../data/contenido";
import "./SobreMi.css";

/* Quién es Emily y de dónde sale el nombre LYCH. Hechos, sin lore. */
export default function SobreMi() {
  const raiz = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".sobre__entra", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current, start: "top 65%" },
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={raiz} className="sobre" aria-labelledby="sobre-titulo">
      <h2 id="sobre-titulo" className="sobre__titulo sobre__entra">
        Sobre mí
      </h2>

      <div className="sobre__rejilla">
        <div className="sobre__imagenes sobre__entra">
          {SOBRE.foto ? (
            <figure className="sobre__marco sobre__marco--foto">
              <img src={SOBRE.foto} alt="Emily Chisaba" loading="lazy" />
            </figure>
          ) : (
            import.meta.env.DEV && (
              <figure className="sobre__marco sobre__marco--foto sobre__marco--vacio" aria-hidden="true">
                <figcaption>Aquí va tu foto</figcaption>
              </figure>
            )
          )}
        </div>

        <div className="sobre__textos">
          {SOBRE.texto.map((t) => (
            <p key={t} className="sobre__parrafo sobre__entra">
              {t}
            </p>
          ))}

          <h3 className="sobre__subtitulo sobre__entra">Habilidades</h3>
          <ul className="sobre__herramientas sobre__herramientas--habilidades sobre__entra">
            {SOBRE.habilidades.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h3 className="sobre__subtitulo sobre__entra">Herramientas</h3>
          <ul className="sobre__herramientas sobre__entra">
            {SOBRE.herramientas.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sobre__nombre">
        {/* el icono va suelto, sin marco, debajo de la foto */}
        <img className="sobre__icono sobre__entra" src={SOBRE.logo} alt="Logo de LYCH" loading="lazy" />

        <div className="sobre__nombre-texto">
          <h3 className="sobre__subtitulo sobre__entra">De dónde viene el nombre</h3>
          <p className="sobre__origen sobre__entra">{NOMBRE.origen}</p>
          <ul className="sobre__curiosos">
            {NOMBRE.curiosos.map((d) => (
              <li key={d} className="sobre__entra">
                {d}
              </li>
            ))}
          </ul>

          <h3 className="sobre__subtitulo sobre__entra">Por qué me atrapó</h3>
          {NOMBRE.porque.map((t) => (
            <p key={t} className="sobre__porque sobre__entra">
              {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
