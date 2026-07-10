import './atoms.css';

/**
 * Atoms / Tabs — onglets. `.gl-tabs` / `.gl-tabs__tab` / `.gl-tabs__tab--active`
 * (Storybook-only helper, see atoms.css). Onglet actif : fond ink-700, texte papier.
 */
export default {
  title: 'Atoms/Tabs',
  parameters: { layout: 'padded' },
  argTypes: {
    active: { control: 'select', options: ['Session', 'Historique', 'Réglages'] },
  },
  args: {
    active: 'Session',
  },
};

const TABS = ['Session', 'Historique', 'Réglages'];

export const Playground = {
  render: ({ active }) => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <div class="gl-tabs">
        ${TABS.map(
          (tab) => `<button class="gl-tabs__tab ${tab === active ? 'gl-tabs__tab--active' : ''}" type="button">${tab}</button>`
        ).join('')}
      </div>
      <div style="margin-top:14px;font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);">Onglet actif : fond ink-700, texte papier.</div>
    </div>
  `,
};
