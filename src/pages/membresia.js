import Stagger from '@site/src/components/Stagger';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './membresia.module.css';

const JOIN_URL = 'https://www.youtube.com/@pabpereza/join';

const tiers = [
  {
    name: 'Hacedor de contenedores',
    emoji: '🐳',
    price: '1,99 €',
    summary: 'Para quien quiere echar una mano al canal.',
    perks: [
      'Acceso anticipado a los vídeos nuevos',
      'Insignias de timón y emojis propios',
      'Respuestas por audio a tus comentarios',
      'Prioridad al responder comentarios',
    ],
  },
  {
    name: 'Navegante de Pods',
    emoji: '🚢',
    price: '4,99 €',
    summary: 'Todo lo anterior, más la cocina del canal.',
    perks: [
      'Diario de producción de cada vídeo',
      'Research completo, incluido lo que no entra en el montaje',
      'Versiones sin cortar',
      'Votas el próximo vídeo',
    ],
  },
  {
    name: 'Capitán de Clústeres',
    emoji: '⚓',
    price: '9,99 €',
    summary: 'Todo lo anterior, y además mandas tú.',
    top: true,
    perks: [
      'Eliges el tema y los casos del directo mensual',
      'Contacto directo conmigo',
    ],
  },
];

export default function Membresia() {
  return (
    <Layout
      title="Membresía de YouTube - apoya el canal de pabpereza"
      description="Los tres niveles de la membresía de YouTube del canal de pabpereza. Acceso anticipado, research y diario de cada vídeo, versiones sin cortar y el directo mensual.">
      <header className="ppz-hero ppz-glow">
        <div className="container">
          <p className="ppz-eyebrow">Membresía de YouTube</p>
          <h1>Apoya el canal y míralo por dentro</h1>
          <p className="ppz-lead">
            El contenido del canal y los cursos son y seguirán siendo gratuitos. La membresía es
            la forma de apoyarlo, con tres niveles. Cada uno incluye lo de los anteriores.
          </p>
          <div className="ppz-actions">
            <a className="button button--primary button--lg" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
              Hacerme miembro
            </a>
            <a className="button button--secondary button--outline button--lg" href="#niveles">
              Ver los niveles
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="ppz-section" id="niveles">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Niveles</h2>
            </div>
            <Stagger className="ppz-grid ppz-grid--3 ppz-stagger--stairs">
              {tiers.map(({name, emoji, price, summary, perks, top}) => (
                <div key={name} className={`ppz-card ${top ? styles.top : ''}`}>
                  <h3>{emoji} {name}</h3>
                  <p className={styles.price}>
                    {price} <span>/ mes</span>
                  </p>
                  <p>{summary}</p>
                  <ul>
                    {perks.map((perk) => <li key={perk}>{perk}</li>)}
                  </ul>
                </div>
              ))}
            </Stagger>
            <div className={`ppz-actions ${styles.join}`}>
              <a className="button button--primary button--lg" href={JOIN_URL} target="_blank" rel="noopener noreferrer">
                Hacerme miembro
              </a>
            </div>
          </div>
        </section>

        <section className="ppz-section">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Cómo encaja todo</h2>
            </div>
            <Stagger className="ppz-grid ppz-grid--3">
              <div className="ppz-card">
                <h3>Tu rol en Discord</h3>
                <p>
                  Conecta tu cuenta de YouTube en Discord y el rol de tu nivel se asigna solo.
                  Los pasos están en #bienvenida.
                </p>
              </div>
              <div className="ppz-card">
                <h3>Canales de miembros</h3>
                <p>
                  El diario, el research y las animaciones de cada vídeo se publican en canales
                  del servidor reservados a Navegantes y Capitanes.
                </p>
              </div>
              <div className="ppz-card">
                <h3>Directo mensual</h3>
                <p>
                  Una vez al mes hay directo, público para todo el mundo. El tema y los casos
                  los eligen los Capitanes.
                </p>
              </div>
            </Stagger>
            <p className={styles.discordNote}>
              El Discord está abierto a todo el mundo, seas miembro o no.{' '}
              <Link to="/comunidad">Ver la comunidad →</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
