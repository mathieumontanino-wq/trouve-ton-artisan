// ============================================================
// src/models/Artisan.js
// Modèle Sequelize pour la table `artisan`
// ============================================================

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id_artisan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom de l\'artisan est obligatoire' },
      len: {
        args: [2, 100],
        msg: 'Le nom doit faire entre 2 et 100 caractères'
      }
    }
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'La note doit être >= 0' },
      max: { args: [5], msg: 'La note doit être <= 5' }
    }
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La ville est obligatoire' }
    }
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La description est obligatoire' }
    }
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      isEmail: { msg: 'Email invalide' }
    }
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        args: { require_protocol: true },
        msg: 'URL invalide (doit commencer par http:// ou https://)'
      }
    }
  },
  top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  id_specialite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'specialite',
      key: 'id_specialite'
    }
  }
}, {
  tableName: 'artisan',
  timestamps: false
});

module.exports = Artisan;