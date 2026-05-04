import { Routes, Route, Link } from 'react-router-dom';

import Accueil from './pages/Accueil';
import Categorie from './pages/Categorie';
import FicheArtisan from './pages/FicheArtisan';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      {/* Navigation temporaire de test */}
      <nav className="bg-light border-bottom py-2 mb-0">
        <div className="container d-flex gap-3 flex-wrap">
          <Link to="/" className="btn btn-sm btn-outline-primary">
            Accueil
          </Link>
          <Link to="/categorie/Alimentation" className="btn btn-sm btn-outline-primary">
            Cat. Alimentation
          </Link>
          <Link to="/categorie/Bâtiment" className="btn btn-sm btn-outline-primary">
            Cat. Bâtiment
          </Link>
          <Link to="/artisan/3" className="btn btn-sm btn-outline-primary">
            Fiche Artisan #3
          </Link>
          <Link to="/page-qui-n-existe-pas" className="btn btn-sm btn-outline-danger">
            Test 404
          </Link>
        </div>
      </nav>

      {/* Système de routing */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie/:nom" element={<Categorie />} />
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;