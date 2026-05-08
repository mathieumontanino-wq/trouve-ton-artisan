// ============================================================
// components/PageEnConstruction.jsx
// Composant générique pour les pages institutionnelles non finalisées
// ============================================================

import { Link } from 'react-router-dom';

function PageEnConstruction({ titre, description }) {
  return (
    <main className="page-construction">
      <div className="container">
        <div className="page-construction__card">
          <span className="page-construction__icon" aria-hidden="true">🚧</span>
          <h1 className="page-construction__title">{titre}</h1>
          {description && (
            <p className="page-construction__description">{description}</p>
          )}
          <p className="page-construction__status">
            Cette page est actuellement en cours de rédaction. Elle sera disponible prochainement.
          </p>
          <Link to="/" className="page-construction__button">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PageEnConstruction;