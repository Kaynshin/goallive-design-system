import './challenge-card.css';
import { createChallengeCard } from './challenge-card.js';

/**
 * Organisms / Challenge Card — `.gl-challenge-card`. Composed from the
 * GoalGauge molecule (section `#organisms`, "Carte de défi").
 */
export default {
  title: 'Organisms/Challenge Card',
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: 'text' },
    tier: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    current: { control: { type: 'range', min: 0, max: 400, step: 5 } },
    target: { control: { type: 'range', min: 50, max: 400, step: 10 } },
    supportAmount: { control: 'number' },
  },
  args: {
    status: 'Actif',
    tier: 'Épique · SUB',
    title: 'Finir le Nightmare sans checkpoint',
    description: 'Une seule run, zéro mort. Si la communauté remplit le goal, Nyxoraa tente le run en direct, immédiatement.',
    current: 120,
    target: 300,
    supportAmount: 25,
  },
};

export const Playground = {
  render: (args) => createChallengeCard(args),
};

export const Unlocked = {
  argTypes: { current: { control: false } },
  render: (args) => createChallengeCard({ ...args, current: args.target }),
};
