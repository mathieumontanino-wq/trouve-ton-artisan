// ============================================================
// src/middlewares/errorHandler.js
// Gestion centralisée des erreurs
// ============================================================

// ------------------------------------------------------------
// Middleware 404 — Route non trouvée
// ------------------------------------------------------------
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'ERROR',
    message: `Route ${req.method} ${req.originalUrl} non trouvée`
  });
};

// ------------------------------------------------------------
// Middleware d'erreur global
// ------------------------------------------------------------
// IMPORTANT : doit avoir 4 paramètres (err, req, res, next) pour
// qu'Express le reconnaisse comme middleware d'erreur.
// En production, on ne renvoie JAMAIS la stack trace au client.
// Protège contre : fuites d'informations sensibles
// ------------------------------------------------------------
const errorHandler = (err, req, res, next) => {
  console.error('═══════════════════════════════════════════════');
  console.error('🚨 Erreur serveur :');
  console.error('   Méthode :', req.method);
  console.error('   URL     :', req.originalUrl);
  console.error('   Message :', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error('   Stack   :', err.stack);
  }
  console.error('═══════════════════════════════════════════════');

  res.status(err.status || 500).json({
    status: 'ERROR',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'Une erreur interne est survenue'
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};