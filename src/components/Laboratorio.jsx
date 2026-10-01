import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { LABORATORIO } from "../data/contenido";
import { useLightbox } from "./Lightbox";
import Comparador from "./Comparador";
import "./Laboratorio.css";

// reparte las piezas en tres columnas
const COLUMNAS = [0, 1, 2].map((c) => LABORATORIO.filter((_, i) => i % 3 === c));
// parallax suave: las tres columnas suben en la misma dirección, a distinta
// velocidad (en píxeles, para que no dependa del alto de cada columna)
const RECORRIDO = [60, 110, 80];

function Pieza({ p, abrir }) {
  const pie = (
    <span className="lab__pie-fila">
      <span>{p.titulo}</span>
      <span>{p.nota}</span>
    </span>
  );

  // con boceto: deslizador boceto / final, sin abrir el visor (el arrastre es la interacción)
  if (p.boceto) {
    return (
      <div className="lab__pieza lab__pieza--comparar">
        <Comparador
          debajo={p.boceto}
          encima={p.src}
          altDebajo={`${p.titulo}, boceto`}
          altEncima={`${p.titulo}, ilustración final`}
          etiqueta={`Comparar boceto y final de ${p.titulo}`}
          inicio={40}
        />
        <span className="lab__pie lab__pie--fijo">
          {pie}
          <span className="lab__descripcion">Arrastra para ver el boceto.</span>
        </span>
      </div>
    );
  }

  return (
    <button
      className="lab__pieza"
      onClick={() => abrir(p.src, p.descripcion ? `${p.titulo}. ${p.descripcion}` : p.titulo)}
      data-cursor="ver"
    >
      <img src={p.src} alt={p.titulo} loading="lazy" />
      <span className="lab__pie">
        {pie}
        {p.descripcion && <span className="lab__descripcion">{p.descripcion}</span>}
      </span>
    </button>
  );
}

export default function Laboratorio() {
  const raiz = useRef(null);
  const abrir = useLightbox();

  useEffect(() => {
    if (reduceMotion) return;
    const mm = gsap.matchMedia(raiz);
    mm.add("(min-width: 700px)", () => {
      gsap.utils.toArray(".lab__columna").forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: RECORRIDO[i] },
          { y: -RECORRIDO[i], ease: "none", scrollTrigger: { trigger: raiz.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="laboratorio" ref={raiz} className="lab" aria-labelledby="lab-titulo">
      <header className="lab__cabeza">
        <h2 id="lab-titulo">Laboratorio</h2>
        <p>Lo que no cabe en un caso de estudio: personajes propios, fan art, estudios y fotografía.</p>
      </header>
      <div className="lab__rejilla">
        {COLUMNAS.map((col, c) => (
          <ul key={c} className="lab__columna">
            {col.map((p) => (
              <li key={p.src}>
                <Pieza p={p} abrir={abrir} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
