// En las páginas de menú ancho (cursos y blog), al bajar un poco la píldora
// se separa en dos burbujas, como una gota que se parte: el centro se
// estrecha hasta un cuello, el cuello se rompe y cada mitad se recoge hasta su
// grupo (izquierda: logo y enlaces; derecha: YouTube, GitHub, tema y
// buscador). Al volver arriba, las dos burbujas se estiran y se funden.
//
// Unida, la píldora es la de siempre (.navbar__inner::before, una sola capa).
// Mientras se parte o está partida, el cristal es una sola capa con la forma
// recortada (clip-path con un trazado) y un SVG encima dibuja su borde y su
// destello con el mismo trazado. El trazado se calcula aquí, fotograma a
// fotograma, a partir de tres valores: dónde acaba la burbuja izquierda (a),
// dónde empieza la derecha (b) y cuánto se ha estrechado el cuello (p, de 0 a
// 1). Unida: a = b = mitad y p = 0, que es la píldora entera.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const DESKTOP = '(min-width: 997px)';
// Histéresis: se parte al pasar de 120px y se une al volver por debajo de 60px
const SPLIT_AT = 120;
const JOIN_AT = 60;
const DURATION = 750;
const SVG_NS = 'http://www.w3.org/2000/svg';
const K = 0.5523; // curva de Bézier que aproxima un cuarto de círculo

let state = null; // {a, b, p} actual
let split = false;
let anim = 0;
let queued = false;

const inner = () => document.querySelector('.navbar__inner');

// Píldora completa entre x0 y x1, y entre y0 e y1
function pillPath(x0, x1, y0, y1) {
  const r = (y1 - y0) / 2;
  const kr = K * r;
  const cy = y0 + r;
  const f = (n) => n.toFixed(2);
  return [
    `M ${f(x0 + r)} ${f(y0)}`,
    `L ${f(x1 - r)} ${f(y0)}`,
    `C ${f(x1 - r + kr)} ${f(y0)} ${f(x1)} ${f(cy - kr)} ${f(x1)} ${f(cy)}`,
    `C ${f(x1)} ${f(cy + kr)} ${f(x1 - r + kr)} ${f(y1)} ${f(x1 - r)} ${f(y1)}`,
    `L ${f(x0 + r)} ${f(y1)}`,
    `C ${f(x0 + r - kr)} ${f(y1)} ${f(x0)} ${f(cy + kr)} ${f(x0)} ${f(cy)}`,
    `C ${f(x0)} ${f(cy - kr)} ${f(x0 + r - kr)} ${f(y0)} ${f(x0 + r)} ${f(y0)}`,
    'Z',
  ].join(' ');
}

// Contorno de la píldora con el cuello en el centro (ver cabecera). Con el
// cuello ya roto (p = 1) son dos píldoras sueltas: si no, el borde dibujaría
// el cuello de grosor cero como una línea fina entre las dos burbujas
// `squash` encoge la altura de las dos burbujas sueltas (px por arriba y por
// abajo): el temblor de gota al soltarse
function shapePath(W, H, a, b, p, squash = 0) {
  if (p >= 0.999) {
    return `${pillPath(0, a, squash, H - squash)} ${pillPath(b, W, squash, H - squash)}`;
  }
  const r = H / 2;
  const kr = K * r;
  const rp = r * p;
  const kp = K * rp;
  const f = (n) => n.toFixed(2);
  return [
    `M ${f(r)} 0`,
    `L ${f(a - rp)} 0`,
    `C ${f(a - rp + kp)} 0 ${f(a)} ${f(rp - kp)} ${f(a)} ${f(rp)}`,
    `L ${f(b)} ${f(rp)}`,
    `C ${f(b)} ${f(rp - kp)} ${f(b + rp - kp)} 0 ${f(b + rp)} 0`,
    `L ${f(W - r)} 0`,
    `C ${f(W - r + kr)} 0 ${f(W)} ${f(r - kr)} ${f(W)} ${f(r)}`,
    `C ${f(W)} ${f(r + kr)} ${f(W - r + kr)} ${f(H)} ${f(W - r)} ${f(H)}`,
    `L ${f(b + rp)} ${f(H)}`,
    `C ${f(b + rp - kp)} ${f(H)} ${f(b)} ${f(H - rp + kp)} ${f(b)} ${f(H - rp)}`,
    `L ${f(a)} ${f(H - rp)}`,
    `C ${f(a)} ${f(H - rp + kp)} ${f(a - rp + kp)} ${f(H)} ${f(a - rp)} ${f(H)}`,
    `L ${f(r)} ${f(H)}`,
    `C ${f(r - kr)} ${f(H)} 0 ${f(r + kr)} 0 ${f(r)}`,
    `C 0 ${f(r - kr)} ${f(r - kr)} 0 ${f(r)} 0`,
    'Z',
  ].join(' ');
}

