# 2. Thème sombre par défaut (dark-first)

Date : 2026-07-10
Statut : accepté

## Contexte

Le design system de référence est clair-par-défaut avec une classe `.od-dark` pour le
sombre. Goallive vit surtout **en direct** : overlay OBS, app live, dashboard créateur —
tous immersifs et sombres. Le clair ne sert que pour le site et les écrans de paiement.

## Décision

Inverser la mécanique de la référence : **sombre par défaut** sur `:root`, **clair en
override** via `.gl-light` / `[data-theme="light"]`.

Les alias sémantiques (`--gl-color-canvas`, `-surface`, `-surface-elevated`, `-text`,
`-text-muted`, `-hairline`) prennent leurs valeurs sombres sur `:root` ; `.gl-light`
les remplace par les valeurs claires. Le `<body>` est sombre par défaut.

## Alternatives écartées

- **Clair par défaut comme la référence** : inverse l'usage réel (le live est majoritaire),
  forcerait la classe de thème sur presque toutes les surfaces.
- **`prefers-color-scheme`** : le thème est piloté par le contexte produit (live vs site),
  pas par la préférence OS ; on garde un opt-in explicite.

## Conséquences

- Les surfaces live n'ont aucune classe de thème à poser (défaut = sombre).
- Le contraste AA est validé dans les deux thèmes (voir `design-system.md`).
- Différence assumée vs la référence : documentée ici pour éviter la confusion.
