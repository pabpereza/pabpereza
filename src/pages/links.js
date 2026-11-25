import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {SocialIcons, networks} from '@site/src/components/Social';
import styles from './links.module.css';

// Los mismos enlaces, grupos y orden que tenía el Linktree. `hint` es la
// pista en monoespaciada de a dónde lleva cada botón
const groups = [
  {
    links: [
      {title: 'Canal de YouTube', hint: 'youtube.com/@Pabpereza', href: 'https://www.youtube.com/@Pabpereza'},
      {title: 'Página web, documentación y blog', hint: 'pabpereza.dev', to: '/'},
    ],
  },
  {
    title: 'Cursos',
    links: [
      {
        title: 'Curso de Kubernetes, preparación CKA, CKS y CKAD',
        hint: 'lista de YouTube',
        href: 'https://www.youtube.com/playlist?list=PLQhxXeq1oc2k9MFcKxqXy5GV4yy7wqSma',
      },
      {
        title: 'Curso de Docker',
        hint: 'lista de YouTube',
        href: 'https://www.youtube.com/playlist?list=PLQhxXeq1oc2n7YnjRhq7qVMzZWtDY7Zz0',
      },
    ],
  },
  {
    title: 'Servicios',
    links: [
      {title: 'Sponsor me & Media Kit', hint: 'mediakit.pabpereza.dev', href: 'https://mediakit.pabpereza.dev'},
      {title: 'Clases particulares, cursos de empresa o consultoría', hint: 'contacto', to: '/about_me#contacto'},
      {title: 'Equipamiento, libros y accesorios', hint: 'amazon.es/shop/pabpereza', href: 'https://www.amazon.es/shop/pabpereza'},
    ],
  },
];

// La fila de redes de la web más GitHub, que el Linktree también tenía
const social = [
  ...networks,
  {name: 'GitHub', icon: 'github', scale: 0.95, href: 'https://github.com/pabpereza'},
];

function LinkButton({title, hint, href, to}) {
  const content = (
    <>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.hint}>{hint}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </>
  );
  return to ? (
    <Link className={styles.button} to={to}>{content}</Link>
  ) : (
    <a className={styles.button} href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  );
}

export default function Links() {
  return (
    <Layout
      title="Enlaces de pabpereza - canal, cursos, redes y contacto"
      description="Todos los enlaces de pabpereza en un solo sitio. Canal de YouTube, cursos de Docker y Kubernetes, web y blog, media kit, clases y consultoría, y redes sociales."
      noFooter>
      <main className={`ppz-glow ${styles.page}`}>
        <div className={styles.column}>
          <header className={styles.profile}>
            <img className={styles.avatar} src="/img/logo.png" alt="Logo de pabpereza" width="112" height="112" />
            <h1 className={styles.name}>pabpereza<em>.dev</em></h1>
            <p className={styles.subtitle}>DevOps / Seguridad / Cloud / IA</p>
            <p className={styles.quote}>«Si quieres dominar algo, enséñalo» · Richard P. Feynman</p>
          </header>

          {groups.map(({title, links}, i) => (
            <section key={title ?? i} className={styles.group}>
              {title && <h2 className={styles.groupTitle}>{title}</h2>}
              <ul className={styles.list}>
                {links.map((link) => (
                  <li key={link.title}><LinkButton {...link} /></li>
                ))}
              </ul>
            </section>
          ))}

          <div className={styles.social}>
            <SocialIcons items={social} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
