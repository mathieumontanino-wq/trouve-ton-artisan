function App() {
  return (
    <div className="container py-5">
      <h1>Trouve ton artisan</h1>
      <p className="lead">
        Plateforme de mise en relation avec les artisans de la région
        Auvergne-Rhône-Alpes.
      </p>

      <div className="d-flex gap-3 mt-4 flex-wrap">
        <button className="btn btn-primary">Bouton primaire</button>
        <button className="btn btn-outline-primary">Bouton secondaire</button>
        <button className="btn btn-success">Succès</button>
        <button className="btn btn-danger">Erreur</button>
      </div>

      <div className="alert alert-info mt-4">
        ✅ Si tu vois cette page stylée avec les bonnes couleurs (#0074C7 pour
        le bleu, #82B864 pour le vert, #CD2C2E pour le rouge), ton design
        system fonctionne : Bootstrap 5 + Sass + variables personnalisées.
      </div>
    </div>
  );
}

export default App;