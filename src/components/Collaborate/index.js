import useChannelMetrics from '@site/src/hooks/useChannelMetrics';
import styles from './styles.module.css';

const GITHUB_URL = 'https://github.com/pabpereza/pabpereza';
const YOUTUBE_URL = 'https://www.youtube.com/@Pabpereza?sub_confirmation=1';

// Bloque del índice de cursos: pide el apoyo (estrella y suscripción) y enseña
// las cifras del canal y del repositorio, que llegan del build.
export default function Collaborate() {
  const {subscribers, videos, views, stars} = useChannelMetrics();
  const stats = [
    [subscribers, 'suscriptores'],
    [views, 'visualizaciones'],
    [videos, 'vídeos'],
    // Las estrellas pueden faltar si la API de GitHub no respondió en el build
    ...(stars ? [[stars, 'estrellas en GitHub']] : []),
  ];

  return (
    <aside className={`ppz-glare ${styles.box}`}>
      <div className={styles.text}>
        <h2 className={styles.title}>Gratis y abierto, gracias a quien lo apoya</h2>
        <p>
          Todos los cursos son gratuitos y su código está en GitHub. Si te sirven, una estrella
          al repositorio y una suscripción al canal son la mejor forma de que sigan saliendo.
        </p>
        <div className={styles.actions}>
          <a className="button button--primary" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            ★ Dar una estrella
          </a>
          <a className="button button--secondary button--outline" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
            Suscribirme al canal
          </a>
        </div>
      </div>
      <dl className={styles.stats}>
        {stats.map(([value, label]) => (
          <div key={label}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
