import { describe, it, expect } from 'vitest';
import TwitchIdentityMeta, { Playground } from '../../stories/atoms/TwitchIdentity.stories.js';

describe('Atoms / TwitchIdentity', () => {
  it('renders the avatar initial, name and subscription subtitle by default', () => {
    const html = Playground.render(TwitchIdentityMeta.args);
    expect(html).toContain('class="gl-avatar"');
    expect(html).toContain('N');
    expect(html).toContain('Nyxoraa');
    expect(html).toContain('sub depuis 9 mois');
  });

  it('renders the online badge when online is true', () => {
    const html = Playground.render({ ...TwitchIdentityMeta.args, online: true });
    expect(html).toContain('gl-avatar__badge');
  });

  it('omits the online badge when online is false', () => {
    const html = Playground.render({ ...TwitchIdentityMeta.args, online: false });
    expect(html).not.toContain('gl-avatar__badge');
  });
});
