import './atoms.css';

/**
 * Atoms / Badge — badges & perks. `.gl-badge` / `.gl-badge--signal` from dist/goallive.css.
 */
export default {
  title: 'Atoms/Badge',
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['signal', 'neutral'] },
    label: { control: 'text' },
  },
  args: {
    variant: 'signal',
    label: '★ Patron du mois',
  },
};

function renderBadge({ variant, label }) {
  const className = variant === 'signal' ? 'gl-badge gl-badge--signal' : 'gl-badge';
  return `<span class="${className}">${label}</span>`;
}

export const Playground = {
  render: (args) => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:inline-block;">
      ${renderBadge(args)}
    </div>
  `,
};

const PERKS = [
  { variant: 'signal', label: '★ Patron du mois' },
  { variant: 'neutral', label: 'Sub Twitch' },
  { variant: 'neutral', label: '⚔ Top challenger' },
  { variant: 'neutral', label: 'Vote pondéré ×2' },
];

export const AllPerks = {
  argTypes: { variant: { control: false }, label: { control: false } },
  render: () => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;flex-wrap:wrap;gap:8px;">
      ${PERKS.map(renderBadge).join('')}
    </div>
  `,
};
