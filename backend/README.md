# Backend — Trouve ton artisan

API REST pour la plateforme **Trouve ton artisan** — Région Auvergne-Rhône-Alpes.

Stack technique : **Node.js · Express · Sequelize · MySQL · Nodemailer**

---

## 📋 Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- [MySQL](https://dev.mysql.com/downloads/) version 8 ou supérieure (ou MariaDB)
- Un compte SMTP pour l'envoi d'emails (recommandé en dev : [Mailtrap](https://mailtrap.io))

---

## 🚀 Installation

### 1. Cloner le repo et installer les dépendances

    cd backend
    npm install

### 2. Configurer la base de données MySQL

Depuis MySQL Workbench (ou via la ligne de commande), exécuter dans l'ordre les 2 scripts SQL situés dans `database/` à la racine du repo :

1. `database/01_create_database.sql` — Création de la base `trouve_ton_artisan` et de ses 3 tables (`categorie`, `specialite`, `artisan`)
2. `database/02_seed_database.sql` — Alimentation avec 4 catégories, 15 spécialités et 17 artisans

### 3. Configurer les variables d'environnement

Copier le fichier `.env.example` vers `.env` :

    cp .env.example .env

Puis renseigner les valeurs réelles dans `.env` :

| Variable | Description | Exemple |
|---|---|---|
| `PORT` | Port d'écoute du serveur | `3001` |
| `NODE_ENV` | Environnement (development/production) | `development` |
| `DB_HOST` | Adresse du serveur MySQL | `localhost` |
| `DB_PORT` | Port MySQL | `3306` |
| `DB_NAME` | Nom de la base | `trouve_ton_artisan` |
| `DB_USER` | Utilisateur MySQL | `root` |
| `DB_PASSWORD` | Mot de passe MySQL | (votre mot de passe) |
| `CORS_ORIGIN` | URL autorisée pour les requêtes (frontend) | `http://localhost:3000` |
| `SMTP_HOST` | Serveur SMTP | `sandbox.smtp.mailtrap.io` |
| `SMTP_PORT` | Port SMTP | `2525` |
| `SMTP_USER` | Identifiant SMTP | (depuis Mailtrap) |
| `SMTP_PASSWORD` | Mot de passe SMTP | (depuis Mailtrap) |
| `SMTP_FROM` | Adresse expéditeur des emails | `Trouve ton artisan <noreply@trouvetonartisan.fr>` |

---

## 🏃 Lancement

### En mode développement (avec rechargement automatique)

    npm run dev

### En mode production

    npm start

Au démarrage, le serveur affiche :

    ✅ Connexion à MySQL réussie
    ✅ Connexion SMTP OK
    ═══════════════════════════════════════════════
    ✅ Serveur démarré sur http://localhost:3001
    📍 Environnement : development
    🛡️  Sécurité     : helmet + cors + rate-limit
    📧 Email SMTP   : sandbox.smtp.mailtrap.io
    🩺 Health check : http://localhost:3001/api/health
    🗄️  Health DB    : http://localhost:3001/api/health/db
    ═══════════════════════════════════════════════

---

## 📡 Endpoints de l'API

Base URL en local : `http://localhost:3001/api`

### Health checks

| Méthode | Route | Description |
|---|---|---|
| GET | `/health` | État général du serveur |
| GET | `/health/db` | État de la connexion MySQL |

### Catégories

| Méthode | Route | Description |
|---|---|---|
| GET | `/categories` | Liste de toutes les catégories |
| GET | `/categories/:id` | Détail d'une catégorie + spécialités associées |

### Spécialités

| Méthode | Route | Description |
|---|---|---|
| GET | `/specialites` | Liste de toutes les spécialités avec leur catégorie |

### Artisans

| Méthode | Route | Description |
|---|---|---|
| GET | `/artisans` | Liste de tous les artisans |
| GET | `/artisans?top=true` | Filtre : artisans du mois uniquement |
| GET | `/artisans?categorie=Alimentation` | Filtre par nom de catégorie |
| GET | `/artisans?nom=lab` | Recherche partielle par nom |
| GET | `/artisans/:id` | Détail d'un artisan |

### Contact

| Méthode | Route | Description |
|---|---|---|
| POST | `/contact` | Envoi d'un email à un artisan via le formulaire |

Body attendu pour `POST /contact` :

    {
      "artisanId": 3,
      "nom": "Jean Dupont",
      "email": "jean.dupont@exemple.com",
      "objet": "Demande de devis",
      "message": "Bonjour, je souhaite obtenir un devis pour..."
    }

---

## 🧪 Tests Postman

Une collection Postman complète avec 14 requêtes de test (10 nominales + 1 POST + 3 cas d'erreur) est disponible dans `../docs/postman/`.

Pour l'utiliser :

1. Importer dans Postman les 2 fichiers :
   - `docs/postman/trouve-ton-artisan.postman_collection.json`
   - `docs/postman/trouve-ton-artisan.postman_environment.json`
2. Sélectionner l'environnement **"Trouve ton artisan - Local"** dans le menu déroulant en haut à droite
3. Lancer les requêtes (s'assurer que le serveur backend tourne au préalable)

---

## 🏗️ Architecture du code

    backend/
    ├── src/
    │   ├── config/
    │   │   └── database.js              # Configuration Sequelize + connexion MySQL
    │   ├── models/
    │   │   ├── index.js                 # Centralise les modèles + associations
    │   │   ├── Categorie.js             # Modèle Sequelize de la table categorie
    │   │   ├── Specialite.js            # Modèle Sequelize de la table specialite
    │   │   └── Artisan.js               # Modèle Sequelize de la table artisan
    │   ├── controllers/
    │   │   ├── categorieController.js   # Logique métier catégories
    │   │   ├── specialiteController.js  # Logique métier spécialités
    │   │   ├── artisanController.js     # Logique métier artisans (avec filtres)
    │   │   └── contactController.js     # Logique du formulaire de contact
    │   ├── routes/
    │   │   ├── index.js                 # Centralise toutes les routes API
    │   │   ├── categorieRoutes.js       # Routes /api/categories
    │   │   ├── specialiteRoutes.js      # Routes /api/specialites
    │   │   ├── artisanRoutes.js         # Routes /api/artisans
    │   │   └── contactRoutes.js         # Routes /api/contact
    │   ├── middlewares/
    │   │   ├── security.js              # Helmet + CORS + Rate-limiting
    │   │   ├── validators.js            # Validation des entrées (express-validator)
    │   │   └── errorHandler.js          # Gestion centralisée des erreurs
    │   └── services/
    │       └── emailService.js          # Service Nodemailer (envoi d'emails)
    ├── .env                             # Variables d'environnement (NON versionné)
    ├── .env.example                     # Modèle des variables (versionné)
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── README.md                        # Ce fichier
    └── server.js                        # Point d'entrée du serveur

---

## 🛡️ Sécurité

L'API met en place plusieurs couches de protection détaillées dans `docs/securite/README.md` :

- **Helmet** — Headers HTTP de sécurité (CSP, HSTS, X-Frame-Options, etc.)
- **CORS** — Restriction d'origine au frontend uniquement
- **Rate limiting** — 100 req / 15 min par IP (général), 5 envois / heure pour `/api/contact`
- **Body size limit** — 10 ko maximum (anti-payload bombing)
- **Validation et sanitization** — express-validator sur tous les inputs
- **Protection SQL injection** — via Sequelize (requêtes paramétrées)
- **Gestion centralisée des erreurs** — pas de fuite d'informations en prod
- **Variables sensibles dans `.env`** — exclues de Git via `.gitignore`

---

## 📦 Dépendances principales

| Package | Rôle |
|---|---|
| `express` | Framework HTTP |
| `sequelize` | ORM pour MySQL |
| `mysql2` | Driver MySQL natif |
| `dotenv` | Chargement des variables d'environnement |
| `cors` | Contrôle des origines autorisées |
| `helmet` | Headers HTTP de sécurité |
| `express-rate-limit` | Rate limiting anti-DDoS |
| `express-validator` | Validation et sanitization des inputs |
| `nodemailer` | Envoi d'emails SMTP |
| `nodemon` (dev) | Rechargement automatique du serveur |

---

## 📝 Auteur

**Mathieu Montanino** — Projet bilan formation web (CEF)