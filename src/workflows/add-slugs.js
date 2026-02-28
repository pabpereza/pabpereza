#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Función para generar slug desde el título
function generateSlug(title) {
  return title
    .toLowerCase()
    // Reemplazar caracteres acentuados
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Reemplazar espacios con guiones bajos
    .replace(/\s+/g, '_')
    // Remover caracteres especiales excepto guiones bajos y guiones
    .replace(/[^a-z0-9_-]/g, '')
    // Reemplazar múltiples guiones bajos o guiones consecutivos con uno solo
    .replace(/[_-]+/g, '_')
    // Remover guiones bajos al inicio y final
    .replace(/^_+|_+$/g, '');
}

// Función para procesar un archivo markdown
function processMarkdownFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Solo procesar si tiene título y no tiene slug
    if (data.title && !data.slug) {
      const slug = generateSlug(data.title);
      
      // Añadir el slug al frontmatter
      const newFrontmatter = {
        ...data,
        slug: slug
      };
      
      // Reconstruir el archivo
      const newContent = matter.stringify(content, newFrontmatter);
      
      // Escribir el archivo actualizado
      fs.writeFileSync(filePath, newContent, 'utf8');
      
      console.log(`✅ Añadido slug "${slug}" a: ${filePath}`);
      return true;
    } else if (!data.title) {
      console.log(`⚠️  Sin título: ${filePath}`);
      return false;
    } else if (data.slug) {
      console.log(`ℹ️  Ya tiene slug: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return false;
  }
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

// Función principal
function main() {
  const rootDir = path.join(__dirname, '..', '..');
  const cursosPath = path.join(rootDir, 'docs', 'cursos');
  
  console.log('🚀 Iniciando añadido de slugs a archivos de cursos...');
  console.log(`📁 Directorio de cursos: ${cursosPath}`);
  
  // Verificar que existe el directorio
  if (!fs.existsSync(cursosPath)) {
    console.error(`❌ El directorio de cursos no existe: ${cursosPath}`);
    return;
  }
  
  // Encontrar todos los archivos markdown en cursos
  const markdownFiles = scanDirectory(cursosPath);
  
  console.log(`📁 Encontrados ${markdownFiles.length} archivos markdown en cursos`);
  
  let processedCount = 0;
  let skippedCount = 0;
  
  // Procesar cada archivo
  markdownFiles.forEach(filePath => {
    if (processMarkdownFile(filePath)) {
      processedCount++;
    } else {
      skippedCount++;
    }
  });
  
  console.log(`\n✅ Proceso completado:`);
  console.log(`   • ${processedCount} archivos actualizados con slug`);
  console.log(`   • ${skippedCount} archivos omitidos`);
  console.log(`   • ${markdownFiles.length} archivos totales procesados`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { generateSlug, processMarkdownFile };
