import { describe, it, expect } from 'vitest';
import { AllStates } from '../../stories/atoms/StateTag.stories.js';

describe('Atoms / StateTag', () => {
  const html = AllStates.render();

  it('renders all eight challenge-lifecycle states from the source bundle', () => {
    [
      'Proposé',
      'Au vote',
      'Actif',
      'Financé',
      'Honoré',
      'Réglé',
      '↺ Non financé · recrédit',
      '⛔ Refusé · modération',
    ].forEach((label) => {
      expect(html).toContain(label);
    });
  });

  it('"Actif" and "Financé" use the signal .gl-tag--active variant', () => {
    expect(html).toMatch(/gl-tag gl-tag--active">Actif</);
    expect(html).toMatch(/gl-tag gl-tag--active">Financé</);
  });

  it('"⛔ Refusé · modération" uses the .gl-tag--refused variant', () => {
    expect(html).toContain('gl-tag gl-tag--refused">⛔ Refusé · modération');
  });

  it('"↺ Non financé · recrédit" uses the muted canvas background variant', () => {
    expect(html).toContain('gl-tag gl-tag--muted-bg">↺ Non financé · recrédit');
  });

  it('"Proposé" and "Réglé" use the plain neutral .gl-tag shell', () => {
    expect(html).toContain('<span class="gl-tag">Proposé</span>');
    expect(html).toContain('<span class="gl-tag">Réglé</span>');
  });
});
