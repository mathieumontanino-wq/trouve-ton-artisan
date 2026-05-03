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
const getAllArtisans = async (req, res) => {
  try {
    const { categorie, top, nom } = req.query;

    // Construction dynamique des conditions
    const whereArtisan = {};
    const whereCategorie = {};

    if (top === 'true') {
      whereArtisan.top = true;
    }

    if (nom) {
      whereArtisan.nom = { [Op.like]: `%${nom}%` };
    }

    if (categorie) {
      whereCategorie.nom = categorie;
    }

    const artisans = await Artisan.findAll({
      where: whereArtisan,
      include: [{
        model: Specialite,
        as: 'specialite',
        include: [{
          model: Categorie,
          as: 'categorie',
          where: Object.keys(whereCategorie).length ? whereCategorie : undefined,
          required: !!categorie  // INNER JOIN si filtre par catégorie, sinon LEFT JOIN
        }]
      }],
      order: [['nom', 'ASC']]
    });

    res.status(200).json({
      status: 'OK',
      count: artisans.length,
      data: artisans
    });
  } catch (error) {
    console.error('Erreur getAllArtisans :', error.message);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de la récupération des artisans'
    });
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