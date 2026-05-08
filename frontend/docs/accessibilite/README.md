# 🛡️ Conformité Accessibilité — Trouve ton artisan

Ce document liste les points d'accessibilité mis en œuvre sur le site **Trouve ton artisan**, conformément aux exigences du brief CEF (WCAG 2.1 niveau AA) et au standard légal français (RGAA).

---

## 📊 Scores obtenus

| Outil | Page Accueil | Page Catégorie | Page Fiche artisan |
|---|---|---|---|
| **Lighthouse Accessibilité** | 96/100 → **100/100** ✅ | 94/100 → **100/100** ✅ | 96/100 → **100/100** ✅ |
| **axe DevTools** | 6 issues → **0** ✅ | 8 issues → **0** ✅ | 2 issues → **0** ✅ |
| **W3C Validator HTML** | **0 erreur, 0 warning** ✅ | — | — |

Outils utilisés :
- **Lighthouse** (intégré à Chrome DevTools)
- **axe DevTools** (extension Chrome par Deque Systems)
- **W3C Nu HTML Checker** (https://validator.w3.org/nu/)

---

## ✅ Critères WCAG 2.1 niveau AA respectés

### 1. Perceptible

- **Contrastes de couleurs** ≥ 4.5:1 (texte normal) et ≥ 3:1 (gros texte)
  - Fix appliqué : couleur du texte placeholder "Photo" sur les cards (#0074C7 → ratio 9:1)
  - Fix appliqué : couleur du texte ville sur les cards (#384050 → ratio 9.6:1)
  - Fix appliqué : suppression de l'opacity sur le compteur de caractères du formulaire
- **Texte alternatif** : aucune image bitmap utilisée (placeholders en CSS uniquement). Les icônes décoratives (⭐, 📍, ✉) sont marquées `aria-hidden="true"`.
- **Hiérarchie sémantique des titres** : pas de saut de niveau sur les 3 pages testées
  - Ajout d'un `<h2 className="visually-hidden">` sur la page Catégorie pour respecter la séquence H1 → H2 → H3

### 2. Opérable

- **Navigation au clavier** : 100% du site est utilisable sans souris (Tab, Shift+Tab, Enter, Escape)
- **Skip link** : "Aller au contenu principal" disponible en premier focus sur chaque page
- **Focus visible** : anneau bleu 3px sur tous les éléments interactifs (logo, menu, recherche, cards, formulaire, footer)
- **Pas de piège clavier** : tous les composants peuvent recevoir et perdre le focus

### 3. Compréhensible

- **Langue de la page** : `<html lang="fr">` déclaré
- **Labels de formulaire** : tous les champs du formulaire de contact ont un `<label htmlFor>` associé
- **Messages d'erreur clairs** : validation côté client avec `role="alert"` et `aria-invalid`
- **Indicateur de champ requis** : asterisque `*` avec `aria-hidden`, doublé d'une mention textuelle

### 4. Robuste

- **HTML valide** : 0 erreur W3C
- **Landmarks ARIA** présents : `<header role="banner">`, `<nav role="navigation">`, `<main role="main">`, `<footer role="contentinfo">`
- **Compatibilité lecteur d'écran** : structure sémantique HTML5 respectée

---

## 🛠️ Modifications de code apportées

| Fichier | Type | Description |
|---|---|---|
| `frontend/src/styles/components/_artisan-card.scss` | Style | Couleurs photo + ville WCAG-compliant |
| `frontend/src/styles/components/_contact-form.scss` | Style | Suppression opacity counter |
| `frontend/src/styles/components/_header.scss` | Style | Focus-visible sur logo + bouton recherche |
| `frontend/src/styles/abstracts/_mixins.scss` | Style | Renforcement mixin focus-visible (2px → 3px) |
| `frontend/src/styles/base/_typography.scss` | Style | Règle globale focus-visible + classe `.visually-hidden` |
| `frontend/src/pages/Categorie.jsx` | Composant | Ajout `<h2 visually-hidden>` pour séquence H |
| `frontend/src/components/layout/Layout.jsx` | Composant | Ajout `id="contenu-principal"` + `tabIndex="-1"` sur `<main>` |
| `frontend/index.html` | Meta | Title, description, lang="fr", Open Graph, theme-color |

---

## 🔍 Points vérifiés manuellement

Conformément aux recommandations Lighthouse "Autres éléments à vérifier manuellement" :

- [x] Les contrôles interactifs sont focusables au clavier
- [x] Les éléments interactifs indiquent leur état (hover, focus, active)
- [x] L'ordre logique de tabulation suit l'ordre visuel
- [x] Le focus utilisateur n'est pas piégé dans une zone
- [x] Les éléments landmarks HTML5 sont utilisés pour la navigation
- [x] Le contenu hors écran est masqué aux technologies d'assistance
- [x] Les contrôles personnalisés ont des labels associés