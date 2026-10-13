import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, irA, reduceMotion, ScrollTrigger } from "../lib/motion";
import { GRUPOS_LAB, LABORATORIO } from "../data/contenido";
import { useLightbox } from "./Lightbox";
import { Destello, Fondo } from "./Adornos";
import Comparador from "./Comparador";
import "./Laboratorio.css";

const dos = (n) => String(n).padStart(2, "0");
const INTRO = "Lo que no cabe en un caso de estudio: personajes propios, fan art, estudios y fotografía.";

function useMovil() {
  const consulta = "(max-width: 860px)";
  const [movil, setMovil] = useState(() => typeof window !== "undefined" && window.matchMedia(consulta).matches);
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const cambio = () => setMovil(mq.matches);
    mq.addEventListener("change", cambio);
    return () => mq.removeEventListener("change", cambio);
  }, []);
  return movil;
}

/*
 * Laboratorio como mazo: la carta del frente es la pieza activa y un panel tipo
 * visor muestra sus datos. En escritorio el scroll pasa las cartas (la sección
 * queda fija); en móvil se pasan deslizando o con las flechas.
 */
export default function Laboratorio() {
  const raiz = useRef(null);
  const titulo = useRef(null);
  const abrir = useLightbox();
  const movil = useMovil();
  const [grupo, setGrupo] = useState("Todo");
  const [idx, setIdx] = useState(0);
  const piezas = useMemo(() => (grupo === "Todo" ? LABORATORIO : LABORATORIO.filter((p) => p.grupos.includes(grupo))), [grupo]);
  const n = piezas.length;
  const p = piezas[Math.min(idx, n - 1)];

  // escritorio: el avance del scroll dentro de la sección elige la carta
  useLayoutEffect(() => {
    if (movil) return;
    ScrollTrigger.refresh();
    const st = ScrollTrigger.create({
      trigger: raiz.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setIdx(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
    });
    return () => st.kill();
  }, [movil, n]);

  // el título de la pieza entra letra por letra cada vez que cambia
  useEffect(() => {
    if (reduceMotion || !titulo.current) return;
    gsap.fromTo(titulo.current.querySelectorAll(".lab__letra"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.02, ease: "expo.out" });
    gsap.fromTo(".lab__dato", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" });
  }, [p]);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".lab__gigante", { xPercent: -12, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: raiz.current, start: "top 70%" } });
      // se anima el mazo entero: cada carta ya lleva su transform desde React
      gsap.from(".lab__mazo", { y: 140, rotate: -10, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: raiz.current, start: "top 60%" } });
    }, raiz);
    return () => ctx.revert();
  }, []);

  // lleva el scroll al punto de la sección que corresponde a la carta k
  const irACarta = (k) => {
    if (movil) return setIdx(k);
    const el = raiz.current;
    const recorrido = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    irA(top + ((k + 0.5) / n) * recorrido);
  };

  const filtrar = (g) => {
    setGrupo(g);
    setIdx(0);
    if (!movil) irA(raiz.current.getBoundingClientRect().top + window.scrollY);
  };

  // deslizar con el dedo en móvil
  const toque = useRef(null);
  const alSoltar = (e) => {
    if (toque.current == null) return;
    const dx = e.changedTouches[0].clientX - toque.current;
    toque.current = null;
    if (Math.abs(dx) < 40) return;
    setIdx((i) => (dx < 0 ? Math.min(n - 1, i + 1) : Math.max(0, i - 1)));
  };

  const palabras = p.titulo.split(" ");
  const lineas = palabras.length > 1 ? [palabras.slice(0, -1).join(" "), palabras.at(-1)] : [p.titulo];

  return (
    <section id="laboratorio" ref={raiz} className="lab" style={{ "--n": n }} aria-labelledby="lab-titulo">
      <div className="lab__fijo">
        <Fondo brillos={[["azul", -150, 200, 900, 800, 0.45, 240], ["violeta", 900, 420, 600, 500, 0.25, 220]]} />
        <h2 id="lab-titulo" className="lab__gigante contorno">
          Laboratorio
        </h2>
        <span className="lab__cuenta hud">({dos(LABORATORIO.length)})</span>

        <div
          className="lab__mazo"
          onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
          onTouchEnd={alSoltar}
          aria-live="polite"
        >
          {piezas.map((pz, k) => {
            const d = k - Math.min(idx, n - 1);
            const fuera = d < 0;
            const visible = d >= 0 && d < 9;
            return (
              <article
                key={pz.src}
                className={`lab__carta ${d === 0 ? "lab__carta--frente" : ""}`}
                style={{
                  "--d": d,
                  zIndex: 50 - Math.abs(d),
                  opacity: fuera ? 0 : visible ? 1 : 0,
                  transform: fuera
                    ? `translate(-90%, -20%) rotate(-24deg)` // las cartas ya vistas salen por la izquierda
                    : `translate(${-d * 16}px, ${-d * 12}px) rotate(${-d * 2.2}deg) scale(${1 - d * 0.015})`,
                }}
                aria-hidden={d !== 0}
              >
                <div className="lab__obra">
                  {pz.boceto && d === 0 ? (
                    <Comparador
                      debajo={pz.boceto}
                      encima={pz.src}
                      altDebajo={`${pz.titulo}, boceto`}
                      altEncima={`${pz.titulo}, ilustración final`}
                      etiqueta={`Comparar boceto y final de ${pz.titulo}`}
                      inicio={42}
                      cubrir
                    />
                  ) : (
                    <img src={pz.src} alt={d === 0 ? pz.titulo : ""} loading="lazy" draggable="false" />
                  )}
                </div>
                <footer className="lab__pie">
                  <span>{pz.titulo}</span>
                  <span className="hud">N.º {dos(LABORATORIO.indexOf(pz) + 1)}</span>
                  <span className="lab__pie-nota">{pz.nota}</span>
                </footer>
              </article>
            );
          })}
        </div>

        <div className="lab__panel">
          <div className="lab__filtros" role="group" aria-label="Filtrar el laboratorio">
            {GRUPOS_LAB.map((g) => (
              <button key={g} className={`lab__filtro ${g === grupo ? "es-activo" : ""}`} aria-pressed={g === grupo} onClick={() => filtrar(g)}>
                {g}
              </button>
            ))}
          </div>

          <p className="lab__contador hud">
            Pieza <span>{dos(Math.min(idx, n - 1) + 1)} / {dos(n)}</span>
          </p>
          <div className="lab__progreso" aria-hidden="true">
            {piezas.map((pz, k) => (
              <span key={pz.src} className={k === idx ? "es-activo" : k < idx ? "es-hecho" : ""} />
            ))}
          </div>

          <h3 ref={titulo} className="lab__titulo" aria-live="polite">
            {lineas.map((l, k) => (
              <span key={l + k} className={`lab__linea ${k === lineas.length - 1 && lineas.length > 1 ? "contorno" : ""}`}>
                {l.split("").map((c, j) => (
                  <span key={j} className="lab__mascara">
                    <span className="lab__letra">{c === " " ? " " : c}</span>
                  </span>
                ))}
              </span>
            ))}
          </h3>
          <p className="lab__nota lab__dato">{p.nota}</p>
          <p className="lab__texto lab__dato">
            {INTRO}
            {p.boceto && " Arrastra sobre la ilustración para ver el boceto debajo."}
          </p>

          <div className="lab__acciones lab__dato">
            <button className="boton" onClick={() => abrir(p.src, `${p.titulo}. ${p.nota}`)} data-cursor="ver">
              Ver en grande
            </button>
            {movil ? (
              <span className="lab__flechas">
                <button className="lab__flecha" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} aria-label="Pieza anterior">
                  ←
                </button>
                <button className="lab__flecha" onClick={() => setIdx((i) => Math.min(n - 1, i + 1))} disabled={idx >= n - 1} aria-label="Pieza siguiente">
                  →
                </button>
              </span>
            ) : (
              <span className="hud hud--tenue lab__pista">Desliza para pasar a la siguiente pieza&nbsp; ↓</span>
            )}
          </div>

          <div className="lab__miniaturas">
            {piezas.map((pz, k) => (
              <button key={pz.src} className={`lab__mini ${k === idx ? "es-activo" : ""}`} onClick={() => irACarta(k)} aria-label={`Ver ${pz.titulo}`}>
                <img src={pz.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <Destello tam={24} style={{ left: "47%", top: "40%" }} />
        <Destello tam={16} violeta style={{ left: "4%", bottom: "6%" }} />
        <p className="vertical lab__vertical" aria-hidden="true">
          LYCH ✦ Laboratorio ✦ {dos(LABORATORIO.length)} piezas
        </p>
      </div>
    </section>
  );
}
