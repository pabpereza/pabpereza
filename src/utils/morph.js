// Transiciones de vista (View Transitions API) para los botones de plegar los
// laterales: la pastilla larga se encoge hasta el botón redondo flotante, y
// al desplegar, al revés. El navegador hace la animación entre el antes y el
// después; los nombres que emparejan los dos botones y la forma de la
// animación están en custom.css (view-transition-name: ppz-*-toggle).
//
// Sin soporte (Firefox, por ahora) o con «reducir movimiento», el cambio es
// instantáneo, como antes.

export function canMorph() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    // Con la pestaña en segundo plano el navegador no pinta y la transición
    // se quedaría esperando: ahí el cambio va directo
    document.visibilityState === 'visible' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// `update` cambia el DOM (de forma síncrona o devolviendo una promesa).
// Devuelve la transición, o null si el cambio se hizo directo.
// Red de seguridad: si el navegador no llega a arrancar la transición (no
// está pintando la página), a los 400 ms se salta y el cambio se aplica igual
export function morph(update) {
  if (!canMorph()) {
    update();
    return null;
  }
  let started = false;
  const transition = document.startViewTransition(() => {
    started = true;
    return update();
  });
  window.setTimeout(() => {
    if (!started) transition.skipTransition();
  }, 400);
  // Un salto no es un error: que no salga como promesa rechazada en consola
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
  return transition;
}
