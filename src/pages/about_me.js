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
                <div class={styles.profileSection}>
                    <h1>Pablo Pérez-Aradros</h1>
                    <h3>REALLY AWESOME WEB DESIGNER</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.</p>
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
