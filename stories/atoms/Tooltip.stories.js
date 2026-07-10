import './atoms.css';

/**
 * Atoms / Tooltip — infobulle. `.gl-tooltip` / `.gl-tooltip__bubble`
 * (Storybook-only helper, see atoms.css). Rendue visible en permanence pour
 * la démo statique (pas de :hover réel dans un build Storybook statique).
 */
export default {
  title: 'Atoms/Tooltip',
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    tooltip: { control: 'text' },
  },
  args: {
    label: 'Vote pondéré ×2',
    tooltip: 'Réservé aux subs de la chaîne',
  },
};

export const Playground = {
  render: ({ label, tooltip }) => `
    <div style="background:var(--gl-color-surface);padding:46px 22px 22px;border-radius:var(--gl-radius-md);display:flex;align-items:center;justify-content:center;">
      <span class="gl-tooltip">
        <button class="gl-btn gl-btn--ghost gl-btn--sm" type="button">${label}</button>
        <span class="gl-tooltip__bubble">${tooltip}</span>
      </span>
    </div>
  `,
};
