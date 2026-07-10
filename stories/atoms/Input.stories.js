import './atoms.css';

/**
 * Atoms / Input — `.gl-input` (from dist/goallive.css) + `.gl-input-group`
 * (Storybook-only helper, see atoms.css) for the search-with-icon variant.
 */
export default {
  title: 'Atoms/Input',
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'focus', 'disabled'] },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    state: 'default',
    placeholder: 'Propose un défi…',
    value: '',
  },
};

function renderInput({ state, placeholder, value }) {
  const disabled = state === 'disabled';
  const forceFocus = state === 'focus' && !disabled;
  return `
    <div style="max-width:340px;background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <input
        class="gl-input"
        type="text"
        placeholder="${placeholder}"
        value="${value}"
        ${disabled ? 'disabled' : ''}
        ${forceFocus ? "data-force-focus='true' style='border-color:var(--gl-color-signal)'" : ''}
      />
    </div>
  `;
}

export const Playground = {
  render: renderInput,
};

export const Search = {
  argTypes: { state: { control: false }, placeholder: { control: false }, value: { control: false } },
  render: () => `
    <div style="max-width:340px;background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <div class="gl-input-group">
        <span class="gl-input-group__icon">🔍</span>
        <input class="gl-input-group__input" type="text" placeholder="Rechercher un créateur" />
      </div>
    </div>
  `,
};
