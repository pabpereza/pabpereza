// Cristal, bloque 3: pastilla que se desliza bajo los enlaces del menú, como
// las pestañas de iOS. Descansa bajo el enlace de la sección actual y, al
// pasar el ratón (o el foco del teclado) por otro, viaja hasta él. Solo en
// escritorio, donde el menú es la píldora flotante (ver custom.css).
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const DESKTOP = '(min-width: 997px)';
const LINKS = 'a.navbar__link:not(.header-github-link)';

let pill = null;
let hovered = null;
let frame = 0;

function inner() {
  return document.querySelector('.navbar__inner');
}

function ensurePill(container) {
  if (pill && pill.parentNode === container) return pill;
  pill = document.createElement('span');
  pill.className = 'ppz-nav-pill';
  pill.setAttribute('aria-hidden', 'true');
  container.appendChild(pill);
  return pill;
}

function activeLink(container) {
  // El desplegable de Cursos se marca con «active» y no con la clase de Infima
  return container.querySelector(`${LINKS}.navbar__link--active, ${LINKS}.active`);
}

function place() {
  const container = inner();
  if (!container) return;
  const el = ensurePill(container);
  const target = (hovered && hovered.isConnected && hovered) || activeLink(container);

  if (!target || !window.matchMedia(DESKTOP).matches) {
    el.dataset.visible = 'false';
    return;
  }

  const box = container.getBoundingClientRect();
  // En el desplegable de Cursos el relleno lo lleva el contenedor
  // (.navbar__item.dropdown) y no el enlace: se mide ese, que incluye el aire
  const rect = (target.closest('.dropdown') || target).getBoundingClientRect();
  const wasHidden = el.dataset.visible !== 'true';

  // La primera vez aparece en su sitio, sin viajar desde la esquina
  if (wasHidden) el.style.transition = 'none';
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
  el.style.transform = `translate(${rect.left - box.left}px, ${rect.top - box.top}px)`;
  if (wasHidden) {
    el.getBoundingClientRect();
    el.style.transition = '';
  }
  el.dataset.visible = 'true';
}

// Mientras la píldora del menú cambia de ancho (al entrar o salir de los
// cursos) los enlaces se mueven: la pastilla los sigue en cada fotograma
function follow() {
  cancelAnimationFrame(frame);
  const start = performance.now();
  const tick = (now) => {
    place();
    if (now - start < 1500) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
}

function onOver(event) {
  const link = event.target.closest?.(LINKS);
  if (!link || !link.closest('.navbar__inner')) return;
  // Dentro del desplegable de Cursos se queda bajo «Cursos»
  if (link === hovered) return;
  hovered = link;
  place();
}

function onLeave(event) {
  const container = inner();
  if (!container || !hovered || !container.contains(event.target)) return;
  if (container.contains(event.relatedTarget)) return;
  hovered = null;
  place();
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('pointerover', onOver);
  document.addEventListener('focusin', onOver);
  document.addEventListener('pointerout', onLeave);
  document.addEventListener('focusout', onLeave);
  window.addEventListener('resize', place);
  document.addEventListener('transitionrun', (event) => {
    if (event.target.classList?.contains('navbar')) follow();
  });
  // En la primera carga React hidrata el menú después de que corra este
  // módulo y puede tirar la pastilla: se vuelve a colocar cuando acaba
  const settle = () => [0, 400, 1200, 3000].forEach((ms) => setTimeout(place, ms));
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle, {once: true});
}

export function onRouteDidUpdate() {
  hovered = null;
  requestAnimationFrame(place);
  follow();
}