// Las capas: la sombra, el cristal recortado y el SVG del borde y el
// destello. Van al principio de la píldora, por debajo de la pastilla de los
// enlaces y del texto. La sombra es la misma forma, desenfocada, desplazada
// hacia abajo y enmascarada para que solo se vea por fuera: el cristal es
// translúcido y, si no, la sombra lo oscurecería por dentro
function ensureLayers(container) {
  let glass = container.querySelector(':scope > .ppz-nav-glass');
  if (glass) return glass;
  const shadow = document.createElementNS(SVG_NS, 'svg');
  shadow.setAttribute('class', 'ppz-nav-shadow');
  shadow.setAttribute('aria-hidden', 'true');
  shadow.innerHTML =
    '<defs>' +
    '<filter id="ppz-nav-shadow-blur" x="-20%" y="-200%" width="140%" height="500%">' +
    '<feGaussianBlur stdDeviation="11"/></filter>' +
    '<mask id="ppz-nav-shadow-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="4000" height="400">' +
    '<rect x="-200" y="-200" width="4000" height="400" fill="white"/>' +
    '<path class="ppz-nav-shadow-cut" fill="black"/></mask>' +
    '</defs>' +
    '<g mask="url(#ppz-nav-shadow-mask)">' +
    '<path class="ppz-nav-shadow-shape" transform="translate(0 10)" filter="url(#ppz-nav-shadow-blur)"/>' +
    '</g>';
  glass = document.createElement('span');
  glass.className = 'ppz-nav-glass';
  glass.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'ppz-nav-outline');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML =
    '<defs><radialGradient id="ppz-nav-glare" gradientUnits="userSpaceOnUse" r="672">' +
    '<stop offset="0" class="ppz-nav-glare-stop"/>' +
    '<stop offset="0.55" stop-opacity="0" class="ppz-nav-glare-stop"/>' +
    '</radialGradient></defs>' +
    '<path class="ppz-nav-outline-line"/><path class="ppz-nav-outline-glare"/>';
  container.prepend(svg);
  container.prepend(glass);
  container.prepend(shadow);
  return glass;
}

function geometry(container) {
  const box = container.getBoundingClientRect();
  const pad = parseFloat(getComputedStyle(container).paddingLeft) || 0;
  const left = container.querySelector('.navbar__items:not(.navbar__items--right)');
  const right = container.querySelector('.navbar__items--right');
  if (!left || !right) return null;
  const leftEnd = Math.max(...[...left.children].map((el) => el.getBoundingClientRect().right));
  const rightStart = Math.min(...[...right.children].map((el) => el.getBoundingClientRect().left));
  return {
    box,
    W: box.width,
    H: box.height,
    joined: {a: box.width / 2, b: box.width / 2, p: 0},
    apart: {a: leftEnd - box.left + pad, b: rightStart - box.left - pad, p: 1},
  };
}

// Destello: el mismo foco de luz del fondo (custom.css), en coordenadas de
// la píldora
function placeGlare(container, box) {
  const root = document.documentElement;
  const lx = parseFloat(root.style.getPropertyValue('--ppz-lx')) || 15;
  const ly = parseFloat(root.style.getPropertyValue('--ppz-ly')) || 20;
  const grad = container.querySelector('#ppz-nav-glare');
  if (!grad) return;
  grad.setAttribute('cx', ((lx / 100) * window.innerWidth - box.left).toFixed(1));
  grad.setAttribute('cy', ((ly / 100) * window.innerHeight - box.top).toFixed(1));
}

