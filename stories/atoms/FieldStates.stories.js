import './atoms.css';

/**
 * Atoms / FieldStates — normal, focus, erreur, succès, désactivé.
 * `.gl-input` + `.gl-input--error`/`--success` (dist/goallive.css) and the
 * `.gl-field`/`.gl-field-hint` helpers (Storybook-only, see atoms.css).
 */
export default {
  title: 'Atoms/FieldStates',
  parameters: { layout: 'padded' },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'focus', 'error', 'success', 'disabled'],
    },
    value: { control: 'text' },
  },
  args: {
    state: 'default',
    value: 'Propose un défi…',
  },
};

const HINTS = {
  error: { className: 'gl-input--error', hint: '⛔ Refusé à la modération — dangereux IRL', hintClass: 'gl-field-hint--error' },
  success: { className: 'gl-input--success', hint: '✓ Condition observable — prêt pour le vote', hintClass: 'gl-field-hint--success' },
};

function renderField({ state, value }) {
  const disabled = state === 'disabled';
  const forceFocus = state === 'focus' && !disabled;
  const stateClass = HINTS[state]?.className || '';
  const hint = HINTS[state];
  return `
    <div class="gl-field">
      <input
        class="gl-input ${stateClass}"
        type="text"
        value="${value}"
        ${disabled ? 'disabled' : ''}
        ${forceFocus ? "data-force-focus='true' style='border-color:var(--gl-color-signal)'" : ''}
      />
      ${hint ? `<span class="gl-field-hint ${hint.hintClass}">${hint.hint}</span>` : ''}
    </div>
  `;
}

export const Playground = {
  render: (args) => `
    <div style="max-width:360px;background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      ${renderField(args)}
    </div>
  `,
};

export const AllStates = {
  argTypes: { state: { control: false } },
  render: () => `
    <div style="max-width:360px;background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;flex-direction:column;gap:12px;">
      ${renderField({ state: 'default', value: 'Propose un défi…' })}
      ${renderField({ state: 'focus', value: 'Propose un défi…' })}
      ${renderField({ state: 'error', value: 'Boire 10 shots cul sec' })}
      ${renderField({ state: 'success', value: 'Battre Margit sans soin' })}
      ${renderField({ state: 'disabled', value: 'Champ désactivé' })}
    </div>
  `,
};
