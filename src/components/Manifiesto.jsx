import { useEffect, useRef } from "react";
import { gsap, reduceMotion, ScrollTrigger } from "../lib/motion";
import { Destello, Letras, Fondo } from "./Adornos";
import "./Manifiesto.css";

/* Frase completa: "El lugar donde junto mi ilustración, 3D, animación, diseño y storytelling." */
const INTRO = "El lugar donde junto mi";
const LINEAS = [
  { texto: "Ilustración,", estilo: "contorno" },
  { texto: "3D, animación,", estilo: "lleno" },
  { texto: "Diseño y", estilo: "contorno violeta" },
  { texto: "Storytelling.", estilo: "lleno violeta" },
];

export default function Manifiesto() {
  const raiz = useRef(null);
  const texto = useRef(null);

  // todas las líneas comparten tamaño: el que hace caber la más larga en el ancho disponible
  useEffect(() => {
    const ajustar = () => {
      const caja = texto.current;
      if (!caja) return;
      const lineas = [...caja.querySelectorAll(".mani__linea")];
      caja.style.setProperty("--tam", "100px");
      const ancho = Math.max(...lineas.map((l) => l.scrollWidth));
      // en móvil queda más aire a la derecha para los números en sticker
      const disponible = caja.clientWidth * (window.innerWidth < 860 ? 0.84 : 0.82);
      // tope por alto: el bloque (intro + 4 líneas, unas 4.7 veces el tamaño) ocupa cerca de dos tercios de la pantalla
      const tam = Math.min(140, window.innerHeight * 0.14, (100 * disponible) / ancho);
      caja.style.setProperty("--tam", `${tam.toFixed(1)}px`);

      // justificado: cada renglón se estira hasta el ancho del más largo repartiendo el aire entre sus letras
      const renglones = [caja.querySelector(".mani__intro"), ...lineas];
      renglones.forEach((r) => r.querySelectorAll(".mascara").forEach((m) => (m.style.marginRight = "")));
      const objetivo = Math.max(...lineas.map((l) => l.scrollWidth));
      renglones.forEach((r) => {
        const letras = [...r.querySelectorAll(".mascara")];
        const extra = (objetivo - r.scrollWidth) / Math.max(1, letras.length - 1);
        letras.slice(0, -1).forEach((m) => (m.style.marginRight = `${extra.toFixed(2)}px`));
      });
      ScrollTrigger.refresh();
    };
    ajustar();
    document.fonts?.ready.then(ajustar);
    window.addEventListener("resize", ajustar);
    return () => window.removeEventListener("resize", ajustar);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: raiz.current, start: "top 60%", end: "bottom bottom", scrub: 1 },
      });

      tl.from(".mani__intro .mani__letra", { yPercent: 120, rotate: 12, opacity: 0, stagger: 0.015, duration: 0.6 });

      gsap.utils.toArray(".mani__linea").forEach((linea, i) => {
        const desde = i % 2 ? 1 : -1; // una línea entra por la izquierda y la siguiente por la derecha
        const letras = linea.querySelectorAll(".mani__letra");
        tl.from(linea, { xPercent: 22 * desde, duration: 1.2, ease: "power2.out" }, i ? "-=0.75" : "+=0.1")
          .from(letras, { yPercent: 115, rotate: 14 * desde, opacity: 0, stagger: { each: 0.035, from: desde > 0 ? "end" : "start" }, duration: 0.7 }, "<")
          .from(linea.querySelector(".mani__sticker"), { scale: 0, rotate: -40 * desde, duration: 0.4, ease: "back.out(3)" }, "-=0.25");
      });

      tl.from(".mani .destello", { scale: 0, rotate: 90, stagger: 0.1, duration: 0.5 }, 0.2);
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifiesto" ref={raiz} className="mani" aria-label={`${INTRO} ${LINEAS.map((l) => l.texto).join(" ")}`}>
      <div className="mani__fijo">
        <Fondo brillos={[["violeta", 500, 260, 900, 600, 0.28, 240], ["azul", -250, 600, 700, 500, 0.3, 220]]} />
        <p className="mani__etiqueta" aria-hidden="true">
          <span className="hud">Manifiesto</span>
          <span className="hud hud--tenue">( N.º 00 )</span>
        </p>

        <div ref={texto} className="mani__texto" aria-hidden="true">
          <p className="mani__intro">
            <Letras texto={INTRO} clase="mani__letra" />
          </p>
          {LINEAS.map((l, i) => (
            <p key={l.texto} className={`mani__linea ${l.estilo.includes("contorno") ? "contorno" : ""} ${l.estilo.includes("violeta") ? "mani__linea--violeta" : ""}`}>
              <Letras texto={l.texto} clase="mani__letra" />
              <span className="mani__sticker">{String(i + 1).padStart(2, "0")}</span>
            </p>
          ))}
        </div>

        <Destello tam={30} style={{ right: "8%", top: "22%" }} />
        <Destello tam={16} violeta style={{ left: "12%", top: "44%" }} />
        <Destello tam={20} style={{ left: "6%", bottom: "12%" }} />
        <p className="vertical mani__vertical" aria-hidden="true">
          LYCH ✦ Manifiesto ✦ 2026
        </p>
      </div>
    </section>
  );
}
