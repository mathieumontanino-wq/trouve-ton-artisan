// ============================================================
// components/layout/Footer.jsx
// Footer 3 colonnes : adresse, contact, liens institutionnels
// ============================================================

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">

          {/* Colonne 1 — Adresse */}
          <div className="footer__column">
            <h2 className="footer__title">Région Auvergne-Rhône-Alpes</h2>
            <address className="footer__address">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France
            </address>
          </div>

          {/* Colonne 2 — Contact */}
          <div className="footer__column">
            <h2 className="footer__title">Contact</h2>
            <p className="footer__phone">
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </p>
            <p>
                <a
              
                href="https://www.auvergnerhonealpes.fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Site officiel de la région
              </a>
            </p>
          </div>

          {/* Colonne 3 — Liens institutionnels */}
          <div className="footer__column">
            <h2 className="footer__title">Informations</h2>
            <nav aria-label="Navigation secondaire">
              <ul className="footer__links">
                <li><Link to="/mentions-legales">Mentions légales</Link></li>
                <li><Link to="/donnees-personnelles">Données personnelles</Link></li>
                <li><Link to="/accessibilite">Accessibilité</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
              </ul>
            </nav>
          </div>

        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Trouve ton artisan — Région Auvergne-Rhône-Alpes</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;