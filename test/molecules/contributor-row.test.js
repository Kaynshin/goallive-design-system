import { describe, it, expect } from 'vitest';
import ContributorRowMeta, { Playground, Wall } from '../../stories/molecules/ContributorRow.stories.js';

describe('Molecules / Contributor Row', () => {
  it('renders the pseudo and the tok amount', () => {
    const html = Playground.render(ContributorRowMeta.args);
    expect(html).toContain('Korrigan_TV');
    expect(html).toContain('340');
    expect(html).toContain('tok');
  });

  it('renders the initials avatar', () => {
    const html = Playground.render(ContributorRowMeta.args);
    expect(html).toContain('>K<');
  });

  it('renders the "★ patron" badge when patron is true', () => {
    const html = Playground.render({ ...ContributorRowMeta.args, patron: true });
    expect(html).toContain('★ patron');
  });

  it('omits the patron badge when patron is false', () => {
    const html = Playground.render({ ...ContributorRowMeta.args, patron: false });
    expect(html).not.toContain('★ patron');
  });

  it('the Wall variant renders the three contributor rows, patron first', () => {
    const html = Wall.render();
    expect(html).toContain('Korrigan_TV');
    expect(html).toContain('Maelyz');
    expect(html).toContain('Vortakk');
    expect(html.indexOf('Korrigan_TV')).toBeLessThan(html.indexOf('Maelyz'));
    expect(html.indexOf('Maelyz')).toBeLessThan(html.indexOf('Vortakk'));
  });
});
