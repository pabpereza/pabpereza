import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';

import CountUp from '@site/src/components/CountUp';
import Portal from '@site/src/components/Portal';
import Timeline from '@site/src/components/Timeline';
import SocialIconsRow from '@site/src/components/Social';
import useChannelMetrics from '@site/src/hooks/useChannelMetrics';
import styles from './about_me.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/pabpereza/';
const CONTACT_EMAIL = 'contact@pabpereza.dev';

const timeline = [
  {icon: 'code', title: 'Desarrollo web', text: 'Empecé en el mundillo programando webs.'},
  {icon: 'unlock', title: 'Hacking ético', text: 'Me cambié a la seguridad ofensiva: auditar y romper cosas, con permiso.'},
  {icon: 'box', title: 'Contenedores y DevOps', text: 'Los contenedores me enamoraron y por ahí descubrí la parte de operaciones.'},
  {icon: 'shield', title: 'DevSecOps', text: 'Sin decantarme por ninguna opción, aproveché todo el cóctel para dedicarme a donde se juntan mis pasiones.'},
];

function Stats() {
  const metrics = useChannelMetrics();
  const {chapters} = usePluginData('course-stats');
  const totalChapters = Object.values(chapters).reduce((sum, n) => sum + n, 0);
  const stats = [
    [metrics.subscribers, 'suscriptores'],
    [metrics.videos, 'vídeos'],
    [metrics.views, 'visualizaciones'],
    [totalChapters, 'capítulos de curso'],
  ];
  return (
    <dl className={styles.stats}>
      {stats.map(([value, label]) => (
        <div key={label}>
          <dt><CountUp value={value} /></dt>
          <dd>{label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function AboutMe() {
  return (
    <Layout
      title="Sobre mí - Pablo Pérez-Aradros, DevSecOps y divulgación"
      description="Quién es Pablo Pérez-Aradros (pabpereza), especialista en ciberseguridad y DevSecOps y divulgador de DevOps, Docker y Kubernetes en español.">
      <main>
        <section className="ppz-section ppz-glow">
          <div className={`container ${styles.split}`}>
            <Portal
              variant="profile"
              src="/img/perfil-2024-transparent.png"
              alt="Pablo Pérez-Aradros asomando por un portal"
              width="978"
              height="771"
            />
            <div>
              <p className="ppz-eyebrow">Sobre mí</p>
              <h1 className={styles.name}>Pablo Pérez-Aradros</h1>
              <p className={styles.tagline}>Divulgador y eterno aprendiz</p>
              <p>
                Soy especialista en ciberseguridad y me dedico al DevSecOps, es decir, a meter
                la seguridad dentro del proceso de desarrollo. Parte de mi tiempo va a la
                divulgación, en mi canal de YouTube y en esta web.
              </p>
              <blockquote className={styles.quote}>
                <p>«Si quieres dominar algo, enséñalo»</p>
                <cite>Richard P. Feynman</cite>
              </blockquote>
              <Stats />
            </div>
          </div>
        </section>

        <section className="ppz-section">
          <div className={`container ${styles.split} ${styles.splitReverse}`}>
            <div>
              <h2>Cómo he llegado hasta aquí tras más de 10 años</h2>
              <Timeline steps={timeline} />
              <p>
                Es un nicho que no para de cambiar y obliga a formarse e investigar todo el
                rato, un reto que disfruto y agradezco. Nada como aprender y cacharrear con
                tecnologías nuevas.
              </p>
            </div>
            <Portal
              variant="tech"
              src="/img/portal_tech.png"
              alt="Logos de Docker, Kubernetes, Linux, Python y otras tecnologías saliendo de un portal"
              width="650"
              height="660"
            />
          </div>
        </section>

        <section className="ppz-section">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Qué hago ahora</h2>
            </div>
            <div className="ppz-grid">
              <a className="ppz-card ppz-card--reveal" href="https://www.youtube.com/@Pabpereza" target="_blank" rel="noopener noreferrer">
                <h3>Canal de YouTube</h3>
                <p>Vídeos de DevOps, contenedores, seguridad e IA aplicada, con su versión escrita en esta web.</p>
                <span className="ppz-card__action">Ir al canal →</span>
              </a>
              <Link className="ppz-card ppz-card--reveal" to="/docs/cursos">
                <h3>Cursos gratuitos</h3>
                <p>Docker, Kubernetes, Ansible y más, de cero a producción y abiertos en GitHub.</p>
                <span className="ppz-card__action">Ver los cursos →</span>
              </Link>
              <a className="ppz-card ppz-card--reveal" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <h3>Seguridad en banca</h3>
                <p>Trabajo en el equipo CISO de Banco Santander (CIB). El detalle de mi carrera está en LinkedIn.</p>
                <span className="ppz-card__action">Ver mi LinkedIn →</span>
              </a>
              <a className="ppz-card ppz-card--reveal" href="#contacto">
                <h3>Formación a empresas</h3>
                <p>Formaciones para equipos técnicos sobre contenedores, DevOps y seguridad.</p>
                <span className="ppz-card__action">Contactar →</span>
              </a>
            </div>
          </div>
        </section>

        <section className="ppz-section" id="contacto">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Trabaja conmigo</h2>
            </div>
            <p className="ppz-section__intro">
              Para formaciones, patrocinios y otros trabajos, escríbeme
              a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <div className="ppz-grid ppz-grid--3">
              <a className="ppz-card" href="https://mediakit.pabpereza.dev" target="_blank" rel="noopener noreferrer">
                <h3>Patrocinios</h3>
                <p>Audiencia, métricas y formatos disponibles para marcas que encajen con el canal.</p>
                <span className="ppz-cta">Ver el media kit →</span>
              </a>
              <a className="ppz-card" href={`mailto:${CONTACT_EMAIL}`}>
                <h3>Formación a empresas</h3>
                <p>Cuéntame qué necesita tu equipo y vemos el temario y el formato.</p>
                <span className="ppz-cta">{CONTACT_EMAIL} →</span>
              </a>
              <Link className="ppz-card" to="/comunidad">
                <h3>Dudas y charla</h3>
                <p>Para preguntas técnicas, lo más rápido es el Discord de la comunidad.</p>
                <span className="ppz-cta">Ir a la comunidad →</span>
              </Link>
            </div>
          </div>
        </section>

        <SocialIconsRow />
      </main>
    </Layout>
  );
}
