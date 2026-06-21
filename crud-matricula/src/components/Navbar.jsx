import { useState, useEffect } from 'react';
import './Navbar.css';

const navConfig = [
  {
    label: 'Somos Instituto',
    items: ['Institucional', 'Autoridades', 'Docentes', 'Graduados', 'Extensión', 'Donaciones'],
  },
  {
    label: 'Oferta académica',
    items: ['Carreras de grado', 'Posgrado', 'Doctorado', 'Educación Ejecutiva'],
  },
  {
    label: 'Investigación',
    items: ['Departamento de Investigación'],
  },
  { label: 'Negocios' },
  { label: 'Becas' },
  { label: 'Campus' },
  {
    label: 'Índice e Informes',
    items: ['Índice de Innovación', 'Informes'],
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown((current) => (current === index ? null : index));
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo">Instituto Buena Onda</a>

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
            {navConfig.map((item, index) => (
              <li
                key={item.label}
                className={`navbar__item ${item.items ? 'has-dropdown' : ''} ${
                  openDropdown === index ? 'is-open' : ''
                }`}
              >
                {item.items ? (
                  <>
                    <button
                      type="button"
                      className="navbar__link"
                      onClick={() => toggleDropdown(index)}
                      aria-expanded={openDropdown === index}
                    >
                      {item.label} <span className="navbar__caret">▾</span>
                    </button>
                    <ul className="navbar__dropdown">
                      {item.items.map((sub) => (
                        <li key={sub}>
                          <a href="#top" className="navbar__dropdown-link">{sub}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href="#top" className="navbar__link">{item.label}</a>
                )}
              </li>
            ))}
          </ul>

          <a href="#top" className="navbar__donate">QUIERO DONAR</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
