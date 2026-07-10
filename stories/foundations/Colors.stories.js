/**
 * Foundations / Colors — palette de marque (encre / papier / signal), rampe neutre
 * & états signal, et le tableau de contraste WCAG AA. Reprend fidèlement la section
 * `id="tokens"` de "Goallive Design System (standalone).html".
 */
export default {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const BRAND = [
  { name: 'Encre', varName: '--ink', hex: '#0B0B0C', bg: '#0B0B0C', desc: 'Canvas sombre · texte sur clair · partie GOAL du logo' },
  { name: 'Papier', varName: '--paper', hex: '#FFFFFF', bg: '#FFFFFF', desc: 'Canvas clair · texte sur sombre' },
  { name: 'Signal', varName: '--signal', hex: '#FF3B1F', bg: '#FF3B1F', desc: 'Accent unique · live / go · jauge · CTA · point « i »' },
];

const NEUTRAL = [
  ['ink-900', '#0B0B0C', ''],
  ['ink-800', '#141417', ''],
  ['ink-700', '#1E1E22', ''],
  ['ink-600', '#2A2A30', ''],
  ['grey-400', '#8A8A93', '· texte sur encre'],
  ['grey-600', '#6B6B74', '· texte sur papier'],
  ['paper-50', '#F5F6FB', ''],
  ['line', '#E6E8F0', ''],
  ['signal-deep', '#D92C10', '· texte blanc'],
  ['signal-deep-hover', '#B8240C', ''],
  ['signal-soft', 'rgba(255,59,31,.12)', ''],
  ['ok · fonctionnel', '#1F8A3B', ''],
];

const CONTRAST_ROWS = [
  { label: 'Papier sur encre', bg: '#0B0B0C', fg: '#F5F6FB', ratio: '18,4 : 1 · AAA' },
  { label: 'Grey-400 sur encre', bg: '#0B0B0C', fg: '#8A8A93', ratio: '5,6 : 1 · AA' },
  { label: 'Signal sur encre', bg: '#0B0B0C', fg: '#FF3B1F', ratio: '5,5 : 1 · AA' },
  { label: 'Blanc sur signal-deep', bg: '#D92C10', fg: '#FFFFFF', ratio: '4,9 : 1 · AA' },
  { label: 'Grey-600 sur papier', bg: '#F5F6FB', fg: '#6B6B74', ratio: '5,3 : 1 · AA' },
];

function brandSwatch({ name, varName, hex, bg, desc }) {
  return `
    <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-md);overflow:hidden;background:var(--gl-color-surface);">
      <div style="height:128px;background:${bg};border-bottom:1px solid var(--gl-color-hairline);position:relative;overflow:hidden;">
        ${name === 'Signal' ? '<div style="position:absolute;inset:0;background:radial-gradient(220px 120px at 80% -20%,rgba(255,255,255,.35),transparent 60%);"></div>' : ''}
      </div>
      <div style="padding:16px;">
        <div style="font-family:var(--gl-font-sans);font-weight:700;font-size:15px;color:var(--gl-color-text);">${name}</div>
        <div style="font-family:var(--gl-font-mono);font-size:13px;color:var(--gl-color-signal);margin:3px 0 8px;">${varName} · ${hex}</div>
        <div style="font-family:var(--gl-font-sans);font-size:13px;color:var(--gl-color-text-muted);line-height:1.4;">${desc}</div>
      </div>
    </div>
  `;
}

function neutralSwatch([name, hex]) {
  return `
    <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-sm);overflow:hidden;">
      <div style="height:62px;background:${hex.startsWith('rgba') ? 'var(--gl-color-surface)' : hex};border-bottom:1px solid var(--gl-color-hairline);position:relative;">
        ${hex.startsWith('rgba') ? `<div style="position:absolute;inset:0;background:${hex};"></div>` : ''}
      </div>
      <div style="padding:10px 12px;">
        <div style="font-family:var(--gl-font-sans);font-size:13px;font-weight:600;color:var(--gl-color-text);">${name}</div>
        <div style="font-family:var(--gl-font-mono);font-size:11px;color:var(--gl-color-text-muted);">${hex}</div>
      </div>
    </div>
  `;
}

function contrastCard({ label, bg, fg, ratio }) {
  return `
    <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-sm);background:${bg};padding:14px;">
      <div style="font-family:var(--gl-font-sans);font-size:14px;font-weight:700;color:${fg};margin-bottom:6px;">${label}</div>
      <div style="font-family:var(--gl-font-mono);font-size:11px;color:${fg === '#FFFFFF' ? 'rgba(255,255,255,.9)' : fg};">${ratio}</div>
    </div>
  `;
}

export const Palette = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 16px;">Palette de marque</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
        ${BRAND.map(brandSwatch).join('')}
      </div>
    </div>
  `,
};

export const NeutralRamp = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 16px;">Rampe neutre &amp; états signal</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;">
        ${NEUTRAL.map(neutralSwatch).join('')}
      </div>
    </div>
  `,
};

export const Contrast = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 16px;">Contraste · WCAG AA</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;">
        ${CONTRAST_ROWS.map(contrastCard).join('')}
      </div>
      <p style="font-family:var(--gl-font-sans);font-size:13px;color:var(--gl-color-text-muted);line-height:1.55;max-width:640px;margin:12px 0 0;">
        Le signal pur <span style="font-family:var(--gl-font-mono);color:var(--gl-color-signal);">#FF3B1F</span> reste réservé
        au non-texte (jauge, halo, point live), au wordmark et au texte sur fond sombre. Tout fond portant du texte blanc
        utilise <span style="font-family:var(--gl-font-mono);color:var(--gl-color-text);">signal-deep #D92C10</span>
        (hover #B8240C). Focus clavier : anneau signal 2 px, global via
        <span style="font-family:var(--gl-font-mono);color:var(--gl-color-text);">:focus-visible</span>.
      </p>
    </div>
  `,
};
