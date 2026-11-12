import styles from './styles.module.css';

// Cada SVG ocupa una parte distinta de su lienzo (YouTube apenas dos tercios
// del alto, LinkedIn o Instagram todo): `scale` los iguala a ojo
const networks = [
  {name: 'YouTube', icon: 'youtube', scale: 1.3, href: 'https://www.youtube.com/@Pabpereza'},
  {name: 'Discord', icon: 'discord', scale: 1.12, href: '/discord'},
  {name: 'LinkedIn', icon: 'linkedin', scale: 0.86, href: 'https://www.linkedin.com/in/pabpereza/'},
  {name: 'Instagram', icon: 'instagram', scale: 0.9, href: 'https://www.instagram.com/pabpereza/'},
  {name: 'X', icon: 'x-twitter', scale: 0.84, href: 'https://x.com/pabpereza'},
  {name: 'TikTok', icon: 'tiktok', scale: 1, href: 'https://www.tiktok.com/@pabpereza'},
];

export default function SocialIconsRow() {
  return (
    <section className={`ppz-section ${styles.social}`}>
      <div className="container">
        <p>Los vídeos largos van a YouTube y su versión escrita se queda en esta web. Los shorts, en Instagram y TikTok.</p>
        <ul className={styles.icons}>
          {networks.map(({name, icon, scale, href}) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}>
                <span
                  className={styles.icon}
                  style={{'--icon': `url('/img/social/${icon}-logo.svg')`, '--scale': scale}}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
