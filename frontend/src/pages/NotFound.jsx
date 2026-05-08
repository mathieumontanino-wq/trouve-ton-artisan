// ============================================================
// pages/NotFound.jsx
// Page d'erreur 404 — URL inexistante
// ============================================================

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <div className="not-found__card">
          <p className="not-found__code" aria-hidden="true">404</p>
          <h1 className="not-found__title">Page introuvable</h1>
          <p className="not-found__message">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/" className="not-found__button">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;