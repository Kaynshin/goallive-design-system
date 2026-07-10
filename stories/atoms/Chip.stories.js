import './atoms.css';

/**
 * Atoms / Chip — chip de solde de tokens (◆ 1 240 tok) + bouton « + Recharger ».
 * `.gl-chip` / `.gl-chip--signal` from dist/goallive.css; `.gl-chip__icon`
 * (Storybook-only helper, see atoms.css) for the token diamond marker.
 */
export default {
  title: 'Atoms/Chip',
  parameters: { layout: 'padded' },
  argTypes: {
    balance: { control: 'number' },
  },
  args: {
    balance: 1240,
  },
};

function formatBalance(n) {
  // Normalize the locale's grouping separator (narrow no-break space, U+202F)
  // to a plain space, matching the source bundle's "1 240" rendering.
  return Number(n).toLocaleString('fr-FR').replace(/[  ]/g, ' ');
}

export const Balance = {
  render: ({ balance }) => `
    <div style="background:var(--gl-color-surface);border-radius:var(--gl-radius-md);padding:22px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
      <span class="gl-chip">
        <span class="gl-chip__icon">◆</span>
        <span>${formatBalance(balance)}</span>
        <span style="font-size:12px;color:var(--gl-color-text-muted);">tok</span>
      </span>
      <button class="gl-chip gl-chip--signal">+ Recharger</button>
    </div>
  `,
};
