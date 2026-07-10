import { describe, it, expect } from 'vitest';
import VoteOptionMeta, { Playground, AllStates } from '../../stories/molecules/VoteOption.stories.js';

describe('Molecules / Vote Option', () => {
  it('renders the challenge label and the vote percentage', () => {
    const html = Playground.render(VoteOptionMeta.args);
    expect(html).toContain('Speedrun World 1 < 4 min');
    expect(html).toContain('58%');
  });

  it('sets the progress fill width to the vote percentage', () => {
    const html = Playground.render({ ...VoteOptionMeta.args, percent: 33 });
    expect(html).toContain('width:33%');
  });

  it('marks the option as selected with the filled radio dot and the modifier class', () => {
    const html = Playground.render({ ...VoteOptionMeta.args, selected: true });
    expect(html).toContain('gl-vote-option--selected');
    expect(html).toContain('background:var(--gl-color-signal);"></span>');
  });

  it('renders an empty radio ring when not selected', () => {
    const html = Playground.render({ ...VoteOptionMeta.args, selected: false });
    expect(html).not.toContain('gl-vote-option--selected');
  });

  it('renders the optional meta line when provided', () => {
    const html = Playground.render({ ...VoteOptionMeta.args, meta: 'une voix par identité Twitch' });
    expect(html).toContain('une voix par identité Twitch');
  });

  it('AllStates renders both a selected and an unselected option', () => {
    const html = AllStates.render();
    expect(html).toContain('gl-vote-option--selected');
    expect(html).toContain('Finir le donjon sans mourir');
    expect(html).toContain('58%');
    expect(html).toContain('42%');
  });
});
