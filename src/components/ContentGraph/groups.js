import courses from '@site/src/data/courses';

// Grupos del mapa de contenido: cada curso con su color (src/data/courses.js),
// más el blog y el resto de páginas. Lo comparten el mapa completo y el local.
export const GROUPS = [
  ...courses.map(({id, name, tint}) => ({id, name, tint})),
  {id: 'blog', name: 'Blog', tint: '#e2e8f0'},
  {id: 'otros', name: 'Otros', tint: '#94a3b8'},
];

export const GROUP = Object.fromEntries(GROUPS.map((group) => [group.id, group]));

export function groupOf(url) {
  const course = url.match(/^\/docs\/cursos\/([^/]+)/)?.[1];
  if (course && GROUP[course]) return course;
  return url.startsWith('/blog') ? 'blog' : 'otros';
}

// "🐳 Docker" -> "Docker": en el mapa los emojis estorban
export const clean = (title) => title.replace(/^[^\p{L}\p{N}¿¡]+/u, '').trim();
