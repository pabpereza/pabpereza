import styles from './styles.module.css';

const networks = [
  {name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@Pabpereza'},
  {name: 'Discord', icon: 'discord', href: '/discord'},
  {name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/pabpereza/'},
  {name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/pabpereza/'},
  {name: 'X', icon: 'x-twitter', href: 'https://x.com/pabpereza'},
  {name: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@pabpereza'},
];

export default function SocialIconsRow() {
  return (
    <section className={`ppz-section ${styles.social}`}>
      <div className="container">
        <p>Los vídeos largos van a YouTube y su versión escrita se queda en esta web. Los shorts, en Instagram y TikTok.</p>
        <ul className={styles.icons}>
          {networks.map(({name, icon, href}) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                <span
                  className={styles.icon}
                  style={{'--icon': `url('/img/social/${icon}-logo.svg')`}}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
