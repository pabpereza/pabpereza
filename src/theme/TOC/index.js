import {useEffect, useRef, useState} from 'react';
import {flushSync} from 'react-dom';
import {morph} from '@site/src/utils/morph';
import TOC from '@theme-original/TOC';
import LocalGraph from '@site/src/components/LocalGraph';
import styles from './styles.module.css';

const STORAGE_KEY = 'ppz-toc-hidden';

// Índice de la página (columna derecha de docs y blog) con el mapa local
// encima y un botón para plegar la columna entera, como el del menú izquierdo.
// El mapa y el índice se quedan fijos arriba al hacer scroll, y el botón, abajo.
//
// El plegado se marca en <html data-toc-hidden> (los estilos que estrechan la
// columna y ensanchan el artículo están en custom.css) y se recuerda entre
// páginas y visitas.
export default function TOCWithLocalGraph(props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      setHidden(localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      // Sin acceso a localStorage (modo privado, etc.): empieza desplegado
    }
  }, []);

  // La primera vez no se toca: <html> ya llega marcado desde la carga
  // (src/clientModules/tocState.js) y el estado inicial (desplegado) aún no
  // ha leído la elección guardada; si no, el artículo daría un salto
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    document.documentElement.toggleAttribute('data-toc-hidden', hidden);
  }, [hidden]);

  // La pastilla se convierte en el botón redondo (y al revés) con una
  // transición de vista: ver src/utils/morph.js
  const toggle = () => {
    const next = !hidden;
    morph(() => {
      flushSync(() => setHidden(next));
      document.documentElement.toggleAttribute('data-toc-hidden', next);
    });
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Se pliega igual; solo no se recuerda
    }
  };

  const label = hidden ? 'Mostrar el índice y el mapa local' : 'Ocultar el índice y el mapa local';

  return (
    <div className={`ppz-toc-column ${styles.column}`}>
      {!hidden && (
        <div className={styles.sticky}>
          <LocalGraph />
          {/* La tarjeta no hace scroll (su destello de borde se quedaría
              atrás); el scroll va dentro */}
          <div className={`ppz-glare ppz-glare--soft ${styles.tocCard}`}>
            <div className={styles.toc}>
              <TOC {...props} />
            </div>
          </div>
        </div>
      )}
      {/* Mismas clases e icono que el botón del menú izquierdo, para que sean idénticos */}
      <button
        type="button"
        className={`button button--secondary button--outline ppz-glare ppz-glare--soft ${styles.toggle}`}
        onClick={toggle}
        aria-label={label}
        title={label}
        aria-expanded={!hidden}
      >
        <svg width="20" height="20" aria-hidden="true" className={hidden ? styles.iconHidden : undefined}>
          <g fill="#7a7a7a">
            <path d="M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0" />
            <path d="M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0" />
          </g>
        </svg>
      </button>
    </div>
  );
}
