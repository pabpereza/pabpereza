import {useSyncExternalStore} from 'react';

// Elección del usuario sobre las cookies no técnicas (Analytics y YouTube con
// sesión). La clave tiene que coincidir con la de src/plugins/cookie-consent,
// que aplica la elección guardada antes del primer hit de Analytics.
const STORAGE_KEY = 'pabpereza-cookie-consent';
const CHANGE_EVENT = 'cookie-consent-change';
export const OPEN_EVENT = 'cookie-consent-open';

// 'granted' | 'denied' | null (todavía no ha elegido)
export function getConsent() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

// Borra las cookies de Analytics (_ga, _ga_<ID>) al retirar el consentimiento
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function setConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Sin almacenamiento (modo privado estricto): vale solo para esta página
  }
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {analytics_storage: value});
  }
  if (value === 'denied') clearAnalyticsCookies();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

// Elección actual, reactiva. En el servidor y en la hidratación es undefined
// (aún no se sabe), para no pintar el aviso ni cambiar el vídeo antes de leer
// localStorage.
export function useCookieConsent() {
  return useSyncExternalStore(subscribe, getConsent, () => undefined);
}
