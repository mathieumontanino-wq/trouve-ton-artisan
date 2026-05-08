// ============================================================
// pages/FicheArtisan.jsx
// Page détail d'un artisan
// ============================================================

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisanById } from '../services/api';
import Breadcrumb from '../components/Breadcrumb';
import FicheArtisanHero from '../components/FicheArtisanHero';
import FicheArtisanInfos from '../components/FicheArtisanInfos';
import ContactForm from '../components/ContactForm';

function FicheArtisan() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getArtisanById(id)
      .then((response) => {
        setArtisan(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur récupération artisan :', err);
        if (err.response?.status === 404) {
          setError('not-found');
        } else {
          setError('server');
        }
        setLoading(false);
      });
  }, [id]);

  // ----- États de chargement / erreur -----
  if (loading) {
    return (
      <div className="container" style={{ padding: '64px 16px', textAlign: 'center' }}>
        <p>Chargement de la fiche artisan…</p>
      </div>
    );
  }

  if (error === 'not-found') {
    return (
      <div className="container" style={{ padding: '64px 16px', textAlign: 'center' }}>
        <h1 style={{ color: '#00497C' }}>Artisan introuvable</h1>
        <p>L'artisan que vous cherchez n'existe pas ou a été retiré.</p>
        <Link to="/" style={{ color: '#0074C7' }}>← Retour à l'accueil</Link>
      </div>
    );
  }

  if (error === 'server') {
    return (
      <div className="container" style={{ padding: '64px 16px', textAlign: 'center' }}>
        <h1 style={{ color: '#CD2C2E' }}>Erreur de chargement</h1>
        <p>Impossible de charger les informations de cet artisan. Veuillez réessayer.</p>
        <Link to="/" style={{ color: '#0074C7' }}>← Retour à l'accueil</Link>
      </div>
    );
  }

  // ----- Affichage normal -----
  const categorieNom = artisan.specialite?.categorie?.nom || 'Catégorie';

  const breadcrumbItems = [
    { label: 'Accueil', to: '/' },
    { label: categorieNom, to: `/categorie/${categorieNom}` },
    { label: artisan.nom },
  ];

  return (
    <div className="fiche-artisan-page">
      <Breadcrumb items={breadcrumbItems} />
      <FicheArtisanHero artisan={artisan} />
      <FicheArtisanInfos artisan={artisan} />
      <ContactForm artisan={artisan} />
    </div>
  );
}

export default FicheArtisan;