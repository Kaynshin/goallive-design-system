# 1. Architecture du package design system

Date : 2026-07-10
Statut : accepté

## Contexte

Goallive a besoin d'un design system distribuable, réutilisable côté site, app live et
overlay OBS, sans imposer de framework. La charte (marque, couleurs tricolores, typo,
halo, jauge, compteurs roulants) est figée par un bundle Claude Design.

## Décision

Package npm **framework-agnostique, zéro dépendance runtime**, calqué sur l'architecture
du design system de référence `optiond-design-system` :

- **Source de vérité** : `tokens/*.tokens.json` au format DTCG (`$value`/`$type`).
- **Génération** via Style Dictionary v4 → `dist/tokens.js` (+ `.d.ts`), `dist/goallive.css`
  (variables `--gl-*` + alias sémantiques de thème + utilitaires), `dist/tailwind-preset.js`.
- **Primitives** (`build/primitives.css`) hand-authored : classes composites `.gl-*`
  (boutons, wordmark, jauge, badges…), pas des mappings token→variable 1:1.
- **Distribution** : `exports` conditionnels (`.` tokens JS/TS, `./css`, `./tailwind`, `./fonts/*`).
- **Polices self-hosted** (woff2) pour l'autonomie et le zéro-runtime.

## Alternatives écartées

- **CSS-in-JS / composants React** : lierait le DS à React, exclut l'overlay OBS et le site statique.
- **Tokens en variables CSS écrites à la main** : pas de source unique typée, dérive garantie.
- **Tailwind config monolithique** : le preset est fourni mais le DS reste utilisable en CSS pur / CDN.

## Conséquences

- Un seul endroit à éditer (`tokens/`), tout `dist/` est généré et gitignoré côté source.
- Consommable en CSS pur (CDN), en Tailwind (preset), ou en JS/TS (tokens bruts).
- Le préfixe `gl` évite les collisions dans les apps consommatrices.
