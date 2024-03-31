// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pabpereza',
  tagline: 'Blog, cursos y documentación de Pabpereza DevSecOps',
  favicon: 'img/logo_icon.png',

  // Set the production url of your site here
  url: 'https://pabpereza.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'pabpereza', // Usually your GitHub org/user name.
  projectName: 'pabpereza', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      docs: {
        sidebar: {
          hideable: true,
        }
      },
      navbar: {
        title: 'PPZ - Pabpereza',
        hideOnScroll: true,
        items: [
          {
            to: '/docs/cursos', label: 'Cursos', position: 'left'
          },
          {
            to: '/docs/notas', label: 'Notas', position: 'left'
          },
          {
            to: '/blog', label: 'Blog', position: 'left'
          },
          {
            to: 'https://www.youtube.com/@Pabpereza',
            position: 'left',
            label: 'Youtube'
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'header-x-link',
            position: 'right',
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'header-instagram-link',
            position: 'right',
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'header-linkedin-link',
            position: 'right',
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'header-tiktok-link',
            position: 'right',
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'test',
            position: 'right',
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            className: 'header-github-link',
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
                label: 'Notas',
                to: '/docs/notas',
              },
              {
                label: 'Cursos',
                to: '/docs/cursos',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Blog',
                href: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/pabpereza/pabpereza',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/pabpereza/',
              },
              {
                label: 'X - Twitter',
                href: 'https://x.com/pabpereza',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pabpereza. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  themes: [ '@docusaurus/theme-mermaid'],
  plugins: [
   
  ],
};

export default config;
