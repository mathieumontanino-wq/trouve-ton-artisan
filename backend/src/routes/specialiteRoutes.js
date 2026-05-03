// ============================================================
// src/routes/specialiteRoutes.js
// ============================================================

const express = require('express');
const router = express.Router();
const { getAllSpecialites } = require('../controllers/specialiteController');

router.get('/', getAllSpecialites);

module.exports = router;