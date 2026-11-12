// Ancho de la píldora del menú: ancha en los cursos y en el blog (menús
// laterales pegados a los bordes), compacta en el resto.
//
// Al navegar entre el blog y otras páginas, Docusaurus monta un menú nuevo.
// Si el ancho dependiera solo de lo que hay en la página (CSS :has), el menú
// nacería ya con su ancho final y no habría animación. Por eso el ancho se
// marca en <html data-ppz-nav> cuando el router termina de navegar: el menú
// nace con el ancho de la anterior y se estira o encoge hasta el suyo.
// Los cursos también van por aquí: su clase (plugin-docs) cambia en un
// momento distinto y, entre blog y cursos, la píldora encogía y volvía a
// ensancharse.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Se decide por la URL y no por el contenido: cuando avisa el router, la
// página nueva puede no estar pintada todavía. Anchas: los cursos (/docs) y
// las páginas del blog con menú de entradas (todas menos archivo y autores)
function isWide(pathname) {
  if (/^\/docs(\/|$)/.test(pathname)) return true;
  return /^\/blog(\/|$)/.test(pathname) && !/^\/blog\/(archive|authors)(\/|$)/.test(pathname);
}

function mark(pathname) {
  document.documentElement.dataset.ppzNav = isWide(pathname) ? 'wide' : 'compact';
}

// Primera carga: se marca ya, sin animación
if (ExecutionEnvironment.canUseDOM) mark(window.location.pathname);

export function onRouteDidUpdate({location}) {
  if (ExecutionEnvironment.canUseDOM) mark(location.pathname);
}
