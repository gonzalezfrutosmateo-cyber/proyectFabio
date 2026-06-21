import './Footer.css';

const columns = [
  {
    title: 'Somos el Instituto',
    links: ['Institucional', 'Autoridades', 'Docentes', 'Graduados', 'Empleos y Pasantías', 'Sedes'],
  },
  {
    title: 'Oferta Académica',
    links: ['Carreras de grado', 'Posgrado', 'Educación ejecutiva', 'Doctorado'],
  },
  {
    title: 'Accesos',
    links: ['Becas', 'Ingreso', 'Investigación', 'Campus', 'Intranet', 'Biblioteca', 'Noticias'],
  },
];

const socials = [
  {
    name: 'Facebook',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z',
  },
  {
    name: 'Instagram',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z',
  },
  {
    name: 'LinkedIn',
    path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.4H5.67v7.94h2.67zM7 9.24a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.1v-4.36c0-2.33-1.25-3.42-2.91-3.42a2.51 2.51 0 0 0-2.28 1.25v-1.07h-2.67v7.6h2.67v-4.2c0-1.11.21-2.18 1.58-2.18 1.35 0 1.37 1.27 1.37 2.26v4.12h2.91z',
  },
  {
    name: 'YouTube',
    path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.27 3.6L9.6 15.6z',
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <h2 className="footer__logo">Instituto Buena Onda</h2>
          <p className="footer__tagline">Sistema de Gestión Académica</p>
        </div>

        {columns.map((col) => (
          <div className="footer__col" key={col.title}>
            <h4 className="footer__col-title">{col.title}</h4>
            <ul className="footer__list">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#top" className="footer__link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__socials">
        {socials.map((social) => (
          <a
            key={social.name}
            href="#top"
            className="footer__social"
            aria-label={social.name}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>

      <div className="footer__copyright">
        © 2025 Instituto Buena Onda — Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;
