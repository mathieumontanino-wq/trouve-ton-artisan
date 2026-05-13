// ============================================================
// src/services/api.js
// Service Axios pour communiquer avec le backend
// ============================================================

import axios from 'axios';

// ------------------------------------------------------------
// Instance Axios configurée
// ------------------------------------------------------------
// Toutes les requêtes du frontend passent par cette instance.
// On y centralise : base URL, timeout, headers communs, intercepteurs.
// ------------------------------------------------------------

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 60000, // 60 secondes (gère le cold start Render Free)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ------------------------------------------------------------
// Intercepteur de réponses : log des erreurs en dev
// ------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ Erreur API :', error.message);
    }
    return Promise.reject(error);
  }
);

// ============================================================
// Méthodes de l'API — par ressource
// ============================================================

// ------------------------------------------------------------
// CATÉGORIES
// ------------------------------------------------------------
export const getCategories = () => api.get('/categories');

export const getCategorieById = (id) => api.get(`/categories/${id}`);

// ------------------------------------------------------------
// SPÉCIALITÉS
// ------------------------------------------------------------
export const getSpecialites = () => api.get('/specialites');

// ------------------------------------------------------------
// ARTISANS
// ------------------------------------------------------------
export const getArtisans = (params = {}) => api.get('/artisans', { params });

export const getArtisansTop = () => api.get('/artisans', { params: { top: 'true' } });

export const getArtisansByCategorie = (categorieNom) =>
  api.get('/artisans', { params: { categorie: categorieNom } });

export const searchArtisansByName = (nom) =>
  api.get('/artisans', { params: { nom } });

export const searchArtisans = (recherche) =>
  api.get('/artisans', { params: { recherche } });

export const getArtisanById = (id) => api.get(`/artisans/${id}`);

// ------------------------------------------------------------
// CONTACT
// ------------------------------------------------------------
export const sendContactMessage = (data) => api.post('/contact', data);

// ------------------------------------------------------------
// HEALTH
// ------------------------------------------------------------
export const checkHealth = () => api.get('/health');

export default api;