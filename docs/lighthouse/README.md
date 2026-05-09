# 📊 Audits Lighthouse — Trouve ton artisan

Audits Google Lighthouse réalisés sur le site **déployé en production** le **9 mai 2026**.

## 🌐 Environnement testé

- **URL** : https://trouve-ton-artisan-mm.netlify.app
- **Frontend** : Netlify (plan Free)
- **Backend** : Render (Frankfurt, plan Free)
- **Base de données** : Railway MySQL (Frankfurt)
- **Outil** : Google Chrome + Lighthouse intégré
- **Mode** : Navigation, **navigation privée** (extensions Chrome désactivées pour fiabilité)

## 📈 Synthèse des scores

### Mode Mobile (CPU bridé 4×, réseau 4G ralenti — conditions exigeantes)

| Page | Performances | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Accueil | 99 | **100** | **100** | **100** |
| Catégorie Alimentation | 93 | **100** | **100** | **100** |
| Détail artisan | 74 | **100** | **100** | **100** |

### Mode Desktop

| Page | Performances | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Accueil | **100** | **100** | **100** | **100** |
| Catégorie Alimentation | **100** | **100** | **100** | **100** |
| Détail artisan | 81 | **100** | **100** | **100** |

## 🏆 Points clés

- **Accessibilité 100/100 sur les 6 tests** : conformité WCAG 2.1 niveau AA validée en production
- **Bonnes pratiques 100/100 sur les 6 tests** : sécurité, console propre, dépendances à jour
- **SEO 100/100 sur les 6 tests** : meta tags, sitemap, robots.txt, viewport, lang attribute conformes
- **Performances** : excellent en Desktop (100/100 sur 2 pages sur 3), bon en Mobile malgré les contraintes du plan Render Free (cold start)

## 📝 Note sur le score Performances de la page détail artisan

Le score 74 (Mobile) / 81 (Desktop) sur la page détail s'explique par :
- la présence d'un **formulaire de contact** plus lourd en JavaScript ;
- la **simulation Lighthouse Mobile** (CPU 4× bridé, 4G ralenti) qui ne reflète pas l'usage réel ;
- le **cold start Render Free** sur les premiers appels API.

Sur un appareil moderne réel, l'expérience utilisateur reste fluide et instantanée.

## 📁 Fichiers de ce dossier

Convention de nommage : `lighthouse-{date}-{device}-{page}.html`

| Fichier | Page testée | Device |
|---|---|---|
| `lighthouse-2026-05-09-mobile-accueil.html` | `/` | Mobile |
| `lighthouse-2026-05-09-mobile-categorie-alimentation.html` | `/categorie/Alimentation` | Mobile |
| `lighthouse-2026-05-09-mobile-artisan-detail.html` | `/artisan/1` | Mobile |
| `lighthouse-2026-05-09-desktop-accueil.html` | `/` | Desktop |
| `lighthouse-2026-05-09-desktop-categorie-alimentation.html` | `/categorie/Alimentation` | Desktop |
| `lighthouse-2026-05-09-desktop-artisan-detail.html` | `/artisan/1` | Desktop |

## 🔍 Comment relire un rapport

Double-clic sur n'importe quel fichier `.html` → s'ouvre dans le navigateur avec le rapport interactif complet (scores détaillés, métriques, opportunités d'amélioration).