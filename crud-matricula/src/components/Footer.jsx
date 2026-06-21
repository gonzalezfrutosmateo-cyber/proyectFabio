import './Footer.css';

const accesos = ['Alumnos', 'Secretaría', 'Matrículas', 'Carreras', 'Conceptos de Pago'];
const soporte = ['Manual de usuario', 'Contacto', 'Versión 1.0.0'];

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
            {accesos.map((link) => (
              <li key={link}>
                <a href="#top" className="footer__link">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Soporte</h4>
          <ul className="footer__list">
            {soporte.map((link) => (
              <li key={link}>
                <a href="#top" className="footer__link">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__copyright">
        © 2025 MatriculaSystem — Sistema de Gestión Académica
      </div>
    </footer>
  );
}

export default Footer;
