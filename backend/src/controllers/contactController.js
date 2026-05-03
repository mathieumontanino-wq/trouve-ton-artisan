// ============================================================
// src/controllers/contactController.js
// Logique métier pour le formulaire de contact
// ============================================================

const { Artisan } = require('../models');
const { sendContactEmail } = require('../services/emailService');

// ------------------------------------------------------------
// POST /api/contact
// Envoie un email à un artisan via Nodemailer
// Body attendu : { artisanId, nom, email, objet, message }
// (Validation déjà faite par le middleware validators.js)
// ------------------------------------------------------------
const sendContact = async (req, res) => {
  try {
    const { artisanId, nom, email, objet, message } = req.body;

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(artisanId);
    if (!artisan) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Artisan #${artisanId} introuvable`
      });
    }

    // Envoi de l'email
    await sendContactEmail({
      artisan: {
        nom: artisan.nom,
        email: artisan.email
      },
      expediteur: {
        nom,
        email
      },
      objet,
      message
    });

    console.log(`✉️  Email envoyé à ${artisan.nom} (${artisan.email}) de la part de ${nom} <${email}>`);

    res.status(200).json({
      status: 'OK',
      message: `Message envoyé à ${artisan.nom}. Une réponse vous sera apportée sous 48h.`
    });
  } catch (error) {
    console.error('Erreur sendContact :', error.message);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de l\'envoi du message'
    });
  }
};

module.exports = {
  sendContact
};