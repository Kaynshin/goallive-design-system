# Goallive — Design System

Charte vivante et distribuable de **Goallive**, la plateforme où la communauté d'un
créateur finance en tokens des défis réalisés en live. Framework-agnostique, sans
dépendance runtime. Source de vérité : `tokens/` (format DTCG) → `dist/` généré.

## Marque

- **Nom** : Goallive (`goallive.gg`), double « l » distinct. Concept : **Goal + Live**, lecture « go alive ».
- **Wordmark** : Unbounded 800, bas-de-casse sauf le G initial. **GOAL** en encre/papier, **LIVE** en signal. Le point du « i » = voyant live. Classe `.gl-wordmark` (partie live : `.gl-wordmark__live`).
- **Signe réduit** : `g + l` (« gl » = good luck). Monogramme `G l l` pour favicon/avatar.
- **Ton de voix** : direct, énergique, complice. Vocabulaire « soutien / défi / goal », jamais « pari / mise ».

## Couleurs — tricolore strict (aucun bleu)

| Token | Hex | Usage |
|---|---|---|
| `--gl-color-ink` / `ink-900` | `#0B0B0C` | Canvas sombre, texte sur clair, GOAL du logo |
| `--gl-color-ink-800` | `#141417` | Surfaces / cartes sombres |
| `--gl-color-ink-700` | `#1E1E22` | Éléments surélevés, bordures internes |
| `--gl-color-ink-600` | `#2A2A30` | Bordures sur sombre |
| `--gl-color-grey-400` | `#8A8A93` | Texte atténué sur sombre |
| `--gl-color-grey-600` | `#6B6B74` | Texte atténué sur clair |
| `--gl-color-paper` | `#FFFFFF` | Canvas clair, texte sur sombre |
| `--gl-color-paper-50` | `#F5F6FB` | Canvas clair alt, corps de texte sur sombre |
| `--gl-color-line` | `#E6E8F0` | Bordures sur clair |
| `--gl-color-signal` | `#FF3B1F` | Accent unique — non-texte : jauge, halo, point live, wordmark, texte sur sombre |
| `--gl-color-signal-deep` | `#D92C10` | Texte blanc AA sur fond signal, fond CTA/boutons |
| `--gl-color-signal-deep-hover` | `#B8240C` | Hover de signal-deep |
| `--gl-color-signal-hover` | `#E63216` | Hover de signal (usages non signal-deep) |
| `--gl-color-signal-soft` | `rgba(255,59,31,.12)` | Fonds d'alerte / surlignage |
| `--gl-color-ok` | `#1F8A3B` | Succès fonctionnel (seule couleur sémantique tolérée) |

### Contraste — WCAG AA

- Papier sur encre : 18,4:1 (AAA)
- Grey-400 sur encre : 5,6:1 (AA)
- Signal sur encre : 5,5:1 (AA) — **signal pur réservé au non-texte + texte sur sombre**
- Blanc sur signal-deep : 4,9:1 (AA) — tout fond portant du texte blanc utilise `signal-deep`
- Grey-600 sur papier : 5,3:1 (AA)
- Focus clavier : anneau signal 2px via `:focus-visible`.

## Thèmes

Deux surfaces, mêmes tokens. **Sombre par défaut** (live, overlay OBS, app en direct) ;
**clair** en alternate (site, pages créateur, écrans de paiement).

Alias sémantiques (`--gl-color-canvas`, `--gl-color-surface`, `--gl-color-surface-elevated`,
`--gl-color-text`, `--gl-color-text-muted`, `--gl-color-hairline`) : valeurs **sombres par
défaut** sur `:root`, basculées en clair via `.gl-light` ou `[data-theme="light"]`.

## Typographie

- **Affichage** : `--gl-font-display` = Unbounded (logo, grands titres, poids 800).
- **Affichage alt** : `--gl-font-display-alt` = Bricolage Grotesque (titres alternatifs).
- **Texte / UI** : `--gl-font-sans` = Space Grotesk (corps, libellés, boutons 700, chiffres de jauge).
- **Mono** : `--gl-font-mono` = ui-monospace.
- Échelle : Display XL `clamp(48px,8vw,104px)`, H2 `clamp(30px,4vw,44px)`, H3 `clamp(20px,2.4vw,24px)`, corps 16, bouton/label 14, caption 12.

## Rayons, ombres, motion

- Rayons : `--gl-radius-sm` 11px, `--gl-radius-md` 14px, `--gl-radius-lg` 18px, `--gl-radius-pill` 999px, `--gl-radius-circle` 50%.
- Ombres : `shadow-drop` `0 8px 24px rgba(0,0,0,.45)`, `glow-signal` `0 0 26px rgba(255,59,31,.5)`.
- Motion : `--gl-motion-fast` 150ms, `--gl-motion` 220ms, `--gl-motion-slow` 360ms, ease `cubic-bezier(.3,.7,.2,1)`.
- Toujours respecter `prefers-reduced-motion`.

## Signatures (non négociables)

- **Halo** : dégradé radial signal discret en haut à droite des grandes surfaces (`--gl-effect-halo`). Variante faible en bas à gauche. Jamais criard.
- **Jauge de goal** : barre pill qui se remplit en signal, bump + glow à l'approche de la cible, états remplissage / atteinte (« GO ALIVE ») / échouée.
- **Point live** : cercle signal qui pulse (~1,3s), repris du point du « i ».
- **Compteurs roulants** : chaque chiffre roule verticalement (odomètre), stagger ~28ms.
- Micro-interactions : bump de jauge à l'enchère, « +5 » flottant, slide des toasts, skeleton shimmer. Chaque animation a une fonction.

## Architecture des composants (Atomic Design)

- **Foundations** : Colors, Typography, Radii, Motion, Introduction.
- **Atoms** : Button, SupportButtons, Input, FieldStates, Chip (solde), Badge/perks, StateTag, TwitchIdentity, Switch, Tabs, Tooltip, Skeleton, Focus, LiveDot, RollingNumber.
- **Molecules** : GoalGauge, OverlayAlert, VoteOption, ContributorRow, AmbitionTier, VoteTimer, Toast, EmptyState.
- **Organisms** : ChallengeCard, VotePanel, OBSOverlay, CreatorDashboard, RechargeModal, DisputeWindow, BackofficeStats.

## Faire évoluer le système

1. Éditer `tokens/*.tokens.json` (DTCG `$value`/`$type`) — seule source de vérité.
2. `npm run build` régénère `dist/`.
3. Ouvrir un changeset (`npm run changeset`).
4. Publier (`npm run release`).

`tokens/` doit rester synchronisé avec le bundle Claude Design (`reference/Goallive Design System (standalone).html`).
