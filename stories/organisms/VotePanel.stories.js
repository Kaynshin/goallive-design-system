import './vote-panel.css';
import { createVotePanel } from './vote-panel.js';

/**
 * Organisms / Vote Panel — `.gl-vote-panel`. 2-3 challenges, weighted sub vote,
 * countdown (section `#organisms`, "Panneau de vote"; screen 12 of the
 * Showcase).
 */
export default {
  title: 'Organisms/Vote Panel',
  parameters: { layout: 'padded' },
  argTypes: {
    question: { control: 'text' },
    countdown: { control: 'number' },
    subWeight: { control: 'number' },
  },
  args: {
    question: 'Quel défi Nyxoraa relève cette session ?',
    countdown: 42,
    subWeight: 2,
  },
};

export const Playground = {
  render: (args) => createVotePanel(args),
};

export const TwoChallenges = {
  render: (args) =>
    createVotePanel({
      ...args,
      voteOptions: [
        { id: 'o1', label: 'Battre Margit sans soin', percent: 64 },
        { id: 'o2', label: 'No-hit jusqu\'au check 3', percent: 36 },
      ],
    }),
};
