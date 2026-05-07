// ============================================================
// components/Hero.jsx
// Bandeau d'accueil avec titre + barre de recherche
// La barre de recherche est visible UNIQUEMENT < 992px
// (sur Desktop, la recherche est dans le Header)
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?recherche=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section className="hero">
      <div className="container hero__container">
        <h1 className="hero__title">Trouve ton artisan idéal</h1>
        <p className="hero__subtitle">
          Découvrez les meilleurs artisans de la région Auvergne-Rhône-Alpes
        </p>

        {/* Barre de recherche : visible uniquement sur Mobile + Tablette */}
        <form className="hero__search" onSubmit={handleSearch} role="search">
          <label htmlFor="hero-search-input" className="visually-hidden">
            Rechercher un artisan par son nom
          </label>
          <input
            id="hero-search-input"
            type="search"
            className="hero__search-input"
            placeholder="Rechercher un artisan…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="hero__search-button"
            aria-label="Lancer la recherche"
          >
            🔍
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;