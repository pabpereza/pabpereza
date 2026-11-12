// Menú izquierdo de los cursos: al plegar, su pastilla («botón de plegar»)
// se encoge hasta el botón redondo flotante de abajo a la izquierda; al
// desplegar, al revés. Ver src/utils/morph.js.
//
// El plegado es del tema (Docusaurus): anima el ancho de la columna y, al
// terminar esa animación (transitionend), cambia el menú por el botón de
// desplegar. Durante una transición de vista la página no se pinta, así que
// esa animación no llegaría a terminar: se intercepta el clic, se pliega la
// columna sin animación de ancho y se le avisa a mano de que ha terminado.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import {canMorph, morph} from '@site/src/utils/morph';

const COLLAPSE = '.theme-doc-sidebar-container [class*="collapseSidebarButton_"]';
const EXPAND = '.theme-doc-sidebar-container [class*="expandButton_"]';

let replaying = false;
let running = false;

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0));

async function waitUntil(check, timeout = 1000) {
  const start = Date.now();
  while (!check() && Date.now() - start < timeout) {
    // eslint-disable-next-line no-await-in-loop
    await nextFrame();
  }
}

const isHidden = (container) => /docSidebarContainerHidden_/.test(container.className);

function onClick(event) {
  if (replaying || running || !canMorph()) return;
  if (!window.matchMedia('(min-width: 997px)').matches) return;
  const button = event.target.closest?.(`${COLLAPSE}, ${EXPAND}`);
  if (!button) return;
  const collapsing = button.matches(COLLAPSE);
  const container = button.closest('.theme-doc-sidebar-container');

  event.preventDefault();
  event.stopPropagation();
  running = true;

  const transition = morph(async () => {
    container.style.transition = 'none';
    replaying = true;
    button.click();
    replaying = false;
    if (collapsing) {
      await waitUntil(() => isHidden(container));
      container.dispatchEvent(new TransitionEvent('transitionend', {bubbles: true, propertyName: 'width'}));
      await waitUntil(() => document.querySelector(EXPAND));
    } else {
      await waitUntil(() => !isHidden(container));
    }
    // Fija el ancho nuevo ya, sin transición, antes de la foto del «después»
    void container.offsetWidth;
  });

  const done = () => {
    container.style.transition = '';
    running = false;
  };
  if (transition) transition.finished.then(done, done);
  else done();
}

if (ExecutionEnvironment.canUseDOM) {
  // En fase de captura, para llegar antes que el manejador del tema
  document.addEventListener('click', onClick, true);
}
