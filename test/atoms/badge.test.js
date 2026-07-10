import { describe, it, expect } from 'vitest';
import BadgeMeta, { Playground, AllPerks } from '../../stories/atoms/Badge.stories.js';

describe('Atoms / Badge', () => {
  it('renders the signal variant with the "★ Patron du mois" label by default', () => {
    const html = Playground.render(BadgeMeta.args);
    expect(html).toContain('gl-badge gl-badge--signal');
    expect(html).toContain('★ Patron du mois');
  });

  it('renders the neutral variant without the signal modifier', () => {
    const html = Playground.render({ ...BadgeMeta.args, variant: 'neutral', label: 'Sub Twitch' });
    expect(html).toContain('<span class="gl-badge">Sub Twitch</span>');
  });

  it('AllPerks renders every perk from the source bundle', () => {
    const html = AllPerks.render();
    ['★ Patron du mois', 'Sub Twitch', '⚔ Top challenger', 'Vote pondéré ×2'].forEach((label) => {
      expect(html).toContain(label);
    });
    expect((html.match(/gl-badge--signal/g) || []).length).toBe(1);
  });
});
