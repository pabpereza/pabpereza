import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {OPEN_EVENT, setConsent, useCookieConsent} from './consent';
import styles from './styles.module.css';

// Aviso de cookies propio: aparece hasta que el usuario elige y se reabre
// desde "Gestionar cookies" del pie (evento OPEN_EVENT). Aceptar y rechazar
// tienen el mismo peso visual.
export default function CookieConsent() {
  const consent = useCookieConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  // undefined = todavía hidratando; null = sin elegir
  if (consent === undefined || (consent !== null && !reopened)) return null;

  const choose = (value) => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <section className={styles.banner} role="dialog" aria-label="Aviso de cookies">
      <p className={styles.text}>
        Uso cookies de Google Analytics para saber qué contenidos se visitan y, si aceptas,
        los vídeos se cargan desde youtube.com con tu sesión. Sin publicidad. Más detalle en
        la <Link to="/cookies">política de cookies</Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={() => choose('denied')}>
          Rechazar
        </button>
        <button type="button" className={styles.button} onClick={() => choose('granted')}>
          Aceptar
        </button>
      </div>
    </section>
  );
}
