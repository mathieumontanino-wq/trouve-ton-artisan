// ============================================================
// components/Breadcrumb.jsx
// Fil d'Ariane réutilisable
// ============================================================

import { Link } from 'react-router-dom';

/**
 * @param {Array<{label: string, to?: string}>} items
 * Si "to" est absent, l'item est l'élément courant (non cliquable)
 */
function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb-nav" aria-label="Fil d'Ariane">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="breadcrumb-item">
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;