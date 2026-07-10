import { describe, it, expect } from 'vitest';
import EmptyStateMeta, { Playground, NoAction } from '../../stories/molecules/EmptyState.stories.js';

describe('Molecules / Empty State', () => {
  it('renders the title and description', () => {
    const html = Playground.render(EmptyStateMeta.args);
    expect(html).toContain('Aucun goal actif');
    expect(html).toContain("La session n'a pas commencé");
  });

  it('renders the call-to-action button when a ctaLabel is provided', () => {
    const html = Playground.render(EmptyStateMeta.args);
    expect(html).toContain('gl-btn gl-btn--primary gl-btn--sm');
    expect(html).toContain('Composer les défis');
  });

  it('omits the call-to-action button when ctaLabel is empty', () => {
    const html = NoAction.render(EmptyStateMeta.args);
    expect(html).not.toContain('<button');
  });
});
