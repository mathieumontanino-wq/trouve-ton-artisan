// ============================================================
// src/routes/artisanRoutes.js
// ============================================================

const express = require('express');
const router = express.Router();
const {
  getAllArtisans,
  getArtisanById
} = require('../controllers/artisanController');

router.get('/', getAllArtisans);
router.get('/:id', getArtisanById);

module.exports = router;