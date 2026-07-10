import './creator-dashboard.css';
import { createCreatorDashboard } from './creator-dashboard.js';

/**
 * Organisms / Creator Dashboard — `.gl-creator-dashboard`. Propose / validate
 * challenges, session gains, and participation stats (section `#organisms`,
 * "Dashboard créateur"; screen 02 of the Showcase).
 */
export default {
  title: 'Organisms/Creator Dashboard',
  parameters: { layout: 'padded' },
  argTypes: {
    proposedTitle: { control: 'text' },
    proposedTarget: { control: 'number' },
    gains: { control: 'number' },
    honored: { control: 'text' },
    participation: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    proposedTitle: 'Finir le Nightmare sans checkpoint',
    proposedTarget: 300,
    gains: 142,
    honored: '3 / 3',
    participation: 72,
  },
};

export const Playground = {
  render: (args) => createCreatorDashboard(args),
};
