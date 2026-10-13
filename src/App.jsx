import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { iniciarScroll, irA, ScrollTrigger } from "./lib/motion";
import { leerRuta, useRuta } from "./lib/ruta";
import { useIdioma } from "./lib/idioma";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Transicion from "./components/Transicion";
import Contacto from "./components/Contacto";
import Inicio from "./pages/Inicio";
import Proyecto from "./pages/Proyecto";
import { LightboxProvider } from "./components/Lightbox";

export default function App() {
  // cargando -> revelando (el sitio entra bajo el destello) -> listo (la intro se desmonta)
  const [fase, setFase] = useState("cargando");
  const listo = fase !== "cargando";
  const revelar = useCallback(() => setFase((f) => (f === "cargando" ? "revelando" : f)), []);
  const terminar = useCallback(() => setFase("listo"), []);
  const ruta = leerRuta(useRuta());
  const idioma = useIdioma();

  useEffect(() => {
    iniciarScroll();
  }, []);

  useEffect(() => {
    if (!listo) return;
    document.body.classList.remove("cargando");
    // las fuentes cambian alturas: recalcular los pines cuando terminen de cargar
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [listo]);

  // al cambiar de página: arriba del todo, o a la sección pedida (#obras, #contacto...)
  useLayoutEffect(() => {
    irA(0, true);
    ScrollTrigger.refresh();
    if (ruta.ancla) requestAnimationFrame(() => irA(ruta.ancla, true));
  }, [ruta.pagina, ruta.id, ruta.ancla]);

  // al cambiar de idioma la página se vuelve a montar (las animaciones letra por letra
  // dependen del texto) y los pines de scroll se recalculan
  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [idioma]);

  return (
    <LightboxProvider>
      <Cursor />
      <Transicion />
      {fase !== "listo" && <Preloader alRevelar={revelar} alTerminar={terminar} />}
      <Nav />
      {ruta.pagina === "proyecto" ? <Proyecto key={ruta.id + idioma} id={ruta.id} /> : <Inicio key={`inicio-${idioma}`} entrar={listo} />}
      <Contacto key={`contacto-${idioma}`} />
    </LightboxProvider>
  );
}
