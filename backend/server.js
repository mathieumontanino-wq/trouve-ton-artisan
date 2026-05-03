// ============================================================
// server.js — Point d'entrée du serveur backend
// Trouve ton artisan — Région Auvergne-Rhône-Alpes
// ============================================================

require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// ------------------------------------------------------------
// Middlewares natifs
// ------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// Gestion 404 (route non trouvée)
// ------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    status: 'ERROR',
    message: `Route ${req.method} ${req.originalUrl} non trouvée`
  });
});

// ------------------------------------------------------------
// Démarrage du serveur
// ------------------------------------------------------------
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════');
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📍 Environnement : ${process.env.NODE_ENV || 'development'}`);
  console.log(`🩺 Health check : http://localhost:${PORT}/api/health`);
  console.log('═══════════════════════════════════════════════');
});