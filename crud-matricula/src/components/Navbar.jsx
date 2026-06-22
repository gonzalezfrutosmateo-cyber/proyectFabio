import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const navLinks = [
  { label: 'Inicio',     to: '/'           },
  { label: 'Alumnos',    to: '/alumnos'    },
  { label: 'Secretaría', to: '/secretaria' },
  { label: 'Matrículas', to: '/matriculas' },
  { label: 'Carreras',   to: '/carreras'   },
];

function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle }           = useTheme();

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
          <span /><span /><span />
        </button>

        <div className={`navbar__menu ${mobileOpen ? 'is-open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((item) => (
              <li className="navbar__item" key={item.label}>
                <Link to={item.to} className="navbar__link">{item.label}</Link>
              </li>
            ))}
          </ul>

          <button
            className="navbar__theme-toggle"
            onClick={toggle}
            aria-label="Cambiar tema"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
