import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__left">
          <span className="hero__badge">Instituto Buena Onda</span>
          <h1 className="hero__title">
            <span>Sistema</span> de<br />Gestión de<br />Matrículas
          </h1>
          <p className="hero__subtitle">
            Registrá, consultá y administrá las matrículas<br />
            de tus alumnos desde un solo lugar.
          </p>
          <Link to="/matriculas" className="hero__cta">Ver Matrículas</Link>
        </div>

        <div className="hero__right">
          <p className="hero__modules-label">Módulos del sistema</p>
          {[
            { num: '01', name: 'Alumnos',    to: '/alumnos'    },
            { num: '02', name: 'Secretaría', to: '/secretaria' },
            { num: '03', name: 'Matrículas', to: '/matriculas' },
            { num: '04', name: 'Carreras',   to: '/carreras'   },
          ].map((m) => (
            <Link key={m.num} to={m.to} className="hero__module-row">
              <span className="hero__module-num">{m.num}</span>
              <span className="hero__module-name">{m.name}</span>
              <span className="hero__module-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
