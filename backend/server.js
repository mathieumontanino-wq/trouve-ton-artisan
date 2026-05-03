// ============================================================
// server.js — Point d'entrée du serveur backend
// Trouve ton artisan — Région Auvergne-Rhône-Alpes
// ============================================================

require('dotenv').config();

const express = require('express');
const { sequelize, testConnection } = require('./src/config/database');
const apiRoutes = require('./src/routes');

const {
  helmetMiddleware,
  corsMiddleware,
  generalLimiter
} = require('./src/middlewares/security');

const {
  notFoundHandler,
  errorHandler
} = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// ------------------------------------------------------------
// Middlewares de sécurité (avant tout le reste)
// ------------------------------------------------------------
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(generalLimiter);

// ------------------------------------------------------------
// Middlewares natifs avec limite de taille (anti payload bombing)
// ------------------------------------------------------------
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ------------------------------------------------------------
// Route de test (santé du serveur)
// ------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Serveur Trouve ton artisan opérationnel',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ------------------------------------------------------------
// Route de test : connexion à la base
// ------------------------------------------------------------
app.get('/api/health/db', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'OK',
      message: 'Connexion à MySQL active',
      database: process.env.DB_NAME
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Connexion à MySQL impossible'
    });
  }
});

// ------------------------------------------------------------
// Routes API
// ------------------------------------------------------------
app.use('/api', apiRoutes);

// ------------------------------------------------------------
// Gestion des erreurs (à la toute fin)
// ------------------------------------------------------------
app.use(notFoundHandler);
app.use(errorHandler);

// ------------------------------------------------------------
// Démarrage du serveur
// ------------------------------------------------------------
const startServer = async () => {
  const dbOk = await testConnection();

  if (!dbOk) {
    console.error('⚠️  Démarrage du serveur malgré l\'échec de connexion DB');
  }

  app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════════');
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📍 Environnement : ${process.env.NODE_ENV || 'development'}`);
    console.log(`🛡️  Sécurité     : helmet + cors + rate-limit`);
    console.log(`🩺 Health check : http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Health DB    : http://localhost:${PORT}/api/health/db`);
    console.log('═══════════════════════════════════════════════');
  });
};

startServer();