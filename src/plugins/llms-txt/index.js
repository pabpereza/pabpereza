// Genera /llms.txt en cada build a partir del contenido que ya ha cargado
// Docusaurus (permalinks reales, títulos y descripciones del frontmatter), para
// que no se quede desactualizado. La cabecera escrita a mano está en intro.md.
const fs = require('fs');
const path = require('path');

// Orden de los cursos en el fichero; los que no estén aquí van al final
const COURSE_ORDER = ['docker', 'kubernetes', 'devops', 'devsecops', 'ansible', 'mysql', 'vim'];

const PAGES = [
  ['Sobre mí', '/about_me', 'Información sobre Pablo Pérez-Aradros'],
  ['Comunidad', '/comunidad', 'Discord Sudoers by pabpereza y niveles de la membresía de YouTube'],
  ['Grafo de contenido', '/content-graph', 'Visualización interactiva de relaciones entre contenidos'],
];

// Índices sin contenido propio: no se listan
const SKIP_DOCS = ['cursos/cursos', 'notas/notas'];
const MAX_EXCERPT = 220;

// "🐳 Curso de Docker..." -> "Curso de Docker..."
const stripEmoji = (text) => text.replace(/^[^\p{L}\p{N}]+/u, '').trim();
const oneLine = (text) => (text ?? '').replace(/\s+/g, ' ').trim();

// Si no hay description en el frontmatter, Docusaurus la saca de la primera
// línea de texto, sea lo que sea: se recorta a la última frase que quepa y, si
// no es prosa (una fila de tabla), se descarta.
function excerpt(text) {
  const flat = oneLine(text);
  if (flat.length <= MAX_EXCERPT) return flat;
  const cut = flat.slice(0, MAX_EXCERPT);
  const end = cut.lastIndexOf('. ');
  return end > 80 ? cut.slice(0, end + 1) : `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
const isProse = (text) => text !== '' && !text.startsWith('|');
function describe({frontMatter, description}) {
  if (frontMatter?.description) return frontMatter.description;
  const auto = oneLine(description);
  return isProse(auto) ? excerpt(auto) : '';
}

function link(siteUrl, title, permalink, description) {
  const desc = oneLine(description);
  // trailingSlash: false en la config; los README salen con "/" final en su permalink
  const url = `${siteUrl}${permalink.replace(/(.)\/$/, '$1')}`;
  return `- [${oneLine(title)}](${url})${desc ? `: ${desc}` : ''}`;
}

function buildLlmsTxt({siteUrl, docs, blogPosts, intro}) {
  const out = [intro.trim(), ''];

  const courses = {};
  const otherDocs = [];
  for (const doc of docs) {
    const match = doc.id.match(/^cursos\/([^/]+)\/(.+)$/);
    if (!match) {
      if (!SKIP_DOCS.includes(doc.id)) otherDocs.push(doc);
      continue;
    }
    const [, course, rest] = match;
    courses[course] ??= {readme: null, lessons: []};
    if (rest === 'README') courses[course].readme = doc;
    else courses[course].lessons.push(doc);
  }
  const rank = (c) => (COURSE_ORDER.includes(c) ? COURSE_ORDER.indexOf(c) : COURSE_ORDER.length);
  const courseNames = Object.keys(courses)
    .filter((c) => courses[c].readme)
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  out.push('## Cursos', '');
  for (const c of courseNames) {
    const {readme} = courses[c];
    out.push(link(siteUrl, stripEmoji(readme.title), readme.permalink, describe(readme)));
  }
  out.push('');

  for (const c of courseNames) {
    const {readme, lessons} = courses[c];
    // El nombre del fichero conserva el prefijo numérico (101., 102., 201.) que
    // Docusaurus quita del id: da el orden del curso
    const file = (doc) => path.basename(doc.source);
    lessons.sort((a, b) => file(a).localeCompare(file(b), 'es', {numeric: true}));
    out.push(`## ${stripEmoji(readme.frontMatter.sidebar_label ?? readme.title)} - Lecciones`, '');
    for (const doc of lessons) out.push(link(siteUrl, doc.title, doc.permalink, describe(doc)));
    out.push('');
  }

  out.push('## Blog - Artículos', '');
  const posts = blogPosts
    .map((p) => p.metadata)
    .filter((m) => !m.unlisted && !m.frontMatter?.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  for (const m of posts) out.push(link(siteUrl, m.title, m.permalink, describe(m)));
  out.push('');

  out.push('## Optional', '');
  for (const doc of otherDocs) out.push(link(siteUrl, doc.title, doc.permalink, describe(doc)));
  for (const [title, permalink, description] of PAGES) out.push(link(siteUrl, title, permalink, description));
  out.push('');

  return out.join('\n');
}

module.exports = function llmsTxtPlugin(context) {
  let content = null;
  return {
    name: 'llms-txt',
    async allContentLoaded({allContent}) {
      const docsVersions = allContent['docusaurus-plugin-content-docs']?.default?.loadedVersions ?? [];
      content = {
        docs: docsVersions.flatMap((v) => v.docs),
        blogPosts: allContent['docusaurus-plugin-content-blog']?.default?.blogPosts ?? [],
      };
    },
    async postBuild({outDir}) {
      const intro = fs.readFileSync(path.join(__dirname, 'intro.md'), 'utf8');
      const text = buildLlmsTxt({siteUrl: context.siteConfig.url, intro, ...content});
      fs.writeFileSync(path.join(outDir, 'llms.txt'), text);
    },
  };
};
