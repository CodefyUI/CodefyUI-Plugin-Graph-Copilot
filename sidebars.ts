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
      label: 'Agent Workbench',
      collapsed: false,
      items: [
        'graph-editing',
        'experiments-and-research',
        'attachments',
        'conversation-history',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: ['architecture', 'backend-agent-contract', 'roadmap', 'development'],
    },
  ],
};

export default sidebars;
