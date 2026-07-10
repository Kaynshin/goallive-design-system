import { describe, it, expect } from 'vitest';
import FieldStatesMeta, { Playground, AllStates } from '../../stories/atoms/FieldStates.stories.js';

describe('Atoms / FieldStates', () => {
  it('renders a plain .gl-input with no hint for the default state', () => {
    const html = Playground.render(FieldStatesMeta.args);
    expect(html).toContain('class="gl-input "');
    expect(html).not.toContain('gl-field-hint');
  });

  it('renders the signal border and hint for the error state', () => {
    const html = Playground.render({ ...FieldStatesMeta.args, state: 'error', value: 'Boire 10 shots cul sec' });
    expect(html).toContain('gl-input--error');
    expect(html).toContain('gl-field-hint--error');
    expect(html).toContain('⛔ Refusé à la modération');
  });

  it('renders the ok border and hint for the success state', () => {
    const html = Playground.render({ ...FieldStatesMeta.args, state: 'success', value: 'Battre Margit sans soin' });
    expect(html).toContain('gl-input--success');
    expect(html).toContain('gl-field-hint--success');
    expect(html).toContain('✓ Condition observable');
  });

  it('adds the disabled attribute for the disabled state', () => {
    const html = Playground.render({ ...FieldStatesMeta.args, state: 'disabled' });
    expect(html).toMatch(/<input[^>]*\bdisabled\b/);
  });

  it('AllStates renders all five states together', () => {
    const html = AllStates.render();
    expect(html).toContain('gl-input--error');
    expect(html).toContain('gl-input--success');
    expect(html).toMatch(/<input[^>]*\bdisabled\b/);
    expect((html.match(/class="gl-field"/g) || []).length).toBe(5);
  });
});
