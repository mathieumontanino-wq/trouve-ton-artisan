import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Accueil from './pages/Accueil';
import Categorie from './pages/Categorie';
import FicheArtisan from './pages/FicheArtisan';
import MentionsLegales from './pages/MentionsLegales';
import DonneesPersonnelles from './pages/DonneesPersonnelles';
import Accessibilite from './pages/Accessibilite';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categorie/:nom" element={<Categorie />} />
        <Route path="/artisan/:id" element={<FicheArtisan />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/donnees-personnelles" element={<DonneesPersonnelles />} />
        <Route path="/accessibilite" element={<Accessibilite />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;