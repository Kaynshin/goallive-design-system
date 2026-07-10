import './atoms.css';

/**
 * Atoms / TwitchIdentity — avatar + nom + ancienneté d'abonnement.
 * `.gl-avatar` / `.gl-avatar__badge` (Storybook-only helper, see atoms.css).
 */
export default {
  title: 'Atoms/TwitchIdentity',
  parameters: { layout: 'padded' },
  argTypes: {
    initial: { control: 'text' },
    name: { control: 'text' },
    subtitle: { control: 'text' },
    online: { control: 'boolean' },
  },
  args: {
    initial: 'N',
    name: 'Nyxoraa',
    subtitle: 'sub depuis 9 mois',
    online: true,
  },
};

export const Playground = {
  render: ({ initial, name, subtitle, online }) => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;align-items:center;gap:12px;">
      <span class="gl-avatar">
        ${initial}
        ${online ? '<span class="gl-avatar__badge"></span>' : ''}
      </span>
      <div>
        <div style="font-family:var(--gl-font-sans);font-weight:700;font-size:14px;color:var(--gl-color-text);">${name}</div>
        <div style="font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);">${subtitle}</div>
      </div>
    </div>
  `,
};
