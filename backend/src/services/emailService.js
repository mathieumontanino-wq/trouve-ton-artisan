// ============================================================
// src/services/emailService.js
// Service d'envoi d'emails via Nodemailer
// ============================================================

const nodemailer = require('nodemailer');

// ------------------------------------------------------------
// Configuration du transporteur SMTP
// ------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: false, // true pour port 465, false pour 587/2525
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// ------------------------------------------------------------
// Vérifier la connexion SMTP au démarrage du serveur
// ------------------------------------------------------------
const verifySmtpConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Connexion SMTP OK');
    return true;
  } catch (error) {
    console.error('❌ Erreur connexion SMTP :', error.message);
    return false;
  }
};

// ------------------------------------------------------------
// Envoyer un email à un artisan depuis le formulaire de contact
// ------------------------------------------------------------
const sendContactEmail = async ({ artisan, expediteur, objet, message }) => {
  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #384050; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; }
        .header { background: #0074C7; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #F1F8FC; padding: 20px; border-radius: 0 0 8px 8px; }
        .info { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .label { font-weight: bold; color: #00497C; }
        .message-box { background: white; padding: 20px; border-left: 4px solid #0074C7; margin-top: 20px; }
        .footer { font-size: 12px; color: #666; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2 style="margin: 0;">🛠️ Trouve ton artisan</h2>
        <p style="margin: 5px 0 0 0;">Vous avez reçu un nouveau message</p>
      </div>
      <div class="content">
        <p>Bonjour <strong>${artisan.nom}</strong>,</p>
        <p>Un visiteur de la plateforme <em>Trouve ton artisan</em> souhaite vous contacter :</p>

        <div class="info">
          <p><span class="label">De :</span> ${expediteur.nom}</p>
          <p><span class="label">Email :</span> <a href="mailto:${expediteur.email}">${expediteur.email}</a></p>
          <p><span class="label">Objet :</span> ${objet}</p>
        </div>

        <div class="message-box">
          <p class="label">Message :</p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>

        <p style="margin-top: 25px;">
          Vous pouvez répondre directement à cet email pour entrer en contact avec le visiteur.
        </p>

        <div class="footer">
          <p>—<br>
          Trouve ton artisan — Région Auvergne-Rhône-Alpes<br>
          Cet email vous a été envoyé via le formulaire de contact du site.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: artisan.email,
    replyTo: expediteur.email,
    subject: `[Trouve ton artisan] ${objet}`,
    html,
    text: `Nouveau message de ${expediteur.nom} (${expediteur.email})\n\nObjet : ${objet}\n\nMessage :\n${message}`
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = {
  verifySmtpConnection,
  sendContactEmail
};