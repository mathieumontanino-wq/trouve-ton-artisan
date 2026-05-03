# Preuves de fonctionnement

Ce dossier contient des captures d'écran prouvant le bon fonctionnement 
des fonctionnalités clés du projet.

## Contenu

- `email-formulaire-contact.png` — Capture d'écran de l'email reçu dans 
  la boîte Mailtrap (bac à sable de test) suite à l'envoi d'un message 
  via le formulaire de contact de la fiche artisan. L'email est généré 
  par le serveur backend (Node.js + Nodemailer) à partir des données 
  postées sur l'endpoint `POST /api/contact` après validation des 
  champs et vérification de l'existence de l'artisan en base de données.

## Chaîne technique validée

PowerShell → POST /api/contact → middleware validation 
→ middleware rate-limit → contrôleur sendContact 
→ service emailService.sendContactEmail 
→ Nodemailer SMTP → Mailtrap (sandbox)