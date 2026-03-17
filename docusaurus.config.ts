import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'LobbyLink',
  tagline: 'Godot Multiplayer made simple',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, 
  },

  url: 'https://lobbylink.github.io',
  
  baseUrl: '/documentation/',
  trailingSlash: false,

  organizationName: 'lobbylink', 
  projectName: 'documentation', 

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'webrtc',
          path: 'webrtc',
          routeBasePath: 'webrtc',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/LobbyLink/documentation/tree/main',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lobbylink',
        path: 'lobbylink',
        routeBasePath: 'lobbylink',
        sidebarPath: './sidebars.ts', 
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'LobbyLink',
      logo: {
        alt: 'LobbyLink Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'webrtcSidebar',
          position: 'left',
          label: 'WebRTC',
          docsPluginId: "webrtc",
        },
        {
          type: 'docSidebar',
          sidebarId: 'lobbylinkSidebar',
          position: 'left',
          label: 'LobbyLink',
          docsPluginId: "lobbylink",
        },
        {
          to: '/blog', 
          label: 'Blog', 
          position: 'left',
        },
        {
          href: 'https://github.com/lobbylink/documentation',
          label: 'GitHub',
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
            {
              label: 'WebRTC',
              to: '/webrtc/intro',
            },
            {
              label: 'LobbyLink',
              to: '/lobbylink/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lobbylink/documentation',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LobbyLink, built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
