import { describe, it, expect } from 'vitest';
import SwitchMeta, { Playground, OnOff } from '../../stories/atoms/Switch.stories.js';

describe('Atoms / Switch', () => {
  it('renders the .gl-switch--on class and aria-checked="true" when on', () => {
    const html = Playground.render({ ...SwitchMeta.args, on: true });
    expect(html).toContain('gl-switch gl-switch--on');
    expect(html).toContain('aria-checked="true"');
  });

  it('does not render .gl-switch--on and sets aria-checked="false" when off', () => {
    const html = Playground.render({ ...SwitchMeta.args, on: false });
    expect(html).not.toContain('gl-switch--on');
    expect(html).toContain('aria-checked="false"');
  });

  it('adds the disabled attribute when disabled', () => {
    const html = Playground.render({ ...SwitchMeta.args, disabled: true });
    expect(html).toMatch(/<button[^>]*\bdisabled\b/);
  });

  it('renders the knob element', () => {
    const html = Playground.render(SwitchMeta.args);
    expect(html).toContain('gl-switch__knob');
  });

  it('OnOff renders both states side by side', () => {
    const html = OnOff.render(SwitchMeta.args);
    expect(html).toContain('gl-switch--on');
    expect(html).toContain('aria-checked="false"');
  });
});
