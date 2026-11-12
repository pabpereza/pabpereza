// Luz de fondo que sigue al scroll. En cada página nueva se elige al azar
// por qué lado sale (izquierda o derecha), siempre cerca de una esquina de
// arriba y con algo de variación, y cruza en diagonal hasta la esquina de
// abajo del lado contrario. En páginas largas hace zigzag: va y vuelve de un
// lado a otro mientras baja, para que el movimiento se note más.
//
// Este módulo solo calcula la posición y la deja en dos variables CSS en
// <html> (--ppz-lx y --ppz-ly, en % de la ventana), como mucho una vez por
// fotograma. El dibujo está en custom.css: la luz (body::before) y los
// destellos de los bordes usan las mismas variables.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Zonas de las esquinas, en % de la ventana
const SIDE_X = [10, 22]; // distancia al borde de su lado (izquierdo o derecho)
const TOP_Y = [12, 26];
const BOTTOM_Y = [74, 88];
const MID_JITTER = [-5, 5]; // variación de altura en los giros del zigzag
// Pantallas de altura por cada tramo del zigzag, y tope de tramos
const SCREENS_PER_LEG = 3;
const MAX_LEGS = 4;

let plan = null; // lo aleatorio de la página (se sortea una vez)
let path = null; // puntos {x, y} del recorrido
let queued = false;

const rand = ([min, max]) => min + Math.random() * (max - min);

// Sorteo de la página: lado de salida y la variación de cada punto
function newPlan() {
  return {
    side: Math.random() < 0.5 ? 0 : 1, // 0 = izquierda, 1 = derecha
    top: rand(TOP_Y),
    bottom: rand(BOTTOM_Y),
    xs: Array.from({length: MAX_LEGS + 1}, () => rand(SIDE_X)),
    dy: Array.from({length: MAX_LEGS + 1}, () => rand(MID_JITTER)),
  };
}

// El número de tramos depende de la altura de la página; lo demás, del sorteo
function buildPath() {
  const doc = document.documentElement;
  const screens = doc.scrollHeight / Math.max(window.innerHeight, 1);
  const legs = Math.min(MAX_LEGS, Math.max(1, Math.round(screens / SCREENS_PER_LEG)));
  const {top, bottom, xs, dy} = plan;
  let side = plan.side;
  path = [];
  for (let i = 0; i <= legs; i += 1) {
    const base = top + ((bottom - top) * i) / legs;
    const y = i === 0 || i === legs ? base : base + dy[i];
    path.push({x: side === 0 ? xs[i] : 100 - xs[i], y});
    side = 1 - side;
  }
}

// Suavizado en cada tramo: sale y llega despacio a cada esquina
const ease = (t) => t * t * (3 - 2 * t);

function paint() {
  queued = false;
  if (!plan) plan = newPlan();
  if (!path) buildPath();
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  const legs = path.length - 1;
  const at = progress * legs;
  const leg = Math.min(legs - 1, Math.floor(at));
  const t = ease(at - leg);
  const a = path[leg];
  const b = path[leg + 1];
  doc.style.setProperty('--ppz-lx', `${(a.x + (b.x - a.x) * t).toFixed(2)}%`);
  doc.style.setProperty('--ppz-ly', `${(a.y + (b.y - a.y) * t).toFixed(2)}%`);
}

function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(paint);
}

// Página nueva: sorteo nuevo. Los tramos se recalculan un poco después, cuando
// la página ya tiene su altura final (imágenes y bloques que cargan tarde),
// sin cambiar el lado ni las posiciones sorteadas
function restart() {
  plan = newPlan();
  path = null;
  queue();
  window.setTimeout(() => {
    buildPath();
    queue();
  }, 600);
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('scroll', queue, {passive: true});
  window.addEventListener('resize', () => {
    path = null;
    queue();
  });
  restart();
}

export function onRouteDidUpdate({location, previousLocation}) {
  if (!ExecutionEnvironment.canUseDOM) return;
  // Solo al cambiar de página, no al saltar a un ancla de la misma
  if (previousLocation && previousLocation.pathname === location.pathname) return;
  restart();
}
