import {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

// Geometría de cada imagen, en % de su ancho y alto. La misma imagen se pinta
// en dos capas recortadas: `still` (el portal, que no se mueve) y `mover` (lo
// que sale de él). `gate` es la zona en la que el `mover` puede verse mientras
// sale; fuera de ella queda oculto, como si aún estuviera dentro del portal.
// Ángulos de las chispas: 0° = derecha, 90° = abajo.
const PORTALS = {
  // Portal azul bajo el torso: el sujeto sube desde dentro
  profile: {
    box: {left: '14%', top: '70.6%', width: '73.7%', height: '17.6%'},
    flatten: 0.189,
    ringClip: 'polygon(0 0, 8% 0, 8% 50%, 92% 50%, 92% 0, 100% 0, 100% 100%, 0 100%)',
    angles: [352, 6, 22, 40, 58, 75, 92, 110, 128, 146, 162, 176, 188],
    // Arco delantero del portal y sus dos puntas
    still: 'polygon(0 70%, 18.7% 70%, 18.7% 83%, 83.2% 83%, 83.2% 70%, 100% 70%, 100% 100%, 0 100%)',
    // Todo lo que queda por encima del arco delantero
    gate: 'polygon(-10% -30%, 110% -30%, 110% 70%, 83.2% 70%, 83.2% 83%, 18.7% 83%, 18.7% 70%, -10% 70%)',
    mover: 'none',
  },
  // Portal naranja de arriba: el montón de logos cae desde dentro
  tech: {
    box: {left: '2.3%', top: '5.2%', width: '96%', height: '17.5%'},
    flatten: 0.186,
    ringClip: 'polygon(0 0, 100% 0, 100% 100%, 86% 100%, 86% 50%, 48% 50%, 48% 100%, 0 100%)',
    angles: [96, 122, 150, 172, 192, 212, 236, 262, 288, 314, 338, 356, 10],
    // El portal con Gopher y la ballena asomando
    still: 'inset(0 0 64% 0)',
    // De la mitad del portal hacia abajo
    gate: 'inset(14% -10% -30% -10%)',
    // El montón de logos
    mover: 'inset(36% 0 0 0)',
  },
};

export default function Portal({variant, src, alt, width, height}) {
  const {box, flatten, ringClip, angles, still, gate, mover} = PORTALS[variant];
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  // La salida arranca cuando el portal entra en pantalla y la imagen ya ha cargado
  useEffect(() => {
    const el = ref.current;
    const img = el.querySelector('img');
    let seen = false;
    let loaded = img.complete;
    const start = () => seen && loaded && setPlay(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen = true;
        observer.disconnect();
        start();
      },
      {threshold: 0.3},
    );
    observer.observe(el);

    const onLoad = () => {
      loaded = true;
      start();
    };
    if (!loaded) {
      img.addEventListener('load', onLoad, {once: true});
      img.addEventListener('error', onLoad, {once: true});
    }
    return () => {
      observer.disconnect();
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onLoad);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.portal} ${styles[variant]} ${play ? styles.play : ''}`}>
      {/* Invisible: da el tamaño a la caja y lleva el texto alternativo */}
      <img className={styles.sizer} src={src} alt={alt} width={width} height={height} />

      <div className={styles.hole} style={box} aria-hidden="true" />
      <div className={styles.layer} style={{clipPath: gate}} aria-hidden="true">
        <img className={styles.mover} style={{clipPath: mover}} src={src} alt="" />
      </div>
      <div className={styles.layer} style={{clipPath: still}} aria-hidden="true">
        <img src={src} alt="" />
      </div>

      <div className={styles.fx} style={box} aria-hidden="true">
        <div className={styles.clip} style={{clipPath: ringClip}}>
          <div className={styles.disc} style={{'--flatten': flatten}}>
            <div className={styles.ring} />
          </div>
        </div>
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          return (
            <span
              key={angle}
              className={styles.spark}
              style={{
                left: `${(50 + 50 * cos).toFixed(2)}%`,
                top: `${(50 + 50 * sin).toFixed(2)}%`,
                '--dx': `${(cos * 30).toFixed(1)}px`,
                '--dy': `${(sin * 12 - 26).toFixed(1)}px`,
                // Desfases fijos (no aleatorios) para que servidor y navegador pinten lo mismo
                animationDelay: `${((i * 0.37) % 2.2).toFixed(2)}s`,
                animationDuration: `${(1.5 + ((i * 0.53) % 1.1)).toFixed(2)}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
