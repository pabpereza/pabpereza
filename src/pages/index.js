import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SocialIconsRow from '@site/src/components/Social';

import Heading from '@theme/Heading';
import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Hello there! <img height="50px" src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" alt='hello there gif'></img> 
        </Heading>
        <p className="hero__subtitle"> Bienvenido, aquí encontrarás todo el contenido que genero para Youtube</p>
        <p className="hero__subtitle"> "Si quieres dominar algo, enséñalo" - Richard P. Feynman</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            Cursos 
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Blog 
          </Link>

        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello there! - ${siteConfig.title}`}
      description="Seguridad, DevOps, programación, docker, kubernetes y mucho más">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <SocialIconsRow /> 
      </main>
    </Layout>
  );
}
