// ============================================================
// src/middlewares/security.js
// Middlewares de sécurité (helmet, cors, rate-limit)
// ============================================================

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// ------------------------------------------------------------
// 1. HELMET — Headers de sécurité HTTP
// ------------------------------------------------------------
// Active automatiquement une dizaine de headers protecteurs :
//   - X-Content-Type-Options: nosniff
//   - X-Frame-Options: DENY
//   - Strict-Transport-Security
//   - Content-Security-Policy
//   - etc.
// Protège contre : XSS, clickjacking, MIME-sniffing, downgrade HTTPS
// ------------------------------------------------------------
const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  },
  crossOriginEmbedderPolicy: false  // évite des soucis avec certaines images
});

// ------------------------------------------------------------
// 2. CORS — Contrôle des origines autorisées
// ------------------------------------------------------------
// L'API ne doit être accessible QUE depuis le frontend React (CORS_ORIGIN)
// CORS_ORIGIN peut contenir plusieurs URLs séparées par des virgules
// (utile en dev car Vite peut basculer entre 5173 et 5174)
// Toute requête venant d'un autre domaine sera rejetée
// Protège contre : utilisation non autorisée de l'API
// ------------------------------------------------------------
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim());

const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Autorise les requêtes sans origine (Postman, curl, healthchecks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origine non autorisée par CORS : ' + origin));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400  // cache la réponse preflight 24h
});

// ------------------------------------------------------------
// 3. RATE LIMITER — Limite globale (anti DDoS / scraping)
// ------------------------------------------------------------
// Maximum 100 requêtes par IP toutes les 15 minutes
// Protège contre : attaques par force brute, scraping, déni de service
// ------------------------------------------------------------
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'ERROR',
    message: 'Trop de requêtes depuis cette IP, réessayez dans 15 minutes'
  }
});

// ------------------------------------------------------------
// 4. RATE LIMITER STRICT — Spécial formulaire de contact
// ------------------------------------------------------------
// Maximum 5 envois de message par IP par heure
// Protège contre : spam via le formulaire de contact
// ------------------------------------------------------------
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 heure
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'ERROR',
    message: 'Trop de messages envoyés. Vous pouvez en envoyer 5 par heure maximum.'
  }
});

module.exports = {
  helmetMiddleware,
  corsMiddleware,
  generalLimiter,
  contactLimiter
};