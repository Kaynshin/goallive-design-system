/**
 * Molecules / Empty State — `.gl-empty-state`. No spinner: the empty state
 * placeholder used when a session has no active goal yet (section
 * `#molecules`, "État vide").
 */
export default {
  title: 'Molecules/Empty State',
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    ctaLabel: { control: 'text' },
  },
  args: {
    title: 'Aucun goal actif',
    description: "La session n'a pas commencé. Propose 2-3 défis pour ouvrir le vote.",
    ctaLabel: 'Composer les défis',
  },
};

function renderEmptyState({ title, description, ctaLabel }) {
  return `
    <div class="gl-empty-state" style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 0 4px;text-align:center;max-width:280px;">
      <span style="width:44px;height:44px;border-radius:var(--gl-radius-md);background:var(--gl-color-surface-elevated);border:1px solid var(--gl-color-hairline);display:inline-flex;align-items:center;justify-content:center;" aria-hidden="true">
        <span style="width:9px;height:9px;border-radius:var(--gl-radius-pill);background:var(--gl-color-hairline);"></span>
      </span>
      <div style="font-weight:700;font-size:15px;color:var(--gl-color-text);">${title}</div>
      <div style="font-size:13px;color:var(--gl-color-text-muted);line-height:1.5;">${description}</div>
      ${ctaLabel ? `<button type="button" class="gl-btn gl-btn--primary gl-btn--sm">${ctaLabel}</button>` : ''}
    </div>
  `;
}

export const Playground = {
  render: renderEmptyState,
};

export const NoAction = {
  argTypes: { ctaLabel: { control: false } },
  render: (args) => renderEmptyState({ ...args, ctaLabel: '' }),
};
