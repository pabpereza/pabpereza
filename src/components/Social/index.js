import React from 'react';
import styles from './styles.module.css';

const SocialIconsRow = () => {
  return (
    <section className={styles.socialsection}>
          <h2>Sígueme en redes</h2>
          <p>¡No te pierdas de nada! Sígueme en mis redes sociales para estar al tanto de todas las novedades. El contenido principal lo genero para Youtube. Estos vídeos largos, van acompañados de documentación escrita que se queda en esta web (recuerda que es un repositorio de GitHub modificable). También subo algún short en instagram y tiktok.</p>
          <row className={styles.socialicons}>
            <div>
              <a href="https://www.tiktok.com/@pabpereza"><img className={styles.icon} src='/img/social/tiktok-logo.svg' ></img></a>
            </div>
            <div>
              <a href="https://www.instagram.com/pabpereza/"><img className={styles.icon} src='/img/social/instagram-logo.svg' ></img></a>
            </div>
            <div>
              <a href="https://www.youtube.com/c/pabpereza"><img className={styles.icon} src='/img/social/youtube-logo.svg' ></img></a>
            </div>
            <div>
              <a href="https://twitter.com/pabpereza"><img className={styles.icon} src='/img/social/x-twitter-logo.svg' ></img></a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/pablo-pérez-aradros-calvo-516634109/"><img className={styles.icon} src='/img/social/linkedin-logo.svg' ></img></a>
            </div>
          </row>
    </section>
  );
};

export default SocialIconsRow;



