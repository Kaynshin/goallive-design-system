import './obs-overlay.css';
import { createOBSOverlay } from './obs-overlay.js';

/**
 * Organisms / OBS Overlay — `.gl-obs-overlay`. Browser-source overlay
 * incrusted on the live game feed, 1920×1080, transparent background
 * (section `#organisms`; screen 13 of the Showcase).
 */
export default {
  title: 'Organisms/OBS Overlay',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    current: { control: { type: 'range', min: 0, max: 400, step: 5 } },
    target: { control: { type: 'range', min: 50, max: 400, step: 10 } },
    challenge: { control: 'text' },
    lastSupport: { control: 'text' },
  },
  args: {
    current: 120,
    target: 300,
    challenge: 'Speedrun World 1 < 4 min',
    lastSupport: '« plus 25 » · Korrigan_TV',
  },
};

export const Playground = {
  render: (args) => createOBSOverlay(args),
};

export const GoalUnlocked = {
  argTypes: { current: { control: false } },
  render: (args) => createOBSOverlay({ ...args, current: args.target }),
};
