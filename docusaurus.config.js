// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pabpereza',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/logo_icon.jpeg',

  // Set the production url of your site here
  url: 'https://pabpereza.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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
        title: 'Pabpereza',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            to: '/blog', label: 'Blog', position: 'left'
          },
          {
            to: '/portfolio', label: 'Portfolio', position: 'left'
          },
          {
            href: 'https://github.com/pabpereza/pabpereza',
            label: 'GitHub',
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
                label: 'Documentación',
                to: '/docs/',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/pabperezacom',
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
  themes: ['docusaurus-portfolio-theme', '@docusaurus/theme-mermaid'],
  plugins: [
    [
    'docusaurus-portfolio-plugin',
    {
      username: 'pabpereza',                  // User's GitHub username
      path: 'portfolio',                                     // Path in site where page will be served
      routeBasePath: 'portfolio',
      pageTitle: 'Portfolio',
      pageDescription: 'My GitHub Repos',
      portfolioPageComponent: '@theme/PortfolioPage',
      userOptions: {
        fullname: 'Pablo Pérez-Aradros',                                 // Name to be displayed in usercard
        links: [],                                    // UNIMPLEMENTED: Links to be displayed in usercard
      },
      repoOptions: {
          type: 'public',                                   // Type of repos to be queried
                                                      // ['all','public','private','forks','sources','member','internal']
          sort: 'stargazers_count',                                   // Field to sort repos using
                                                      // ['created','updated','pushed','full_name','size','stargazers_count','watchers_count','forks_count',]
          direction: 'desc',                              // Direction repos will be sorted in
                                                      // ['asc','desc']
          numRepos: 6                  // Number of repos. Default: all.
      }
    }
    ]
  ],
};

export default config;
