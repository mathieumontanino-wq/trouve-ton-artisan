// ============================================================
// src/controllers/specialiteController.js
// Logique métier pour les spécialités
// ============================================================

const { Specialite, Categorie } = require('../models');

// ------------------------------------------------------------
// GET /api/specialites
// Récupère toutes les spécialités, avec leur catégorie
// ------------------------------------------------------------
const getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: [{
        model: Categorie,
        as: 'categorie',
        attributes: ['id_categorie', 'nom']
      }],
      order: [['nom', 'ASC']]
    });

    res.status(200).json({
      status: 'OK',
      count: specialites.length,
      data: specialites
    });
  } catch (error) {
    console.error('Erreur getAllSpecialites :', error.message);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de la récupération des spécialités'
    });
  }
};

module.exports = {
  getAllSpecialites
};