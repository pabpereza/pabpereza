import Stagger from '@site/src/components/Stagger';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import Courses from '@site/src/components/Courses';
import LatestVideos from '@site/src/components/LatestVideos';
import LatestPosts from '@site/src/components/LatestPosts';
import SocialIconsRow from '@site/src/components/Social';
import useChannelMetrics from '@site/src/hooks/useChannelMetrics';
import styles from './index.module.css';

function Typed({text}) {
  return (
    <em className={styles.typed}>
      <span className="ppz-sr">{text}</span>
      <span aria-hidden="true">
        {[...text].map((char, i) => (
          <span key={i} className={styles.letter} style={{'--i': i}}>{char}</span>
        ))}
      </span>
    </em>
  );
}

function Hero() {
  const metrics = useChannelMetrics();
  return (
    <header className="ppz-hero ppz-glow">
      <div className="container">
        <h1>Aprende DevOps, Seguridad, Cloud e IA <Typed text="cacharreando" /></h1>
        <p className="ppz-lead">
          Cursos gratuitos de Docker, Kubernetes y Ansible, en vídeo y por escrito.
          Todo el contenido del canal, ordenado y en español.
        </p>
        <div className="ppz-actions">
          <Link className="button button--primary button--lg" to="/docs/cursos">
            Empezar un curso
          </Link>
          <a
            className="button button--secondary button--outline button--lg"
            href="https://www.youtube.com/@Pabpereza?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver el canal · {metrics.subscribers}
          </a>
        </div>
      </div>
    </header>
  );
}

function Community() {
  return (
    <section className="ppz-section">
      <div className="container">
        <div className="ppz-section__head">
          <h2>Comunidad</h2>
          <Link className="ppz-more" to="/comunidad">Cómo funciona →</Link>
        </div>
        <Stagger className="ppz-grid ppz-grid--3">
          <a className="ppz-card" href="/discord" target="_blank" rel="noopener noreferrer">
            <h3>Discord Sudoers</h3>
            <p>Servidor abierto para resolver dudas y hablar de DevOps, seguridad, cloud, sysadmin, homelab e IA con más gente del gremio.</p>
            <span className="ppz-cta">Entrar al Discord →</span>
          </a>
          <Link className="ppz-card" to="/comunidad#membresia">
            <h3>Membresía de YouTube</h3>
            <p>Tres niveles para apoyar el canal: acceso anticipado, el research y el diario de cada vídeo, y el directo mensual.</p>
            <span className="ppz-cta">Ver los niveles →</span>
          </Link>
        </Stagger>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Cursos de DevOps, Docker, Kubernetes y seguridad en español"
      description="Cursos gratuitos de Docker, Kubernetes, Ansible, DevOps y DevSecOps en español, con vídeo y documentación escrita. Blog y comunidad de pabpereza.">
      <Hero />
      <main>
        <LatestVideos />
        <Courses />
        <LatestPosts />
        <Community />
        <SocialIconsRow />
      </main>
    </Layout>
  );
}
