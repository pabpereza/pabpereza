import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import ForceGraph2D from 'react-force-graph-2d';
import {forceCollide, forceX, forceY} from 'd3-force';
import raw from '@site/src/data/content-graph.json';
import {GROUP, GROUPS, clean, groupOf} from './groups';
import styles from './ContentGraph.module.css';

// Mapa de contenido: cada página es un punto y cada enlace interno entre dos
// páginas, una línea. Las páginas se agrupan por curso (cada curso en su
// color, el de src/data/courses.js), con el blog en el centro.
//
// `preview`: versión de escaparate, sin controles ni interacción (la usa el
// índice de cursos).

// Centro de cada grupo: los cursos en círculo y el blog en medio, porque es
// el que más enlaza con todos
const RING = 270;
const CENTER = Object.fromEntries(
  GROUPS.map(({id}, i) => {
    if (id === 'blog') return [id, {x: 0, y: 0}];
    const angle = (2 * Math.PI * i) / (GROUPS.length - 1) - Math.PI / 2;
    return [id, {x: RING * Math.cos(angle), y: RING * Math.sin(angle)}];
  }),
);

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function buildGraph() {
  const nodes = raw.nodes.map(({id, title, description, url}) => {
    const group = groupOf(url);
    return {
      id,
      url,
      group,
      title: clean(title),
      description,
      hub: url === `/docs/cursos/${group}`, // la portada de cada curso
      // Arranca cerca de su grupo para que el mapa se asiente rápido
      x: CENTER[group].x + (Math.random() - 0.5) * 80,
      y: CENTER[group].y + (Math.random() - 0.5) * 80,
    };
  });
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const links = raw.links
    .filter(({source, target}) => byId.has(source) && byId.has(target))
    .map(({source, target}) => ({source, target}));
  const neighbors = new Map(nodes.map((node) => [node.id, new Set()]));
  for (const {source, target} of links) {
    neighbors.get(source).add(target);
    neighbors.get(target).add(source);
  }
  return {nodes, links, byId, neighbors};
}

const radius = (node) => (node.hub ? 9 : 3.5);
const endId = (end) => (typeof end === 'object' ? end.id : end);

