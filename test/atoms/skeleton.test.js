import { describe, it, expect } from 'vitest';
import { Playground } from '../../stories/atoms/Skeleton.stories.js';

describe('Atoms / Skeleton', () => {
  it('renders three shimmering skeleton lines, the last one pill-shaped', () => {
    const html = Playground.render();
    expect((html.match(/gl-skeleton/g) || []).length).toBeGreaterThanOrEqual(3);
    expect(html).toContain('gl-skeleton--pill');
  });

  it('never renders a spinner element (SVG, role="status" ring, or a "spinner" CSS class)', () => {
    const html = Playground.render();
    expect(html).not.toContain('<svg');
    expect(html).not.toMatch(/class="[^"]*\bspinner\b/);
    expect(html).not.toContain('role="status"');
  });
});
