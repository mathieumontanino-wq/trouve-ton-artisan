// ============================================================
// pages/Categorie.jsx
// Page liste des artisans d'une catégorie
// ============================================================

import { useParams } from 'react-router-dom';

function Categorie() {
  const { nom } = useParams();

  return (
    <div className="container py-5">
      <h1>Catégorie : {nom}</h1>
      <p>Cette page affichera la liste des artisans de la catégorie
        sélectionnée.</p>
    </div>
  );
}

export default Categorie;