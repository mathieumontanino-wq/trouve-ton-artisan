// ============================================================
// src/controllers/categorieController.js
// Logique métier pour les catégories
// ============================================================

const { Categorie, Specialite } = require('../models');

// ------------------------------------------------------------
// GET /api/categories
// Récupère toutes les catégories (pour le menu Header)
// ------------------------------------------------------------
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['nom', 'ASC']]
    });

    res.status(200).json({
      status: 'OK',
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Erreur getAllCategories :', error.message);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de la récupération des catégories'
    });
  }
};

// ------------------------------------------------------------
// GET /api/categories/:id
// Récupère une catégorie avec ses spécialités
// ------------------------------------------------------------
const getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;

    const categorie = await Categorie.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialites',
        attributes: ['id_specialite', 'nom']
      }]
    });

    if (!categorie) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Catégorie #${id} introuvable`
      });
    }

    res.status(200).json({
      status: 'OK',
      data: categorie
    });
  } catch (error) {
    console.error('Erreur getCategorieById :', error.message);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de la récupération de la catégorie'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategorieById
};