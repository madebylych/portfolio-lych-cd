import { useId, useState } from "react";
import "./Comparador.css";

/*
 * Dos imágenes del mismo tamaño, una encima de otra, con un deslizador para
 * comparar (render y malla, boceto y color...). `debajo` se ve a la izquierda
 * de la línea y `encima` a la derecha. El rango es un <input> real: funciona
 * con teclado y lector de pantalla.
 */
export default function Comparador({ debajo, encima, altDebajo, altEncima, etiqueta, pie, inicio = 50 }) {
  const [corte, setCorte] = useState(inicio);
  const id = useId();

  return (
    <figure className="comparar" data-cursor="arrastra">
      <div className="comparar__marco">
        <img src={debajo} alt={altDebajo} loading="lazy" draggable="false" />
        <img
          className="comparar__encima"
          src={encima}
          alt={altEncima}
          loading="lazy"
          draggable="false"
          style={{ clipPath: `inset(0 0 0 ${corte}%)` }}
        />
        <span className="comparar__guia" style={{ left: `${corte}%` }} aria-hidden="true" />
        <label className="solo-lector" htmlFor={id}>
          {etiqueta}
        </label>
        <input
          id={id}
          className="comparar__rango"
          type="range"
          min="0"
          max="100"
          value={corte}
          onChange={(e) => setCorte(Number(e.target.value))}
        />
      </div>
      {pie && <figcaption>{pie}</figcaption>}
    </figure>
  );
}
