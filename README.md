# 🛠️ Trouve ton artisan

> Plateforme web permettant aux particuliers de trouver un artisan dans la région **Auvergne-Rhône-Alpes** et de le contacter via un formulaire.

Projet réalisé dans le cadre du **Devoir Bilan** de la formation **Développeur Web** au Centre Européen de Formation (CEF).

![Frontend](https://img.shields.io/badge/frontend-React%2019-61DAFB)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-339933)
![BDD](https://img.shields.io/badge/BDD-MySQL%208.4-4479A1)
![Accessibilité](https://img.shields.io/badge/WCAG-2.1%20AA-success)

---

## 📋 Table des matières

- [🎯 Présentation](#-présentation)
- [🛠️ Technologies](#️-technologies)
- [📁 Structure du projet](#-structure-du-projet)
- [✅ Prérequis](#-prérequis)
- [📦 Installation](#-installation)
- [🚀 Lancement](#-lancement)
- [🌐 Endpoints API](#-endpoints-api)
- [🛡️ Sécurité](#️-sécurité)
- [♿ Accessibilité](#-accessibilité)
- [📐 Responsive](#-responsive)
- [📚 Documentation complémentaire](#-documentation-complémentaire)
- [👤 Auteur](#-auteur)

---

## 🎯 Présentation

**Trouve ton artisan** met en relation les habitants de la région Auvergne-Rhône-Alpes avec les artisans locaux qualifiés. Le site couvre **4 catégories** d'activités :

- 🍞 **Alimentation** (boulangers, bouchers, chocolatiers, traiteurs…)
- 🏗️ **Bâtiment** (plombiers, électriciens, chauffagistes…)
- 🛠️ **Fabrication** (bijoutiers, ferronniers, menuisiers…)
- ✂️ **Services** (coiffeurs, fleuristes, photographes…)

Les visiteurs peuvent :

- Consulter la liste des artisans par catégorie
- Voir la fiche détaillée d'un artisan (note, spécialité, ville, contact)
- Contacter un artisan via un formulaire qui envoie un email réel
- Rechercher un artisan par son nom

---

## 🛠️ Technologies

### Frontend

- **React 19** — Bibliothèque UI
- **Vite** — Bundler / serveur de développement
- **React Router** — Routing client
- **Bootstrap 5** — Framework CSS
- **Sass** — Préprocesseur CSS (architecture 7-1)
- **Axios** — Requêtes HTTP

### Backend

- **Node.js** — Runtime JavaScript
- **Express** — Framework web
- **Sequelize** — ORM MySQL
- **MySQL 8** — Base de données
- **Nodemailer** — Envoi d'emails
- **Helmet** — Sécurité HTTP
- **CORS** — Contrôle des origines
- **express-validator** — Validation des entrées
- **express-rate-limit** — Anti-spam

### Outils

- **Figma** — Maquettes (Desktop, Tablette, Mobile)
- **Git / GitHub** — Versioning
- **Postman** — Tests API
- **Mailtrap** — Sandbox SMTP en développement

---

## 📁 Structure du projet

```
trouve-ton-artisan/
├── backend/                    # API Express (port 3001)
│   ├── src/
│   │   ├── config/             # Configuration Sequelize
│   │   ├── controllers/        # Logique métier
│   │   ├── middlewares/        # Sécurité, validation, errors
│   │   ├── models/             # Modèles Sequelize
│   │   ├── routes/             # Définition des routes API
│   │   └── services/           # Service d'envoi email
│   ├── server.js               # Point d'entrée
│   ├── .env.example            # Modèle de configuration
│   └── README.md               # Documentation backend détaillée
│
├── frontend/                   # Application React (port 5173)
│   ├── public/                 # Fichiers statiques (favicon, robots.txt, sitemap.xml)
│   ├── src/
│   │   ├── components/         # Composants React
│   │   ├── pages/              # Pages (Accueil, Catégorie, FicheArtisan…)
│   │   ├── services/           # Service API Axios
│   │   ├── styles/             # Architecture Sass 7-1
│   │   ├── App.jsx             # Routing principal
│   │   └── main.jsx            # Point d'entrée React
│   ├── index.html              # HTML root + meta SEO
│   └── .env.example            # Modèle de configuration
│
├── database/                   # Scripts SQL
│   ├── 01_create_database.sql  # Création des tables
│   └── 02_seed_database.sql    # Données : 4 catégories, 15 spécialités, 17 artisans
│
├── docs/                       # Documentation
│   ├── 01-MCD.md               # Modèle Conceptuel de Données
│   ├── 02-MLD.md               # Modèle Logique de Données
│   ├── accessibilite/          # Audit WCAG 2.1 AA
│   ├── maquettes/              # Captures Figma (desktop/tablette/mobile)
│   ├── postman/                # Collection + environnement Postman
│   ├── preuves/                # Preuves d'envoi email Mailtrap
│   └── securite/               # Documentation sécurité
│
└── README.md                   # Ce fichier
```

---

## ✅ Prérequis

| Outil | Version minimale | Lien |
|---|---|---|
| **Node.js** | 18+ (recommandé 20 ou 24) | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | (livré avec Node) |
| **MySQL Server** | 8.0+ | [mysql.com](https://www.mysql.com/) |
| **Git** | 2+ | [git-scm.com](https://git-scm.com/) |
| **Compte Mailtrap** *(optionnel)* | — | [mailtrap.io](https://mailtrap.io/) — pour tester l'envoi d'emails en dev |

Un éditeur de code est également recommandé : [VS Code](https://code.visualstudio.com/).

---

## 📦 Installation

### 1️⃣ Cloner le repo

```bash
git clone https://github.com/mathieumontanino-wq/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2️⃣ Initialiser la base de données

Ouvre MySQL Workbench (ou ton client MySQL préféré) et exécute les 2 scripts dans l'ordre :

```bash
# 1. Création des tables (categorie, specialite, artisan)
mysql -u root -p < database/01_create_database.sql

# 2. Insertion des données (4 catégories, 15 spécialités, 17 artisans)
mysql -u root -p < database/02_seed_database.sql
```

### 3️⃣ Configurer le backend

```bash
cd backend
npm install
cp .env.example .env
```

Édite ensuite le fichier `backend/.env` avec tes propres identifiants :

```env
PORT=3001
NODE_ENV=development

# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=ton_mot_de_passe

# CORS (deux ports car Vite peut basculer entre 5173 et 5174)
CORS_ORIGIN=http://localhost:5173,http://localhost:5174

# SMTP Mailtrap (sandbox)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=ton_user_mailtrap
SMTP_PASSWORD=ton_password_mailtrap
SMTP_FROM="Trouve ton artisan <noreply@trouvetonartisan.fr>"
```

### 4️⃣ Configurer le frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

Le fichier `frontend/.env` contient juste l'URL de l'API :

```env
VITE_API_URL=http://localhost:3001/api
```

---

## 🚀 Lancement

Tu as besoin de **2 terminaux** ouverts en parallèle.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur **http://localhost:3001**.
Vérification rapide : http://localhost:3001/api/health

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

L'application est disponible sur **http://localhost:5173**.

---

## 🌐 Endpoints API

Tous les endpoints sont préfixés par `/api`.

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/health` | Santé du serveur |
| GET | `/health/db` | Santé de la connexion MySQL |
| GET | `/categories` | Liste des 4 catégories |
| GET | `/categories/:id` | Détail d'une catégorie |
| GET | `/specialites` | Liste des spécialités |
| GET | `/artisans` | Liste des artisans (filtres : `?top=true`, `?categorie=X`, `?nom=X`) |
| GET | `/artisans/:id` | Détail d'un artisan (avec spécialité et catégorie) |
| POST | `/contact` | Envoi d'un message à un artisan via email |

Une collection Postman complète est disponible dans `docs/postman/`.

---

## 🛡️ Sécurité

Plusieurs couches de sécurité sont appliquées sur le backend :

- **Helmet** — Headers HTTP sécurisés (XSS, clickjacking, MIME sniffing)
- **CORS** — Origines autorisées explicitement (whitelist)
- **Rate limiting** — Maximum 100 requêtes / 15 min par IP, et 5 contacts / heure par IP
- **express-validator** — Validation et sanitisation de toutes les entrées
- **Limite de payload** — 10 KB max par requête
- **Variables sensibles** — Stockées dans `.env`, jamais commitées (gitignore strict)

Documentation complète : `docs/securite/README.md`.

---

## ♿ Accessibilité

Le site respecte les normes **WCAG 2.1 niveau AA** :

| Outil | Score |
|---|---|
| **Lighthouse Accessibilité** | 100/100 |
| **axe DevTools** | 0 issue |
| **W3C HTML Validator** | 0 erreur, 0 warning |

Points clés :

- Contrastes de couleurs ≥ 4.5:1 (WCAG AA)
- Hiérarchie sémantique des titres respectée
- Navigation 100 % clavier (Tab, Skip link, Focus visible)
- Landmarks ARIA (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Labels associés à tous les champs de formulaire
- `<html lang="fr">` pour les lecteurs d'écran français

Documentation complète : `docs/accessibilite/README.md`.

---

## 📐 Responsive

Le site est **mobile-first** et testé sur 3 breakpoints :

| Device | Largeur | Particularités |
|---|---|---|
| 📱 **Mobile** | 375px | Menu burger, recherche dans le Hero |
| 📱 **Tablette** | 768px | 4 catégories visibles, recherche dans le Hero |
| 💻 **Desktop** | 1440px+ | 4 catégories + barre de recherche dans le Header |

Maquettes Figma disponibles dans `docs/maquettes/`.

---

## 📚 Documentation complémentaire

| Document | Emplacement |
|---|---|
| Documentation backend détaillée | `backend/README.md` |
| MCD / MLD | `docs/01-MCD.md`, `docs/02-MLD.md` |
| Maquettes Figma (PNG) | `docs/maquettes/{desktop,tablette,mobile}/` |
| Audit Accessibilité | `docs/accessibilite/README.md` |
| Documentation Sécurité | `docs/securite/README.md` |
| Collection Postman | `docs/postman/` |
| Preuves d'envoi email | `docs/preuves/` |

---

## 👤 Auteur

**Mathieu Montanino** — Formation **Développeur Web**, Centre Européen de Formation (CEF)

🐙 GitHub : [@mathieumontanino-wq](https://github.com/mathieumontanino-wq)

---

## 📄 Licence

Projet réalisé dans le cadre de la formation **Développeur Web** du CEF.
Code à usage pédagogique et démonstratif.

---

<p align="center">
  <em>Trouve ton artisan — Région Auvergne-Rhône-Alpes</em>
</p>

