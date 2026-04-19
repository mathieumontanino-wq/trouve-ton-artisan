-- =============================================================
-- Script de création de la base de données "trouve_ton_artisan"
-- Projet : Devoir Bilan CEF - Trouve ton artisan
-- Auteur : Mathieu Montanino
-- SGBD   : MySQL 8
-- =============================================================

-- Suppression de la base si elle existe déjà (permet de relancer le script proprement)
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base avec jeu de caractères universel (supporte les accents et emojis)
CREATE DATABASE trouve_ton_artisan
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Sélection de la base pour les commandes suivantes
USE trouve_ton_artisan;

-- =============================================================
-- Table : categorie
-- Les 4 grandes catégories d'artisans (Alimentation, Bâtiment, Fabrication, Services)
-- =============================================================
CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom          VARCHAR(50)  NOT NULL UNIQUE
) ENGINE=InnoDB;

-- =============================================================
-- Table : specialite
-- Les métiers précis, chacun rattaché à une catégorie
-- =============================================================
CREATE TABLE specialite (
    id_specialite INT AUTO_INCREMENT PRIMARY KEY,
    nom           VARCHAR(50) NOT NULL,
    id_categorie  INT         NOT NULL,
    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =============================================================
-- Table : artisan
-- Les artisans de la région, chacun rattaché à une spécialité
-- =============================================================
CREATE TABLE artisan (
    id_artisan    INT AUTO_INCREMENT PRIMARY KEY,
    nom           VARCHAR(100)  NOT NULL,
    note          DECIMAL(2,1)  NOT NULL,
    ville         VARCHAR(100)  NOT NULL,
    a_propos      TEXT          NOT NULL,
    email         VARCHAR(150)  NOT NULL,
    site_web      VARCHAR(255)  NULL,
    top           BOOLEAN       NOT NULL DEFAULT FALSE,
    id_specialite INT           NOT NULL,
    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (id_specialite) REFERENCES specialite(id_specialite)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT chk_note CHECK (note BETWEEN 0 AND 5)
) ENGINE=InnoDB;

-- =============================================================
-- Index pour optimiser les requêtes fréquentes
-- =============================================================
-- La barre de recherche du header cherche sur le nom de l'artisan
CREATE INDEX idx_artisan_nom ON artisan(nom);
-- La page d'accueil affiche les 3 artisans "top"
CREATE INDEX idx_artisan_top ON artisan(top);