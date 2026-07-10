/**
 * Molecules / Ambition Tier — `.gl-ambition-tier`. The Commun / Épique challenge
 * ambition selector (section `#molecules`, "Palier d'ambition"). Épique is
 * reserved to subs and carries a higher token target.
 */
export default {
  title: 'Molecules/Ambition Tier',
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: 'inline-radio', options: ['commun', 'epique'] },
  },
  args: {
    selected: 'epique',
  },
};

const TIERS = [
  { id: 'commun', name: 'Commun', desc: 'Cible modérée, ouvert à tous', price: '100 tok', sub: false },
  { id: 'epique', name: 'Épique', desc: 'Réservé aux abonnés', price: '300 tok', sub: true },
];

function renderTier(tier, isSelected) {
  const border = tier.sub ? 'rgba(255,59,31,.45)' : isSelected ? 'var(--gl-color-signal)' : 'var(--gl-color-hairline)';
  const bg = tier.sub ? 'var(--gl-color-signal-soft)' : 'var(--gl-color-canvas)';
  const priceColor = tier.sub ? 'var(--gl-color-signal)' : 'var(--gl-color-text)';
  return `
    <div class="gl-ambition-tier${isSelected ? ' gl-ambition-tier--selected' : ''}" data-tier="${tier.id}" style="position:relative;border:1px solid ${border};border-radius:var(--gl-radius-md);padding:15px;background:${bg};">
      ${tier.sub ? '<span style="position:absolute;top:10px;right:12px;font-size:10px;font-weight:800;letter-spacing:.08em;color:var(--gl-color-signal);">SUB</span>' : ''}
      <div style="font-weight:700;font-size:15px;color:var(--gl-color-text);margin-bottom:4px;">${tier.name}</div>
      <div style="font-size:12px;color:var(--gl-color-text-muted);line-height:1.4;">${tier.desc}</div>
      <div style="margin-top:10px;font-family:var(--gl-font-sans);font-weight:700;font-size:14px;color:${priceColor};">${tier.price}</div>
    </div>
  `;
}

export const Playground = {
  render: ({ selected }) => `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:420px;">
      ${TIERS.map((t) => renderTier(t, t.id === selected)).join('')}
    </div>
  `,
};
