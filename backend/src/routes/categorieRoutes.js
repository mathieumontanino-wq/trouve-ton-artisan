// ============================================================
// src/routes/categorieRoutes.js
// ============================================================

const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategorieById
} = require('../controllers/categorieController');

router.get('/', getAllCategories);
router.get('/:id', getCategorieById);

module.exports = router;