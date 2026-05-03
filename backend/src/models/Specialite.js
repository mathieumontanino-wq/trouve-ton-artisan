// ============================================================
// src/models/Specialite.js
// Modèle Sequelize pour la table `specialite`
// ============================================================

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Specialite = sequelize.define('Specialite', {
  id_specialite: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom de la spécialité est obligatoire' },
      len: {
        args: [2, 50],
        msg: 'Le nom doit faire entre 2 et 50 caractères'
      }
    }
  },
  id_categorie: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorie',
      key: 'id_categorie'
    }
  }
}, {
  tableName: 'specialite',
  timestamps: false
});

module.exports = Specialite;