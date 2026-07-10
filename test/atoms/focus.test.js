import { describe, it, expect } from 'vitest';
import { Playground } from '../../stories/atoms/Focus.stories.js';

describe('Atoms / Focus', () => {
  it('renders both the primary and ghost buttons with a forced signal focus ring', () => {
    const html = Playground.render();
    expect(html).toContain('gl-btn gl-btn--primary');
    expect(html).toContain('gl-btn gl-btn--ghost');
    expect((html.match(/outline:2px solid var\(--gl-color-signal\);outline-offset:3px/g) || []).length).toBe(2);
  });
});
