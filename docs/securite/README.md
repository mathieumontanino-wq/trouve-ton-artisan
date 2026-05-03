# Sécurité — Trouve ton artisan

Ce dossier rassemble les éléments de preuve et la documentation 
des mesures de sécurité mises en place sur le projet backend.

## Contenu

- `helmet-headers.png` — Capture d'écran des headers HTTP de sécurité 
  ajoutés par Helmet, visibles dans les DevTools du navigateur 
  (F12 → Réseau → /api/health → En-têtes de réponse).

## Mesures de sécurité mises en place (backend)

### 1. Helmet — Headers HTTP de sécurité
Plus d'une dizaine de headers ajoutés automatiquement à toutes les 
réponses HTTP :
- **Content-Security-Policy** : empêche l'exécution de scripts non 
  autorisés (protection XSS)
- **Strict-Transport-Security** : force l'utilisation de HTTPS
- **X-Frame-Options** : empêche le clickjacking via iframe
- **X-Content-Type-Options: nosniff** : empêche le MIME-sniffing
- **Cross-Origin-Opener-Policy** : isole la fenêtre des autres origines
- **Referrer-Policy** : limite ce qui est partagé en referer

### 2. CORS strict
L'API n'est accessible que depuis le frontend React 
(`http://localhost:3000` en dev), via la variable `CORS_ORIGIN` du 
fichier `.env`. Toute requête venant d'une autre origine est rejetée.

### 3. Rate limiting
- **Limiteur global** : 100 requêtes maximum par IP toutes les 15 minutes 
  (anti-DDoS, anti-scraping)
- **Limiteur strict sur `/api/contact`** : 5 envois maximum par IP par 
  heure (anti-spam du formulaire)

### 4. Limite de taille des requêtes
Toutes les requêtes JSON ou form-encoded sont limitées à 10 ko 
(anti-payload bombing).

### 5. Validation et sanitization des entrées
Le middleware `express-validator` valide chaque champ du formulaire 
de contact :
- Type (entier pour `artisanId`, email pour `email`, etc.)
- Longueur min/max
- Sanitization automatique via `.escape()` (anti-XSS) et 
  `.normalizeEmail()` 
- `.trim()` pour supprimer les espaces parasites

### 6. Protection contre les injections SQL
L'utilisation de **Sequelize** (ORM) garantit l'utilisation de 
requêtes paramétrées : aucune valeur utilisateur n'est concaténée 
directement dans une requête SQL.

### 7. Gestion centralisée des erreurs
En production (`NODE_ENV=production`), aucune stack trace n'est 
renvoyée au client : seulement un message générique. Cela évite la 
fuite d'informations sensibles (chemins fichiers, versions de 
modules, etc.).

### 8. Variables sensibles dans `.env`
Le mot de passe MySQL, les identifiants SMTP et autres secrets sont 
stockés dans un fichier `.env` exclu du repo Git via `.gitignore`. 
Un fichier `.env.example` est versionné pour servir de modèle 
(sans valeurs réelles).

## Vulnérabilités identifiées et corrigées

| Vulnérabilité | Risque | Mesure mise en place |
|---|---|---|
| XSS (Cross-Site Scripting) | Vol de session, redirection malicieuse | Helmet (CSP) + `.escape()` sur tous les inputs |
| Injection SQL | Vol/destruction de données | ORM Sequelize (requêtes paramétrées) |
| Clickjacking | Action utilisateur détournée | Helmet (X-Frame-Options) |
| MIME-sniffing | Exécution involontaire de fichier | Helmet (X-Content-Type-Options) |
| Force brute | Compromission par essais multiples | Rate limiting |
| Spam formulaire | Abus du formulaire de contact | Rate limit strict (5/h) |
| Payload bombing | Saturation serveur | Limite body 10 ko |
| Fuite d'info erreur | Découverte de la pile technique | Error handler centralisé |
| Accès cross-origin | Utilisation non autorisée de l'API | CORS strict |
| Secrets en clair | Compromission identifiants | `.env` non versionné |