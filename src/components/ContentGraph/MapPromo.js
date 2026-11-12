import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import courses from '@site/src/data/courses';
import ContentGraph from './ContentGraphWrapper';
import styles from './MapPromo.module.css';

// Escaparate del mapa de contenido en el índice de cursos: qué es, cuánto
// abarca y un botón para abrirlo, con el propio mapa (sin interacción) al lado.
export default function MapPromo() {
  const {graph} = usePluginData('course-stats');
  const stats = [
    [graph.pages, 'páginas'],
    [graph.links, 'enlaces entre ellas'],
    [courses.length, 'cursos y el blog'],
  ];

  return (
    <div className={`ppz-glare ${styles.box}`}>
      <div className={styles.text}>
        <p className={styles.lead}>
          Cada punto es una página y cada línea, un enlace entre dos. Sirve para ver de un vistazo
          qué temas se tocan entre sí y saltar de un curso a otro por donde se cruzan.
        </p>
        <dl className={styles.stats}>
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
        <Link className="button button--primary" to="/content-graph">
          Explorar el mapa →
        </Link>
      </div>
      <Link className={styles.preview} to="/content-graph" aria-label="Abrir el mapa de contenido" tabIndex={-1}>
        <ContentGraph preview />
      </Link>
    </div>
  );
}
