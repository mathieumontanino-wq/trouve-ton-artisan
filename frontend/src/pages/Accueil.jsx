// ============================================================
// pages/Accueil.jsx
// Page d'accueil de la plateforme
// ⚠️ Version temporaire de test API — sera remplacée à l'étape 6
// ============================================================

import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

function Accueil() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h1>Page Accueil — Test API</h1>
      <p>Test de l'appel <code>GET /api/categories</code> :</p>

      {loading && (
        <div className="alert alert-info">
          ⏳ Chargement…
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          ❌ Erreur : {error}
        </div>
      )}

      {!loading && !error && (
        <div className="alert alert-success">
          <p className="mb-2">
            ✅ <strong>{categories.length} catégories</strong> récupérées depuis le backend !
          </p>
          <ul className="mb-0">
            {categories.map((cat) => (
              <li key={cat.id_categorie}>
                <strong>{cat.nom}</strong> (id&nbsp;: {cat.id_categorie})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Accueil;