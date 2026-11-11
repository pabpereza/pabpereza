// Cursos que se muestran en la home, en el índice de cursos y en el desplegable
// del navbar, en este orden. El número de capítulos lo calcula el plugin
// course-stats. `tint` es el color de cada tarjeta y `playlist`, su lista de
// YouTube (si la tiene). El logo sale de static/img/tech/<id>.svg.
const courses = [
  {
    id: 'docker', emoji: '🐳', name: 'Docker', tint: '#2496ed',
    description: 'Contenedores desde cero: imágenes, redes, volúmenes, Compose y seguridad.',
    playlist: 'https://www.youtube.com/playlist?list=PLQhxXeq1oc2n7YnjRhq7qVMzZWtDY7Zz0',
  },
  {
    id: 'kubernetes', emoji: '⚓️', name: 'Kubernetes', tint: '#5b8def',
    description: 'De tu primer pod a operar un clúster: despliegues, red, almacenamiento y seguridad.',
    playlist: 'https://www.youtube.com/playlist?list=PLQhxXeq1oc2k9MFcKxqXy5GV4yy7wqSma',
  },
  {
    id: 'ansible', emoji: '⚙️', name: 'Ansible', tint: '#ff4d4d',
    description: 'Automatiza servidores con inventarios, playbooks, roles y Vault.',
    playlist: 'https://www.youtube.com/playlist?list=PLYBkVGIKe6Nk',
  },
  {
    id: 'devops', emoji: '♾️', name: 'DevOps', tint: '#f59e0b',
    description: 'Cultura, CI/CD e infraestructura como código, con ejemplos reales.',
  },
  {
    id: 'devsecops', emoji: '🛡️', name: 'DevSecOps', tint: '#34d399',
    description: 'Seguridad dentro del ciclo de desarrollo: SAST, DAST, secretos y dependencias.',
  },
  {
    id: 'mysql', emoji: '🐬', name: 'MySQL', tint: '#5ba3d9',
    description: 'SQL y administración de bases de datos, de las consultas básicas a producción.',
  },
  {
    id: 'vim', emoji: '⚡️', name: 'Vim + Tmux', tint: '#22c55e',
    description: 'Edita y muévete por la terminal sin tocar el ratón.',
  },
];

module.exports = courses;
