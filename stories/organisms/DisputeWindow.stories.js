import './dispute-window.css';
import { createDisputeWindow } from './dispute-window.js';

/**
 * Organisms / Dispute Window — `.gl-dispute-window`. "Non honoré" reporting +
 * auto-recredit (section `#organisms`, "Fenêtre de litige"; screens 09/14 of
 * the Showcase).
 */
export default {
  title: 'Organisms/Dispute Window',
  parameters: { layout: 'padded' },
  argTypes: {
    flags: { control: { type: 'range', min: 0, max: 26, step: 1 } },
    total: { control: 'number' },
  },
  args: {
    flags: 18,
    total: 26,
  },
};

export const Playground = {
  render: (args) => createDisputeWindow(args),
};

export const NearThreshold = {
  argTypes: { flags: { control: false } },
  render: (args) => createDisputeWindow({ ...args, flags: Math.ceil(args.total * 0.6) - 1 }),
};
