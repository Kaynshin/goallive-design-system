/**
 * Foundations / Introduction — install, CSS import, tokens, thèmes, invariants de marque.
 * Page docs rendue en HTML brut (pas de pipeline MDX nécessaire).
 */
export default {
  title: 'Foundations/Introduction',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const section = (title, body) => `
  <section style="margin:0 0 40px;">
    <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;line-height:1.2;letter-spacing:-.01em;margin:0 0 12px;">${title}</h2>
    ${body}
  </section>
`;

const codeBlock = (code) => `
  <pre style="background:var(--gl-color-surface-elevated);color:var(--gl-color-text);
    border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-sm);
    padding:16px 18px;font-family:var(--gl-font-mono);font-size:12px;line-height:1.6;overflow:auto;margin:0;">${code}</pre>
`;

export const Usage = {
  render: () => `
    <div style="max-width:760px;margin:0 auto;padding:48px 24px 64px;font-family:var(--gl-font-sans);">
      <div class="gl-wordmark" style="margin-bottom:8px;font-size:32px;">Go<span class="gl-wordmark__live">live</span></div>
      <p style="font-family:var(--gl-font-sans);font-size:14px;color:var(--gl-color-text-muted);margin:0 0 32px;max-width:60ch;">
        Une seule source de vérité. Tricolore strict — encre, papier, signal — aucun bleu. Tout le reste dérive.
      </p>

      ${section('Installation (npm)', codeBlock('npm install goallive-design-system'))}

      ${section('Import CSS', codeBlock(
        `import 'goallive-design-system/css';\n// ou : &lt;link rel="stylesheet" href="node_modules/goallive-design-system/dist/goallive.css"&gt;`
      ))}

      ${section('CDN', codeBlock(
        `&lt;link rel="stylesheet"\n  href="https://unpkg.com/goallive-design-system/dist/goallive.css"&gt;`
      ))}

      ${section('Tokens JS / Tailwind preset', codeBlock(
        `import { color, font, fontSize, space, radius, effect, motion } from 'goallive-design-system';\nimport glPreset from 'goallive-design-system/tailwind';`
      ))}

      ${section('Thèmes', `
        <p style="font-family:var(--gl-font-sans);font-size:14px;line-height:1.6;color:var(--gl-color-text-muted);max-width:60ch;margin:0 0 12px;">
          Les alias sémantiques (<code>--gl-color-canvas</code>, <code>--gl-color-text</code>, ...) basculent
          via l'attribut <code>data-theme="light"</code> (ou la classe <code>.gl-light</code>) posé sur un
          conteneur ancêtre. <strong>Le thème sombre est la valeur par défaut</strong> (aucun attribut requis) — le light est
          une bascule explicite.
        </p>
        ${codeBlock(`&lt;body&gt;...&lt;/body&gt; &lt;!-- sombre, par défaut --&gt;\n&lt;body data-theme="light"&gt;...&lt;/body&gt;\n&lt;div class="gl-light"&gt;...&lt;/div&gt;`)}
      `)}

      ${section('Invariants de marque', `
        <ul style="font-family:var(--gl-font-sans);font-size:14px;line-height:1.7;color:var(--gl-color-text-muted);padding-left:20px;margin:0;">
          <li>Accent unique <code>signal #FF3B1F</code> — jamais de bichromie, aucun bleu.</li>
          <li>Wordmark : <code>Goal</code> hérite la couleur du texte, <code>live</code> toujours signal.</li>
          <li>Tout fond portant du texte blanc utilise <code>signal-deep #D92C10</code> (hover <code>#B8240C</code>), jamais le signal pur.</li>
          <li>Halo réservé aux grandes surfaces (hero, fonds de section) — jamais décoratif seul.</li>
          <li>Thème sombre par défaut ; le point live pulse en continu tant qu'un direct est actif.</li>
          <li>Vocabulaire « soutien / défi / goal » — jamais « pari / mise ».</li>
        </ul>
      `)}
    </div>
  `,
};
