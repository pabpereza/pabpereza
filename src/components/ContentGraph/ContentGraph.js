import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide } from 'd3-force';
import graphData from '@site/src/data/content-graph.json';
import styles from './ContentGraph.module.css';

const ContentGraph = ({ isFullPage = false }) => {
  const fgRef = useRef();
  const containerRef = useRef();
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Actualizar dimensiones dinámicamente basándose en el contenedor
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const height = isFullPage 
          ? window.innerHeight - 100 // Página completa: usar casi toda la ventana
          : 500; // Página embebida: altura estándar
        
        setDimensions({
          width: Math.min(containerWidth - 40, window.innerWidth - 100), // Margen de seguridad
          height: height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullPage]);

  // Configuración de colores por jerarquía y estado
  const getNodeColor = (node) => {
    // Si hay nodos destacados y este nodo no está en la lista, oscurecerlo
    if (highlightNodes.size > 0 && !highlightNodes.has(node.id)) {
      return '#666666';
    }
    
    // Si este nodo está seleccionado, resaltarlo con un color brillante
    if (selectedNode && selectedNode.id === node.id) {
      return '#FF4444'; // Rojo brillante para máximo contraste
    }
    
    // Determinar color basándose en la jerarquía de la URL
    const pathParts = node.id.split('/').filter(part => part.length > 0);
    let baseColor;
    
    if (pathParts.length <= 3) {
      // Nodos raíz - colores oscuros e intensos para resaltar sobre el fondo
      if (pathParts[pathParts.length - 1] === 'cursos') {
        baseColor = '#000000'; // Negro para el nodo maestro "Cursos"
      } else {
        baseColor = '#FF6600'; // Naranja fosforito para carpetas principales (Docker, Kubernetes, etc.)
      }
    } else if (pathParts.length === 4) {
      // Subcarpetas de cursos - colores medios fosforitos
      baseColor = '#00FF7F'; // Verde fosforito para páginas de curso
    } else {
      // Páginas individuales más profundas - colores cálidos oscuros
      baseColor = '#B8860B'; // Dorado oscuro para páginas individuales
    }
    
    // Si el nodo no tiene conexiones, hacerlo más tenue pero visible
    if (!node.connected) {
      return '#999999'; // Gris medio para nodos desconectados
    }
    
    return baseColor;
  };

  const getNodeSize = (node) => {
    // Determinar el tamaño basándose en la jerarquía de la URL
    const pathParts = node.id.split('/').filter(part => part.length > 0);
    let baseSize;
    
    // Jerarquía de tamaños según la profundidad y tipo de contenido
    if (pathParts.length <= 3) {
      // Nodos raíz como "/docs/cursos/cursos" o carpetas principales como "/docs/cursos/docker"
      baseSize = pathParts[pathParts.length - 1] === 'cursos' ? 16 : 14; // "Cursos" es el más grande
    } else if (pathParts.length === 4) {
      // Subcarpetas de cursos como "/docs/cursos/docker/introduccion"
      baseSize = 10;
    } else {
      // Páginas individuales más profundas
      baseSize = 8;
    }
    
    // Ajustes adicionales según el estado
    if (selectedNode && selectedNode.id === node.id) {
      return baseSize + 3; // Nodo seleccionado es más grande
    }
    
    if (highlightNodes.size > 0 && highlightNodes.has(node.id)) {
      return baseSize + 1; // Nodos destacados ligeramente más grandes
    }
    
    // Reducir tamaño para nodos no conectados
    return node.connected ? baseSize : Math.max(baseSize - 2, 6);
  };

  // Función para obtener el color de fondo del texto - unificado para todos los nodos
  const getTextBackgroundColor = (node) => {
    // Todos los nodos tendrán el mismo estilo de fondo: blanco con transparencia
    return 'rgba(255, 255, 255, 0.9)';
  };

  // Función para obtener el color del texto - unificado para todos los nodos
  const getTextColor = (node) => {
    // Todos los textos serán negros para máximo contraste sobre fondo blanco
    return '#000000';
  };

  const handleNodeClick = (node) => {
    // Si hay un timeout pendiente, es un doble clic
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleNodeDoubleClick(node);
      return;
    }

    // Configurar timeout para single clic
    const timeout = setTimeout(() => {
      if (selectedNode === node) {
        // Si el nodo ya está seleccionado, deseleccionarlo
        setSelectedNode(null);
        setHighlightNodes(new Set());
        setHighlightLinks(new Set());
      } else {
        // Seleccionar nuevo nodo y resaltar sus conexiones
        setSelectedNode(node);
        
        const connectedNodes = new Set([node.id]);
        const connectedLinks = new Set();
        
        // Encontrar todas las conexiones del nodo
        graphData.links.forEach(link => {
          if (link.source === node.id || link.source.id === node.id) {
            connectedNodes.add(typeof link.target === 'object' ? link.target.id : link.target);
            connectedLinks.add(link);
          }
          if (link.target === node.id || link.target.id === node.id) {
            connectedNodes.add(typeof link.source === 'object' ? link.source.id : link.source);
            connectedLinks.add(link);
          }
        });
        
        setHighlightNodes(connectedNodes);
        setHighlightLinks(connectedLinks);
      }
      setClickTimeout(null);
    }, 250); // 250ms para detectar doble clic
    
    setClickTimeout(timeout);
  };

  const handleNodeDoubleClick = (node) => {
    if (node.category === 'blog' && node.slug) {
      // Para nodos del blog, usar directamente el slug con la ruta /blog/
      const blogUrl = `/blog/${node.slug}`;
      window.open(blogUrl, '_blank');
    } else if (node.url && node.slug) {
      // Para otros nodos, construir la URL usando el slug para una navegación más limpia
      const pathParts = node.url.split('/');
      const basePath = pathParts.slice(0, -1).join('/'); // Mantener la ruta base (ej: /docs/cursos/kubernetes)
      const slugUrl = `${basePath}/${node.slug}`;
      window.open(slugUrl, '_blank');
    } else if (node.url) {
      // Fallback a la URL original si no hay slug disponible
      window.open(node.url, '_blank');
    }
  };

  // Eliminar el comportamiento de hover que causa problemas de zoom
  const handleNodeHover = (node) => {
    // Sin efectos de hover para evitar problemas de usabilidad
    return;
  };

  // Configurar las fuerzas después de que el grafo se monte
  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;
      
      // Añadir fuerza de colisión personalizada para evitar solapamientos
      fg.d3Force('collision', forceCollide().radius(node => {
        const nodeSize = getNodeSize(node);
        const baseRadius = nodeSize * 2.5; // Coincidir con el nodeRadius visual
        // Los nodos más grandes necesitan más espacio
        const spacingMultiplier = nodeSize > 12 ? 3.5 : nodeSize > 10 ? 3.0 : 2.5;
        return baseRadius + (35 * spacingMultiplier / 2.5);
      }).strength(1));

      // Configurar fuerzas con mayor separación para nodos grandes
      fg.d3Force('charge').strength(-800).distanceMin(200).distanceMax(1000);
      fg.d3Force('link').distance(250).strength(0.15); // Enlaces más largos para mejor separación
      fg.d3Force('center').strength(0.03); // Centro más suave
    }
  }, []);

  // Limpiar timeout al desmontar componente
  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.graphContainer}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeVal={(node) => getNodeSize(node) * 2.5}
          nodeColor={getNodeColor}
          nodeLabel={(node) => {
            const label = node.title;
            return `📄 ${label}${node.description ? `\n${node.description}` : ''}`;
          }}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.title;
            const nodeSize = getNodeSize(node);
            const fontSize = Math.max(10, Math.min(16, nodeSize + 2) / globalScale); // Tamaño de fuente proporcional al nodo
            const nodeRadius = nodeSize * 2.5;
            
            // Solo dibujar el texto, el nodo ya está dibujado
            ctx.font = `bold ${fontSize}px Arial, sans-serif`; // Negrita y fuente más legible
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Fondo semitransparente para mejorar legibilidad
            // Los nodos más grandes pueden mostrar más texto
            const maxChars = nodeSize > 12 ? 25 : nodeSize > 10 ? 20 : 18;
            const truncatedLabel = label.length > maxChars ? 
              label.substring(0, maxChars) + '...' : label;
            
            const textMetrics = ctx.measureText(truncatedLabel);
            const textWidth = textMetrics.width;
            const textHeight = fontSize;
            const textY = node.y + nodeRadius + fontSize + 10; // Más espacio para nodos grandes
            
            // Obtener colores unificados
            const backgroundColor = getTextBackgroundColor(node);
            const textColor = getTextColor(node);
            
            // Configurar parámetros para el rectángulo redondeado
            const rectX = node.x - textWidth/2 - 6;
            const rectY = textY - textHeight/2 - 3;
            const rectWidth = textWidth + 12;
            const rectHeight = textHeight + 6;
            const borderRadius = 6; // Radio para bordes redondeados
            
            // Dibujar fondo del texto con bordes redondeados
            ctx.fillStyle = backgroundColor;
            ctx.beginPath();
            ctx.roundRect(rectX, rectY, rectWidth, rectHeight, borderRadius);
            ctx.fill();
            
            // Dibujar borde unificado con estilo elegante
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'; // Borde gris sutil para todos
            ctx.lineWidth = 1; // Grosor uniforme y delgado
            ctx.beginPath();
            ctx.roundRect(rectX, rectY, rectWidth, rectHeight, borderRadius);
            ctx.stroke();
            
            // Color del texto unificado
            if (highlightNodes.size > 0 && !highlightNodes.has(node.id)) {
              ctx.fillStyle = '#666'; // Gris para nodos no destacados
            } else {
              ctx.fillStyle = textColor; // Negro para todos los demás
            }
            
            // Dibujar el texto
            ctx.fillText(truncatedLabel, node.x, textY);
          }}
          linkColor={(link) => {
            if (highlightLinks.size > 0) {
              return highlightLinks.has(link) ? '#FF6B6B' : '#e0e0e0';
            }
            return '#cccccc';
          }}
          linkWidth={(link) => {
            return highlightLinks.has(link) ? 3 : 1;
          }}
          linkOpacity={(link) => {
            if (highlightLinks.size > 0) {
              return highlightLinks.has(link) ? 0.8 : 0.2;
            }
            return 0.4;
          }}
          onNodeClick={handleNodeClick}
          onNodeRightClick={handleNodeDoubleClick}
          onNodeHover={null}
          enableNodeDrag={false}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          cooldownTicks={200}
          d3AlphaDecay={0.01}
          d3VelocityDecay={0.4}
          backgroundColor="rgba(0,0,0,0)"
        />
      </div>
    </div>
  );
};

export default ContentGraph;
