// Consentimiento de cookies con el CMP de Google (AdSense, "Privacidad y
// mensajes"). Este plugin tiene que ir en `plugins` ANTES que
// @docusaurus/plugin-google-gtag: Docusaurus inyecta las etiquetas del head en
// el orden de los plugins, y el modo de consentimiento debe fijarse antes de
// que gtag haga su primer `config`.
//
// - Modo de consentimiento v2: todo denegado por defecto. Analytics funciona
//   sin cookies hasta que el CMP actualiza el estado tras la elección del
//   usuario (opción "modo de consentimiento" del mensaje en AdSense).
// - Script de AdSense: carga los anuncios y el banner del CMP.
module.exports = function googleConsentPlugin(context, {adsenseClient}) {
  return {
    name: 'google-consent',
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
              "  analytics_storage: 'denied',",
              '  wait_for_update: 500',
              '});',
            ].join('\n'),
          },
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`,
              crossorigin: 'anonymous',
            },
          },
        ],
      };
    },
  };
};
