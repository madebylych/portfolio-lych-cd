import Hero from "../components/hero/Hero";
import Manifiesto from "../components/Manifiesto";
import Proyectos from "../components/Proyectos";
import Laboratorio from "../components/Laboratorio";
import EnProceso from "../components/EnProceso";
import SobreMi from "../components/SobreMi";

export default function Inicio({ entrar }) {
  return (
    <main>
      <Hero entrar={entrar} />
      <Manifiesto />
      <Proyectos />
      <Laboratorio />
      <EnProceso />
      <SobreMi />
    </main>
  );
}
