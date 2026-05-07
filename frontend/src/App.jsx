import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Accueil from './pages/Accueil';
import Categorie from './pages/Categorie';
import FicheArtisan from './pages/FicheArtisan';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie/:nom" element={<Categorie />} />
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;