// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import 'dotenv/config';
import courses from './src/data/courses.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pabpereza',
  tagline: 'Blog, cursos y documentación de Pabpereza DevSecOps',
  favicon: 'img/logo_nav.png',

  // Set the production url of your site here
  url: 'https://pabpereza.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pabpereza', // Usually your GitHub org/user name.
  projectName: 'pabpereza', // Usually your repo name.

  // ENV Variables
  customFields: {
    youtubeAPIKey: process.env.YOUTUBE_API_KEY,
  },

  // Recomendado por Docusaurus: adelantar los cambios de v4 y builds con Rspack/SWC
  // (@docusaurus/faster)
  future: {
    v4: true,
    faster: true,
  },

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    // future.v4 lo desactiva por defecto; el contenido usa comentarios HTML
    // (<!-- truncate -->), admonitions y heading ids al estilo MDX1
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/pabpereza/pabpereza/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/pabpereza/pabpereza/tree/main/',
          postsPerPage: 3,
          blogSidebarCount: 'ALL'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // Analytics va en `plugins`, detrás de cookie-consent
      }),

    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        }
      },
      navbar: {
        title: 'pabpereza',
        logo: {
          alt: 'Logo de pabpereza',
          src: 'img/logo_nav.png',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'dropdown',
            label: 'Cursos',
            to: '/docs/cursos',
            position: 'left',
            items: [
              ...courses.map(({id, emoji, name}) => ({
                label: `${emoji} ${name}`,
                to: `/docs/cursos/${id}`,
              })),
              {type: 'html', value: '<hr class="dropdown-separator">'},
              {label: 'Todos los cursos', to: '/docs/cursos'},
              {label: 'Mapa de contenido', to: '/content-graph'},
            ],
          },
          {
            to: '/blog', label: 'Blog', position: 'left'
          },
          {
            to: '/comunidad', label: 'Comunidad', position: 'left'
          },
          {
            to: '/about_me', label: 'Sobre mí', position: 'left'
          },
          {
            type: 'custom-youtubeSubscriberBadge',
            position: 'right',
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'header-github-link',
            'aria-label': 'Repositorio en GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Contenido',
            items: [
              {
                label: 'Cursos',
                to: '/docs/cursos',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Mapa de contenido',
                to: '/content-graph',
              },
            ],
          },
          {
            title: 'Comunidad',
            items: [
              {
                label: 'Discord y membresía',
                to: '/comunidad',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@Pabpereza?sub_confirmation=1',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/pabpereza/pabpereza',
              },
            ],
          },
          {
            title: 'Redes',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/pabpereza/',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/pabpereza/',
              },
              {
                label: 'X',
                href: 'https://x.com/pabpereza',
              },
              {
                label: 'TikTok',
                href: 'https://www.tiktok.com/@pabpereza',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Política de privacidad',
                to: '/privacidad',
              },
              {
                label: 'Política de cookies',
                to: '/cookies',
              },
              {
                // Reabre el aviso de cookies (src/components/CookieConsent)
                html: '<a class="footer__link-item" href="#" onclick="event.preventDefault(); window.dispatchEvent(new Event(\'cookie-consent-open\'));">Gestionar cookies</a>',
              },
              {
                label: 'Aviso legal',
                to: '/aviso-legal',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Pablo Pérez-Aradros · Hecho con Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        // Lenguajes que no vienen en el bundle por defecto de prism-react-renderer
        additionalLanguages: [
          'bash', 'docker', 'sql', 'ini', 'properties', 'hcl', 'powershell',
          'groovy', 'ruby', 'nginx', 'toml', 'diff', 'rego', 'promql', 'vim',
          'puppet', 'markup-templating', 'django', 'ignore',
        ],
      },
      // Fallback global: description y keywords de cada página mandan sobre estas
      metadata: [
        { name: 'keywords', content: 'devsecops, devops, programación, docker, kubernetes, seguridad, blog, ansible, contenedores, containers, orquestación, ci/cd, pipelines, infraestructura como código, iac, linux, terminal, vim, neovim, mysql, sql, bases de datos, sre, cloud native, cncf, certificación cka, certificación ckad, homelab, raspberry pi, automatización, cursos gratis, español, aprender docker, aprender kubernetes, aprender ansible, devsecops español, docker tutorial, kubernetes tutorial'},
        { name: 'description', content: 'Blog, cursos y documentación de DevOps, Seguridad, programación, docker, kubernetes y mucho más.'},
      ],
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

    }),
  // headTags va en la raíz de la config: dentro de themeConfig se ignora
  headTags: [
    // La fuente de los titulares se pide cuanto antes para que no salten al cargar
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/geist-latin-wght-normal.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
    // Declare a <link> preconnect tag
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://pabpereza.dev',
      },
    },
    // Datos estructurados globales (JSON-LD). Cursos y vídeos enlazan a
    // estas entidades por su @id desde src/components/DocStructuredData
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://pabpereza.dev/#pablo',
            name: 'Pablo Pérez-Aradros',
            alternateName: 'pabpereza',
            jobTitle: 'Especialista en ciberseguridad y DevSecOps',
            description: 'Divulgador de DevOps, DevSecOps, Docker y Kubernetes en español en YouTube y en pabpereza.dev.',
            url: 'https://pabpereza.dev/',
            image: 'https://pabpereza.dev/img/perfil-2024-transparent.png',
            sameAs: [
              'https://www.youtube.com/@Pabpereza',
              'https://www.linkedin.com/in/pabpereza/',
              'https://github.com/pabpereza',
              'https://x.com/pabpereza',
              'https://www.instagram.com/pabpereza/',
            ],
            hasCredential: [
              { '@type': 'EducationalOccupationalCredential', name: 'Certified Kubernetes Administrator (CKA)', recognizedBy: { '@type': 'Organization', name: 'Cloud Native Computing Foundation' } },
              { '@type': 'EducationalOccupationalCredential', name: 'Certified Kubernetes Application Developer (CKAD)', recognizedBy: { '@type': 'Organization', name: 'Cloud Native Computing Foundation' } },
              { '@type': 'EducationalOccupationalCredential', name: 'Kubestronaut', recognizedBy: { '@type': 'Organization', name: 'Cloud Native Computing Foundation' } },
            ],
            knowsAbout: ['DevSecOps', 'DevOps', 'Docker', 'Kubernetes', 'Ansible', 'Ciberseguridad', 'CI/CD'],
          },
          {
            '@type': 'Organization',
            '@id': 'https://pabpereza.dev/#org',
            name: 'Pabpereza.dev',
            url: 'https://pabpereza.dev/',
            logo: 'https://pabpereza.dev/img/logo.png',
            founder: { '@id': 'https://pabpereza.dev/#pablo' },
          },
          {
            '@type': 'WebSite',
            '@id': 'https://pabpereza.dev/#web',
            name: 'Pabpereza.dev',
            url: 'https://pabpereza.dev/',
            inLanguage: 'es',
            publisher: { '@id': 'https://pabpereza.dev/#org' },
            author: { '@id': 'https://pabpereza.dev/#pablo' },
          },
        ],
      }),
    },
  ],
  themes: [ '@docusaurus/theme-mermaid'],
  plugins: [
    // El orden importa: el modo de consentimiento tiene que ir antes que gtag
    './src/plugins/cookie-consent',
    ['@docusaurus/plugin-google-gtag', { trackingID: 'G-40PL0BKGD3' }],
    // /llms.txt generado en cada build desde el contenido real (cabecera en intro.md)
    './src/plugins/llms-txt',
    './src/plugins/course-stats',
    './src/plugins/channel-metrics',
    './src/plugins/latest-posts',
    require.resolve('docusaurus-lunr-search'),
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Slugs antiguos del curso de Ansible aun indexados en Google (ver
          // .channel/ansible/seo-auditoria-2026-08-27.md, hallazgo D4)
          {
            from: '/docs/cursos/ansible/curso_ansible',
            to: '/docs/cursos/ansible',
          },
          {
            from: '/docs/cursos/ansible/ansible_entornos_reales_proyecto_final',
            to: '/docs/cursos/ansible/ansible_proyecto_final_infraestructura_quotes',
          },
          // Comunidad Sudoers by pabpereza; si cambia la invitacion, solo se toca aqui
          {
            from: '/discord',
            to: 'https://discord.gg/CpHVzDAaBW',
          },
        ],
      },
    ],
  ],
};

export default config;
