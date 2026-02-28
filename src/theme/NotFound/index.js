import React, {useEffect, useRef, useState} from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

const SABER_AUDIO_URL = 'https://pabpereza.dev/sounds/sable-laser.mp3';
const HELLO_AUDIO_URL = 'https://pabpereza.dev/sounds/hello-there.mp3';
const MAILTO_BASE = 'mailto:pabloperezaradros@gmail.com?subject=Error%20404';

const pageStyles = `
.notfound-root{
  --bg:#0a0f1d;
  --fg:#e6edf7;
  --muted:#8ea3c2;
  --accent:#4cc2ff;
  --accent2:#b993ff;
  --danger:#ff6b6b;
  --card:#0f1730cc;
  --grid:rgba(120,160,255,.12);
  --glow:#73e0ff;
  --scene-url:none;
  min-height:100vh;
  width:100%;
  margin:0;
  padding:0;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Inter, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color:var(--fg);
  background: radial-gradient(1200px 600px at 70% -20%, #1a2444 0%, #0a0f1d 45%), var(--bg);
  display:grid;
  place-items:center;
  overflow-y:auto;
  overflow-x:hidden;
  position:relative;
}
.notfound-root *{
  box-sizing:border-box;
}
.notfound-root .stars,
.notfound-root .stars::after{
  content:"";
  position:fixed;
  inset:-200vh;
  background-image:
    radial-gradient(2px 2px at 20% 30%, #ffffffaa 50%, transparent 51%),
    radial-gradient(1px 1px at 70% 80%, #ffffff66 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 40% 60%, #ffffff88 50%, transparent 51%),
    radial-gradient(1px 1px at 90% 20%, #ffffff55 50%, transparent 51%);
  background-repeat:repeat;
  background-size: 600px 600px, 800px 800px, 700px 700px, 900px 900px;
  animation: drift 120s linear infinite;
  pointer-events:none;
  z-index:0;
  opacity:.7;
}
.notfound-root .stars::after{
  animation-duration:160s;
  opacity:.5;
}
@keyframes drift{
  to{
    transform:translate3d(300px,200px,0);
  }
}
.notfound-root .wrap{
  position:relative;
  z-index:1;
  width:min(960px, 92vw);
}
.notfound-root .card{
  background: var(--card);
  backdrop-filter: blur(8px);
  border: 1px solid #243562;
  border-radius: 20px;
  padding: clamp(20px, 4vw, 36px);
  box-shadow: 0 10px 30px rgba(0,0,0,.45), 0 0 40px rgba(115,224,255,.10) inset;
}
.notfound-root .title{
  display:flex;
  align-items:center;
  gap:18px;
  flex-wrap:wrap;
}
.notfound-root h1{
  margin:0;
  font-weight:800;
  letter-spacing:.02em;
  font-size: clamp(38px, 6vw, 72px);
  line-height:1;
  background: linear-gradient(90deg, #fff, #bfe7ff 30%, #d7c9ff 60%, #fff);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
  text-shadow: 0 0 18px rgba(115,224,255,.25);
}
.notfound-root .subtitle{
  margin:8px 0 0;
  color:var(--muted);
  font-size: clamp(14px, 2.2vw, 18px);
}
.notfound-root .terminal{
  margin-top:22px;
  border:1px solid #2a3d6d;
  border-radius:14px;
  overflow:hidden;
  background:#0d1430d9;
}
.notfound-root .term-bar{
  display:flex;
  gap:8px;
  align-items:center;
  padding:10px 12px;
  background:#0b1230;
  border-bottom:1px solid #233563;
}
.notfound-root .dot{
  width:10px;
  height:10px;
  border-radius:50%;
}
.notfound-root .dot.red{background:#ff5f56;}
.notfound-root .dot.yellow{background:#ffbd2e;}
.notfound-root .dot.green{background:#27c93f;}
.notfound-root .term-body{
  padding:16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}
.notfound-root .prompt{
  color:#6ef0ff;
}
.notfound-root .input{
  display:inline-block;
  min-width:10ch;
  color:#fff;
}
.notfound-root .cursor{
  display:inline-block;
  width:8px;
  height:1.1em;
  background:#9adfff;
  margin-left:2px;
  vertical-align:middle;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink{
  50%{
    opacity:0;
  }
}
.notfound-root blockquote{
  margin:18px 0 0;
  padding:12px 16px;
  border-left:3px solid var(--accent);
  background: rgba(76,194,255,.08);
  border-radius: 0 10px 10px 0;
  color:#d7e7ff;
}
.notfound-root blockquote footer{
  color:var(--muted);
  font-size:.9em;
  margin-top:6px;
}
.notfound-root .actions{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-top:24px;
}
.notfound-root .btn{
  appearance:none;
  border:none;
  border-radius:999px;
  padding:12px 18px;
  font-weight:700;
  letter-spacing:.2px;
  color:#051028;
  background:linear-gradient(180deg, #9adfff, #4cc2ff);
  box-shadow:0 8px 22px rgba(76,194,255,.35);
  cursor:pointer;
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  gap:8px;
}
.notfound-root .btn:hover{
  transform: translateY(-1px);
  box-shadow:0 10px 26px rgba(76,194,255,.45);
}
.notfound-root .btn.secondary{
  color:#e8e8ff;
  background:linear-gradient(180deg, #3a4b7a, #2a3a64);
  box-shadow:0 8px 22px rgba(0,0,0,.35);
  border:1px solid #42578c;
}
.notfound-root .saber{
  width:min(450px, 46vw);
  height:auto;
  filter: drop-shadow(0 0 16px rgba(115,224,255,.45));
}
.notfound-root .blade{
  transform-origin:left center;
  animation: hum 2.2s ease-in-out infinite;
  transition: width 1.2s cubic-bezier(.22,.8,.3,1), filter .6s, fill .4s;
}
.notfound-root .blade.blade-energized{
  animation: hum 1.2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px #e9d2ff) drop-shadow(0 0 18px #c27dff) drop-shadow(0 0 38px #a23dff) drop-shadow(0 0 70px #7a00ff);
  fill: url(#bladeGradientPurple);
}
@keyframes hum{
  0%,100%{
    filter: drop-shadow(0 0 16px var(--glow));
  }
  50%{
    filter: drop-shadow(0 0 30px var(--glow));
  }
}
.screen-flash{
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:999;
  background: radial-gradient(circle at 50% 50%,rgba(255,255,255,.9),rgba(210,170,255,.65) 30%,rgba(130,60,255,.55) 55%,rgba(40,0,90,.85) 80%,rgba(10,0,30,1) 100%);
  mix-blend-mode:screen;
  animation:flashPulse .95s ease-out forwards;
}
@keyframes flashPulse{
  0%{opacity:0;filter:blur(6px);}
  4%{opacity:1;filter:blur(2px);}
  45%{opacity:.35;}
  100%{opacity:0;filter:blur(18px);}
}
.flare-bar{
  position:fixed;
  left:0;
  top:50%;
  height:140px;
  width:100%;
  transform:translateY(-50%);
  background:linear-gradient(90deg,transparent,rgba(255,240,255,.8) 35%,rgba(180,100,255,.9) 50%,rgba(255,240,255,.8) 65%,transparent);
  opacity:0;
  filter:blur(18px);
  pointer-events:none;
  z-index:998;
  animation:flareBar 1s ease-out forwards;
}
@keyframes flareBar{
  0%{opacity:0;transform:translateY(-50%) scaleX(.05);}
  10%{opacity:1;}
  55%{opacity:.4;}
  100%{opacity:0;transform:translateY(-50%) scaleX(1.2);}
}
.notfound-root .scene{
  position:relative;
  margin:22px 0 0;
  border:1px dashed #2b4378;
  border-radius:14px;
  min-height:180px;
  overflow:hidden;
  background:#0c1430 center/cover no-repeat;
  background-image: var(--scene-url);
}
.notfound-root .scene::after{
  content: attr(data-caption);
  position:absolute;
  inset:auto 0 0 0;
  padding:10px 12px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,.55));
  color:#d9e7ff;
  font-size:13px;
  letter-spacing:.2px;
}
.notfound-root footer.site{
  margin-top:18px;
  color:var(--muted);
  font-size:12.5px;
  text-align:center;
}
.notfound-root a{
  color:#9adfff;
}
@media (prefers-reduced-motion: reduce){
  .notfound-root .stars,
  .notfound-root .stars::after,
  .notfound-root .blade{
    animation:none;
  }
  .notfound-root .btn:hover{
    transform:none;
  }
  .notfound-root .cursor{
    animation:none;
  }
}
`;

