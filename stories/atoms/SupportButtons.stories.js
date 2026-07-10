import './atoms.css';

/**
 * Atoms / SupportButtons — échelle de soutien +5 / +10 / +25 / +50 · palier épique +100.
 * `.gl-support-btn` (Storybook-only helper, see atoms.css) reuses `--gl-*` tokens only.
 */
export default {
  title: 'Atoms/SupportButtons',
  parameters: { layout: 'padded' },
  argTypes: {
    interactive: { control: 'boolean', description: 'Render as <button> (true) or <span> (false, as in the source bundle).' },
  },
  args: {
    interactive: false,
  },
};

const SCALE = [
  { amount: 5, variant: 'primary' },
  { amount: 10, variant: 'secondary' },
  { amount: 25, variant: 'secondary' },
  { amount: 50, variant: 'secondary' },
  { amount: 100, variant: 'epic' },
];

function supportButtonMarkup({ amount, variant }, interactive) {
  const tag = interactive ? 'button' : 'span';
  return `<${tag} class="gl-support-btn gl-support-btn--${variant}">+${amount}</${tag}>`;
}

export const AllAmounts = {
  render: ({ interactive }) => `
    <div style="background:var(--gl-color-surface);border-radius:var(--gl-radius-md);padding:22px;">
      <div style="display:flex;flex-wrap:wrap;gap:9px;">
        ${SCALE.map((step) => supportButtonMarkup(step, interactive)).join('')}
      </div>
      <div style="margin-top:14px;font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);">
        Échelle 5 / 10 / 25 / 50 · palier épique +100.
      </div>
    </div>
  `,
};

export const Epic100 = {
  argTypes: { interactive: { control: false } },
  render: () => `
    <div style="background:var(--gl-color-surface);border-radius:var(--gl-radius-md);padding:22px;display:inline-flex;">
      ${supportButtonMarkup({ amount: 100, variant: 'epic' }, true)}
    </div>
  `,
};
