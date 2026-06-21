import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Alumnos', to: '/alumnos' },
  { label: 'Secretaría', to: '/secretaria' },
  { label: 'Matrículas', to: '/matriculas' },
  { label: 'Carreras', to: '/carreras' },
  { label: 'Reportes', to: '/reportes' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">MatriculaSystem</Link>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar__menu ${mobileOpen ? 'is-open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((item) => (
              <li className="navbar__item" key={item.label}>
                <Link to={item.to} className="navbar__link">{item.label}</Link>
              </li>
            ))}
          </ul>

          <button type="button" className="navbar__cta" onClick={() => {}}>
            + Nueva Matrícula
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
