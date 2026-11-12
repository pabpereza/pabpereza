// Marca en <html data-toc-hidden> si el usuario tiene plegada la columna del
// índice (la elección la guarda src/theme/TOC en localStorage). El índice lo
// marca él mismo al montarse, pero las páginas sin índice (los listados del
// blog) también lo necesitan desde la carga, para colocar el contenido igual
// que en un artículo (ver custom.css, sección del blog).
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const STORAGE_KEY = 'ppz-toc-hidden';

function sync() {
  let hidden = false;
  try {
    hidden = localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    // Sin localStorage: desplegado
  }
  document.documentElement.toggleAttribute('data-toc-hidden', hidden);
}

if (ExecutionEnvironment.canUseDOM) sync();

export function onRouteDidUpdate() {
  if (ExecutionEnvironment.canUseDOM) sync();
}
