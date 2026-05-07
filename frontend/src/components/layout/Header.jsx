// ============================================================
// components/layout/Header.jsx
// Header avec logo + menu dynamique + recherche + burger mobile
//
// Comportement responsive (selon Figma) :
// - Mobile (< 768px)   : Logo + Burger. Menu en panneau déroulant.
// - Tablette (≥ 768px) : Logo + 4 catégories visibles. Pas de burger.
// - Desktop (≥ 992px)  : Logo + 4 catégories + barre de recherche.
// ============================================================

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/api';

function Header() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data.data))
      .catch((err) => console.error('Erreur chargement catégories :', err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?recherche=${encodeURIComponent(searchTerm.trim())}`);
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" role="banner">
      <a href="#contenu-principal" className="header__skip-link">
        Aller au contenu principal
      </a>

      <div className="container header__container">
        <Link
          to="/"
          className="header__logo"
          onClick={closeMenu}
          aria-label="Trouve ton artisan — Retour à l'accueil"
        >
          <span className="header__logo-text">Trouve ton artisan&nbsp;!</span>
          <span className="header__logo-subtitle">
            Avec la région Auvergne-Rhône-Alpes
          </span>
        </Link>

        <button
          type="button"
          className="header__burger"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="header__burger-bar"></span>
          <span className="header__burger-bar"></span>
          <span className="header__burger-bar"></span>
        </button>

        <nav
          id="menu-principal"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Navigation principale"
        >
          <ul className="header__menu">
            {categories.map((cat) => (
              <li key={cat.id_categorie} className="header__menu-item">
                <Link
                  to={`/categorie/${encodeURIComponent(cat.nom)}`}
                  className="header__menu-link"
                  onClick={closeMenu}
                >
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form className="header__search" onSubmit={handleSearch} role="search">
          <label htmlFor="header-search-input" className="visually-hidden">
            Rechercher un artisan par son nom
          </label>
          <input
            id="header-search-input"
            type="search"
            className="header__search-input"
            placeholder="Rechercher un artisan…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="header__search-button"
            aria-label="Lancer la recherche"
          >
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;