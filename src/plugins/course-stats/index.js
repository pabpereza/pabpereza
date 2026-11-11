// Cuenta los capítulos de cada curso (ficheros "101.Titulo.md") y el tamaño
// del mapa de contenido, y los expone como global data, para que la home, el
// índice de cursos y Sobre mí no lleven números a mano.
const fs = require('fs');
const path = require('path');

module.exports = function courseStats(context) {
  const root = path.join(context.siteDir, 'docs/cursos');
  // Lo genera `npm run generate-graph` (prebuild) a partir del contenido
  const graphFile = path.join(context.siteDir, 'src/data/content-graph.json');
  return {
    name: 'course-stats',
    async loadContent() {
      const chapters = {};
      for (const entry of fs.readdirSync(root, {withFileTypes: true})) {
        if (!entry.isDirectory()) continue;
        chapters[entry.name] = fs
          .readdirSync(path.join(root, entry.name))
          .filter((file) => /^\d+\..+\.mdx?$/.test(file)).length;
      }
      const {nodes, links} = JSON.parse(fs.readFileSync(graphFile, 'utf8'));
      return {chapters, graph: {pages: nodes.length, links: links.length}};
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
    getPathsToWatch() {
      return [path.join(root, '*/*.{md,mdx}'), graphFile];
    },
  };
};
