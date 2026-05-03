// ============================================================
// src/middlewares/validators.js
// Validation et sanitization des entrées utilisateur
// ============================================================

const { body, validationResult } = require('express-validator');

// ------------------------------------------------------------
// Validateurs pour le formulaire de contact
// ------------------------------------------------------------
// - Vérifie que tous les champs sont présents et bien formatés
// - Nettoie les entrées (escape) pour éviter les injections XSS
// Protège contre : XSS, injection SQL, données malformées
// ------------------------------------------------------------
const validateContact = [
  body('artisanId')
    .notEmpty().withMessage('L\'identifiant artisan est obligatoire')
    .isInt({ min: 1 }).withMessage('L\'identifiant artisan doit être un entier positif')
    .toInt(),

  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit faire entre 2 et 100 caractères')
    .escape(),

  body('email')
    .trim()
    .notEmpty().withMessage('L\'email est obligatoire')
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),

  body('objet')
    .trim()
    .notEmpty().withMessage('L\'objet est obligatoire')
    .isLength({ min: 3, max: 200 }).withMessage('L\'objet doit faire entre 3 et 200 caractères')
    .escape(),

  body('message')
    .trim()
    .notEmpty().withMessage('Le message est obligatoire')
    .isLength({ min: 10, max: 2000 }).withMessage('Le message doit faire entre 10 et 2000 caractères')
    .escape()
];

// ------------------------------------------------------------
// Middleware de gestion des erreurs de validation
// ------------------------------------------------------------
// À placer juste après les validateurs dans la route
// ------------------------------------------------------------
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Validation échouée',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateContact,
  handleValidationErrors
};