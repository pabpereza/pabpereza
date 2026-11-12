// Luz de fondo que sigue al scroll: un foco verde cruza la ventana en
// diagonal (de arriba a la izquierda a abajo a la derecha) según el avance.
// Este módulo solo actualiza la variable CSS --ppz-scroll en <html> (una vez
// por fotograma como mucho); el dibujo
// está en custom.css (body::before).
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let queued = false;

function paint() {
  queued = false;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  document.documentElement.style.setProperty('--ppz-scroll', progress.toFixed(4));
}

function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(paint);
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('scroll', queue, {passive: true});
  window.addEventListener('resize', queue);
  queue();
}

// La página nueva mide otra cosa: se recalcula el avance
export function onRouteDidUpdate() {
  if (ExecutionEnvironment.canUseDOM) queue();
}
