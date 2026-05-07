// ============================================================
// components/CommentTrouver.jsx
// Section "Comment trouver mon artisan ?" avec 4 étapes numérotées
// ============================================================

const ETAPES = [
  {
    numero: 1,
    titre: 'Choisis ta catégorie',
    description: "Trouve l'artisan adapté à ton besoin",
  },
  {
    numero: 2,
    titre: 'Choisis ton artisan',
    description: 'Compare les profils et les avis',
  },
  {
    numero: 3,
    titre: "Contacte l'artisan",
    description: 'Via le formulaire de contact',
  },
  {
    numero: 4,
    titre: 'Reçois une réponse',
    description: 'Sous 48h en moyenne',
  },
];

function CommentTrouver() {
  return (
    <section className="comment-trouver">
      <div className="container">
        <h2 className="comment-trouver__title">Comment trouver mon artisan ?</h2>

        <ol className="comment-trouver__steps">
          {ETAPES.map((etape) => (
            <li key={etape.numero} className="comment-trouver__step">
              <span className="comment-trouver__number" aria-hidden="true">
                {etape.numero}
              </span>
              <h3 className="comment-trouver__step-title">{etape.titre}</h3>
              <p className="comment-trouver__step-description">{etape.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default CommentTrouver;