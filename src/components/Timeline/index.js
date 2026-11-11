import {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

const STEP_MS = 2600;

// Iconos de trazo, uno por etapa (viewBox de 24)
const ICONS = {
  // </> desarrollo web
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  // candado abierto: hacking ético
  unlock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.6-1.7" />
    </>
  ),
  // caja: contenedores
  box: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
  // escudo con visto: DevSecOps
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

// Línea de tiempo con un puntero que salta de etapa en etapa y, al caer en
// cada una, se convierte en su icono. `steps`: [{title, text, icon}].
export default function Timeline({steps}) {
  const listRef = useRef(null);
  const [active, setActive] = useState(-1); // -1: aún no ha entrado en pantalla
  const [offset, setOffset] = useState(0);

  // Arranca al entrar en pantalla y avanza sola, en bucle
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setActive(0);
        timer = setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS);
      },
      {threshold: 0.4},
    );
    observer.observe(listRef.current);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [steps.length]);

  // Altura del punto de la etapa activa (se recalcula si cambia el ancho)
  useEffect(() => {
    if (active < 0) return undefined;
    const measure = () => setOffset(listRef.current.children[active].offsetTop);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <div className={styles.wrap}>
      <ol ref={listRef} className={styles.timeline}>
        {steps.map(({title, text}, i) => (
          <li key={title} className={i === active ? styles.active : undefined}>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      {active >= 0 && (
        <div className={styles.marker} style={{transform: `translateY(${offset}px)`}} aria-hidden="true">
          {/* key: reinicia el salto y la transformación en cada etapa */}
          <div key={active} className={styles.hop}>
            <span className={styles.pointer} />
            <svg className={styles.icon} viewBox="0 0 24 24">
              {ICONS[steps[active].icon]}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
