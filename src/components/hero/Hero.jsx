import { useEffect, useRef } from "react";
import { gsap, reduceMotion, irA } from "../../lib/motion";
import "./Hero.css";

const LETRAS = ["L", "Y", "C", "H"];

/*
 * Hero sobrio: el nombre grande en Aboreto. Emily va a elegir una imagen de
 * fondo; la ruta es relativa a la base del sitio (public/media/...).
 */
const IMAGEN_HERO = import.meta.env.BASE_URL + "media/hero/sentir.webp"; // portada de Proyecto Sentir
export default function Hero({ entrar }) {
  const raiz = useRef(null);

  useEffect(() => {
    if (!entrar) return;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".hero__letra, .hero__pie > *, .hero__fondo", { opacity: 1 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".hero__fondo", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2.4 })
        .fromTo(".hero__letra", { yPercent: 105 }, { yPercent: 0, opacity: 1, duration: 1.5, stagger: 0.08 }, 0.2)
        .fromTo(".hero__pie > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.8);

      const salida = { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero__marca", { yPercent: 30, opacity: 0.2, ease: "none", scrollTrigger: salida });
      gsap.to(".hero__fondo", { yPercent: 12, ease: "none", scrollTrigger: salida });
    }, raiz);
    return () => ctx.revert();
  }, [entrar]);

  return (
    <section id="inicio" ref={raiz} className="hero" aria-labelledby="hero-titulo">
      {IMAGEN_HERO && <img className="hero__fondo" src={IMAGEN_HERO} alt="" aria-hidden="true" />}

      <h1 id="hero-titulo" className="hero__marca">
        <span className="solo-lector">LYCH</span>
        {LETRAS.map((l, i) => (
          <span key={i} className="hero__mascara" aria-hidden="true">
            <span className="hero__letra">{l}</span>
          </span>
        ))}
      </h1>

      <div className="hero__pie">
        <p className="hero__bajada">
          Emily Chisaba. Ilustración, 3D, animación y diseño digital.
        </p>
        <button className="hero__bajar" onClick={() => irA("#manifiesto")} data-cursor="baja">
          Bajar
          <span className="hero__linea" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
