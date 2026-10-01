import { useEffect, useRef } from "react";
import { gsap, reduceMotion } from "../lib/motion";
import { alClicEnlace, url } from "../lib/ruta";
import { OBRAS } from "../data/contenido";
import { useLightbox } from "../components/Lightbox";
import Medea from "../components/Medea";
import Comparador from "../components/Comparador";
import Sprite from "../components/Sprite";
import "./Proyecto.css";

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
      gsap.from(".proyecto__letra", { yPercent: 110, duration: 1.3, stagger: 0.025, ease: "expo.out", delay: 0.35 });
      gsap.from(".proyecto__meta > *", { opacity: 0, y: 20, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.6 });
      gsap.fromTo(
        ".proyecto__portada img",
        { yPercent: -8, scale: 1.12 },
        { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".proyecto__portada", start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.utils.toArray(".proyecto__pieza").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
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

  return (
    <main ref={raiz} className="proyecto" style={{ "--tono": o.tono }}>
      <header className="proyecto__cabeza">
        <a className="proyecto__volver" href={url("/#obras")} onClick={(e) => alClicEnlace(e, "/#obras")}>
          Volver a proyectos
        </a>
        <h1 className="proyecto__titulo" aria-label={o.titulo}>
          {o.titulo.split(" ").map((palabra, k) => (
            <span key={k} className="proyecto__palabra" aria-hidden="true">
              {palabra.split("").map((l, j) => (
                <span key={j} className="proyecto__mascara">
                  <span className="proyecto__letra">{l}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <dl className="proyecto__meta">
          <div>
            <dt>Qué es</dt>
            <dd>{o.tipo}</dd>
          </div>
          <div>
            <dt>Qué hice</dt>
            <dd>{o.rol}</dd>
          </div>
          {o.año && (
            <div>
              <dt>Año</dt>
              <dd>{o.año}</dd>
            </div>
          )}
        </dl>
        {o.enlace && (
          <a className="proyecto__enlace" href={o.enlace.url} target="_blank" rel="noreferrer" data-cursor="abrir">
            {o.enlace.texto}
            <span className="solo-lector"> (se abre en otra pestaña)</span>
          </a>
        )}
      </header>

      {o.especial === "medea" ? (
        <Medea enPagina />
      ) : (
        <>
          <button
            className={`proyecto__portada ${o.pixelArt ? "pixel" : ""}`}
            onClick={() => abrir(o.portada, o.titulo)}
            data-cursor="ver"
          >
            <img src={o.portada} alt={`${o.titulo}: imagen principal`} />
          </button>

          <p className="proyecto__texto">{o.texto}</p>


          {o.sprites && (
            <section className="proyecto__sprites" aria-labelledby="sprites-titulo">
              <h2 id="sprites-titulo" className="proyecto__subtitulo">
                Animaciones
              </h2>
              <div className="proyecto__sprites-rejilla">
                {o.sprites.map((sp) => (
                  <Sprite key={sp.src} {...sp} />
                ))}
              </div>

              <h3 className="proyecto__subtitulo proyecto__subtitulo--menor">Hojas de sprites</h3>
              {o.sprites.map((sp) => (
                <figure key={sp.src} className="proyecto__hoja pixel">
                  {/* misma escala para todas las hojas: 1 px del sprite = 1 px de pantalla */}
                  <img
                    src={sp.src}
                    alt={`Hoja de sprites: ${sp.titulo}, ${sp.frames} frames`}
                    loading="lazy"
                    style={{ width: sp.frames * sp.lado }}
                  />
                  <figcaption>
                    {sp.titulo}: {sp.frames} frames de {sp.lado} × {sp.lado} px
                  </figcaption>
                </figure>
              ))}
            </section>
          )}

          {o.pares && (
            <section className="proyecto__pares" aria-labelledby="pares-titulo">
              <h2 id="pares-titulo" className="proyecto__subtitulo">
                Del boceto al color
              </h2>
              <p className="proyecto__ayuda">Arrastra sobre cada ilustración para ver el boceto debajo.</p>
              <div className="proyecto__pares-rejilla">
                {o.pares.map((p) => (
                  <div key={p.titulo} className="proyecto__pieza">
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
            </section>
          )}

          {o.imagenes.length > 0 && (
            <ul className="proyecto__galeria">
              {o.imagenes.map((img, k) => {
                // cada imagen puede ser una ruta o { src, pie }
                const { src, pie } = typeof img === "string" ? { src: img } : img;
                const texto = pie ?? `${o.titulo}, imagen ${k + 2}`;
                return (
                  <li key={src} className="proyecto__pieza">
                    <button onClick={() => abrir(src, texto)} data-cursor="ver">
                      <img src={src} alt={texto} loading="lazy" />
                    </button>
                    {pie && <p className="proyecto__pie">{pie}</p>}
                  </li>
                );
              })}
            </ul>
          )}

          {o.referencias && (
            <section className="proyecto__referencias" aria-labelledby="referencias-titulo">
              <h2 id="referencias-titulo" className="proyecto__subtitulo proyecto__subtitulo--menor">
                {o.referenciasTitulo ?? "Referencia"}
              </h2>
              {/* obras ajenas: aparte y con crédito, para no confundirlas con el trabajo propio */}
              <div className="proyecto__referencias-rejilla">
                {o.referencias.map((r) => (
                  <figure key={r.src} className="proyecto__referencia">
                    <button onClick={() => abrir(r.src, r.texto)} data-cursor="ver">
                      <img src={r.src} alt={r.texto} loading="lazy" />
                    </button>
                    <figcaption>
                      {r.texto}
                      {r.enlace && (
                        <>
                          {" "}
                          <a href={r.enlace} target="_blank" rel="noreferrer">
                            Ver el original
                            <span className="solo-lector"> (se abre en otra pestaña)</span>
                          </a>
                        </>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <a className="proyecto__siguiente" href={url(destinoSig)} onClick={(e) => alClicEnlace(e, destinoSig)} data-cursor="siguiente">
        <span className="proyecto__sig-etiqueta">Siguiente proyecto</span>
        <span className="proyecto__sig-titulo">{siguiente.titulo}</span>
        <img src={siguiente.portada} alt="" loading="lazy" />
      </a>
    </main>
  );
}
