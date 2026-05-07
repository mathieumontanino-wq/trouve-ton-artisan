// ============================================================
// components/layout/Layout.jsx
// Layout commun à toutes les pages : Header + main + Footer
// ============================================================

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main" id="contenu-principal">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;