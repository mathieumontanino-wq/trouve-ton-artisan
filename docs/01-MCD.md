# MCD — Modèle Conceptuel de Données

## Entités

### CATEGORIE
- id_categorie (identifiant)
- nom

### SPECIALITE
- id_specialite (identifiant)
- nom

### ARTISAN
- id_artisan (identifiant)
- nom
- note
- ville
- a_propos
- email
- site_web
- top (booléen : artisan du mois)

## Associations

### contenir (CATEGORIE ↔ SPECIALITE)
- Une catégorie contient 1 ou plusieurs spécialités (1,N)
- Une spécialité appartient à une et une seule catégorie (1,1)

### appartenir (SPECIALITE ↔ ARTISAN)
- Une spécialité regroupe 1 ou plusieurs artisans (1,N)
- Un artisan a une et une seule spécialité (1,1)

## Règles de gestion (issues du cahier des charges)

- RG1 : Un artisan apparaît dans une seule spécialité.
- RG2 : Une spécialité est rattachée à une seule catégorie.
- RG3 : Un artisan peut être marqué comme "artisan du mois" (top = true).

## Justification du modèle

Ce modèle respecte la 3e forme normale (3FN) : les catégories et spécialités sont extraites en tables dédiées pour éviter toute duplication. Un changement de nom de catégorie ne nécessite qu'une seule modification, répercutée automatiquement sur tous les artisans concernés.