import {useEffect, useRef} from 'react';

const DURATION = 1400;
const easeOut = (t) => 1 - (1 - t) ** 3;

// Cuenta desde cero hasta `value` ("33.5K", "252", 122...) cuando entra en
// pantalla, conservando decimales y sufijo. El HTML lleva siempre la cifra
// final: sin JavaScript o con "reducir movimiento" se ve tal cual.
export default function CountUp({value}) {
  const ref = useRef(null);
  const text = String(value);

  useEffect(() => {
    const el = ref.current;
    const match = text.match(/^(\d+)(?:([.,])(\d+))?(.*)$/);
    if (!match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const [, int, sep = '.', frac = '', suffix] = match;
    const target = Number(`${int}.${frac || 0}`);
    const format = (n) => n.toFixed(frac.length).replace('.', sep) + suffix;

    let frame;
    el.textContent = format(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / DURATION, 1);
        el.textContent = progress < 1 ? format(target * easeOut(progress)) : text;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text]);

  return <span ref={ref}>{text}</span>;
}
