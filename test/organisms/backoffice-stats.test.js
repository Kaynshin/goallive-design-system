import { describe, it, expect } from 'vitest';
import { createBackofficeStats } from '../../stories/organisms/backoffice-stats.js';

describe('Organisms / Backoffice Stats — backoffice-stats.js', () => {
  it('renders the participation rate, contributors, and tokens released', () => {
    const stats = createBackofficeStats({ participation: 72, contributors: 340, tokensReleased: 1240 });
    expect(stats.querySelector('.gl-backoffice-stats__participation').textContent).toBe('72');
    expect(stats.querySelector('.gl-backoffice-stats__contributors').textContent).toBe('340');
    expect(stats.querySelector('.gl-backoffice-stats__tokens').textContent).toBe('1240');
  });

  it('renders one bar per data point in the recent sessions chart', () => {
    const stats = createBackofficeStats({ bars: [40, 62, 50, 78, 90, 100] });
    const bars = stats.querySelectorAll('.gl-backoffice-stats__bar');
    expect(bars).toHaveLength(6);
    expect(bars[0].style.height).toBe('40%');
    expect(bars[5].style.height).toBe('100%');
  });

  it('marks the tallest bar with the peak (signal) modifier class, and no other bar', () => {
    const stats = createBackofficeStats({ bars: [40, 62, 50, 78, 90, 100] });
    const bars = [...stats.querySelectorAll('.gl-backoffice-stats__bar')];
    const peaks = bars.filter((b) => b.classList.contains('gl-backoffice-stats__bar--peak'));
    expect(peaks).toHaveLength(1);
    expect(peaks[0].style.height).toBe('100%');
  });
});
