import React from 'react';
import NotFound from '@theme-original/NotFound';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NotFoundWrapper(props) {
  const target = useBaseUrl('/404.html');

  return (
    <BrowserOnly fallback={<div>Cargando…</div>}>
      {() => {
        // Esto corre solo en el navegador
        window.location.replace(target);
        return null;
      }}
    </BrowserOnly>
  );
}
