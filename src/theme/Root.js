import React from 'react';
import CookieConsent from '@site/src/components/CookieConsent';

// Envoltorio de toda la web: añade el aviso de cookies a todas las páginas
export default function Root({children}) {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}
