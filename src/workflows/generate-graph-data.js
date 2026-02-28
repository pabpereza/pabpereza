#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Función para crear URLs compatibles con Docusaurus
function createDocusaurusUrl(filePath, rootDir, frontmatter = {}) {
  const relativePath = path.relative(rootDir, filePath);
  
  if (relativePath.startsWith('blog/')) {
    // Para blog posts, mantener lógica existente
    const blogPath = relativePath.replace('blog/', '');
    const dirName = path.dirname(blogPath);
    const fileName = path.basename(blogPath, path.extname(blogPath));
    
    if (dirName !== '.' && !fileName.includes('_')) {
      return `/blog/${dirName}`;
    }
    return `/blog/${fileName}`;
  } else if (relativePath.startsWith('docs/')) {
    // Para docs, usar la estructura de directorios + sidebar_label
    const docPath = relativePath.replace('docs/', '');
    const dirParts = path.dirname(docPath).split('/').filter(part => part !== '.');
    
    // Si el archivo es un index/README, usar solo la carpeta
    const fileName = path.basename(docPath, path.extname(docPath));
    if (fileName.toLowerCase() === 'readme' || fileName === 'index') {
      return `/docs/${dirParts.join('/')}`;
    }
    
    // Si el nombre del archivo coincide con la carpeta padre, usar solo la carpeta
    const parentDir = dirParts[dirParts.length - 1];
    if (parentDir && fileName.toLowerCase() === parentDir.toLowerCase()) {
      return `/docs/${dirParts.join('/')}`;
    }
    
    // Usar sidebar_label si está disponible, sino usar el nombre del archivo limpio
    let urlSegment = frontmatter.sidebar_label;
    if (!urlSegment) {
      // Fallback: limpiar el nombre del archivo
      urlSegment = fileName.replace(/^\d+\./, ''); // Remover prefijo numérico
    }
    
    // Convertir a formato URL (estilo Docusaurus con guiones bajos)
    urlSegment = urlSegment
      .toLowerCase()
      .normalize('NFD')                // Normalizar caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos (tildes, acentos)
      .replace(/\s+/g, '_')            // Espacios a guiones bajos (estilo Docusaurus)
      .replace(/[^a-z0-9_]/g, '')      // Remover caracteres especiales excepto guiones bajos
      .replace(/_+/g, '_')             // Múltiples guiones bajos a uno solo
      .replace(/^_|_$/g, '');          // Remover guiones bajos al inicio/final
    
    // Construir URL final
    const allParts = [...dirParts, urlSegment];
    return `/docs/${allParts.join('/')}`;
  }
  
  return null;
}

// Función para resolver URLs relativas a absolutas
function resolveRelativeUrl(baseUrl, relativeUrl) {
  if (relativeUrl.startsWith('/')) {
    return relativeUrl; // Ya es absoluta
  }
  
  // Resolver URL relativa basada en la URL base
  const baseParts = baseUrl.split('/').slice(0, -1); // Quitar el último segmento
  const relativeParts = relativeUrl.split('/');
  
  for (const part of relativeParts) {
    if (part === '..') {
      baseParts.pop();
    } else if (part !== '.') {
      baseParts.push(part);
    }
  }
  
  return baseParts.join('/');
}

// Función para extraer frontmatter y contenido
function extractFileData(filePath, rootDir) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    const url = createDocusaurusUrl(filePath, rootDir, data);
    const title = data.sidebar_label || data.title || path.basename(filePath, path.extname(filePath));
    
    return {
      id: url || filePath,
      title: title,
      description: data.description || '',
      category: filePath.includes('blog/') ? 'blog' : 'docs',
      url: url,
      slug: data.slug || null,
      filePath: filePath,
      content: content,
      frontmatter: data
    };
  } catch (error) {
    console.error(`Error procesando ${filePath}:`, error.message);
    return null;
  }
}

