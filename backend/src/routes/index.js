// ============================================================
// src/routes/index.js
// Centralise toutes les routes de l'API
// ============================================================

const express = require('express');
const router = express.Router();

const categorieRoutes = require('./categorieRoutes');
const specialiteRoutes = require('./specialiteRoutes');
const artisanRoutes = require('./artisanRoutes');
const contactRoutes = require('./contactRoutes');

// ------------------------------------------------------------
// Montage des routes
// ------------------------------------------------------------
router.use('/categories', categorieRoutes);
router.use('/specialites', specialiteRoutes);
router.use('/artisans', artisanRoutes);
router.use('/contact', contactRoutes);

module.exports = router;