import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { alClicEnlace, url } from "../lib/ruta";
import { OBRAS } from "../data/contenido";
import { useLightbox } from "../components/Lightbox";
import { Cinta, Destello, Fondo } from "../components/Adornos";
import Medea from "../components/Medea";
import Comparador from "../components/Comparador";
import Sprite from "../components/Sprite";
import "./Proyecto.css";

const dos = (n) => String(n).padStart(2, "0");
const normal = (img) => (typeof img === "string" ? { src: img } : img);

function Letras({ texto }) {
  return texto.split("").map((l, j) => (
    <span key={j} className="proyecto__mascara">
      <span className="proyecto__letra">{l === " " ? " " : l}</span>
    </span>
  ));
}

/* imágenes en marcos inclinados que abren el visor */
function Galeria({ imagenes, titulo, abrir }) {
  const sola = imagenes.length === 1;
  return (
    <ul className={`proyecto__galeria ${sola ? "proyecto__galeria--sola" : ""}`}>
      {imagenes.map(normal).map(({ src, pie }, k) => {
        const texto = pie ?? `${titulo}, imagen ${k + 1}`;
        return (
          <li key={src} className="proyecto__pieza proyecto__marco" style={{ "--g": `${k % 2 ? 1.2 : -1.2}deg` }}>
            <button onClick={() => abrir(src, texto)} data-cursor="ver">
              <img src={src} alt={texto} loading="lazy" />
            </button>
            {pie && <p className="proyecto__pie">{pie}</p>}
          </li>
        );
      })}
    </ul>
  );
}

