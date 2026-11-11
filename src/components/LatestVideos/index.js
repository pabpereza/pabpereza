import Stagger from '@site/src/components/Stagger';
import videos from '@site/src/files/videos.json';
import styles from './styles.module.css';

// La API de YouTube devuelve los títulos con entidades HTML
const decode = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

const dateFormat = new Intl.DateTimeFormat('es', {day: 'numeric', month: 'long', year: 'numeric'});

export default function LatestVideos() {
  return (
    <section className="ppz-section">
      <div className="container">
        <div className="ppz-section__head">
          <h2>Últimos vídeos</h2>
          <a className="ppz-more" href="https://www.youtube.com/@Pabpereza" target="_blank" rel="noopener noreferrer">
            Ir al canal →
          </a>
        </div>
        <Stagger className={styles.featured}>
          {videos.slice(0, 3).map(({id, snippet}, i) => (
            <a
              key={id.videoId}
              className={`ppz-card ${styles.video} ${i === 0 ? styles.big : styles.small}`}
              href={`https://youtu.be/${id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.thumb}>
                <img
                  src={`https://img.youtube.com/vi/${id.videoId}/maxresdefault.jpg`}
                  alt=""
                  loading="lazy"
                  width="1280"
                  height="720"
                />
              </div>
              <div className={styles.body}>
                <h3>{decode(snippet.title)}</h3>
                <span className="ppz-meta">{dateFormat.format(new Date(snippet.publishedAt))}</span>
              </div>
            </a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
