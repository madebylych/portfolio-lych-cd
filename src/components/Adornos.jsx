import { Fragment } from "react";

/* Piezas decorativas del rediseño v2: destellos de cuatro puntas y cintas que corren. */

export function Destello({ tam = 22, violeta = false, style, className = "" }) {
  return (
    <svg
      className={`destello ${violeta ? "destello--violeta" : ""} ${className}`}
      style={{ "--d": `${tam}px`, ...style }}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/* palabras: lista de textos que se repiten separados por ✦ */
export function Cinta({ palabras, color = "azul", reversa = false, velocidad = 38, className = "", style }) {
  const tramo = palabras.flatMap((p, i) => [<span key={`p${i}`}>{p}</span>, <span key={`s${i}`}>✦</span>]);
  return (
    <div
      className={`cinta cinta--${color} ${reversa ? "cinta--reversa" : ""} ${className}`}
      style={{ "--velocidad": `${velocidad}s`, ...style }}
      aria-hidden="true"
    >
      {/* dos copias idénticas: al llegar a la mitad el bucle no se nota */}
      <div className="cinta__pista">
        {[0, 1].map((k) => (
          <span key={k} style={{ display: "inline-flex", paddingRight: 0 }}>
            {[0, 1, 2, 3].map((r) => (
              <span key={r} style={{ display: "inline-flex", paddingRight: 0 }}>
                {tramo}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* parte un texto en letras con máscara, para animarlas una por una */
export function Letras({ texto, clase = "letra" }) {
  // el espacio va fuera del bloque de cada palabra: dentro de un inline-block se perdería
  return texto.split(" ").map((palabra, k, arr) => (
    <Fragment key={k}>
      <span className="palabra" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {palabra.split("").map((l, i) => (
          <span key={i} className="mascara" style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
            <span className={clase} style={{ display: "inline-block" }}>
              {l}
            </span>
          </span>
        ))}
      </span>
      {k < arr.length - 1 && " "}
    </Fragment>
  ));
}

/*
 * Fondo de una sección copiado del Figma: brillos (óvalos desenfocados) y
 * cortes diagonales. Las medidas son píxeles del Figma (lienzo de 1440) y se
 * escalan con --ub; el desenfoque de Figma equivale a la mitad en CSS.
 *   brillos: [color ("azul" | "violeta"), x, y, ancho, alto, opacidad, desenfoque]
 *   cortes:  [x, y, ancho, alto, giro en grados de Figma]
 */
const px = (n) => `calc(var(--ub) * ${n})`;

export function Fondo({ brillos = [], cortes = [] }) {
  return (
    <span className="fondo" aria-hidden="true">
      {cortes.map(([x, y, w, h, r], i) => (
        <span key={`c${i}`} className="corte" style={{ left: px(x), top: px(y), width: px(w), height: px(h), rotate: `${-r}deg` }} />
      ))}
      {brillos.map(([c, x, y, w, h, op, blur], i) => (
        <span
          key={`b${i}`}
          className={`brillo brillo--${c}`}
          style={{ left: px(x), top: px(y), width: px(w), height: px(h), "--op": op, "--blur": px(blur / 2) }}
        />
      ))}
    </span>
  );
}
