import { Link } from 'react-router-dom';
import { FaUserGraduate, FaUserTie, FaFileAlt, FaBook } from 'react-icons/fa';
import './CategoryCards.css';

const cards = [
  { title: 'Alumnos', subtitle: 'Alta, baja y modificación', Icon: FaUserGraduate, to: '/alumnos' },
  { title: 'Secretaría', subtitle: 'Gestión de personal administrativo', Icon: FaUserTie, to: '/secretaria' },
  { title: 'Matrículas', subtitle: 'Fichas y recibos de pago', Icon: FaFileAlt, to: '/matriculas' },
  { title: 'Carreras', subtitle: 'Administración de programas', Icon: FaBook, to: '/carreras' },
];

function CategoryCards() {
  return (
    <section className="categories" id="categorias">
      <div className="categories__grid">
        {cards.map(({ title, subtitle, Icon, to }) => (
          <Link to={to} key={title} className="category-card">
            <Icon className="category-card__icon" size={32} />
            <h3 className="category-card__title">{title}</h3>
            <span className="category-card__divider" />
            <p className="category-card__subtitle">{subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