export default function NotFound() {
  const bladeRef = useRef(null);
  const [incidentId, setIncidentId] = useState('');
  const [mailtoHref, setMailtoHref] = useState(MAILTO_BASE);
  const [currentPath, setCurrentPath] = useState('/');

  // Generate identifiers and reactive mailto link on the client.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const {crypto} = window;
      if (crypto?.getRandomValues) {
        const data = crypto.getRandomValues(new Uint32Array(2));
        setIncidentId(`${data[0]}-${data[1]}`);
      } else {
        setIncidentId(`${Date.now()}-${Math.floor(Math.random() * 1e6)}`);
      }
    } catch (error) {
      setIncidentId(`${Date.now()}-${Math.floor(Math.random() * 1e6)}`);
    }

    const path = window.location?.pathname ?? '/';
    setCurrentPath(path);
    const body = `No se encontró la ruta: ${path}`;
    setMailtoHref(`${MAILTO_BASE}&body=${encodeURIComponent(body)}`);
  }, []);

  // Set up audio-driven easter eggs once on the client side.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let jediActivated = false;
    let helloTriggered = false;
    const sequence = ['j', 'e', 'd', 'i'];
    let sequenceIndex = 0;

    const playAudioOnce = async (url) => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
          return;
        }
        const ctx = new AudioCtx();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await ctx.decodeAudioData(arrayBuffer);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = false;
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.2;
        source.connect(gainNode).connect(ctx.destination);
        source.start(0);
        source.onended = () => {
          try {
            ctx.close();
          } catch (error) {
            /* ignore */
          }
        };
      } catch (error) {
        /* ignore playback issues */
      }
    };

    const spawnFlash = () => {
      try {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        const bar = document.createElement('div');
        bar.className = 'flare-bar';
        document.body.appendChild(bar);
        const cleanup = (el) => {
          el.addEventListener(
            'animationend',
            () => {
              el.remove();
            },
            {once: true},
          );
        };
        cleanup(flash);
        cleanup(bar);
      } catch (error) {
        /* ignore */
      }
    };

    const energizeBlade = () => {
      const blade = bladeRef.current;
      if (!blade) {
        return;
      }
      blade.classList.add('blade-energized');
      try {
        const svg = blade.ownerSVGElement;
        if (!svg) {
          return;
        }
        const {baseVal} = svg.viewBox;
        const x = parseFloat(blade.getAttribute('x') || '0');
        const target = baseVal.width - x;
        const originalWidth = blade.getAttribute('width') || '';
        blade.setAttribute('data-orig-width', originalWidth);
        blade.setAttribute('width', '2');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            blade.setAttribute('width', String(target));
          });
        });
      } catch (error) {
        /* ignore */
      }
    };

    const playSaberHum = () => {
      if (jediActivated) {
        return;
      }
      jediActivated = true;
      playAudioOnce(SABER_AUDIO_URL);
      energizeBlade();
      spawnFlash();
    };

    const triggerHelloThere = () => {
      if (helloTriggered) {
        return;
      }
      helloTriggered = true;
      playAudioOnce(HELLO_AUDIO_URL);
    };

    const onSequenceKey = (event) => {
      if (!event.key) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === sequence[sequenceIndex]) {
        sequenceIndex += 1;
        if (sequenceIndex === sequence.length) {
          sequenceIndex = 0;
          playSaberHum();
        }
      } else {
        sequenceIndex = key === sequence[0] ? 1 : 0;
      }
    };

    const onFirstKey = () => {
      triggerHelloThere();
    };
    const onFirstTouch = () => {
      triggerHelloThere();
    };
    const onFirstClick = () => {
      triggerHelloThere();
    };

    window.addEventListener('keydown', onSequenceKey);
    window.addEventListener('keydown', onFirstKey, {once: true});
    window.addEventListener('touchstart', onFirstTouch, {once: true, passive: true});
    window.addEventListener('click', onFirstClick, {once: true, passive: true});

    return () => {
      window.removeEventListener('keydown', onSequenceKey);
      window.removeEventListener('keydown', onFirstKey);
      window.removeEventListener('touchstart', onFirstTouch);
      window.removeEventListener('click', onFirstClick);
    };
  }, []);

  return (
    <Layout
      title="404 • Archivos Jedi incompletos"
      description="Página 404 inspirada en Obi-Wan Kenobi buscando en los Archivos Jedi (Episodio II)."
      noFooter
      noNavbar
      noIndex
    >
      <Head>
        <meta
          name="description"
          content="Página 404 inspirada en Obi-Wan Kenobi buscando en los Archivos Jedi (Episodio II)."
        />
        <style>{pageStyles}</style>
      </Head>
      <div className="notfound-root" aria-labelledby="notfound-title" data-scene="" data-caption="">
        <div className="stars" aria-hidden="true" />
        <main className="wrap" role="main">
          <section className="card" aria-live="polite">
            <div className="title">
              <svg className="saber" viewBox="0 0 500 90" role="img" aria-label="Sable de luz encendido">
                <defs>
                  <linearGradient id="bladeGradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="#d0f7ff" />
                    <stop offset="100%" stopColor="#70e3ff" />
                  </linearGradient>
                  <linearGradient id="bladeGradientPurple" x1="0" x2="1">
                    <stop offset="0%" stopColor="#f5e6ff" />
                    <stop offset="50%" stopColor="#c78aff" />
                    <stop offset="100%" stopColor="#8d32ff" />
                  </linearGradient>
                </defs>
                <rect x="0" y="35" width="120" height="20" rx="4" fill="#20252f" />
                <rect x="8" y="32" width="14" height="26" rx="2" fill="#9aa3b2" />
                <rect x="28" y="32" width="14" height="26" rx="2" fill="#7f889a" />
                <rect x="48" y="32" width="14" height="26" rx="2" fill="#9aa3b2" />
                <circle cx="104" cy="45" r="4" fill="#ff5f56" />
                <rect x="110" y="37" width="10" height="16" rx="2" fill="#3a4150" />
                <rect
                  className="blade"
                  id="bladeRect"
                  x="120"
                  y="26"
                  width="360"
                  height="38"
                  rx="6"
                  fill="url(#bladeGradient)"
                  opacity=".95"
                  ref={bladeRef}
                />
                <rect x="120" y="20" width="360" height="50" rx="10" fill="#b8f1ff" opacity=".18" />
              </svg>
              <div>
                <h1 id="notfound-title">404 — Archivo no encontrado</h1>
                <p className="subtitle">Obi‑Wan buscó en los Archivos Jedi y… esta ruta no aparece.</p>
              </div>
            </div>

            <div className="terminal" role="group" aria-label="Terminal de búsqueda">
              <div className="term-bar" aria-hidden="true">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
                <span style={{marginLeft: '8px', color: '#c8d8ff', opacity: 0.8}}>/archives/jedi</span>
              </div>
              <div className="term-body" aria-live="polite">
                <div>
                  <span className="prompt">jedi@coruscant</span>
                  :
                  <span style={{color: '#7fa3ff'}}>~</span>$ buscar{' '}
                  <span style={{color: '#b993ff'}}>{`"${currentPath}"`}</span>
                </div>
                <div style={{marginTop: '6px', color: '#a7c7ff'}}>
                  ⟶ Resultado:{' '}
                  <span style={{color: 'var(--danger)', fontWeight: 700}}>no encontrado</span> (código: 404)
                </div>
                <div style={{marginTop: '6px', color: '#6bd1ff'}}>
                  Sugerencia: revisa el <em>holomapa</em> o vuelve al <em>templo</em>.
                </div>
                <div style={{marginTop: '12px'}}>
                  <span className="prompt">jedi@coruscant</span>
                  :
                  <span style={{color: '#7fa3ff'}}>~</span>$ <span className="input" aria-hidden="true">Introduce la contraseña ;)</span>
                  <span className="cursor" aria-hidden="true" />
                </div>
              </div>
            </div>

            <blockquote>
              “Si un elemento no aparece en nuestros registros, entonces no existe”.
              <footer>— Maestra bibliotecaria (Star Wars: Episodio II)</footer>
            </blockquote>

            <div className="scene" id="scene" data-caption="" aria-label="Panel de escena">
              <img
                src="https://pabpereza.dev/img/404.gif"
                alt="Obi-Wan Kenobi buscando en los Archivos Jedi"
                style={{width: '100%', display: 'block'}}
              />
            </div>

            <div className="actions" role="group" aria-label="Acciones">
              <a className="btn" href="https://pabpereza.dev" aria-label="Volver al inicio">
                ⬅ Volver al inicio
              </a>
              <a className="btn secondary" href={mailtoHref} aria-label="Informar del error">
                ⚠️ Informar del error
              </a>
            </div>
          </section>
          <footer className="site">
            ID de incidente: <span id="rid">{incidentId}</span> • <span aria-hidden="true">|</span> Esta es una página homenaje no
            oficial inspirada en una escena del Episodio II.
          </footer>
        </main>
      </div>
    </Layout>
  );
}