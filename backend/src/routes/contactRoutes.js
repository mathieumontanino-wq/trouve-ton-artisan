// ============================================================
// src/routes/contactRoutes.js
// ============================================================

const express = require('express');
const router = express.Router();
const { sendContact } = require('../controllers/contactController');
const { contactLimiter } = require('../middlewares/security');
const {
  validateContact,
  handleValidationErrors
} = require('../middlewares/validators');

// POST /api/contact
// Rate-limit : max 5 par heure / IP
// Validation : tous les champs sont contrôlés et sanitizés
router.post(
  '/',
  contactLimiter,
  validateContact,
  handleValidationErrors,
  sendContact
);

module.exports = router;