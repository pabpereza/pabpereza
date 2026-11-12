import Stagger from '@site/src/components/Stagger';
import Layout from '@theme/Layout';
import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import styles from './comunidad.module.css';

const DISCORD_URL = '/discord';
const DISCORD_INVITE = 'CpHVzDAaBW';

const channels = ['#dudas', '#devops', '#seguridad', '#cloud', '#sysadmin', '#homelab', '#ia-y-agentes', '#empleo-y-carrera'];


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
    <figure className={`ppz-glare ${styles.chat}`}>
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

// Miembros totales y conectados, de la API pública de invitaciones (sin token ni cookies, y
// Discord permite la petición desde pabpereza.dev). Si falla, no se pinta
function useDiscordCounts() {
  const [counts, setCounts] = useState(null);
  useEffect(() => {
    fetch(`https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`, {credentials: 'omit'})
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.approximate_member_count) {
          setCounts({total: data.approximate_member_count, online: data.approximate_presence_count ?? 0});
        }
      })
      .catch(() => {});
  }, []);
  return counts;
}

function DiscordCounts() {
  const counts = useDiscordCounts();
  if (!counts) return null;
  const fmt = (n) => n.toLocaleString('es-ES');
  return (
    <p className={styles.counts}>
      <span><strong>{fmt(counts.total)}</strong> {counts.total === 1 ? 'miembro' : 'miembros'}</span>
      <span className={styles.online}><strong>{fmt(counts.online)}</strong> {counts.online === 1 ? 'conectado' : 'conectados'}</span>
    </p>
  );
}

export default function Comunidad() {
  // La membresía tenía antes su sección aquí (/comunidad#membresia). Los
  // enlaces antiguos que ya circulan acaban en su página propia
  const history = useHistory();
  useEffect(() => {
    if (window.location.hash === '#membresia') history.replace('/membresia');
  }, [history]);
  return (
    <Layout
      title="Comunidad - Discord Sudoers by pabpereza"
      description="Únete a Sudoers by pabpereza, el Discord abierto del canal para hablar de DevOps, seguridad, cloud y homelab, resolver dudas y enseñar lo que has montado.">
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
            <Link className="button button--secondary button--outline button--lg" to="/membresia">
              Ver la membresía
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="ppz-section">
          <div className="container">
            <div className="ppz-section__head">
              <h2>Discord, abierto a todo el mundo</h2>
            </div>
            {/* Rejilla de dos filas: arriba, la intro (izquierda) y los
                contadores de Discord (derecha); abajo, las fichas de canales
                y el chat de ejemplo, con el mismo alto */}
            <div className={styles.discordRow}>
              <p className={`ppz-section__intro ${styles.discordIntro}`}>
                No hace falta ser miembro para entrar. Preséntate, pregunta lo que se te haya
                atascado o enseña lo que has montado. Estos son algunos de los canales.
              </p>
              <div className={styles.countsCell}>
                <DiscordCounts />
              </div>
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

        <section className="ppz-section">
          <div className="container">
            <div className={`ppz-card ${styles.memberCta}`}>
              <div>
                <h2>¿Quieres apoyar el canal?</h2>
                <p>
                  La membresía de YouTube tiene tres niveles, desde acceso anticipado a los vídeos
                  hasta elegir el tema del directo mensual. Con ella llegan los canales de miembros
                  del Discord.
                </p>
              </div>
              <Link className="button button--primary button--lg" to="/membresia">
                Ver la membresía
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