// Función para extraer enlaces internos del contenido markdown
function extractInternalLinks(content, sourceUrl, allDocuments) {
  const links = [];
  
  // Patrones para enlaces internos
  const patterns = [
    // Enlaces absolutos internos: [texto](/docs/...) o [texto](/blog/...)
    /\[([^\]]+)\]\((\/docs\/[^)#\s]+|\/blog\/[^)#\s]+)\)/g,
    // Enlaces relativos: [texto](./archivo.md) o [texto](../carpeta/archivo.md)
    /\[([^\]]+)\]\((\.\.?\/[^)#\s]+\.mdx?)\)/g,
    // Enlaces de referencia de estilo Docusaurus
    /\[([^\]]+)\]\(([^)#\s]+\.mdx?)\)/g
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      let targetUrl = match[2];
      
      // Limpiar la URL de fragmentos y parámetros
      targetUrl = targetUrl.split('#')[0].split('?')[0].trim();
      
      if (!targetUrl) continue;
      
      // Si es una URL relativa, convertirla a absoluta
      if (!targetUrl.startsWith('/')) {
        // Para URLs relativas, intentar resolverlas
        if (targetUrl.endsWith('.md') || targetUrl.endsWith('.mdx')) {
          // Buscar directamente el archivo en la misma carpeta que el documento actual
          const sourceDoc = allDocuments.find(doc => doc.url === sourceUrl);
          if (sourceDoc) {
            const sourceDir = path.dirname(sourceDoc.filePath);
            
            // Resolver la ruta relativa
            let resolvedPath;
            if (targetUrl.startsWith('./')) {
              // Enlace en la misma carpeta
              resolvedPath = path.join(sourceDir, targetUrl.substring(2));
            } else if (targetUrl.startsWith('../')) {
              // Enlace en carpeta padre
              resolvedPath = path.resolve(sourceDir, targetUrl);
            } else {
              // Enlace directo (sin ./ o ../)
              resolvedPath = path.join(sourceDir, targetUrl);
            }
            
            // Normalizar la ruta
            resolvedPath = path.normalize(resolvedPath);
            
            // Buscar el documento que corresponde a esta ruta
            const targetDoc = allDocuments.find(doc => {
              const docPath = path.normalize(doc.filePath);
              return docPath === resolvedPath || 
                     docPath === resolvedPath.replace('.md', '.mdx') ||
                     docPath === resolvedPath.replace('.mdx', '.md');
            });
            
            if (targetDoc) {
              targetUrl = targetDoc.url;
              console.log(`🔗 Enlace relativo resuelto: ${match[2]} → ${targetUrl}`);
            } else {
              console.log(`⚠️  No se encontró el archivo: ${resolvedPath}`);
              continue;
            }
          } else {
            console.log(`⚠️  No se encontró el documento origen: ${sourceUrl}`);
            continue;
          }
        } else {
          continue; // Ignorar otros tipos de enlaces relativos
        }
      }
      
      // Solo procesar enlaces internos de docs y blog
      if (targetUrl.startsWith('/docs/') || targetUrl.startsWith('/blog/')) {
        // Buscar si este URL existe en nuestros documentos
        const targetDoc = allDocuments.find(doc => doc.url === targetUrl);
        if (targetDoc && targetDoc.url !== sourceUrl) {
          links.push({
            source: sourceUrl,
            target: targetUrl,
            type: 'internal_link'
          });
        }
      }
    }
  });
  
  return links;
}

// Función para escanear directorio recursivamente
function scanDirectory(dirPath, extensions = ['.md', '.mdx']) {
  const results = [];
  
  function scanRecursive(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanRecursive(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          results.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error escaneando directorio ${currentDir}:`, error.message);
    }
  }
  
  scanRecursive(dirPath);
  return results;
}

// Función principal para generar datos del grafo
function generateGraphData() {
  const rootDir = path.join(__dirname, '..', '..');
  const docsPath = path.join(rootDir, 'docs');
  const blogPath = path.join(rootDir, 'blog');
  
  // Escanear archivos
  const docFiles = scanDirectory(docsPath);
  const blogFiles = scanDirectory(blogPath);
  const allFiles = [...docFiles, ...blogFiles];
  
  console.log(`🔍 Encontrados ${allFiles.length} archivos markdown`);
  
  // Extraer datos de todos los archivos
  const allDocuments = [];
  allFiles.forEach(filePath => {
    const data = extractFileData(filePath, rootDir);
    if (data && data.url) {
      allDocuments.push(data);
    }
  });
  
  console.log(`📄 Procesados ${allDocuments.length} documentos válidos`);
  
  // Crear nodos solo para documentos que tienen contenido
  const nodes = allDocuments.map(doc => ({
    id: doc.url,
    title: doc.title,
    type: 'content',
    category: doc.category,
    description: doc.description,
    url: doc.url,
    slug: doc.slug,
    val: 8 // Tamaño base del nodo
  }));
  
  // Extraer enlaces internos entre documentos
  console.log(`🔗 Extrayendo enlaces internos...`);
  const links = [];
  allDocuments.forEach(doc => {
    const docLinks = extractInternalLinks(doc.content, doc.url, allDocuments);
    links.push(...docLinks);
  });
  
  // Eliminar enlaces duplicados
  const uniqueLinks = [];
  const linkSet = new Set();
  links.forEach(link => {
    const linkKey = `${link.source}->${link.target}`;
    const reverseLinkKey = `${link.target}->${link.source}`;
    
    // Evitar enlaces duplicados y auto-referencias
    if (!linkSet.has(linkKey) && !linkSet.has(reverseLinkKey) && link.source !== link.target) {
      linkSet.add(linkKey);
      uniqueLinks.push(link);
    }
  });
  
  // Filtrar nodos que no tienen conexiones (aislados)
  const connectedNodeIds = new Set();
  uniqueLinks.forEach(link => {
    connectedNodeIds.add(link.source);
    connectedNodeIds.add(link.target);
  });
  
  // Mantener todos los nodos pero marcar los conectados
  const finalNodes = nodes.map(node => ({
    ...node,
    connected: connectedNodeIds.has(node.id),
    val: connectedNodeIds.has(node.id) ? 10 : 6 // Nodos conectados más grandes
  }));
  
  return { 
    nodes: finalNodes, 
    links: uniqueLinks 
  };
}

// Generar y guardar datos
console.log(`🚀 Iniciando generación del grafo de contenido...`);
const graphData = generateGraphData();

// Crear directorio de salida si no existe
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Guardar datos
fs.writeFileSync(
  path.join(outputDir, 'content-graph.json'),
  JSON.stringify(graphData, null, 2)
);

console.log(`\n✅ Grafo generado exitosamente!`);
console.log(`📊 Estadísticas:`);
console.log(`   • ${graphData.nodes.length} documentos procesados`);
console.log(`   • ${graphData.links.length} enlaces internos encontrados`);

const blogNodes = graphData.nodes.filter(n => n.category === 'blog').length;
const docsNodes = graphData.nodes.filter(n => n.category === 'docs').length;
const connectedNodes = graphData.nodes.filter(n => n.connected).length;

console.log(`   • ${blogNodes} posts de blog`);
console.log(`   • ${docsNodes} documentos de cursos`);
console.log(`   • ${connectedNodes} documentos con enlaces`);
console.log(`   • ${graphData.nodes.length - connectedNodes} documentos aislados`);

// Mostrar algunos ejemplos de enlaces encontrados
if (graphData.links.length > 0) {
  console.log(`\n🔗 Ejemplos de enlaces encontrados:`);
  graphData.links.slice(0, 5).forEach(link => {
    const sourceNode = graphData.nodes.find(n => n.id === link.source);
    const targetNode = graphData.nodes.find(n => n.id === link.target);
    if (sourceNode && targetNode) {
      console.log(`   "${sourceNode.title}" → "${targetNode.title}"`);
    }
  });
  
  if (graphData.links.length > 5) {
    console.log(`   ... y ${graphData.links.length - 5} enlaces más`);
  }
}

console.log(`\n📁 Datos guardados en: src/data/content-graph.json`);