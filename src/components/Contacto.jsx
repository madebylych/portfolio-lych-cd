import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { CONTACTO } from "../data/contenido";
import "./Contacto.css";

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
      gsap.from(".contacto__letra", {
        yPercent: 100,
        stagger: 0.05,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current, start: "top 70%" },
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
      <h2 id="contacto-titulo" className="contacto__titulo">
        {/* palabra por palabra: el título solo puede partirse entre palabras */}
        {"Creemos juntos".split(" ").map((palabra, k) => (
          <span key={k} className="contacto__palabra" aria-hidden="true">
            {palabra.split("").map((l, i) => (
              <span key={i} className="contacto__mascara">
                <span className="contacto__letra">{l}</span>
              </span>
            ))}
          </span>
        ))}
        <span className="solo-lector">Creemos juntos</span>
      </h2>

      <a ref={iman} className="contacto__correo" href={`mailto:${CONTACTO.correo}`} data-cursor="escribe">
        {CONTACTO.correo}
      </a>

      <div className="contacto__acciones">
        <button className="contacto__boton" onClick={copiar}>
          {copiado ? "Correo copiado" : "Copiar correo"}
        </button>
        {CONTACTO.redes.map((r) => (
          <a key={r.nombre} className="contacto__boton" href={r.url} target="_blank" rel="noreferrer">
            {r.nombre}
          </a>
        ))}
      </div>
      <p className="contacto__usuario">{CONTACTO.usuario} en todas las redes</p>
      <p className="contacto__estado" role="status">
        {copiado ? "El correo está en tu portapapeles." : ""}
      </p>

      <div className="contacto__pie">
        <span>Emily Chisaba, {new Date().getFullYear()}</span>
        <span>Hecho en Bogotá</span>
      </div>
    </footer>
  );
}