export default function ContentGraph({preview = false}) {
  const graphRef = useRef(null);
  const boxRef = useRef(null);
  const fitted = useRef(false);
  const {colorMode} = useColorMode();
  const dark = colorMode === 'dark';
  const colors = dark
    ? {text: '#e8eeea', link: 'rgba(255,255,255,0.10)', linkDim: 'rgba(255,255,255,0.025)', linkOn: 'rgba(0,255,135,0.7)', accent: '#00ff87', halo: '#0a0a0a'}
    : {text: '#1c1e21', link: 'rgba(0,0,0,0.12)', linkDim: 'rgba(0,0,0,0.03)', linkOn: 'rgba(0,122,69,0.75)', accent: '#007a45', halo: '#ffffff'};

  const [size, setSize] = useState({width: 0, height: 0});
  const [hover, setHover] = useState(null);
  const graph = useMemo(buildGraph, []);
  // El mapa local enlaza aquí con ?pagina=<ruta>: esa página nace ya
  // seleccionada, para que el primer fotograma se pinte como se va a quedar
  // (sin nombres que aparecen un instante y se apagan al aplicar la selección)
  const initial = useMemo(() => {
    if (preview) return null;
    const wanted = new URLSearchParams(window.location.search).get('pagina');
    return (wanted && graph.byId.get(wanted)) || null;
  }, [graph, preview]);
  const [selected, setSelected] = useState(initial);
  const [picked, setPicked] = useState(() => new Set()); // grupos marcados en la leyenda
  const pickedRef = useRef(picked); // el valor al día, para dos pulsaciones seguidas
  const [query, setQuery] = useState('');
  const [settled, setSettled] = useState(false); // ya se hizo el primer encuadre

  // El lienzo ocupa su caja y la sigue si cambia de tamaño
  useEffect(() => {
    const box = boxRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect;
      setSize({width: Math.round(width), height: Math.round(height)});
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  // Fuerzas: cada página tira hacia el centro de su grupo; los enlaces
  // apenas tiran, para que no deshagan los grupos
  useEffect(() => {
    const fg = graphRef.current;
    if (!fg) return;
    fg.d3Force('x', forceX((node) => CENTER[node.group].x).strength(0.14));
    fg.d3Force('y', forceY((node) => CENTER[node.group].y).strength(0.14));
    fg.d3Force('collide', forceCollide((node) => radius(node) + 2.5));
    fg.d3Force('charge').strength(-28).distanceMax(220);
    fg.d3Force('link').distance(34).strength(0.04);
    fg.d3Force('center', null);
    fg.d3ReheatSimulation();
  }, [size.width > 0]);

  const matches = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return null;
    return graph.nodes.filter((node) => normalize(node.title).includes(q));
  }, [query, graph]);

  // Qué páginas se ven "encendidas", por orden de prioridad: el foco y sus
  // vecinas, los resultados de la búsqueda o los grupos marcados en la
  // leyenda; sin nada de eso, todas
  const focus = hover ?? selected;
  const lit = useMemo(() => {
    if (focus) return new Set([focus.id, ...graph.neighbors.get(focus.id)]);
    if (matches) return new Set(matches.map((node) => node.id));
    if (picked.size) return new Set(graph.nodes.filter((node) => picked.has(node.group)).map((node) => node.id));
    return null;
  }, [focus, matches, picked, graph]);

  const select = useCallback((node) => {
    setSelected(node);
    setQuery('');
    if (node && graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 600);
      graphRef.current.zoom(Math.max(graphRef.current.zoom(), 2.2), 600);
    }
  }, []);

  // Marcar grupos en la leyenda no oculta nada: pone el foco en ellos (el
  // resto se atenúa) y encuadra el mapa para que se vean enteros
  const toggleGroup = (id) => {
    const next = new Set(pickedRef.current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    pickedRef.current = next;
    setPicked(next);
    setSelected(null);
    frame(graph.nodes.filter((node) => next.size === 0 || next.has(node.group)));
  };

  // Encuadra un conjunto de páginas. Con tope de zoom: un grupo pequeño no
  // debe llenar la pantalla con puntos enormes
  const frame = (nodes) => {
    const fg = graphRef.current;
    if (!fg || nodes.length === 0) return;
    const xs = nodes.map((node) => node.x);
    const ys = nodes.map((node) => node.y);
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const margin = 140;
    const zoom = Math.min(size.width / (maxX - minX + margin), size.height / (maxY - minY + margin), 2.4);
    fg.centerAt((minX + maxX) / 2, (minY + maxY) / 2, 600);
    fg.zoom(zoom, 600);
  };

  const drawNode = useCallback(
    (node, ctx, scale) => {
      const on = !lit || lit.has(node.id);
      const r = radius(node);
      ctx.globalAlpha = on ? 1 : 0.12;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = GROUP[node.group].tint;
      ctx.fill();

      if (focus?.id === node.id || selected?.id === node.id) {
        ctx.lineWidth = 2 / scale;
        ctx.strokeStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 3 / scale, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Etiquetas: siempre en las portadas de curso; en el resto, solo si
      // están encendidas por foco o búsqueda, o al acercar mucho. Con grupos
      // marcados no se etiqueta todo el grupo: serían decenas de textos
      const named = focus || matches;
      const label = node.hub || (named && on) || (!preview && scale > 2.6);
      if (label && on) {
        const fontSize = (node.hub ? 13 : 11) / scale;
        ctx.font = `${node.hub ? 700 : 500} ${fontSize}px Geist, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const text = node.title.length > 42 ? `${node.title.slice(0, 40)}…` : node.title;
        const y = node.y + r + 3 / scale;
        // Borde del color del fondo para que el texto se lea sobre las líneas
        ctx.lineWidth = 3 / scale;
        ctx.strokeStyle = colors.halo;
        ctx.strokeText(text, node.x, y);
        ctx.fillStyle = colors.text;
        ctx.fillText(text, node.x, y);
      }
      ctx.globalAlpha = 1;
    },
    [lit, focus, matches, selected, colors, preview],
  );

  const linkOn = (link) => focus && (endId(link.source) === focus.id || endId(link.target) === focus.id);
  // Sin foco en una página, una línea se atenúa si alguno de sus extremos lo está
  const linkDim = (link) => !focus && lit && !(lit.has(endId(link.source)) && lit.has(endId(link.target)));

  return (
    <div className={`${styles.root} ${preview ? styles.preview : ''}`}>
      {!preview && (
        <div className={styles.toolbar}>
          <div className={styles.search}>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar una página…"
              aria-label="Buscar una página en el mapa"
            />
            {matches && (
              <ul className={styles.results}>
                {matches.length === 0 && <li className={styles.empty}>Sin resultados</li>}
                {matches.slice(0, 8).map((node) => (
                  <li key={node.id}>
                    <button type="button" onClick={() => select(node)}>
                      <span className={styles.dot} style={{background: GROUP[node.group].tint}} />
                      {node.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.legend}>
            {GROUPS.map(({id, name, tint}) => (
              <button
                key={id}
                type="button"
                className={styles.chip}
                aria-pressed={picked.has(id)}
                onClick={() => toggleGroup(id)}
              >
                <span className={styles.dot} style={{background: tint}} />
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Oculto hasta el primer encuadre: antes de él la librería pinta un
          fotograma con el zoom por defecto, que se vería como un destello */}
      <div ref={boxRef} className={`${styles.canvas} ${settled ? styles.ready : ''}`}>
        {size.width > 0 && (
          <ForceGraph2D
            ref={graphRef}
            graphData={graph}
            width={size.width}
            height={size.height}
            backgroundColor="rgba(0,0,0,0)"
            // El mapa se calcula entero antes de pintarse, así que no hay
            // espera: aparece ya asentado y hace enseguida el zoom suave de
            // encuadre. Después se reactiva la física para arrastrar puntos
            warmupTicks={240}
            cooldownTicks={settled && !preview ? 120 : 0}
            nodeCanvasObject={drawNode}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius(node) + 4, 0, 2 * Math.PI);
              ctx.fill();
            }}
            linkColor={(link) => (linkOn(link) ? colors.linkOn : linkDim(link) ? colors.linkDim : colors.link)}
            linkWidth={(link) => (linkOn(link) ? 1.6 : 0.6)}
            enableZoomInteraction={!preview}
            enablePanInteraction={!preview}
            enableNodeDrag={!preview}
            onNodeHover={preview ? undefined : setHover}
            onNodeClick={preview ? undefined : select}
            onBackgroundClick={() => setSelected(null)}
            onEngineStop={() => {
              // Encaja el mapa en la caja la primera vez que se asienta
              if (fitted.current) return;
              fitted.current = true;
              setSettled(true);
              // Con una página pedida se va directo a ella; si además se
              // lanzara el encuadre general, las dos animaciones se pisarían
              // y el zoom acabaría saltando a la vista completa
              if (initial) {
                // Parte de la vista completa, sin animar, y de ahí se acerca
                graphRef.current?.zoomToFit(0, 60);
                select(initial);
              } else {
                graphRef.current?.zoomToFit(preview ? 0 : 700, preview ? 18 : 60);
              }
            }}
          />
        )}
      </div>

      {!preview && !selected && (
        <p className={styles.hint}>Pulsa un punto para ver la página y con cuáles enlaza. Arrastra y haz zoom para moverte.</p>
      )}

      {!preview && selected && (
        <aside className={styles.panel}>
          <button type="button" className={styles.close} onClick={() => setSelected(null)} aria-label="Cerrar">
            ×
          </button>
          <span className={styles.kind}>
            <span className={styles.dot} style={{background: GROUP[selected.group].tint}} />
            {GROUP[selected.group].name}
          </span>
          <h2>{selected.title}</h2>
          {selected.description && <p>{selected.description}</p>}
          <Link className="button button--primary button--sm" to={selected.url}>
            Abrir la página →
          </Link>
          {graph.neighbors.get(selected.id).size > 0 && (
            <>
              <h3>Enlaza con</h3>
              <ul className={styles.related}>
                {[...graph.neighbors.get(selected.id)].map((id) => {
                  const node = graph.byId.get(id);
                  return (
                    <li key={id}>
                      <button type="button" onClick={() => select(node)}>
                        <span className={styles.dot} style={{background: GROUP[node.group].tint}} />
                        {node.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </aside>
      )}
    </div>
  );
}
