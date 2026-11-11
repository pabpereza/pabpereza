import Stagger from '@site/src/components/Stagger';
import Layout from '@theme/Layout';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import styles from './comunidad.module.css';

const DISCORD_URL = '/discord';
const JOIN_URL = 'https://www.youtube.com/@pabpereza/join';

const channels = ['#dudas', '#devops', '#seguridad', '#cloud', '#sysadmin', '#homelab', '#ia-y-agentes', '#empleo-y-carrera'];

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

// Conversación inventada, con nombres genéricos, para enseñar de un vistazo
// el tono del servidor. No reproduce mensajes de miembros reales.
const chat = [
  {
    user: 'kube_novata',
    color: '#f59e0b',
    text: '¿Habéis visto la nueva tecnología que ha salido esta semana? 👀',
  },
  {
    user: 'sre_de_guardia',
    color: '#38bdf8',
    text: 'Sí, la tengo ya en el homelab. Promete, pero yo esperaría a la 1.0 antes de tocar nada serio.',
  },
  {
    user: 'dev_cacharrero',
    color: '#a78bfa',
    text: 'Yo la he puesto en producción esta mañana. ¿Qué puede salir mal? 🔥',
    reaction: '😂 5',
  },
];

function Chat() {
  return (
    <figure className={styles.chat}>
      <div className={styles.chatHead}>
        <span className={styles.hashStatic}>#</span> general
      </div>
      {chat.map(({user, color, text, reaction}, i) => (
        <div key={i} className={styles.msg} style={{'--i': i}}>
          <span className={styles.avatar} style={{background: color}} aria-hidden="true">
            {user[0].toUpperCase()}
          </span>
          <div>
            <strong>{user}</strong>
            <p>{text}</p>
            {reaction && <span className={styles.reaction}>{reaction}</span>}
          </div>
        </div>
      ))}
      <figcaption>Conversación de ejemplo</figcaption>
    </figure>
  );
}

export default function Comunidad() {
  // La home enlaza a /comunidad#membresia y Docusaurus valida los anclajes
  useBrokenLinks().collectAnchor('membresia');
  return (
    <Layout
      title="Comunidad - Discord Sudoers y membresía de YouTube"
      description="Únete a Sudoers by pabpereza, el Discord abierto del canal sobre DevOps, seguridad y homelab, y conoce los tres niveles de la membresía de YouTube.">
      <header className="ppz-hero ppz-glow">
        <div className="container">
          <p className="ppz-eyebrow">Sudoers by pabpereza</p>
          <h1>La comunidad del canal</h1>
          <p className="ppz-lead">
            Un Discord abierto para hablar de DevOps, seguridad, cloud y homelab, y una membresía
            de YouTube para quien quiera apoyar el canal y ver cómo se hace por dentro.
          </p>
          <div className="ppz-actions">
            <a className="button button--primary button--lg" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Entrar al Discord
            </a>
            <a className="button button--secondary button--outline button--lg" href="#membresia">
              Ver la membresía
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="ppz-section">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Discord, abierto a todo el mundo</h2>
            </div>
            <p className="ppz-section__intro">
              No hace falta ser miembro para entrar. Preséntate, pregunta lo que se te haya
              atascado o enseña lo que has montado. Estos son algunos de los canales.
            </p>
            <div className={styles.discordRow}>
              <Stagger className={styles.channels}>
                {channels.map((name) => (
                  <a
                    key={name}
                    className={`ppz-card ppz-card--reveal ${styles.channelCard}`}
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className={styles.channel}>
                      <span className={styles.hash}>#</span>
                      {name.slice(1)}
                    </h3>
                    <span className="ppz-card__action">Entrar →</span>
                  </a>
                ))}
              </Stagger>
              <Stagger className={styles.chatWrap}>
                <Chat />
              </Stagger>
            </div>
          </div>
        </section>

        <section className="ppz-section" id="membresia">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Membresía de YouTube</h2>
            </div>
            <p className="ppz-section__intro">
              El contenido del canal y los cursos son y seguirán siendo gratuitos. La membresía
              es la forma de apoyarlo, con tres niveles. Cada uno incluye lo de los anteriores.
            </p>
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
