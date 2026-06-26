import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['intro', 'installation', 'provider-setup'],
    },
    {
      type: 'category',
      label: 'Using Graph Copilot',
      collapsed: false,
      items: ['graph-editing', 'attachments', 'conversation-history'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['architecture', 'development'],
    },
  ],
};

export default sidebars;
