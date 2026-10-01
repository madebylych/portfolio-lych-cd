/**
 * El latido de la página: un pulso cada 2,6 s (o cuando alguien llama a
 * `emitirLatido()`). La interfaz lo recibe como la variable CSS
 * --latido (decae de 1 a 0) y como evento para quien quiera escucharlo.
 */
const oyentes = new Set();
let valor = 0;
let ultimo = 0;

export function emitirLatido() {
  valor = 1;
  oyentes.forEach((fn) => fn());
}

export function latidoActual() {
  return valor;
}

export function alLatir(fn) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}

function decaer(t) {
  const dt = Math.min((t - ultimo) / 1000, 0.1);
  ultimo = t;
  valor = Math.max(0, valor - dt * 2.4);
  document.documentElement.style.setProperty("--latido", valor.toFixed(3));
  requestAnimationFrame(decaer);
}

if (typeof window !== "undefined") {
  requestAnimationFrame(decaer);
  // el pulso propio de la página: un latido cada 2,6 s (nada si se pidió menos movimiento)
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(emitirLatido, 2600);
}
