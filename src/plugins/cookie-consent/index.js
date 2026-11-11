// Modo de consentimiento v2 de Google para Analytics. Este plugin tiene que ir
// en `plugins` ANTES que @docusaurus/plugin-google-gtag: Docusaurus inyecta
// las etiquetas del head en el orden de los plugins, y el consentimiento debe
// fijarse antes de que gtag haga su primer `config`.
//
// - Todo denegado por defecto: Analytics funciona sin cookies.
// - Si el usuario ya aceptó en el aviso propio (src/components/CookieConsent),
//   su elección está en localStorage y se aplica aquí mismo, antes del primer
//   hit. La web no lleva publicidad: las señales de anuncios nunca se activan.
//
// La clave de localStorage tiene que coincidir con la de
// src/components/CookieConsent/consent.js.
const STORAGE_KEY = 'pabpereza-cookie-consent';

module.exports = function cookieConsentPlugin() {
  return {
    name: 'cookie-consent',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: [
              'window.dataLayer = window.dataLayer || [];',
              'function gtag(){dataLayer.push(arguments);}',
              "gtag('consent', 'default', {",
              "  ad_storage: 'denied',",
              "  ad_user_data: 'denied',",
              "  ad_personalization: 'denied',",
              "  analytics_storage: 'denied'",
              '});',
              'try {',
              `  if (localStorage.getItem('${STORAGE_KEY}') === 'granted') {`,
              "    gtag('consent', 'update', {analytics_storage: 'granted'});",
              '  }',
              '} catch (e) {}',
            ].join('\n'),
          },
        ],
      };
    },
  };
};
