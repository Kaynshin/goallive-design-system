import { describe, it, expect } from 'vitest';
import InputMeta, { Playground, Search } from '../../stories/atoms/Input.stories.js';

describe('Atoms / Input', () => {
  it('renders the .gl-input class with the "Propose un défi…" placeholder by default', () => {
    const html = Playground.render(InputMeta.args);
    expect(html).toContain('class="gl-input"');
    expect(html).toContain('placeholder="Propose un défi…"');
  });

  it('renders the given placeholder and value', () => {
    const html = Playground.render({ ...InputMeta.args, placeholder: 'Nom du défi', value: 'Speedrun' });
    expect(html).toContain('placeholder="Nom du défi"');
    expect(html).toContain('value="Speedrun"');
  });

  it('adds the disabled attribute when state is disabled', () => {
    const html = Playground.render({ ...InputMeta.args, state: 'disabled' });
    expect(html).toMatch(/<input[^>]*\bdisabled\b/);
  });

  it('forces the signal border color when state is focus', () => {
    const html = Playground.render({ ...InputMeta.args, state: 'focus' });
    expect(html).toContain('border-color:var(--gl-color-signal)');
  });

  it('Search renders the search icon and the "Rechercher un créateur" placeholder inside a .gl-input-group', () => {
    const html = Search.render();
    expect(html).toContain('class="gl-input-group"');
    expect(html).toContain('🔍');
    expect(html).toContain('placeholder="Rechercher un créateur"');
    expect(html).toContain('gl-input-group__input');
  });
});
