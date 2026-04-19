# MLD — Modèle Logique de Données

## Notation

- **Souligné** : clé primaire (PK)
- **#** : clé étrangère (FK)

## Tables

**categorie** (<u>id_categorie</u>, nom)

**specialite** (<u>id_specialite</u>, nom, #id_categorie)

**artisan** (<u>id_artisan</u>, nom, note, ville, a_propos, email, site_web, top, #id_specialite)

## Règles de passage du MCD au MLD

| MCD | MLD |
|-----|-----|
| Chaque entité | Devient une table |
| Identifiant d'entité | Devient clé primaire |
| Association (1,N) / (1,1) | La PK du côté (1,N) descend comme FK dans la table du côté (1,1) |

## Description détaillée des tables

### Table `categorie`

| Colonne | Type SQL | Contraintes |
|---------|----------|-------------|
| id_categorie | INT | PK, AUTO_INCREMENT |
| nom | VARCHAR(50) | NOT NULL, UNIQUE |

### Table `specialite`

| Colonne | Type SQL | Contraintes |
|---------|----------|-------------|
| id_specialite | INT | PK, AUTO_INCREMENT |
| nom | VARCHAR(50) | NOT NULL |
| id_categorie | INT | NOT NULL, FK → categorie(id_categorie) |

### Table `artisan`

| Colonne | Type SQL | Contraintes |
|---------|----------|-------------|
| id_artisan | INT | PK, AUTO_INCREMENT |
| nom | VARCHAR(100) | NOT NULL |
| note | DECIMAL(2,1) | NOT NULL |
| ville | VARCHAR(100) | NOT NULL |
| a_propos | TEXT | NOT NULL |
| email | VARCHAR(150) | NOT NULL |
| site_web | VARCHAR(255) | NULL autorisé |
| top | BOOLEAN | NOT NULL, DEFAULT FALSE |
| id_specialite | INT | NOT NULL, FK → specialite(id_specialite) |

## Justification des choix

- **AUTO_INCREMENT sur les PK** : les identifiants sont générés automatiquement par MySQL, évitant toute collision.
- **VARCHAR vs TEXT** : VARCHAR pour les chaînes courtes et indexables (nom, ville), TEXT pour les contenus longs (a_propos).
- **DECIMAL(2,1) pour la note** : précision exacte pour des valeurs type 4.5 (éviter les erreurs d'arrondi des FLOAT).
- **site_web nullable** : certains artisans du jeu d'essai n'en ont pas.
- **top BOOLEAN avec DEFAULT FALSE** : par défaut un artisan n'est pas "du mois".
- **UNIQUE sur categorie.nom** : les 4 catégories sont distinctes par nature, on interdit les doublons.