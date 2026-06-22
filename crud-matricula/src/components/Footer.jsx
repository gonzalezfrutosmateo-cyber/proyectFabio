import { Link } from 'react-router-dom';
import './Footer.css';

const accesos = [
  { label: 'Alumnos', to: '/alumnos' },
  { label: 'Secretaría', to: '/secretaria' },
  { label: 'Matrículas', to: '/matriculas' },
  { label: 'Carreras', to: '/carreras' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <h2 className="footer__logo">MatriculaSystem</h2>
          <p className="footer__tagline">
            Sistema integral para la gestión de matrículas y alumnos.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Accesos</h4>
          <ul className="footer__list">
            {accesos.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="footer__link">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
