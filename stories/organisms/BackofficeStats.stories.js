import './backoffice-stats.css';
import { createBackofficeStats } from './backoffice-stats.js';

/**
 * Organisms / Backoffice Stats — `.gl-backoffice-stats`. Participation rate
 * (the platform's #1 metric), contributors, tokens released, and a recent
 * sessions chart (section `#organisms`, "Back-office · stats"; screen 11 of
 * the Showcase).
 */
export default {
  title: 'Organisms/Backoffice Stats',
  parameters: { layout: 'padded' },
  argTypes: {
    participation: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    contributors: { control: 'number' },
    tokensReleased: { control: 'number' },
  },
  args: {
    participation: 72,
    contributors: 340,
    tokensReleased: 1240,
  },
};

export const Playground = {
  render: (args) => createBackofficeStats(args),
};
