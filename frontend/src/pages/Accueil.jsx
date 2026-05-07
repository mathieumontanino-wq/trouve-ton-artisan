// ============================================================
// pages/Accueil.jsx
// Page d'accueil de la plateforme
// ============================================================

import Hero from '../components/Hero';
import CommentTrouver from '../components/CommentTrouver';
import ArtisansDuMois from '../components/ArtisansDuMois';

function Accueil() {
  return (
    <>
      <Hero />
      <CommentTrouver />
      <ArtisansDuMois />
    </>
  );
}

export default Accueil;