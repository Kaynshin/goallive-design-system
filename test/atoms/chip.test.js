import { describe, it, expect } from 'vitest';
import ChipMeta, { Balance } from '../../stories/atoms/Chip.stories.js';

describe('Atoms / Chip', () => {
  it('renders the balance chip with the token diamond icon and "tok" suffix', () => {
    const html = Balance.render(ChipMeta.args);
    expect(html).toContain('class="gl-chip"');
    expect(html).toContain('gl-chip__icon');
    expect(html).toContain('◆');
    expect(html).toContain('tok');
  });

  it('formats the balance with French thousands grouping (plain space, not a narrow no-break space)', () => {
    const html = Balance.render({ balance: 1240 });
    const expected = '1' + String.fromCharCode(32) + '240';
    const unexpectedNarrowNbsp = '1' + String.fromCharCode(0x202f) + '240';
    expect(html).toContain(expected);
    expect(html).not.toContain(unexpectedNarrowNbsp);
  });

  it('renders the "+ Recharger" button using the signal chip variant', () => {
    const html = Balance.render(ChipMeta.args);
    expect(html).toContain('<button class="gl-chip gl-chip--signal">+ Recharger</button>');
  });
});
