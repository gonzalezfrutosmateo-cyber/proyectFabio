import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Alumnos', href: '/alumnos' },
  { label: 'Secretaría', href: '/secretaria' },
  { label: 'Matrículas', href: '/matriculas' },
  { label: 'Carreras', href: '/carreras' },
  { label: 'Reportes', href: '/reportes' },
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
        <a href="/" className="navbar__logo">MatriculaSystem</a>

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
                <a href={item.href} className="navbar__link">{item.label}</a>
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
