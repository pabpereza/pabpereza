import {useEffect, useRef} from 'react';

// Contenedor cuyos hijos aparecen uno tras otro al entrar en pantalla (los
// estilos están en custom.css: .ppz-stagger). Lo que ya se ve al cargar la
// página no se oculta, para que no parpadee; solo se "arma" lo que queda
// más abajo. `is-in` se pone siempre al entrar, por si otros estilos lo usan.
export default function Stagger({className = '', children, ...rest}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.85) {
      el.classList.add('ppz-stagger--armed');
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        observer.disconnect();
      },
      {threshold: 0.15},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ppz-stagger ${className}`} {...rest}>
      {children}
    </div>
  );
}
