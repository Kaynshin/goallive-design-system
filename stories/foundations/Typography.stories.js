/**
 * Foundations / Typography — Display XL, H2, variante Bricolage Grotesque, H3,
 * corps, bouton/label, caption. Reprend le bloc "Typographie" de la section
 * `id="tokens"` de "Goallive Design System (standalone).html".
 */
export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const row = (inner, caption) => `
  <div style="padding:18px 22px;border-bottom:1px solid var(--gl-color-hairline);">
    ${inner}
    <div style="font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);margin-top:8px;">${caption}</div>
  </div>
`;

export const Specimen = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 8px;">Échelle typographique</h2>
      <p style="font-family:var(--gl-font-sans);font-size:14px;line-height:1.6;color:var(--gl-color-text-muted);margin:0 0 24px;max-width:60ch;">
        Familles : <strong>Unbounded 800</strong> (display), <strong>Bricolage Grotesque 800</strong> (variante d'affichage),
        <strong>Space Grotesk</strong> (titres H3, corps, boutons, labels, captions).
      </p>
      <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-md);background:var(--gl-color-surface);overflow:hidden;">
        ${row(
          '<div style="font-family:var(--gl-font-display);font-weight:800;font-size:54px;line-height:.9;letter-spacing:-.03em;color:var(--gl-color-text);">Go<span style="color:var(--gl-color-signal);">live</span></div>',
          'Display XL · Unbounded 800 · 48–104px clamp'
        )}
        ${row(
          '<div style="font-family:var(--gl-font-display);font-weight:800;font-size:30px;letter-spacing:-.02em;color:var(--gl-color-text);">Remplis le goal</div>',
          'Titre H2 · Unbounded 800 · 30–44px clamp'
        )}
        ${row(
          '<div style="font-family:var(--gl-font-display-alt);font-weight:800;font-size:26px;letter-spacing:-.01em;color:var(--gl-color-text);">Variante d\'affichage</div>',
          'Bricolage Grotesque 800 · titres alternatifs'
        )}
        ${row(
          '<div style="font-family:var(--gl-font-sans);font-weight:700;font-size:22px;color:var(--gl-color-text);">Sous-titre de section</div>',
          'H3 · Space Grotesk 700 · 20–24px clamp'
        )}
        ${row(
          '<div style="font-family:var(--gl-font-sans);font-weight:400;font-size:16px;line-height:1.55;color:var(--gl-color-text);max-width:440px;">La communauté vote puis finance le défi gagnant en tokens jusqu\'à remplir le goal.</div>',
          'Corps · Space Grotesk 400–500 · 15–17px'
        )}
        <div style="padding:18px 22px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
          <span style="font-family:var(--gl-font-sans);font-weight:700;font-size:14px;color:var(--gl-color-text);text-transform:uppercase;letter-spacing:.04em;">Bouton / Label</span>
          <span style="font-family:var(--gl-font-sans);font-weight:500;font-size:12px;color:var(--gl-color-text-muted);">Caption · 12–13px · 500</span>
        </div>
      </div>
    </div>
  `,
};

const SIZES = [
  ['caption', 'var(--gl-font-size-caption)'],
  ['sm', 'var(--gl-font-size-sm)'],
  ['body', 'var(--gl-font-size-body)'],
  ['lg', 'var(--gl-font-size-lg)'],
  ['h3', 'var(--gl-font-size-h3)'],
  ['h2', 'var(--gl-font-size-h2)'],
  ['display-xl', 'var(--gl-font-size-display-xl)'],
];

export const Scale = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 20px;">Classes utilitaires .gl-t-*</h2>
      <div style="display:flex;flex-direction:column;gap:4px;">
        ${SIZES.map(
          ([name]) => `
          <div style="display:flex;align-items:baseline;gap:20px;border-bottom:1px solid var(--gl-color-hairline);padding:10px 0;">
            <div style="font-family:var(--gl-font-mono);font-size:11px;color:var(--gl-color-text-muted);width:96px;flex:none;">gl-t-${name}</div>
            <div class="gl-sans gl-t-${name}" style="line-height:1.15;color:var(--gl-color-text);">Remplis le goal, soutiens le défi</div>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `,
};
