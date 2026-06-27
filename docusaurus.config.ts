import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Graph Copilot',
  tagline: 'AI chat assistant for CodefyUI — build and edit node graphs by conversation',
  favicon: 'img/logo.svg',

  // Production URL and base path for GitHub Pages.
  url: 'https://treeleaves30760.github.io',
  baseUrl: '/CodefyUI-Plugin-Graph-Copilot/',

  // GitHub Pages deployment config.
  organizationName: 'treeleaves30760',
  projectName: 'CodefyUI-Plugin-Graph-Copilot',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hant'],
    localeConfigs: {
      en: {label: 'English'},
      'zh-Hant': {label: '繁體中文'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Serve the docs at the site root (this is a docs-only site).
          routeBasePath: '/',
          // "Edit this page" links resolve to docs/<file> at the repo root.
          editUrl:
            'https://github.com/treeleaves30760/CodefyUI-Plugin-Graph-Copilot/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Graph Copilot',
      logo: {
        alt: 'Graph Copilot logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/treeleaves30760/CodefyUI-Plugin-Graph-Copilot',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/'},
            {label: 'Installation', to: '/installation'},
            {label: 'Provider setup', to: '/provider-setup'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/treeleaves30760/CodefyUI-Plugin-Graph-Copilot',
            },
            {
              label: 'CodefyUI',
              href: 'https://github.com/treeleaves30760/CodefyUI-Plugin-Official',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} treeleaves30760 · MIT License · Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'toml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
