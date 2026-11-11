import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import {GROUP, clean, groupOf} from '@site/src/components/ContentGraph/groups';
import styles from './styles.module.css';

// Mapa local, al estilo de Obsidian: la página actual en el centro y, a su
// alrededor, las páginas con las que enlaza (o que enlazan con ella). Va
// encima del índice de la página. Es un SVG sencillo, sin la librería del
// mapa completo; los datos se piden aparte para no cargar cada página.

const WIDTH = 240;
const HEIGHT = 190;
const MAX = 24; // con más vecinas el dibujo se vuelve ilegible

function useGraph() {
  const [graph, setGraph] = useState(null);
  useEffect(() => {
    let cancelled = false;
    import('@site/src/data/content-graph.json').then((data) => {
      if (!cancelled) setGraph(data.default ?? data);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return graph;
}

function localGraph(graph, pathname) {
  const id = pathname.replace(/(.)\/$/, '$1');
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const current = byId.get(id);
  if (!current) return null;

  const ids = new Set();
  for (const {source, target} of graph.links) {
    if (source === id && byId.has(target)) ids.add(target);
    if (target === id && byId.has(source)) ids.add(source);
  }
  ids.delete(id);
  if (ids.size === 0) return null;

  // Las portadas de curso, primero: son las que más orientan
  const all = [...ids]
    .map((neighborId) => byId.get(neighborId))
    .sort((a, b) => a.url.split('/').length - b.url.split('/').length);
  const shown = all.slice(0, MAX);

  // En círculo alrededor del centro; con muchas, en dos anillos alternos
  const twoRings = shown.length > 10;
  const neighbors = shown.map((node, i) => {
    const angle = (2 * Math.PI * i) / shown.length - Math.PI / 2;
    const ring = twoRings && i % 2 ? 0.62 : 1;
    return {
      ...node,
      title: clean(node.title),
      tint: GROUP[groupOf(node.url)].tint,
      x: WIDTH / 2 + Math.cos(angle) * 96 * ring,
      y: HEIGHT / 2 + Math.sin(angle) * 74 * ring,
    };
  });

  return {
    current: {...current, tint: GROUP[groupOf(current.url)].tint},
    neighbors,
    hiddenCount: all.length - shown.length,
  };
}

export default function LocalGraph() {
  const {pathname} = useLocation();
  const history = useHistory();
  const graph = useGraph();
  const [hover, setHover] = useState(null);

  const local = graph && localGraph(graph, pathname);
  if (!local) return null;
  const {current, neighbors, hiddenCount} = local;
  const total = neighbors.length + hiddenCount;

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <span>Mapa local</span>
        <Link
          to={`/content-graph?pagina=${encodeURIComponent(current.id)}`}
          title="Abrir en el mapa completo"
          aria-label="Abrir esta página en el mapa de contenido completo"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
          </svg>
        </Link>
      </div>
      <svg className={styles.graph} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`Páginas enlazadas con esta: ${total}`}>
        {neighbors.map((node) => (
          <line
            key={node.id}
            x1={WIDTH / 2}
            y1={HEIGHT / 2}
            x2={node.x}
            y2={node.y}
            className={hover?.id === node.id ? styles.lineOn : styles.line}
          />
        ))}
        {neighbors.map((node) => (
          <a
            key={node.id}
            href={node.url}
            aria-label={node.title}
            onClick={(event) => {
              // Navegación interna, sin recargar la página
              event.preventDefault();
              history.push(node.url);
            }}
            onMouseEnter={() => setHover(node)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(node)}
            onBlur={() => setHover(null)}
          >
            {/* Zona de puntería más grande que el punto */}
            <circle cx={node.x} cy={node.y} r="9" fill="transparent" />
            <circle
              cx={node.x}
              cy={node.y}
              r={hover?.id === node.id ? 6 : 4.5}
              fill={node.tint}
              className={styles.node}
            />
          </a>
        ))}
        <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="11" className={styles.ring} />
        <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="7" fill={current.tint} />
      </svg>
      <p className={styles.caption}>
        {hover
          ? hover.title
          : `${total} ${total === 1 ? 'página enlazada' : 'páginas enlazadas'}${hiddenCount ? ` (se ven ${neighbors.length})` : ''}`}
      </p>
    </div>
  );
}
