import { describe, it, expect } from 'vitest';
import ButtonMeta, { Playground, AllVariants } from '../../stories/atoms/Button.stories.js';

describe('Atoms / Button', () => {
  it('renders the .gl-btn.gl-btn--primary classes by default, with the "Soutenir le défi" label', () => {
    const html = Playground.render(ButtonMeta.args);
    expect(html).toContain('gl-btn gl-btn--primary');
    expect(html).toContain('>Soutenir le défi</button>');
  });

  it('renders the .gl-btn--ghost class for the ghost variant', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'ghost' });
    expect(html).toContain('gl-btn gl-btn--ghost');
  });

  it('renders the .gl-btn--sm class for the small variant', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'small' });
    expect(html).toContain('gl-btn--sm');
  });

  it('renders the .gl-btn--link class for the link variant', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'link' });
    expect(html).toContain('gl-btn gl-btn--link');
  });

  it('adds the disabled attribute for the disabled variant', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'disabled' });
    expect(html).toMatch(/<button[^>]*\bdisabled\b/);
  });

  it('does not add the disabled attribute for the primary variant', () => {
    const html = Playground.render({ ...ButtonMeta.args, variant: 'primary' });
    expect(html).not.toMatch(/\bdisabled\b/);
  });

  it('AllVariants renders every variant together', () => {
    const html = AllVariants.render(ButtonMeta.args);
    ['gl-btn--primary', 'gl-btn--ghost', 'gl-btn--sm', 'gl-btn--link'].forEach((cls) => {
      expect(html).toContain(cls);
    });
    expect(html).toMatch(/<button[^>]*\bdisabled\b/);
  });
});
