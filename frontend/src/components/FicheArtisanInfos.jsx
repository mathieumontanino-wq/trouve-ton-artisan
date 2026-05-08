// ============================================================
// components/FicheArtisanInfos.jsx
// Section "À propos" + coordonnées (email, site web)
// ============================================================

function FicheArtisanInfos({ artisan }) {
  return (
    <section className="fiche-infos">
      <div className="container">
        <h2 className="fiche-infos__title">À propos</h2>

        {artisan.a_propos && (
          <p className="fiche-infos__texte">{artisan.a_propos}</p>
        )}

        <div className="fiche-infos__coordonnees">
          {artisan.email && (
            <p className="fiche-infos__ligne">
              <span aria-hidden="true">✉</span>
              <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
            </p>
          )}

          {artisan.site_web && (
            <p className="fiche-infos__ligne">
              <span aria-hidden="true">🌐</span>
                <a
              
                href={artisan.site_web}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visiter le site
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FicheArtisanInfos;