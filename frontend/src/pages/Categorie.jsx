import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtisansByCategorie } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';

function Categorie() {
  const { nom } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  setLoading(true);
  setError(null);
  getArtisansByCategorie(nom)
    .then((response) => {
      // response = réponse Axios complète
      // response.data = body JSON du backend ({ status, count, data: [...] })
      // response.data.data = le tableau d'artisans
      setArtisans(response.data.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Erreur récupération artisans :', err);
      setError('Impossible de charger les artisans pour cette catégorie.');
      setLoading(false);
    });
}, [nom]);

  return (
    <div className="categorie-page">
      <section className="categorie-hero">
        <div className="container">
          <h1>Catégorie&nbsp;: {nom}</h1>
          <p>
            {loading
              ? 'Chargement des artisans…'
              : `${artisans.length} artisan${artisans.length > 1 ? 's' : ''} disponible${artisans.length > 1 ? 's' : ''} dans cette catégorie.`}
          </p>
        </div>
      </section>

      <section className="categorie-liste">
        <div className="container">
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && artisans.length === 0 && (
            <p>Aucun artisan trouvé pour cette catégorie.</p>
          )}
          {!loading && !error && artisans.length > 0 && (
            <div className="categorie-grid">
              {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id_artisan} artisan={artisan} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Categorie;