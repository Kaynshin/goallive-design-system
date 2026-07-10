import { describe, it, expect, afterEach, vi } from 'vitest';
import { createRollingNumber } from '../../stories/atoms/rolling-number.js';
import RollingNumberMeta, { Playground, SoldeContributeursViewers } from '../../stories/atoms/RollingNumber.stories.js';

function digitColumns(el) {
  return Array.from(el.querySelectorAll('.gl-rolling-number__col'));
}

function currentDigit(column) {
  return Number(column.dataset.digit);
}

describe('createRollingNumber', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders one column per digit, each stacking the ten digits 0-9', () => {
    const el = createRollingNumber({ value: 42 });
    const columns = digitColumns(el);
    expect(columns).toHaveLength(2);
    columns.forEach((col) => {
      const digits = Array.from(col.querySelectorAll('.gl-rolling-number__digit')).map((d) => d.textContent);
      expect(digits).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    });
  });

  it('positions each column on its initial digit', () => {
    const el = createRollingNumber({ value: 42 });
    const columns = digitColumns(el);
    expect(currentDigit(columns[0])).toBe(4);
    expect(currentDigit(columns[1])).toBe(2);
  });

  it('renders a separator span for the thousands grouping and exposes an aria-label with the formatted value', () => {
    const el = createRollingNumber({ value: 1240 });
    expect(el.querySelectorAll('.gl-rolling-number__sep')).toHaveLength(1);
    expect(el.getAttribute('aria-label')).toBe('1 240');
  });

  it('exposes the current value via the .value getter', () => {
    const el = createRollingNumber({ value: 7 });
    expect(el.value).toBe(7);
  });

  it('.update() re-renders the columns to the new value and updates .value', () => {
    const el = createRollingNumber({ value: 42 });
    el.update(87);
    const columns = digitColumns(el);
    expect(currentDigit(columns[0])).toBe(8);
    expect(currentDigit(columns[1])).toBe(7);
    expect(el.value).toBe(87);
  });

  it('rebuilds the column count when the number of digits changes', () => {
    const el = createRollingNumber({ value: 9 });
    expect(digitColumns(el)).toHaveLength(1);
    el.update(100);
    expect(digitColumns(el)).toHaveLength(3);
  });

  it('applies a 28ms stagger delay per digit position on update (motion enabled)', () => {
    vi.stubGlobal('matchMedia', (query) => ({ matches: false, media: query }));
    const el = createRollingNumber({ value: 100 });
    el.update(211);
    const columns = digitColumns(el);
    const delays = columns.map((col) => col.querySelector('.gl-rolling-number__track').style.transitionDelay);
    expect(delays).toEqual(['0ms', '28ms', '56ms']);
  });

  it('respects prefers-reduced-motion: collapses the transition to instant (0ms, no delay)', () => {
    vi.stubGlobal('matchMedia', (query) => ({ matches: true, media: query }));
    const el = createRollingNumber({ value: 100 });
    el.update(211);
    const columns = digitColumns(el);
    columns.forEach((col) => {
      const track = col.querySelector('.gl-rolling-number__track');
      expect(track.style.transitionDelay).toBe('0ms');
      expect(track.style.transitionDuration).toBe('0ms');
    });
  });

  it('applies the requested font size, color and weight', () => {
    const el = createRollingNumber({ value: 5, fontSize: 40, color: 'rgb(255, 0, 0)', weight: 800 });
    expect(el.style.fontSize).toBe('40px');
    expect(el.style.color).toBe('rgb(255, 0, 0)');
    expect(el.style.fontWeight).toBe('800');
  });
});

describe('Atoms / RollingNumber story', () => {
  it('Playground renders a .gl-rolling-number element for the default balance', () => {
    const el = Playground.render(RollingNumberMeta.args);
    const counter = el.querySelector('.gl-rolling-number');
    expect(counter).not.toBeNull();
    expect(counter.getAttribute('aria-label')).toBe('1 240');
  });

  it('SoldeContributeursViewers renders three rolling counters with their captions', () => {
    const el = SoldeContributeursViewers.render();
    const counters = el.querySelectorAll('.gl-rolling-number');
    expect(counters).toHaveLength(3);
    expect(el.textContent).toContain('solde tok');
    expect(el.textContent).toContain('contributeurs');
    expect(el.textContent).toContain('viewers');
  });
});
