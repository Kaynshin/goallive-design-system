/**
 * Rolling number — Goallive's signature vertical odometer counter.
 *
 * Each digit of the formatted number is rendered as its own column: a stack
 * of the ten digits 0-9, translated vertically so the active digit sits in
 * view. Updating the value slides each column's track to its new digit,
 * staggered ~28ms apart per position (left to right), on `--gl-motion-base`
 * (220ms) with the shared `--gl-motion-ease` curve.
 *
 * `prefers-reduced-motion: reduce` collapses every transition to the final
 * state instantly (no slide), per the design system's global motion rule
 * (see build/primitives.css).
 */

const DIGIT_COUNT = 10;
const STAGGER_MS = 28;
const TRANSITION = 'transform var(--gl-motion-base, 220ms) var(--gl-motion-ease, cubic-bezier(.3,.7,.2,1))';

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Formats a number the way the source bundle does — French grouping, e.g. "1 240". */
function formatChars(value) {
  const safe = Number.isFinite(Number(value)) ? Math.round(Number(value)) : 0;
  const grouped = Math.abs(safe).toLocaleString('fr-FR');
  const sign = safe < 0 ? '-' : '';
  return `${sign}${grouped}`
    .split('')
    .map((ch) => (/[\s  ]/.test(ch) ? ' ' : ch));
}

function isDigitChar(ch) {
  return /^[0-9]$/.test(ch);
}

function buildColumn(digitHeight, digitWidth) {
  const column = document.createElement('span');
  column.className = 'gl-rolling-number__col';
  column.style.height = `${digitHeight}px`;
  column.style.width = `${digitWidth}px`;

  const track = document.createElement('span');
  track.className = 'gl-rolling-number__track';
  track.style.transition = TRANSITION;

  for (let d = 0; d < DIGIT_COUNT; d += 1) {
    const digitEl = document.createElement('span');
    digitEl.className = 'gl-rolling-number__digit';
    digitEl.textContent = String(d);
    digitEl.style.height = `${digitHeight}px`;
    digitEl.style.lineHeight = `${digitHeight}px`;
    track.appendChild(digitEl);
  }

  column.appendChild(track);
  column.__digitHeight = digitHeight;
  return column;
}

function positionColumn(column, digit, delayMs) {
  const track = column.querySelector('.gl-rolling-number__track');
  const reduced = prefersReducedMotion();
  track.style.transitionDelay = reduced ? '0ms' : `${delayMs}ms`;
  track.style.transitionDuration = reduced ? '0ms' : '';
  track.style.transform = `translateY(-${digit * column.__digitHeight}px)`;
  column.dataset.digit = String(digit);
}

function buildSeparator(ch, digitWidth) {
  const sep = document.createElement('span');
  sep.className = 'gl-rolling-number__sep';
  sep.textContent = ch === ' ' ? ' ' : ch;
  sep.style.width = `${Math.round(digitWidth * 0.5)}px`;
  return sep;
}

/**
 * @param {object} options
 * @param {number} [options.value] - Initial value.
 * @param {number} [options.fontSize] - Font size in px (drives column sizing).
 * @param {string} [options.color] - CSS color (accepts a `--gl-color-*` var()).
 * @param {number|string} [options.weight] - Font weight.
 * @returns {HTMLElement & { update: (next: number) => void, value: number }}
 */
export function createRollingNumber({ value = 0, fontSize = 32, color = 'currentColor', weight = 700 } = {}) {
  const digitHeight = Math.round(fontSize * 1.08);
  const digitWidth = Math.round(fontSize * 0.64);

  const root = document.createElement('span');
  root.className = 'gl-rolling-number';
  root.style.fontSize = `${fontSize}px`;
  root.style.fontWeight = String(weight);
  root.style.color = color;

  /** @type {(HTMLElement|null)[]} one entry per character position; null = separator */
  let columns = [];
  let currentValue = value;

  function isSeparatorAt(index) {
    return columns[index] === null;
  }

  function rebuild(chars) {
    root.innerHTML = '';
    columns = chars.map((ch) => {
      if (!isDigitChar(ch)) {
        root.appendChild(buildSeparator(ch, digitWidth));
        return null;
      }
      const col = buildColumn(digitHeight, digitWidth);
      root.appendChild(col);
      return col;
    });
  }

  function apply(chars, animate) {
    let digitIndex = 0;
    chars.forEach((ch, i) => {
      if (!isDigitChar(ch)) return;
      positionColumn(columns[i], Number(ch), animate ? digitIndex * STAGGER_MS : 0);
      digitIndex += 1;
    });
  }

  function render(nextValue, animate) {
    const chars = formatChars(nextValue);
    const needsRebuild =
      chars.length !== columns.length || chars.some((ch, i) => isDigitChar(ch) === isSeparatorAt(i));

    if (needsRebuild) {
      rebuild(chars);
      apply(chars, false);
    } else {
      apply(chars, animate);
    }

    currentValue = nextValue;
    // `chars` is already normalized to plain ASCII spaces by formatChars().
    root.setAttribute('aria-label', chars.join(''));
  }

  render(value, false);

  root.update = (nextValue) => render(nextValue, true);
  Object.defineProperty(root, 'value', {
    get() {
      return currentValue;
    },
  });

  return root;
}
