// ============================================================
// src/models/Categorie.js
// Modèle Sequelize pour la table `categorie`
// ============================================================

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  id_categorie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Le nom de la catégorie est obligatoire' },
      len: {
        args: [2, 50],
        msg: 'Le nom doit faire entre 2 et 50 caractères'
      }
    }
  }
}, {
  tableName: 'categorie',  // nom exact de la table en BDD
  timestamps: false        // pas de createdAt/updatedAt
});

module.exports = Categorie;