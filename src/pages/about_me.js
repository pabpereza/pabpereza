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
            <div className={styles.row}>
                <div className={styles.col4}>
                    <img src="img/perfil-2024-transparent.png" alt="sample"></img> 
                </div>
                <div className={styles.col8}>
                    <h1>Pablo Pérez-Aradros</h1>
                    <h3>Divulgador y eterno aprendiz</h3>
                    <p>Mi nombre es Pablo Pérez-Aradros, soy un entusiasta de la ciberseguridad especializado en procesos de desarrollo como DevSecOps. Parte de mi tiempo, lo dedico a la divulgación, a través de mi canal de youtube y mi página web. Siempre he pensado que la mejor forma de aprender es enseñando a los demás. Para mí, todo esto es un ejercicio de autoformación.</p>

                    <p>Actualmente trabajo en el equipo CISO del Banco Santander (concretamente en CIB). Si quieres conocer con más detalle mi carrera profesional te recomiendo visitar mi <a href='https://www.linkedin.com/in/pabpereza/' target="_blank" >LinkedIN.</a></p>
                </div>
            </div>
            <div className={styles.row}>
                    <div className={styles.col8}>
                        <h1>Evolución</h1>
                        <h3>Tecnología y pasión</h3>
                        <p>Empecé en el mundillo como desarrollador web, luego me cambié hacking ético y, finalmente, los contenedores me enamoraron permitiéndome descubrir la parte DevOps. Sin declinarme por ninguna opción, he aprovechado todo este cocktail para dedicarme al mundo del DevSecOps, en el cual, puedo combinar todas mis pasiones.</p>

                        <p>Por otra parte, este nicho (cuanto menos cambiante), requiere una formación e investigación continua, reto que disfruto y agradezco. Nada como aprender y "cacharrear" con nuevas tecnologías. </p>
                    </div>
                    <div className={styles.col4}>
                        <img src="img/portal_tech.png" alt="sample"></img> 
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
