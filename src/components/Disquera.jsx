import { useEffect, useRef, useState } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { alClicEnlace, url } from "../lib/ruta";
import { OBRAS } from "../data/contenido";
import "./Disquera.css";

/*
 * Proyectos como discos apilados en una caja (referencia: "Sweet Boom CRT
 * World", _contenido/referenciaanimacion.jpg). El scroll recorre la caja:
 * el disco activo sube y muestra su portada; los demás quedan de canto.
 * Cajas de relleno oscuras delante y detrás para que la caja se sienta llena.
 */
const RELLENO_DELANTE = 3;
const RELLENO_DETRAS = 7;
const SEPARACION = 74; // px entre discos

const ranuras = [
  ...Array.from({ length: RELLENO_DELANTE }, (_, i) => ({ relleno: true, key: `d${i}` })),
  ...OBRAS.map((o) => ({ obra: o, key: o.id })),
  ...Array.from({ length: RELLENO_DETRAS }, (_, i) => ({ relleno: true, key: `t${i}` })),
];

const enlace = (o) => `/proyecto/${o.id}`;

function Disco({ ranura, z, alElegir }) {
  const o = ranura.obra;
  return (
    <div
      className={`disco ${ranura.relleno ? "disco--relleno" : ""}`}
      data-id={o?.id}
      style={{ transform: `translate3d(-50%, -50%, ${z}px)` }}
      onClick={o ? () => alElegir(o) : undefined}
    >
      <div className="disco__cuerpo">
        <div className="disco__cara disco__cara--frente">
          {o && (
            <>
              <div className="disco__barra">
                <span>{o.titulo}</span>
                <span className="disco__botones" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <img src={o.portada} alt="" loading="lazy" draggable="false" className={o.pixelArt ? "pixel-img" : undefined} />
            </>
          )}
        </div>
        <div className="disco__cara disco__cara--atras" />
        <div className="disco__cara disco__cara--lomo">{o && <span>{o.titulo}</span>}</div>
        <div className="disco__cara disco__cara--izq" />
        <div className="disco__cara disco__cara--techo" />
      </div>
    </div>
  );
}

export default function Disquera() {
  const raiz = useRef(null);
  const estante = useRef(null);
  const pista = useRef(null); // va dentro de la caja girada: se mueve a lo largo de su eje
  const [activo, setActivo] = useState(0);
  const disparador = useRef(null);

  // pin + scroll: elige el disco activo y gira un poco la caja
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      const st = gsap.to(estante.current, {
        rotationY: 34,
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 0.75 * OBRAS.length,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActivo(Math.min(OBRAS.length - 1, Math.floor(self.progress * OBRAS.length))),
        },
      });
      disparador.current = st.scrollTrigger;
    }, raiz);
    return () => ctx.revert();
  }, []);

  // la caja avanza como al pasar discos: el activo queda siempre en el mismo
  // lugar de la pantalla y los que ya pasaron se desvanecen adelante
  useEffect(() => {
    const todos = pista.current.querySelectorAll(".disco");
    const lugarActivo = RELLENO_DELANTE + activo;
    todos.forEach((d, k) => {
      const yaPaso = k < lugarActivo;
      d.style.pointerEvents = yaPaso ? "none" : "";
      if (reduceMotion) gsap.set(d, { opacity: yaPaso ? 0 : 1 });
      else gsap.to(d, { opacity: yaPaso ? 0 : 1, duration: 0.6, ease: "power2.out" });
    });
    // los discos avanzan por el eje de la caja lo mismo que el activo está de profundo
    const avance = activo * SEPARACION;
    if (reduceMotion) gsap.set(pista.current, { z: avance });
    else gsap.to(pista.current, { z: avance, duration: 0.9, ease: "power3.out" });
  }, [activo]);

  // el disco activo sube y se enciende; los vecinos asoman un poco
  useEffect(() => {
    const discos = estante.current.querySelectorAll(".disco:not(.disco--relleno)");
    discos.forEach((d, i) => {
      const dist = Math.abs(i - activo);
      // en pantallas angostas sube menos para no chocar con el menú
      const angosta = window.matchMedia("(max-width: 860px)").matches;
      const sube = i === activo ? (angosta ? -30 : -50) : dist === 1 ? -7 : 0;
      const cuerpo = d.querySelector(".disco__cuerpo");
      if (reduceMotion) {
        gsap.set(cuerpo, { yPercent: sube });
      } else {
        gsap.to(cuerpo, { yPercent: sube, rotationX: i === activo ? -6 : 0, duration: 0.9, ease: i === activo ? "back.out(1.6)" : "power3.out" });
      }
      d.classList.toggle("disco--activo", i === activo);
    });
    if (!reduceMotion)
      gsap.fromTo(".disquera__info .revela", { yPercent: 105 }, { yPercent: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" });
  }, [activo]);

  // clic en un disco: si ya está arriba se abre; si no, la caja se desplaza hasta él
  const elegir = (o) => {
    const i = OBRAS.indexOf(o);
    if (i === activo) {
      document.querySelector(".disquera__ver")?.click();
      return;
    }
    const st = disparador.current;
    if (!st) return setActivo(i);
    const y = st.start + ((i + 0.5) / OBRAS.length) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const o = OBRAS[activo];
  const primerZ = -(RELLENO_DELANTE * SEPARACION);

  return (
    <section id="obras" ref={raiz} className="disquera" aria-labelledby="obras-titulo">
      <div className="disquera__info" aria-live="polite">
        <h2 id="obras-titulo" className="disquera__titulo">
          Proyectos
        </h2>
        <p className="disquera__contador">
          <span>{activo + 1}</span> de {OBRAS.length}
        </p>
        <div className="disquera__mascara">
          <h3 className="revela">{o.titulo}</h3>
        </div>
        <div className="disquera__mascara">
          <p className="disquera__tipo revela">
            {o.tipo}
            {o.año ? `, ${o.año}` : ""}
          </p>
        </div>
        <div className="disquera__mascara">
          <p className="disquera__texto revela">{o.texto}</p>
        </div>
        <div className="disquera__mascara">
          <a className="disquera__ver revela" href={url(enlace(o))} onClick={(e) => alClicEnlace(e, enlace(o))} data-cursor="abrir">
            Ver proyecto
          </a>
        </div>
      </div>

      <div className="disquera__escena" aria-hidden="true">
        <div ref={estante} className="disquera__estante">
          <div ref={pista} className="disquera__pista">
            {ranuras.map((r, i) => (
              <Disco key={r.key} ranura={r} z={-primerZ - i * SEPARACION} alElegir={elegir} />
            ))}
          </div>
        </div>
      </div>

      {/* sin movimiento: lista plana con portadas */}
      {reduceMotion && (
        <ul className="disquera__lista">
          {OBRAS.map((x) => (
            <li key={x.id}>
              <a href={url(enlace(x))} onClick={(e) => alClicEnlace(e, enlace(x))}>
                <img src={x.portada} alt="" loading="lazy" />
                <span>{x.titulo}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
