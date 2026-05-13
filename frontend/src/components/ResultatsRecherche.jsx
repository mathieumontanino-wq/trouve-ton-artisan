// ============================================================
// components/ResultatsRecherche.jsx
// Affiche les résultats de la recherche d'un artisan
// (lance la recherche depuis le paramètre URL ?recherche=xxx)
// ============================================================

import { useEffect, useState } from 'react';
import { searchArtisans } from '../services/api';
import ArtisanCard from './ArtisanCard';

function ResultatsRecherche({ terme }) {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchArtisans(terme)
      .then((response) => {
        setArtisans(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur recherche artisans :', err);
        setError(err.message);
        setLoading(false);
      });
  }, [terme]);

  return (
    <section className="artisans-du-mois">
      <div className="container">
        <h2 className="artisans-du-mois__title">
          Résultats pour « {terme} »
        </h2>

        {loading && (
          <p className="artisans-du-mois__status">Recherche en cours…</p>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            Erreur lors de la recherche : {error}
          </div>
        )}

        {!loading && !error && artisans.length === 0 && (
          <p className="artisans-du-mois__status">
            Aucun artisan ne correspond à votre recherche. Essayez avec un autre mot-clé.
          </p>
        )}

        {!loading && !error && artisans.length > 0 && (
          <>
            <p className="artisans-du-mois__status">
              {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé
              {artisans.length > 1 ? 's' : ''}
            </p>
            <div className="artisans-du-mois__grid">
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id_artisan} artisan={artisan} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ResultatsRecherche;