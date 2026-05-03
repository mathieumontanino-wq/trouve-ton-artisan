// ============================================================
// src/config/database.js
// Configuration Sequelize + connexion à la base MySQL
// ============================================================

const { Sequelize } = require('sequelize');

// ------------------------------------------------------------
// Récupération des variables d'environnement (.env)
// ------------------------------------------------------------
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  NODE_ENV
} = process.env;

// ------------------------------------------------------------
// Instance Sequelize
// ------------------------------------------------------------
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: 'mysql',

  // Pool de connexions (recommandé pour production)
  pool: {
    max: 10,        // 10 connexions max simultanées
    min: 0,
    acquire: 30000, // 30s pour tenter d'obtenir une connexion
    idle: 10000     // 10s avant fermeture d'une connexion inactive
  },

  // Affichage des requêtes SQL en console (uniquement en dev)
  logging: NODE_ENV === 'development' ? console.log : false,

  // Convention de nommage des colonnes
  define: {
    timestamps: false, // pas de createdAt/updatedAt automatiques
    underscored: true  // colonnes en snake_case (id_artisan plutôt que idArtisan)
  }
});

// ------------------------------------------------------------
// Fonction utilitaire : tester la connexion
// ------------------------------------------------------------
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL :', error.message);
    return false;
  }
};

// ------------------------------------------------------------
// Export
// ------------------------------------------------------------
module.exports = {
  sequelize,
  testConnection
};