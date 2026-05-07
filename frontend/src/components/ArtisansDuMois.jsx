// ============================================================
// components/ArtisansDuMois.jsx
// Section "Les artisans du mois" — 3 cards via l'API (top=true)
// ============================================================

import { useEffect, useState } from 'react';
import { getArtisansTop } from '../services/api';
import ArtisanCard from './ArtisanCard';

function ArtisansDuMois() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArtisansTop()
      .then((response) => {
        setArtisans(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur chargement artisans du mois :', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="artisans-du-mois">
      <div className="container">
        <h2 className="artisans-du-mois__title">Les artisans du mois</h2>

        {loading && (
          <p className="artisans-du-mois__status">Chargement…</p>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            Erreur de chargement des artisans : {error}
          </div>
        )}

        {!loading && !error && artisans.length === 0 && (
          <p className="artisans-du-mois__status">
            Aucun artisan du mois pour le moment.
          </p>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className="artisans-du-mois__grid">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id_artisan} artisan={artisan} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ArtisansDuMois;