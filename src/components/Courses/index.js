import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import Stagger from '@site/src/components/Stagger';
import courses from '@site/src/data/courses';
import styles from './styles.module.css';

const GITHUB_URL = 'https://github.com/pabpereza/pabpereza/tree/main/docs/cursos';

// Rejilla de tarjetas de cursos. Con `links`, cada tarjeta añade debajo los
// enlaces a su lista de YouTube y a su carpeta en GitHub (índice de cursos).
export function CourseGrid({links = false}) {
  const {chapters} = usePluginData('course-stats');
  const max = Math.max(...courses.map(({id}) => chapters[id] ?? 0));

  return (
    <Stagger className="ppz-grid">
      {courses.map(({id, name, description, tint, playlist}) => (
        <div key={id} className={`ppz-card ppz-card--link ${styles.course}`} style={{'--tint': tint}}>
          <span
            className={styles.logo}
            style={{'--icon': `url('/img/tech/${id}.svg')`}}
            aria-hidden="true"
          />
          <h3>
            {/* El enlace del título cubre toda la tarjeta */}
            <Link className={styles.main} to={`/docs/cursos/${id}`}>{name}</Link>
          </h3>
          <p>{description}</p>
          <div className={styles.progress}>
            <span className={styles.bar}>
              <span style={{width: `${(100 * chapters[id]) / max}%`}} />
            </span>
            <span className="ppz-meta">{chapters[id]} capítulos</span>
          </div>
          {links && (
            <div className={styles.links}>
              {playlist && <a href={playlist} target="_blank" rel="noopener noreferrer">Vídeos</a>}
              <a href={`${GITHUB_URL}/${id}`} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          )}
        </div>
      ))}
    </Stagger>
  );
}

export default function Courses() {
  return (
    <section className="ppz-section">
      <div className="container">
        <div className="ppz-section__head">
          <h2>Cursos gratuitos</h2>
          <Link className="ppz-more" to="/docs/cursos">Ver todos →</Link>
        </div>
        <CourseGrid />
      </div>
    </section>
  );
}
