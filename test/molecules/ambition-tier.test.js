import { describe, it, expect } from 'vitest';
import AmbitionTierMeta, { Playground } from '../../stories/molecules/AmbitionTier.stories.js';

describe('Molecules / Ambition Tier', () => {
  it('renders both the Commun and Épique tiers with their token price', () => {
    const html = Playground.render(AmbitionTierMeta.args);
    expect(html).toContain('Commun');
    expect(html).toContain('100 tok');
    expect(html).toContain('Épique');
    expect(html).toContain('300 tok');
  });

  it('renders the "SUB" badge only on the Épique tier', () => {
    const html = Playground.render(AmbitionTierMeta.args);
    const epiqueBlock = html.slice(html.indexOf('data-tier="epique"'));
    const communBlock = html.slice(html.indexOf('data-tier="commun"'), html.indexOf('data-tier="epique"'));
    expect(epiqueBlock).toContain('SUB');
    expect(communBlock).not.toContain('SUB');
  });

  it('marks the tier passed via `selected` with the modifier class', () => {
    const html = Playground.render({ selected: 'commun' });
    const communStart = html.lastIndexOf('<div class="gl-ambition-tier', html.indexOf('data-tier="commun"'));
    const epiqueStart = html.lastIndexOf('<div class="gl-ambition-tier', html.indexOf('data-tier="epique"'));
    const communBlock = html.slice(communStart, html.indexOf('data-tier="epique"'));
    const epiqueBlock = html.slice(epiqueStart);
    expect(communBlock).toContain('gl-ambition-tier--selected');
    expect(epiqueBlock).not.toContain('gl-ambition-tier--selected');
  });
});
