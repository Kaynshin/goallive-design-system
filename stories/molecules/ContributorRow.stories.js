/**
 * Molecules / Contributor Row — `.gl-contributor-row`. A single row of the
 * "Mur des contributeurs" (section `#molecules`): initials avatar, pseudo, an
 * optional "★ patron" badge for the top backer, and the tok amount.
 */
export default {
  title: 'Molecules/Contributor Row',
  parameters: { layout: 'padded' },
  argTypes: {
    initial: { control: 'text' },
    name: { control: 'text' },
    amount: { control: 'number' },
    patron: { control: 'boolean' },
  },
  args: {
    initial: 'K',
    name: 'Korrigan_TV',
    amount: 340,
    patron: true,
  },
};

function renderContributorRow({ initial, name, amount, patron }) {
  return `
    <div class="gl-contributor-row" style="display:flex;align-items:center;gap:12px;max-width:360px;">
      <span style="width:34px;height:34px;border-radius:var(--gl-radius-pill);background:linear-gradient(135deg,var(--gl-color-signal-deep),var(--gl-color-signal));display:inline-flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:13px;flex:none;" aria-hidden="true">${initial}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:700;font-size:14px;color:var(--gl-color-text);">${name}${patron ? ' <span class="gl-contributor-row__patron" style="font-size:11px;font-weight:700;color:var(--gl-color-signal);margin-left:4px;">★ patron</span>' : ''}</div>
      </div>
      <span style="font-family:var(--gl-font-sans);font-weight:700;font-size:14px;color:var(--gl-color-text);white-space:nowrap;">${amount} <span style="font-size:11px;color:var(--gl-color-text-muted);">tok</span></span>
    </div>
  `;
}

export const Playground = {
  render: renderContributorRow,
};

export const Wall = {
  argTypes: { name: { control: false }, amount: { control: false }, patron: { control: false } },
  render: () => `
    <div style="display:flex;flex-direction:column;gap:12px;max-width:360px;">
      ${renderContributorRow({ initial: 'K', name: 'Korrigan_TV', amount: 340, patron: true })}
      ${renderContributorRow({ initial: 'M', name: 'Maelyz', amount: 185, patron: false })}
      ${renderContributorRow({ initial: 'V', name: 'Vortakk', amount: 120, patron: false })}
    </div>
  `,
};
