// ============================================================
// pages/NotFound.jsx
// Page 404
// ============================================================

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 style={{ fontSize: '80px' }}>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;