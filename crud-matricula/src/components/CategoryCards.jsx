import { Link } from 'react-router-dom';
import './CategoryCards.css';

const MODULES = [
  { num: '01', to: '/alumnos',    name: 'Alumnos',    desc: 'Alta, baja y modificación de estudiantes registrados.' },
  { num: '02', to: '/secretaria', name: 'Secretaría', desc: 'Gestión del personal administrativo del instituto.' },
  { num: '03', to: '/matriculas', name: 'Matrículas', desc: 'Fichas de inscripción, recibos y control de vigencia.' },
  { num: '04', to: '/carreras',   name: 'Carreras',   desc: 'Programas académicos y aranceles por carrera.' },
];

function CategoryCards() {
  return (
    <section className="modules" id="categorias">
      <div className="modules__inner">
        <div className="modules__header">
          <span className="modules__label">Módulos</span>
          <span className="modules__count">04 secciones</span>
        </div>
        <div className="modules__list">
          {MODULES.map((m) => (
            <Link key={m.num} to={m.to} className="module-item">
              <span className="module-item__num">{m.num}</span>
              <div className="module-item__body">
                <span className="module-item__name">{m.name}</span>
                <span className="module-item__desc">{m.desc}</span>
              </div>
              <span className="module-item__arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;
