import { useEffect, useRef } from "react";
import { gsap, reduceMotion, irA } from "../../lib/motion";
import { Cinta, Destello, Fondo } from "../Adornos";
import "./Hero.css";

const LETRAS = ["L", "Y", "C", "H"];
const DISCIPLINAS = ["Ilustración", "3D", "Animación", "Diseño digital"];
const IMAGEN_HERO = import.meta.env.BASE_URL + "media/hero/sentir.webp"; // portada de Proyecto Sentir

/* Hero v2: la portada de SENTIR en un arco, LYCH cruzando su borde y etiquetas tipo visor. */
export default function Hero({ entrar }) {
  const raiz = useRef(null);

  useEffect(() => {
    if (!entrar) return;
    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".hero__arco", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.8, ease: "expo.inOut" })
        .fromTo(".hero__arco img", { scale: 1.25 }, { scale: 1, duration: 2.4 }, 0)
        .fromTo(".hero__marco", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.6 }, 0.5)
        .fromTo(".hero__gigante", { opacity: 0, yPercent: 8 }, { opacity: 0.55, yPercent: 0, duration: 2.2 }, 0.3)
        .fromTo(".hero__letra", { yPercent: 110 }, { yPercent: 0, duration: 1.5, stagger: 0.08 }, 0.9)
        .fromTo(".hero__entra", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.06 }, 1.1)
        .fromTo(".hero .cinta", { xPercent: (i) => (i ? 30 : -30), opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.6, stagger: 0.1 }, 1.0);

      const salida = { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero__gigante", { yPercent: 18, ease: "none", scrollTrigger: salida });
      gsap.to(".hero__escena", { yPercent: 10, ease: "none", scrollTrigger: salida });
      gsap.to(".hero__arco img", { yPercent: 8, scale: 1.08, ease: "none", scrollTrigger: salida });
      gsap.to(".hero__cintas", { rotate: 2, yPercent: -40, ease: "none", scrollTrigger: salida });
    }, raiz);
    return () => ctx.revert();
  }, [entrar]);

  return (
    <section id="inicio" ref={raiz} className="hero" aria-labelledby="hero-titulo">

      <Fondo brillos={[["azul", 900, -160, 860, 620, 0.45, 220], ["violeta", 460, 330, 520, 520, 0.35, 170]]} />

      <span className="hero__gigante contorno" aria-hidden="true">
        LYCH
      </span>

      <div className="hero__hud">
        <p className="hero__entra">
          <span className="hud">N.º 01</span>
          <span className="hud hud--tenue">Portafolio 2026</span>
        </p>
        <p className="hero__entra hero__hud-der">
          <span className="hud hud--tenue">Bogotá, Colombia</span>
          <span className="hud">4.71° N&nbsp; 74.07° W</span>
        </p>
      </div>

      <div className="hero__escena">
        <span className="hero__marco" aria-hidden="true" />
        <div className="hero__arco">
          <img src={IMAGEN_HERO} alt="" aria-hidden="true" />
        </div>
        <h1 id="hero-titulo" className="hero__marca">
          <span className="solo-lector">LYCH</span>
          {LETRAS.map((l, i) => (
            <span key={i} className="hero__mascara" aria-hidden="true">
              <span className="hero__letra">{l}</span>
            </span>
          ))}
        </h1>
        {/* posiciones del Figma, relativas al arco (500 × 720) */}
        <Destello tam={40} style={{ left: "-10.4%", top: "4.7%" }} />
        <Destello tam={22} violeta style={{ left: "106%", top: "16%" }} />
        <Destello tam={16} style={{ left: "96.4%", top: "64.4%" }} />
        <Destello tam={28} violeta style={{ left: "-13.2%", top: "68.6%" }} />
        <Destello tam={12} style={{ left: "114%", top: "38%" }} />
        <Destello tam={18} style={{ left: "-22%", top: "38%" }} />
      </div>

      <p className="hero__firma hud hero__entra" aria-hidden="true">
        [ Made by LYCH ]&nbsp;&nbsp; 4.71° N&nbsp; 74.07° W
      </p>

      <div className="hero__info">
        <p className="hero__nombre hero__entra">Emily Chisaba</p>
        <ol className="hero__disciplinas">
          {DISCIPLINAS.map((d, i) => (
            <li key={d} className="hero__entra">
              <span className="hud">{String(i + 1).padStart(2, "0")}</span>
              {d}
            </li>
          ))}
        </ol>
      </div>

      <div className="hero__acciones">
        <button className="boton hero__entra" onClick={() => irA("#obras")} data-cursor="baja">
          Ver proyectos
        </button>
        <button className="boton boton--suave hero__entra" onClick={() => irA("#contacto")}>
          Contacto
        </button>
      </div>

      <p className="vertical hero__vertical" aria-hidden="true">
        LYCH ✦ Ilustración ✦ 3D ✦ Animación ✦ Diseño
      </p>

      <div className="hero__cintas">
        <Cinta palabras={["Ilustración", "3D", "Animación", "Diseño", "Storytelling"]} color="azul" velocidad={44} />
        <Cinta palabras={["Emily Chisaba", "LYCH"]} color="violeta" reversa velocidad={36} />
      </div>
    </section>
  );
}
