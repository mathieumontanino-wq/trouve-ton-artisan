// ============================================================
// pages/FicheArtisan.jsx
// Page de détail d'un artisan
// ============================================================

import { useParams } from 'react-router-dom';

function FicheArtisan() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <h1>Fiche artisan #{id}</h1>
      <p>Cette page affichera : Breadcrumb + Hero card + section À propos
        + formulaire de contact.</p>
    </div>
  );
}

export default FicheArtisan;