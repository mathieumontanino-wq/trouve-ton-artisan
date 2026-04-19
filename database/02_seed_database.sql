-- =============================================================
-- Script d'alimentation de la base "trouve_ton_artisan"
-- Projet : Devoir Bilan CEF - Trouve ton artisan
-- Auteur : Mathieu Montanino
-- =============================================================

USE trouve_ton_artisan;

-- =============================================================
-- Nettoyage des données existantes (permet de relancer le script proprement)
-- L'ordre de suppression est l'inverse de l'ordre de création :
-- on supprime d'abord les enfants, puis les parents.
-- =============================================================
DELETE FROM artisan;
DELETE FROM specialite;
DELETE FROM categorie;

-- Remise à zéro des compteurs AUTO_INCREMENT
ALTER TABLE artisan    AUTO_INCREMENT = 1;
ALTER TABLE specialite AUTO_INCREMENT = 1;
ALTER TABLE categorie  AUTO_INCREMENT = 1;

-- =============================================================
-- Insertion des 4 catégories
-- =============================================================
INSERT INTO categorie (id_categorie, nom) VALUES
    (1, 'Alimentation'),
    (2, 'Bâtiment'),
    (3, 'Fabrication'),
    (4, 'Services');

-- =============================================================
-- Insertion des 15 spécialités (rattachées à leur catégorie)
-- =============================================================
INSERT INTO specialite (id_specialite, nom, id_categorie) VALUES
    -- Alimentation (id_categorie = 1)
    (1,  'Boucher',      1),
    (2,  'Boulanger',    1),
    (3,  'Chocolatier',  1),
    (4,  'Traiteur',     1),
    -- Bâtiment (id_categorie = 2)
    (5,  'Chauffagiste', 2),
    (6,  'Electricien',  2),
    (7,  'Menuisier',    2),
    (8,  'Plombier',     2),
    -- Fabrication (id_categorie = 3)
    (9,  'Bijoutier',    3),
    (10, 'Couturier',    3),
    (11, 'Ferronier',    3),
    -- Services (id_categorie = 4)
    (12, 'Coiffeur',     4),
    (13, 'Fleuriste',    4),
    (14, 'Toiletteur',   4),
    (15, 'Webdesign',    4);

-- =============================================================
-- Insertion des 17 artisans (rattachés à leur spécialité)
-- Note : le texte "a_propos" est un Lorem ipsum standard pour le jeu d'essai
-- =============================================================
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, top, id_specialite) VALUES
    -- Alimentation
    ('Boucherie Dumont',       4.5, 'Lyon',             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'boucherie.dumond@gmail.com',             NULL,                                       FALSE, 1),
    ('Au pain chaud',          4.8, 'Montélimar',       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'aupainchaud@hotmail.com',                NULL,                                       TRUE,  2),
    ('Chocolaterie Labbé',     4.9, 'Lyon',             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'chocolaterie-labbe@gmail.com',           'https://chocolaterie-labbe.fr',            TRUE,  3),
    ('Traiteur Truchon',       4.1, 'Lyon',             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@truchon-traiteur.fr',            'https://truchon-traiteur.fr',              FALSE, 4),
    -- Bâtiment
    ('Orville Salmons',        5.0, 'Evian',            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'o-salmons@live.com',                     NULL,                                       TRUE,  5),
    ('Mont Blanc Eléctricité', 4.5, 'Chamonix',         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@mont-blanc-electricite.com',     'https://mont-blanc-electricite.com',       FALSE, 6),
    ('Boutot & fils',          4.7, 'Bourg-en-Bresse',  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'boutot-menuiserie@gmail.com',            'https://boutot-menuiserie.com',            FALSE, 7),
    ('Vallis Bellemare',       4.0, 'Vienne',           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'v.bellemare@gmail.com',                  'https://plomberie-bellemare.com',          FALSE, 8),
    -- Fabrication
    ('Claude Quinn',           4.2, 'Aix-les-Bains',    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'claude.quinn@gmail.com',                 NULL,                                       FALSE, 9),
    ('Amitee Lécuyer',         4.5, 'Annecy',           'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'a.amitee@hotmail.com',                   'https://lecuyer-couture.com',              FALSE, 10),
    ('Ernest Carignan',        5.0, 'Le Puy-en-Velay',  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'e-carigan@hotmail.com',                  NULL,                                       FALSE, 11),
    -- Services
    ('Royden Charbonneau',     3.8, 'Saint-Priest',     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'r.charbonneau@gmail.com',                NULL,                                       FALSE, 12),
    ('Leala Dennis',           3.8, 'Chambéry',         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'l.dennos@hotmail.fr',                    'https://coiffure-leala-chambery.fr',       FALSE, 12),
    ('C''est sup''hair',       4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'sup-hair@gmail.com',                     'https://sup-hair.fr',                      FALSE, 12),
    ('Le monde des fleurs',    4.6, 'Annonay',          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr',   FALSE, 13),
    ('Valérie Laderoute',      4.5, 'Valence',          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'v-laredoute@gmail.com',                  NULL,                                       FALSE, 14),
    ('CM Graphisme',           4.4, 'Valence',          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@cm-graphisme.com',               'https://cm-graphisme.com',                 FALSE, 15);

-- =============================================================
-- Requêtes de vérification (à exécuter manuellement pour contrôler le contenu)
-- =============================================================
-- SELECT COUNT(*) AS nb_categories FROM categorie;    -- doit retourner 4
-- SELECT COUNT(*) AS nb_specialites FROM specialite;  -- doit retourner 15
-- SELECT COUNT(*) AS nb_artisans FROM artisan;        -- doit retourner 17
-- SELECT COUNT(*) AS nb_artisans_top FROM artisan WHERE top = TRUE;  -- doit retourner 3