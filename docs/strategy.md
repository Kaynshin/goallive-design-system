# Stratégie — Goallive Design System

## Objectif

Fournir une charte vivante et distribuable qui garantit la cohérence visuelle de Goallive
sur tous ses surfaces : site marketing, app viewer/créateur, overlay OBS en direct. Une
source de vérité, deux thèmes, zéro dérive.

## Principes

- **Tricolore strict** : encre, papier, signal. Aucun bleu, aucun second accent.
- **Sombre par défaut** : le live prime ; le clair est l'alternate.
- **Fonction avant décoration** : chaque animation confirme, signale ou guide.
- **Accessibilité AA minimum** sur tout le texte, dans les deux thèmes.
- **Zéro dépendance runtime** : consommable en CSS pur, Tailwind ou tokens JS/TS.

## Non-objectifs

- Pas de bibliothèque de composants React/Vue livrée (le DS fournit tokens + CSS + primitives ;
  les apps assemblent). Storybook sert de vitrine, pas de package de composants.
- Pas de theming multi-marque : Goallive uniquement.
- Pas de logique produit (paiement, vote, temps réel) — hors périmètre du DS.

## Cap

1. **v0.1** : tokens + build + Storybook + tests (fondations, atoms, molecules, organisms). ← actuel
2. Publication npm + déploiement Storybook (GitHub Pages) une fois un remote configuré.
3. Itérations pilotées par les besoins réels des apps consommatrices (nouvelles briques,
   variantes), toujours via changeset + PR.
