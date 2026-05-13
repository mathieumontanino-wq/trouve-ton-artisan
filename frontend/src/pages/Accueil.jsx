// ============================================================
// pages/Accueil.jsx
// Page d'accueil de la plateforme
// Affiche soit les artisans du mois, soit les résultats de recherche
// selon la présence du paramètre URL ?recherche=xxx
// ============================================================

import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import CommentTrouver from '../components/CommentTrouver';
import ArtisansDuMois from '../components/ArtisansDuMois';
import ResultatsRecherche from '../components/ResultatsRecherche';

function Accueil() {
  const [searchParams] = useSearchParams();
  const recherche = searchParams.get('recherche');

  return (
    <>
      <Hero />
      <CommentTrouver />
      {recherche
        ? <ResultatsRecherche terme={recherche} />
        : <ArtisansDuMois />
      }
    </>
  );
}

export default Accueil;