function Seccion({ s, o, abrir }) {
  switch (s.tipo) {
    case "sprites":
      return (
        <>
          <div className="proyecto__sprites-rejilla">
            {o.sprites.map((sp) => (
              <div key={sp.src} className="proyecto__pieza proyecto__sprite">
                <Sprite {...sp} />
              </div>
            ))}
          </div>
          <h3 className="proyecto__subtitulo proyecto__subtitulo--menor">Hojas de sprites</h3>
          {o.sprites.map((sp) => (
            <figure key={sp.src} className="proyecto__hoja pixel proyecto__pieza">
              {/* misma escala para todas las hojas: 1 px del sprite = 1 px de pantalla */}
              <img src={sp.src} alt={`Hoja de sprites: ${sp.titulo}, ${sp.frames} frames`} loading="lazy" style={{ width: sp.frames * sp.lado }} />
              <figcaption>
                {sp.titulo}: {sp.frames} frames de {sp.lado} × {sp.lado} px
              </figcaption>
            </figure>
          ))}
        </>
      );
    case "pares":
      return (
        <>
          <p className="proyecto__ayuda">{s.ayuda}</p>
          <div className="proyecto__pares-rejilla">
            {s.pares.map((p, k) => (
              <div key={p.titulo} className="proyecto__pieza proyecto__par" style={{ "--g": `${[-1.5, 1.2, -0.8][k % 3]}deg` }}>
                <Comparador
                  debajo={p.boceto}
                  encima={p.final}
                  altDebajo={`${p.titulo}, boceto`}
                  altEncima={`${p.titulo}, ilustración final`}
                  etiqueta={`Comparar boceto y final de ${p.titulo}`}
                  pie={p.titulo}
                  inicio={35}
                />
              </div>
            ))}
          </div>
        </>
      );
    case "deslizador":
      return (
        <>
          <div className={`proyecto__pieza proyecto__deslizador ${s.vertical ? "proyecto__deslizador--vertical" : ""}`}>
            <Comparador
              debajo={s.boceto}
              encima={s.final}
              altDebajo={`${o.titulo}, boceto`}
              altEncima={`${o.titulo}, versión final`}
              etiqueta={`Comparar boceto y final de ${o.titulo}`}
              inicio={s.inicio ?? 45}
            />
            <p className="hud proyecto__pista">{s.ayuda}</p>
          </div>
          {s.luego && <Galeria imagenes={s.luego} titulo={o.titulo} abrir={abrir} />}
        </>
      );
    case "galeria":
      return <Galeria imagenes={s.imagenes} titulo={o.titulo} abrir={abrir} />;
    case "referencias":
      return (
        // obras ajenas: aparte y con crédito, para no confundirlas con el trabajo propio
        <div className="proyecto__referencias-rejilla">
          {s.referencias.map((r, k) => (
            <figure key={r.src} className="proyecto__pieza proyecto__referencia" style={{ "--g": `${k % 2 ? 1.2 : -1.2}deg` }}>
              <span className="proyecto__cinta-adhesiva" aria-hidden="true" />
              <button onClick={() => abrir(r.src, r.texto)} data-cursor="ver">
                <img src={r.src} alt={r.texto} loading="lazy" />
              </button>
              <figcaption>
                {r.texto}
                {r.enlace && (
                  <a href={r.enlace} target="_blank" rel="noreferrer">
                    Ver el original ↗<span className="solo-lector"> (se abre en otra pestaña)</span>
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function Proyecto({ id }) {
  const raiz = useRef(null);
  const abrir = useLightbox();
  const i = OBRAS.findIndex((o) => o.id === id);
  const o = OBRAS[i];
  const siguiente = OBRAS[(i + 1) % OBRAS.length];

  useEffect(() => {
    if (!o) return;
    document.title = `${o.titulo} | LYCH`;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.35 })
        .from(".proyecto__letra", { yPercent: 115, duration: 1.3, stagger: 0.025 })
        .fromTo(".proyecto__arco", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.inOut" }, 0)
        .from(".proyecto__arco img", { scale: 1.25, duration: 2.2 }, 0)
        .from(".proyecto__marco-arco, .proyecto__numero", { opacity: 0, scale: 0.94, duration: 1.4 }, 0.4)
        .from(".proyecto__meta > *, .proyecto__enlaces", { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, 0.4)
        .from(".proyecto__cabeza .cinta", { xPercent: (k) => (k ? 30 : -30), opacity: 0, duration: 1.4, stagger: 0.1 }, 0.6);

      gsap.to(".proyecto__numero", { yPercent: 25, ease: "none", scrollTrigger: { trigger: ".proyecto__cabeza", start: "top top", end: "bottom top", scrub: true } });
      gsap.from(".proyecto__sobre-texto", { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".proyecto__sobre", start: "top 75%" } });
      gsap.utils.toArray(".proyecto__seccion-titulo").forEach((t) => {
        gsap.from(t, { xPercent: -6, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 85%" } });
      });
      gsap.utils.toArray(".proyecto__pieza").forEach((el) => {
        gsap.from(el, { y: 80, rotate: 3, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    }, raiz);
    return () => {
      ctx.revert();
      document.title = "LYCH | Emily Chisaba";
    };
  }, [o]);

  if (!o) {
    return (
      <main className="proyecto proyecto--vacio">
        <h1>Este proyecto no existe</h1>
        <p>Puede que el enlace esté mal escrito. Los proyectos están en el inicio.</p>
        <a href={url("/#obras")} onClick={(e) => alClicEnlace(e, "/#obras")}>
          Ir a los proyectos
        </a>
      </main>
    );
  }

  const destinoSig = `/proyecto/${siguiente.id}`;
  const [primera, ...resto] = o.titulo.split(" ");
  const lineas = resto.length ? [primera, resto.join(" ")] : [primera];
  const marca = `${o.titulo} ✦ ${o.año}`;

  return (
    <main ref={raiz} className="proyecto">
      <header className="proyecto__cabeza">
        <Fondo brillos={[["azul", -250, -150, 900, 700, 0.42, 230], ["violeta", 760, 300, 600, 600, 0.3, 200]]} />
        <div className="proyecto__izq">
          <a className="proyecto__volver hud hud--tenue" href={url("/#obras")} onClick={(e) => alClicEnlace(e, "/#obras")}>
            ← Volver a proyectos
          </a>
          <p className="hud proyecto__n">
            N.º {dos(i + 1)} / {dos(OBRAS.length)}
          </p>
          <h1 className="proyecto__titulo" aria-label={o.titulo}>
            {lineas.map((l, k) => (
              <span key={k} className={`proyecto__linea ${k ? "contorno" : ""}`} aria-hidden="true">
                <Letras texto={l} />
              </span>
            ))}
          </h1>
          <dl className="proyecto__meta">
            <div>
              <dt className="hud">Qué es</dt>
              <dd>{o.tipo}</dd>
            </div>
            <div>
              <dt className="hud">Qué hice</dt>
              <dd>{o.rol}</dd>
            </div>
            {o.año && (
              <div>
                <dt className="hud">Año</dt>
                <dd>{o.año}</dd>
              </div>
            )}
          </dl>
          {o.enlace && (
            <p className="proyecto__enlaces">
              <a className="boton" href={o.enlace.url} target="_blank" rel="noreferrer" data-cursor="abrir">
                {o.enlace.texto}
                <span className="solo-lector"> (se abre en otra pestaña)</span>
              </a>
              <a className="hud proyecto__url" href={o.enlace.url} target="_blank" rel="noreferrer">
                {o.enlace.url.replace(/^https:\/\//, "").replace(/\/$/, "")}&nbsp; ↗
              </a>
            </p>
          )}
        </div>

        <div className="proyecto__der">
          <span className="proyecto__numero contorno" aria-hidden="true">
            {dos(i + 1)}
          </span>
          <span className="proyecto__marco-arco" aria-hidden="true" />
          <button className={`proyecto__arco ${o.pixelArt ? "pixel" : ""}`} onClick={() => abrir(o.portada, o.titulo)} data-cursor="ver">
            <img src={o.tarjeta ?? o.portada} alt={`${o.titulo}: imagen principal`} />
          </button>
          <span className="sticker proyecto__sticker">{o.etiqueta}</span>
          <Destello tam={26} style={{ left: "-6%", top: "2%" }} />
          <Destello tam={14} violeta style={{ right: "-5%", top: "60%" }} />
        </div>

        <p className="vertical proyecto__vertical" aria-hidden="true">
          LYCH ✦ {o.titulo} ✦ {o.año}
        </p>

        <div className="proyecto__cintas">
          <Cinta palabras={[marca]} color="azul" velocidad={50} />
          <Cinta palabras={[marca]} color="violeta" reversa velocidad={42} />
        </div>
      </header>

      <section className="proyecto__sobre" aria-label="Sobre el proyecto">
        <Fondo brillos={[["violeta", 900, 100, 600, 400, 0.2, 200]]} />
        <p className="hud proyecto__sobre-etiqueta">Sobre el proyecto</p>
        <p className="proyecto__sobre-texto">{o.texto}</p>
        <Destello tam={22} style={{ left: "8%", bottom: "20%" }} />
      </section>

      {o.secciones.map((s, k) =>
        s.tipo === "medea" ? (
          <section key="medea" className="proyecto__seccion proyecto__seccion--medea">
            <header className="proyecto__seccion-titulo">
              <span className="hud">N.º 01</span>
              <h2>Proceso</h2>
            </header>
            <Medea enPagina />
          </section>
        ) : (
          <section key={s.titulo} className="proyecto__seccion" aria-labelledby={`sec-${k}`}>
            <Fondo brillos={[k % 2 ? ["violeta", 900, 200, 800, 600, 0.28, 230] : ["azul", -200, 200, 800, 600, 0.28, 230]]} />
            <header className="proyecto__seccion-titulo">
              <span className="hud">N.º {dos(k + 1)}</span>
              <h2 id={`sec-${k}`}>{s.titulo}</h2>
            </header>
            <Seccion s={s} o={o} abrir={abrir} />
          </section>
        )
      )}

      <a className="proyecto__siguiente" href={url(destinoSig)} onClick={(e) => alClicEnlace(e, destinoSig)} data-cursor="siguiente">
        <img className="proyecto__sig-fondo" src={siguiente.portada} alt="" loading="lazy" />
        <span className="proyecto__sig-velo" aria-hidden="true" />
        <span className="hud">Siguiente proyecto</span>
        <span className="hud hud--tenue">
          N.º {dos(((i + 1) % OBRAS.length) + 1)} / {dos(OBRAS.length)}
        </span>
        <span className="proyecto__sig-titulo">
          {siguiente.titulo} <span className="proyecto__sig-flecha">→</span>
        </span>
        <Destello tam={20} style={{ right: "6%", top: "22%" }} />
      </a>
    </main>
  );
}
