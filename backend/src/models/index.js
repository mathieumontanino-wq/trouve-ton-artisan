// ============================================================
// src/models/index.js
// Point central : importe les modèles et définit les associations
// ============================================================

const { sequelize } = require('../config/database');

const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// ------------------------------------------------------------
// Associations
// ------------------------------------------------------------

// Catégorie 1 ─────── N Spécialité
Categorie.hasMany(Specialite, {
  foreignKey: 'id_categorie',
  as: 'specialites'
});
Specialite.belongsTo(Categorie, {
  foreignKey: 'id_categorie',
  as: 'categorie'
});

// Spécialité 1 ─────── N Artisan
Specialite.hasMany(Artisan, {
  foreignKey: 'id_specialite',
  as: 'artisans'
});
Artisan.belongsTo(Specialite, {
  foreignKey: 'id_specialite',
  as: 'specialite'
});

// ------------------------------------------------------------
// Export
// ------------------------------------------------------------
module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan
};