function draw(container, geo, s) {
  const d = shapePath(geo.W, geo.H, s.a, s.b, s.p, s.squash || 0);
  container.querySelector('.ppz-nav-glass').style.clipPath = `path("${d}")`;
  container.querySelectorAll('.ppz-nav-outline, .ppz-nav-shadow').forEach((svg) => {
    svg.setAttribute('viewBox', `0 0 ${geo.W} ${geo.H}`);
    svg.querySelectorAll('path').forEach((path) => path.setAttribute('d', d));
  });
  placeGlare(container, geo.box);
}

// Curvas: el cuello se cierra en la primera parte del movimiento y las
// burbujas se recogen sin pasarse (si no, pisarían el texto). El rebote de
// gota es vertical: al soltarse, cada burbuja se aplasta un poco y recupera
// su forma con un par de oscilaciones que se apagan
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const easeOutCubic = (t) => 1 - (1 - t) ** 3;
const lerp = (x, y, t) => x + (y - x) * t;
const SQUASH = 3; // px por arriba y por abajo en el primer aplastamiento
const wobble = (u) => SQUASH * Math.sin(u * Math.PI * 2.5) * (1 - u) ** 2;

function animateTo(container, geo, target, onDone) {
  cancelAnimationFrame(anim);
  const from = state || geo.joined;
  const start = performance.now();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = (now) => {
    const t = reduce ? 1 : Math.min(1, (now - start) / DURATION);
    // Al partir, el cuello termina de cerrarse al 60 %; al unir, se abre al final
    const tp = target.p > from.p ? Math.min(1, t / 0.6) : Math.max(0, (t - 0.4) / 0.6);
    const splitting = target.p > from.p;
    const ease = splitting ? easeOutCubic : easeInOut;
    // Temblor vertical desde que se rompe el cuello (60 %) hasta el final
    const squash = splitting && t > 0.6 ? Math.abs(wobble((t - 0.6) / 0.4)) : 0;
    state = {
      a: lerp(from.a, target.a, ease(t)),
      b: lerp(from.b, target.b, ease(t)),
      p: lerp(from.p, target.p, easeInOut(tp)),
      squash,
    };
    draw(container, geo, state);
    if (t < 1) {
      anim = requestAnimationFrame(step);
    } else {
      anim = 0;
      onDone?.();
    }
  };
  anim = requestAnimationFrame(step);
}

function setSplit(container, next) {
  const geo = geometry(container);
  if (!geo) return;
  split = next;
  ensureLayers(container);
  if (next) {
    if (!state) state = geo.joined;
    draw(container, geo, state);
    container.classList.add('ppz-split-active');
    animateTo(container, geo, geo.apart);
  } else {
    animateTo(container, geo, geo.joined, () => {
      // Ya unida: vuelve la píldora de siempre (con su sombra) y se ocultan
      // las capas, salvo que mientras tanto se haya vuelto a partir
      if (!split) {
        container.classList.remove('ppz-split-active');
        state = null;
      }
    });
  }
}

function update() {
  queued = false;
  const container = inner();
  const root = document.documentElement;
  if (!container) return;
  const allowed = window.matchMedia(DESKTOP).matches && root.dataset.ppzNav === 'wide';
  const y = window.scrollY;
  if (allowed && !split && y > SPLIT_AT) setSplit(container, true);
  else if (split && (!allowed || y < JOIN_AT)) setSplit(container, false);
  else if (split && !anim) {
    // Partida y quieta: el destello sigue a la luz del fondo
    placeGlare(container, container.getBoundingClientRect());
  }
}

function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
}

function reset() {
  // Menú nuevo (al navegar) o ventana con otro tamaño: se recoloca sin animar
  cancelAnimationFrame(anim);
  anim = 0;
  const container = inner();
  if (!container) return;
  if (split) {
    const geo = geometry(container);
    if (!geo) return;
    ensureLayers(container);
    state = geo.apart;
    container.classList.add('ppz-split-active');
    draw(container, geo, state);
  }
  update();
}

if (ExecutionEnvironment.canUseDOM) {
  window.addEventListener('scroll', queue, {passive: true});
  window.addEventListener('resize', reset);
}

export function onRouteDidUpdate() {
  if (!ExecutionEnvironment.canUseDOM) return;
  // La página nueva empieza arriba: se une sin animar si venía partida
  split = false;
  state = null;
  cancelAnimationFrame(anim);
  anim = 0;
  inner()?.classList.remove('ppz-split-active');
  setTimeout(update, 50);
}
