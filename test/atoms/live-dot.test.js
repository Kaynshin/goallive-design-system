import { describe, it, expect } from 'vitest';
import { Playground, AllSizes, LivePill } from '../../stories/atoms/LiveDot.stories.js';

describe('Atoms / LiveDot', () => {
  it('renders the default-size .gl-live-dot with no size modifier', () => {
    const html = Playground.render({ size: 'default' });
    expect(html).toContain('<span class="gl-live-dot"></span>');
  });

  it('renders the small-size modifier', () => {
    const html = Playground.render({ size: 'sm' });
    expect(html).toContain('gl-live-dot gl-live-dot--sm');
  });

  it('renders the large-size modifier', () => {
    const html = Playground.render({ size: 'lg' });
    expect(html).toContain('gl-live-dot gl-live-dot--lg');
  });

  it('AllSizes renders all three sizes together', () => {
    const html = AllSizes.render();
    expect(html).toContain('<span class="gl-live-dot"></span>');
    expect(html).toContain('gl-live-dot--sm');
    expect(html).toContain('gl-live-dot--lg');
  });

  it('LivePill composes the dot inside a signal badge labelled "EN DIRECT"', () => {
    const html = LivePill.render();
    expect(html).toContain('gl-badge gl-badge--signal');
    expect(html).toContain('gl-live-dot gl-live-dot--sm');
    expect(html).toContain('EN DIRECT');
  });
});
