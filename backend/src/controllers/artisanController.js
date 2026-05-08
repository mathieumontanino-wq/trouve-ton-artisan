// ============================================================
// src/controllers/artisanController.js
// Logique métier pour les artisans
// ============================================================

const { Op } = require('sequelize');
const { Artisan, Specialite, Categorie } = require('../models');

// ------------------------------------------------------------
// GET /api/artisans
// Récupère tous les artisans avec filtres optionnels :
//   ?categorie=Alimentation      (filtre par nom de catégorie)
//   ?top=true                    (uniquement les artisans du mois)
//   ?nom=labbé                   (recherche par nom partiel)
// ------------------------------------------------------------
const getAllArtisans = async (req, res, next) => {
  try {
    const { top, categorie, nom } = req.query;
    
    const where = {};
    if (top === 'true') where.top = true;
    if (nom) where.nom = { [Op.like]: `%${nom}%` };

    const whereCategorie = {};
    if (categorie) whereCategorie.nom = categorie;

    const artisans = await Artisan.findAll({
      where,
      include: [
        {
          model: Specialite,
          as: 'specialite',
          required: !!categorie,
          include: [
            {
              model: Categorie,
              as: 'categorie',
              where: Object.keys(whereCategorie).length ? whereCategorie : undefined,
              required: !!categorie,
            },
          ],
        },
      ],
      order: [['nom', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      count: artisans.length,
      data: artisans,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------------
// GET /api/artisans/:id
// Récupère un artisan avec sa spécialité et sa catégorie
// ------------------------------------------------------------
const getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation simple : id doit être un nombre entier positif
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'ID invalide'
      });
    }

    const artisan = await Artisan.findByPk(id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        include: [{
          model: Categorie,
          as: 'categorie'
        }]
      }]
    });

    if (!artisan) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Artisan #${id} introuvable`
      });
    }

    res.status(200).json({
      status: 'OK',
      data: artisan
    });
  } catch (error) {
    console.error('Erreur getArtisanById :', error.message);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de la récupération de l\'artisan'
    });
  }
};

module.exports = {
  getAllArtisans,
  getArtisanById
};