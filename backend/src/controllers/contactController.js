// ============================================================
// src/controllers/contactController.js
// Logique métier pour le formulaire de contact
// ⚠️ Nodemailer (envoi réel d'email) sera ajouté à l'étape 6
// ============================================================

const { Artisan } = require('../models');

// ------------------------------------------------------------
// POST /api/contact
// Reçoit un message du formulaire de contact et "envoie" un email
// Body attendu : { artisanId, nom, email, objet, message }
// ------------------------------------------------------------
const sendContact = async (req, res) => {
  try {
    const { artisanId, nom, email, objet, message } = req.body;

    // Validation des champs obligatoires
    if (!artisanId || !nom || !email || !objet || !message) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Tous les champs sont obligatoires (artisanId, nom, email, objet, message)'
      });
    }

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(artisanId);
    if (!artisan) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Artisan #${artisanId} introuvable`
      });
    }

    // TODO étape 6 : envoi réel via Nodemailer
    console.log('═══════════════════════════════════════════════');
    console.log('📧 Nouveau message de contact :');
    console.log(`   À : ${artisan.nom} (${artisan.email})`);
    console.log(`   De : ${nom} <${email}>`);
    console.log(`   Objet : ${objet}`);
    console.log(`   Message : ${message}`);
    console.log('═══════════════════════════════════════════════');

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