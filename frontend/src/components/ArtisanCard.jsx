// ============================================================
// components/ArtisanCard.jsx
// Card affichant un artisan : photo + nom + note + spécialité + ville
// ============================================================

import { Link } from 'react-router-dom';

function ArtisanCard({ artisan }) {
  // Affichage de la note avec ⭐ et 1 décimale
  const formatNote = (note) => {
    if (note == null) return null;
    return Number(note).toFixed(1);
  };

  return (
    <article className="artisan-card">
      <Link
        to={`/artisan/${artisan.id_artisan}`}
        className="artisan-card__link"
        aria-label={`Voir la fiche de ${artisan.nom}`}
      >
        {/* Photo placeholder (sera remplacée plus tard si on a des vraies photos) */}
        <div className="artisan-card__photo" aria-hidden="true">
          <span>Photo</span>
        </div>

        {/* Contenu textuel */}
        <div className="artisan-card__content">
          <h3 className="artisan-card__nom">{artisan.nom}</h3>

          {artisan.note != null && (
            <p className="artisan-card__note">
              <span className="artisan-card__star" aria-hidden="true">⭐</span>
              <span>{formatNote(artisan.note)}</span>
              <span className="visually-hidden">
                Note : {formatNote(artisan.note)} sur 5
              </span>
            </p>
          )}

          {artisan.specialite && (
            <p className="artisan-card__specialite">
              {artisan.specialite.nom}
            </p>
          )}

          {artisan.ville && (
            <p className="artisan-card__ville">{artisan.ville}</p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default ArtisanCard;