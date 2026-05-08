// ============================================================
// components/FicheArtisanHero.jsx
// Carte d'identité de l'artisan (haut de page fiche)
// ============================================================

function FicheArtisanHero({ artisan }) {
  return (
    <section className="fiche-hero">
      <div className="container">
        <div className="fiche-hero__card">
          <div className="fiche-hero__photo" aria-hidden="true">
            <span>Photo</span>
          </div>

          <div className="fiche-hero__infos">
            <h1 className="fiche-hero__nom">{artisan.nom}</h1>

            <div className="fiche-hero__note" aria-label={`Note ${artisan.note} sur 5`}>
              <span className="fiche-hero__star" aria-hidden="true">★</span>
              <span>{artisan.note} / 5</span>
            </div>

            <p className="fiche-hero__specialite">
              {artisan.specialite?.nom || 'Spécialité non renseignée'}
            </p>

            <p className="fiche-hero__ville">
              <span aria-hidden="true">📍</span> {artisan.ville}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FicheArtisanHero;