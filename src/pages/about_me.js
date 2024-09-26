import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import SocialIconsRow from '@site/src/components/Social';

import Heading from '@theme/Heading';
import styles from './about_me.module.css';


function AboutmePage() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header>
            <div className={styles.profileSection}>
                <div className={styles.profileSection}>
                    <img src="img/perfil-2024-transparent.png" alt="sample"></img> 
                </div>
                <div className={styles.profileSection}>
                    <h1>Pablo Pérez-Aradros</h1>
                    <h3>Divulgador y eterno aprendiz</h3>
                    <p>Mi nombre es Pablo Pérez-Aradros, soy un entusiasta de la ciberseguridad especializado en procesos de desarrollo como DevSecOps. Parte de mi tiempo, lo dedico a la formación y divulgación, a través de mi canal de youtube y mi página web.</p>

                    <p>Actualmente trabajo en el equipo CISO como SecDevOps en el Banco Santander (concretamente en CIB). Si quieres conocer con más detalle mi carrera profesional te recomiendo visitar mi <a href='https://www.linkedin.com/in/pabpereza/' >LinkedIN</a></p>`
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Sobre mí - SecDevOps y divulgación`}
            description="DevOps, seguridad, programación, docker, kubernetes, sre y mucho más">
            <AboutmePage />
            <SocialIconsRow />
        </Layout>
    );
}
