import "./Sprite.css";

/*
 * Anima una hoja de sprites horizontal con CSS: la imagen de fondo avanza
 * un frame a la vez (steps), sin suavizado, a los fps del archivo original.
 * `escala` multiplica el tamaño en píxeles enteros para que el pixel art
 * se vea nítido.
 */
export default function Sprite({ src, frames, lado, fps, escala = 3, titulo }) {
  const tamano = lado * escala;
  return (
    <figure className="sprite">
      <div
        className="sprite__lienzo"
        role="img"
        aria-label={`${titulo}: animación de ${frames} frames`}
        style={{
          "--tamano": `${tamano}px`,
          "--frames": frames,
          "--duracion": `${frames / fps}s`,
          backgroundImage: `url("${src}")`,
        }}
      />
      <figcaption>
        {titulo}
        <span>
          {frames} frames a {fps} fps
        </span>
      </figcaption>
    </figure>
  );
}
