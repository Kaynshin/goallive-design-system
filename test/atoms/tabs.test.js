import { describe, it, expect } from 'vitest';
import TabsMeta, { Playground } from '../../stories/atoms/Tabs.stories.js';

describe('Atoms / Tabs', () => {
  it('renders the three tabs from the source bundle', () => {
    const html = Playground.render(TabsMeta.args);
    ['Session', 'Historique', 'Réglages'].forEach((tab) => {
      expect(html).toContain(tab);
    });
  });

  it('marks "Session" as active by default', () => {
    const html = Playground.render(TabsMeta.args);
    expect(html).toMatch(/gl-tabs__tab gl-tabs__tab--active" type="button">Session</);
  });

  it('marks a different tab as active when given', () => {
    const html = Playground.render({ active: 'Historique' });
    expect(html).toMatch(/gl-tabs__tab gl-tabs__tab--active" type="button">Historique</);
    expect(html).not.toMatch(/gl-tabs__tab gl-tabs__tab--active" type="button">Session</);
  });

  it('renders exactly one active tab at a time', () => {
    const html = Playground.render(TabsMeta.args);
    expect((html.match(/gl-tabs__tab--active/g) || []).length).toBe(1);
  });
});
