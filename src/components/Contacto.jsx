import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { CONTACTO } from "../data/contenido";
import { Cinta, Destello, Fondo } from "./Adornos";
import "./Contacto.css";

const letras = (palabra, clase) =>
  palabra.split("").map((l, i) => (
    <span key={i} className="contacto__mascara">
      <span className={`contacto__letra ${clase}`}>{l}</span>
    </span>
  ));

export default function Contacto() {
  const raiz = useRef(null);
  const iman = useRef(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const el = iman.current;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    // el enlace grande se deja atraer por el cursor
    const mover = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.18);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const soltar = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", soltar);

    const ctx = gsap.context(() => {
      // CREEMOS sube letra por letra; JUNTOS cae desde arriba, en contorno, y se llena al final
      const tl = gsap.timeline({ scrollTrigger: { trigger: raiz.current, start: "top 85%", end: "top 15%", scrub: 1 } });
      tl.from(".contacto__letra--1", { yPercent: 120, rotate: (i) => (i % 2 ? 18 : -18), stagger: 0.06, duration: 0.8, ease: "power3.out" })
        .from(".contacto__letra--2", { yPercent: -130, rotate: (i) => (i % 2 ? -14 : 14), stagger: { each: 0.06, from: "end" }, duration: 0.8, ease: "power3.out" }, 0.25)
        .from(".contacto__juntos", { xPercent: 10, duration: 1.2, ease: "power2.out" }, 0.2)
        .to(".contacto__juntos", { "--relleno": 0.9, duration: 0.5, ease: "none" }, ">-0.2")
        .from(".contacto .cinta", { xPercent: -40, rotate: -8, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.5)
        .from(".contacto .destello", { scale: 0, rotate: 180, stagger: 0.1, duration: 0.5 }, 0.3);

      gsap.from(".contacto__entra", { y: 30, opacity: 0, stagger: 0.06, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".contacto__correo", start: "top 92%" } });

      // cada letra salta cuando el cursor pasa por encima
      gsap.utils.toArray(".contacto__letra").forEach((l) => {
        l.addEventListener("pointerenter", () => gsap.fromTo(l, { yPercent: 0 }, { yPercent: -18, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }));
      });
    }, raiz);
    return () => {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", soltar);
      ctx.revert();
    };
  }, []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTO.correo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACTO.correo}`;
    }
  };

  return (
    <footer id="contacto" ref={raiz} className="contacto" aria-labelledby="contacto-titulo">

      <Fondo brillos={[["violeta", 1000, 100, 500, 400, 0.25, 200]]} />

      <h2 id="contacto-titulo" className="contacto__titulo">
        <span className="solo-lector">Creemos juntos</span>
        <span className="contacto__palabra contacto__creemos" aria-hidden="true">
          {letras("Creemos", "contacto__letra--1")}
        </span>
        <span className="contacto__palabra contacto__juntos contorno" aria-hidden="true">
          {letras("Juntos", "contacto__letra--2")}
        </span>
        <Destello tam={44} className="contacto__destello-1" />
        <Destello tam={20} violeta className="contacto__destello-2" />
      </h2>

      <Cinta palabras={[CONTACTO.correo, CONTACTO.usuario]} color="violeta" velocidad={40} className="contacto__cinta" />

      <a ref={iman} className="contacto__correo contacto__entra" href={`mailto:${CONTACTO.correo}`} data-cursor="escribe">
        {CONTACTO.correo}
      </a>

      <div className="contacto__acciones contacto__entra">
        <button className="contacto__boton" onClick={copiar}>
          {copiado ? "Correo copiado" : "Copiar correo"}
        </button>
        {CONTACTO.redes.map((r) => (
          <a key={r.nombre} className="contacto__boton" href={r.url} target="_blank" rel="noreferrer">
            {r.nombre}
          </a>
        ))}
      </div>
      <p className="contacto__usuario hud hud--tenue contacto__entra">{CONTACTO.usuario} en todas las redes</p>
      <p className="contacto__estado" role="status">
        {copiado ? "El correo está en tu portapapeles." : ""}
      </p>

      <div className="contacto__pie hud hud--tenue">
        <span>Emily Chisaba, {new Date().getFullYear()}</span>
        <span>Hecho en Bogotá</span>
      </div>
    </footer>
  );
}
