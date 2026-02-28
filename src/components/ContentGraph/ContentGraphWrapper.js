import React, { Suspense } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const LazyContentGraph = React.lazy(() => import('./ContentGraph.js'));

const ContentGraphWrapper = ({ isFullPage = false }) => {
  return (
    <BrowserOnly fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Cargando diagrama de contenido...</div>}>
      {() => (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Cargando componente...</div>}>
          <LazyContentGraph isFullPage={isFullPage} />
        </Suspense>
      )}
    </BrowserOnly>
  );
};

export default ContentGraphWrapper;
