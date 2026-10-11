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
        'llm-training-research',
        'vla-research',
        'attachments',
        'conversation-history',
      ],
    },
    {
      type: 'category',
      label: 'Paper Reproductions',
      collapsed: false,
      items: [
        'paper-reproductions',
        'paper-early-convs',
        'paper-chinchilla',
        'paper-flow-matching',
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
