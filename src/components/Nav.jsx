import { useEffect, useRef, useState } from "react";
import { gsap, irA, pausarScroll, reduceMotion } from "../lib/motion";
import { navegar, url, useRuta, leerRuta } from "../lib/ruta";
import { OBRAS } from "../data/contenido";
import "./Nav.css";

const SECCIONES = [
  { id: "#obras", nombre: "Proyectos" },
  { id: "#laboratorio", nombre: "Laboratorio" },
  { id: "#sobre", nombre: "Sobre mí" },
  { id: "#contacto", nombre: "Contacto" },
];

/* Índice plano para quien tiene 60 segundos: todos los proyectos sin escenografía. */
const INDICE = [
  ...OBRAS.map((o) => ({ titulo: o.titulo, tipo: o.tipo, año: o.año, destino: `/proyecto/${o.id}` })),
  { titulo: "Laboratorio", tipo: "Ilustración personal, estudios y fotografía", destino: "#laboratorio" },
];

export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  const enInicio = leerRuta(useRuta()).pagina === "inicio";
  const panel = useRef(null);
  const boton = useRef(null);

  useEffect(() => {
    pausarScroll(abierto);
    if (!panel.current) return;
    if (abierto) {
      panel.current.querySelector("a")?.focus();
      if (!reduceMotion)
        gsap.fromTo(
          panel.current.querySelectorAll(".indice__fila"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, stagger: 0.04, ease: "expo.out" }
        );
    }
    const esc = (e) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [abierto]);

  const cerrar = () => {
    setAbierto(false);
    boton.current?.focus();
  };

  // destino: "#seccion" del inicio o "/proyecto/id"; Ctrl+clic sigue abriendo otra pestaña
  const ir = (e, destino) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setAbierto(false);
    pausarScroll(false);
    if (destino.startsWith("/")) navegar(destino);
    else if (enInicio) requestAnimationFrame(() => irA(destino));
    else navegar("/" + destino);
  };

  return (
    <>
      <header className="nav">
        <a href={url("/")} className="nav__marca" onClick={(e) => ir(e, "#inicio")} aria-label="LYCH, volver al inicio">
          <span className="nav__logo" aria-hidden="true" />
          <span aria-hidden="true">LYCH</span>
        </a>
        <nav aria-label="Secciones">
          <ul className="nav__lista">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a href={url("/" + s.id)} onClick={(e) => ir(e, s.id)}>
                  {s.nombre}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={boton}
          className="nav__indice"
          aria-expanded={abierto}
          aria-controls="indice"
          onClick={() => (abierto ? cerrar() : setAbierto(true))}
          data-cursor={abierto ? "cerrar" : "índice"}
        >
          <span className="nav__latido" aria-hidden="true" />
          {abierto ? "Cerrar" : "Ver todo"}
        </button>
      </header>

      <div id="indice" ref={panel} className={`indice ${abierto ? "indice--abierto" : ""}`} hidden={!abierto}>
        <nav className="indice__secciones" aria-label="Secciones">
          {SECCIONES.map((s) => (
            <a key={s.id} href={url("/" + s.id)} onClick={(e) => ir(e, s.id)}>
              {s.nombre}
            </a>
          ))}
        </nav>
        <p className="indice__intro">Todo el trabajo, sin escenografía.</p>
        <ol className="indice__lista">
          {INDICE.map((p) => (
            <li key={p.titulo} className="indice__mascara">
              <a className="indice__fila" href={url(p.destino.startsWith("/") ? p.destino : "/" + p.destino)} onClick={(e) => ir(e, p.destino)}>
                <span className="indice__titulo">{p.titulo}</span>
                <span className="indice__tipo">{p.tipo}</span>
                <span className="indice__año">{p.año ?? ""}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
