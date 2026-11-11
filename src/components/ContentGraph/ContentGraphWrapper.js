import {lazy, Suspense} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// El mapa dibuja en un <canvas> y pesa lo suyo: solo en el navegador y en
// diferido, para no cargar la librería en páginas que no lo muestran
const LazyContentGraph = lazy(() => import('./ContentGraph.js'));

export default function ContentGraphWrapper(props) {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={null}>
          <LazyContentGraph {...props} />
        </Suspense>
      )}
    </BrowserOnly>
  );
}
