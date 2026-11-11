import Link from '@docusaurus/Link';
import posts from '@generated/latest-posts/default/posts';
import Stagger from '@site/src/components/Stagger';
import styles from './styles.module.css';

const dateFormat = new Intl.DateTimeFormat('es', {day: 'numeric', month: 'long', year: 'numeric'});

export default function LatestPosts() {
  return (
    <section className="ppz-section">
      <div className="container">
        <div className="ppz-section__head">
          <h2>Del blog</h2>
          <Link className="ppz-more" to="/blog">Ver el blog →</Link>
        </div>
        <Stagger className="ppz-grid ppz-grid--3">
          {posts.map(({title, permalink, description, date, image}) => (
            <Link key={permalink} className={`ppz-card ${styles.post}`} to={permalink}>
              <div className={styles.cover}>
                {image ? (
                  <img src={image} alt="" loading="lazy" />
                ) : (
                  // Artículo sin portada: un fondo con el halo del sitio
                  <span className={styles.placeholder} aria-hidden="true">{'>_'}</span>
                )}
              </div>
              <div className={styles.body}>
                <span className="ppz-meta">{dateFormat.format(new Date(date))}</span>
                <h3>{title}</h3>
                <p className={styles.excerpt}>{description}</p>
              </div>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
