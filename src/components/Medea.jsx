import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { MEDEA } from "../data/contenido";
import { useLightbox } from "./Lightbox";
import Comparador from "./Comparador";
import "./Medea.css";

export default function Medea({ enPagina = false }) {
  const raiz = useRef(null);
  const lienzo = useRef(null);
  const frames = useRef([]);
  const actual = useRef(0);
  const [paso, setPaso] = useState(0);
  const abrir = useLightbox();

  // carga los 120 frames solo cuando la sección se acerca
  useEffect(() => {
    const cargar = () => {
      if (frames.current.length) return;
      frames.current = Array.from({ length: MEDEA.frames }, (_, i) => {
        const im = new Image();
        im.decoding = "async";
        im.src = MEDEA.frame(i + 1);
        if (i === 0) im.onload = () => dibujar(0);
        return im;
      });
    };
    const io = new IntersectionObserver(([e]) => e.isIntersecting && cargar(), { rootMargin: "150% 0px" });
    io.observe(raiz.current);
    return () => io.disconnect();
  }, []);

  function dibujar(i) {
    const c = lienzo.current;
    if (!c) return;
    // si el frame pedido aún no llegó, usar el más cercano que ya cargó
    let im = frames.current[i];
    for (let d = 1; im && !im.complete && d < 20; d++) im = frames.current[i - d] ?? frames.current[i + d];
    if (!im?.complete || !im.naturalWidth) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = c.clientWidth * dpr;
    const h = c.clientHeight * dpr;
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    const ctx = c.getContext("2d");
    const s = Math.min(w / im.naturalWidth, h / im.naturalHeight);
    const dw = im.naturalWidth * s;
    const dh = im.naturalHeight * s;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      const estado = { f: 0 };
      gsap.to(estado, {
        f: MEDEA.frames - 1,
        ease: "none",
        snap: "f",
        scrollTrigger: {
          trigger: ".medea__pin",
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => setPaso(Math.min(MEDEA.pasos.length - 1, Math.floor(self.progress * MEDEA.pasos.length))),
        },
        onUpdate: () => {
          const f = Math.round(estado.f);
          if (f !== actual.current) {
            actual.current = f;
            dibujar(f);
          }
        },
      });

      gsap.from(".medea__titulo .medea__linea-texto", {
        yPercent: 110,
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".medea__pin", start: "top 70%" },
      });
    }, raiz);
    const redibujar = () => dibujar(actual.current);
    window.addEventListener("resize", redibujar);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", redibujar);
    };
  }, []);

  return (
    <section id="medea" ref={raiz} className="medea" aria-labelledby="medea-titulo">
      <div className="medea__pin">
        <div className="medea__texto">
          <h2 id="medea-titulo" className={`medea__titulo ${enPagina ? "solo-lector" : ""}`}>
            <span className="medea__mascara">
              <span className="medea__linea-texto">Medea</span>
            </span>
            <span className="medea__mascara">
              <span className="medea__linea-texto">Kismet</span>
            </span>
          </h2>
          <p className="medea__bajada">{enPagina ? "Gira con el scroll." : MEDEA.bajada}</p>
          <ol className="medea__pasos">
            {MEDEA.pasos.map((p, i) => (
              <li key={p.nombre} className={i === paso || reduceMotion ? "es-actual" : i < paso ? "es-hecho" : ""}>
                <span className="medea__paso-nombre">{p.nombre}</span>
                <span className="medea__paso-texto">{p.texto}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="medea__escenario">
          <canvas ref={lienzo} className="medea__lienzo" role="img" aria-label="Medea Kismet girando 360 grados" />
          {reduceMotion && <img className="medea__estatica" src={MEDEA.cuerpo} alt="" />}
        </div>
      </div>

      <div className="medea__detalle">
        <Comparador
          debajo={MEDEA.render}
          encima={MEDEA.wire}
          altDebajo="Retrato final de Medea Kismet"
          altEncima="El mismo retrato con su malla visible: topología en quads"
          etiqueta="Comparar render y malla"
          pie="Render final y su malla. Arrastra para comparar."
        />

        <div className="medea__extras">
          <button className="medea__miniatura" onClick={() => abrir(MEDEA.concepto, "Hoja de concepto: Medea y su criatura búho")} data-cursor="ver">
            <img src={MEDEA.concepto} alt="Hoja de concepto de Medea con su criatura búho" loading="lazy" />
            <span>Hoja de concepto: Medea y su criatura búho</span>
          </button>
          <button className="medea__miniatura" onClick={() => abrir(MEDEA.wireCuerpo, "Topología de cuerpo completo")} data-cursor="ver">
            <img src={MEDEA.wireCuerpo} alt="Malla de cuerpo completo de Medea" loading="lazy" />
            <span>Topología de cuerpo completo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
