import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { alClicEnlace, url } from "../lib/ruta";
import { OBRAS } from "../data/contenido";
import { Destello, Letras, Fondo } from "./Adornos";
import "./Proyectos.css";

const dos = (n) => String(n).padStart(2, "0");

/* Pósters en zigzag con el número grande hacia el centro. */
export default function Proyectos() {
  const raiz = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".obras__letra", {
        yPercent: 115,
        stagger: 0.04,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".obras__cabeza", start: "top 80%" },
      });
      gsap.from(".obras__bajada, .obras__cuenta", { opacity: 0, y: 24, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ".obras__cabeza", start: "top 70%" } });

      // cada póster sale de su lado con su número, al ritmo del scroll
      gsap.utils.toArray(".obra").forEach((el) => {
        const lado = el.classList.contains("obra--der") ? 1 : -1;
        const st = { trigger: el, start: "top 100%", end: "top 40%", scrub: 1 };
        gsap.fromTo(
          el.querySelector(".obra__poster"),
          { xPercent: 115 * lado, rotate: 16 * lado, opacity: 0 },
          // termina en la inclinación de reposo del póster (GSAP absorbe el rotate del CSS)
          { xPercent: 0, rotate: 2 * lado, opacity: 1, ease: "power3.out", scrollTrigger: st }
        );
        gsap.fromTo(
          el.querySelector(".obra__numero"),
          { x: () => window.innerWidth * 0.45 * lado, opacity: 0, scale: 1.4 },
          { x: 0, opacity: 1, scale: 1, ease: "power2.out", scrollTrigger: { ...st, start: "top 95%", end: "top 30%" } }
        );
        gsap.fromTo(el.querySelector(".sticker"), { scale: 0 }, { scale: 1, ease: "back.out(3)", scrollTrigger: { ...st, start: "top 60%", end: "top 45%" } });
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="obras" ref={raiz} className="obras" aria-labelledby="obras-titulo">
      <Fondo
        brillos={[["azul", 760, 700, 900, 700, 0.3, 240], ["azul", -300, 2465, 800, 600, 0.3, 240]]}
        cortes={[[-300, 1725, 2200, 380, 14], [-341, 2922, 2200, 380, -20]]}
      />

      <header className="obras__cabeza">
        <h2 id="obras-titulo" className="obras__titulo">
          <span className="solo-lector">Proyectos</span>
          <span aria-hidden="true">
            <Letras texto="Proyectos" clase="obras__letra" />
          </span>
        </h2>
        <span className="obras__cuenta hud">({dos(OBRAS.length)})</span>
        <p className="obras__bajada">Nueve trabajos entre ilustración, 3D, videojuegos y web. Elige uno para entrar a su historia.</p>
        <Destello tam={26} violeta style={{ left: "32%", bottom: "-2.5rem" }} />
      </header>

      <ol className="obras__lista">
        {OBRAS.map((o, i) => {
          const destino = `/proyecto/${o.id}`;
          return (
            <li key={o.id} className={`obra ${i % 2 ? "obra--der" : "obra--izq"}`} style={{ "--i": i }}>
              <span className="obra__numero contorno" aria-hidden="true">
                {dos(i + 1)}
              </span>
              <a className="obra__poster" href={url(destino)} onClick={(e) => alClicEnlace(e, destino)} data-cursor="ver">
                <span className={`obra__imagen ${o.pixelArt ? "obra__imagen--pixel" : ""}`}>
                  <img src={o.tarjeta ?? o.portada} alt="" loading="lazy" />
                </span>
                <span className="sticker obra__sticker">{o.etiqueta}</span>
                <span className="obra__datos">
                  <span className="hud obra__n">N.º {dos(i + 1)}</span>
                  <span className="obra__año">{o.año}</span>
                  <span className="obra__titulo">{o.titulo}</span>
                  <span className="obra__tipo">{o.corto}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
