import { describe, it, expect } from 'vitest';
import SupportButtonsMeta, { AllAmounts, Epic100 } from '../../stories/atoms/SupportButtons.stories.js';

describe('Atoms / SupportButtons', () => {
  it('renders all five amounts in the source scale', () => {
    const html = AllAmounts.render(SupportButtonsMeta.args);
    ['+5', '+10', '+25', '+50', '+100'].forEach((label) => {
      expect(html).toContain(`>${label}<`);
    });
  });

  it('+5 uses the primary (signal-deep) variant', () => {
    const html = AllAmounts.render(SupportButtonsMeta.args);
    expect(html).toMatch(/gl-support-btn--primary">\+5</);
  });

  it('+10, +25 and +50 use the secondary (ink-700) variant', () => {
    const html = AllAmounts.render(SupportButtonsMeta.args);
    ['+10', '+25', '+50'].forEach((label) => {
      expect(html).toContain(`gl-support-btn--secondary">${label}<`);
    });
  });

  it('+100 uses the epic (signal-soft) variant — the ambition tier', () => {
    const html = AllAmounts.render(SupportButtonsMeta.args);
    expect(html).toMatch(/gl-support-btn--epic">\+100</);
  });

  it('renders <span> elements by default (non-interactive, as in the source bundle)', () => {
    const html = AllAmounts.render({ ...SupportButtonsMeta.args, interactive: false });
    expect(html).toContain('<span class="gl-support-btn gl-support-btn--primary">+5</span>');
  });

  it('renders <button> elements when interactive is true', () => {
    const html = AllAmounts.render({ ...SupportButtonsMeta.args, interactive: true });
    expect(html).toContain('<button class="gl-support-btn gl-support-btn--primary">+5</button>');
  });

  it('Epic100 renders a standalone interactive +100 button', () => {
    const html = Epic100.render();
    expect(html).toContain('<button class="gl-support-btn gl-support-btn--epic">+100</button>');
  });
});
