import { useEffect, useRef, useState } from "react";
import { gsap, irA, pausarScroll, reduceMotion } from "../lib/motion";
import { navegar, url, useRuta, leerRuta } from "../lib/ruta";
import { cambiarIdioma, useContenido, useIdioma, useT } from "../lib/idioma";
import "./Nav.css";

const ANCLAS = ["#obras", "#laboratorio", "#sobre", "#contacto"];

const dos = (n) => String(n).padStart(2, "0");

/* Nav tipo visor (HUD) y "Ver todo": el índice de proyectos en texto, sin imágenes. */
export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  const t = useT();
  const idioma = useIdioma();
  const { OBRAS } = useContenido();
  const SECCIONES = ANCLAS.map((id, i) => ({ id, nombre: t.nav.secciones[i] }));
  const enInicio = leerRuta(useRuta()).pagina === "inicio";
  const panel = useRef(null);
  const boton = useRef(null);

  useEffect(() => {
    pausarScroll(abierto);
    if (!panel.current) return;
    if (abierto) {
      panel.current.querySelector("a")?.focus({ preventScroll: true });
      if (!reduceMotion) {
        gsap.fromTo(panel.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" });
        gsap.fromTo(
          panel.current.querySelectorAll(".todo__fila > *"),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.035, ease: "expo.out", delay: 0.25 }
        );
        gsap.fromTo(panel.current.querySelectorAll(".todo__letra"), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.02, ease: "expo.out", delay: 0.2 });
      }
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
      <header className={`nav ${abierto ? "nav--abierto" : ""}`}>
        <span className="esquinas nav__esquinas" aria-hidden="true" />
        <a href={url("/")} className="nav__marca" onClick={(e) => ir(e, "#inicio")} aria-label={t.nav.marca}>
          <span className="nav__logo" aria-hidden="true" />
          <span aria-hidden="true">LYCH</span>
          <span className="nav__etiqueta hud" aria-hidden="true">
            {abierto ? t.nav.verTodoEtiqueta : t.nav.portafolio}
          </span>
        </a>
        <nav aria-label={t.nav.seccionesAria}>
          <ul className="nav__lista">
            {SECCIONES.map((s, i) => (
              <li key={s.id}>
                <a href={url("/" + s.id)} onClick={(e) => ir(e, s.id)}>
                  <span className="nav__num">{dos(i + 1)}</span>
                  {s.nombre}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="nav__coordenadas hud hud--tenue" aria-hidden="true">
          Bogotá&nbsp; 4.71° N
        </span>
        {/* cambia todo el sitio entre español e inglés */}
        <button className="nav__idioma" onClick={() => cambiarIdioma(t.idioma.otro)} aria-label={t.idioma.etiqueta}>
          <span className={idioma === "es" ? "es-activo" : ""}>ES</span>
          <span aria-hidden="true">/</span>
          <span className={idioma === "en" ? "es-activo" : ""}>EN</span>
        </button>
        <button
          ref={boton}
          className="nav__indice"
          aria-expanded={abierto}
          aria-controls="indice"
          onClick={() => (abierto ? cerrar() : setAbierto(true))}
          data-cursor={abierto ? "cerrar" : "índice"}
        >
          <span className="nav__latido" aria-hidden="true" />
          {abierto ? t.nav.cerrar : t.nav.verTodo}
          {abierto && <span aria-hidden="true">✕</span>}
        </button>
      </header>

      <div id="indice" ref={panel} className="todo" hidden={!abierto} role="dialog" aria-modal="true" aria-labelledby="todo-titulo">
        <div className="todo__reticula" aria-hidden="true" />
        <span className="brillo brillo--violeta" style={{ width: "55vw", height: "45vh", left: "20%", top: "30%", "--op": 0.28 }} aria-hidden="true" />
        <span className="brillo brillo--azul" style={{ width: "40vw", height: "35vh", right: "-5%", top: "-8%", "--op": 0.45 }} aria-hidden="true" />
        <span className="todo__fondo contorno" aria-hidden="true">
          {t.nav.fondo}
        </span>

        <div className="todo__cuerpo">
          <p className="hud">{t.nav.archivo}</p>
          <h2 id="todo-titulo" className="todo__titulo">
            {t.nav.titulo.map((linea, k) => (
              <span key={k} className={`todo__linea ${k ? "contorno" : ""}`}>
                {linea.split("").map((l, i) => (
                  <span key={i} className="todo__mascara">
                    <span className="todo__letra">{l === " " ? " " : l}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <ol className="todo__lista">
            {OBRAS.map((o, i) => (
              <li key={o.id} className="todo__item">
                <a className="todo__fila" href={url(`/proyecto/${o.id}`)} onClick={(e) => ir(e, `/proyecto/${o.id}`)}>
                  <span className="todo__num">{dos(i + 1)}</span>
                  <span className={`todo__nombre ${i % 2 ? "contorno" : ""}`}>{o.titulo}</span>
                  <span className="todo__tipo">{o.corto}</span>
                  <span className="todo__etiqueta">{o.etiqueta}</span>
                  <span className="todo__año">{o.año}</span>
                  <span className="todo__flecha" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <nav className="todo__ir" aria-label={t.nav.irASeccion}>
          <span className="hud">{t.nav.irA}</span>
          {SECCIONES.map((s, i) => (
            <a key={s.id} href={url("/" + s.id)} onClick={(e) => ir(e, s.id)}>
              <span className="nav__num">{dos(i + 1)}</span>
              {s.nombre}
            </a>
          ))}
          <span className="todo__coordenadas hud hud--tenue">Bogotá&nbsp; 4.71° N&nbsp; 74.07° W</span>
          <span className="todo__esc hud hud--tenue">{t.nav.esc}</span>
        </nav>
        <span className="esquinas todo__esquinas" aria-hidden="true" />
      </div>
    </>
  );
}
