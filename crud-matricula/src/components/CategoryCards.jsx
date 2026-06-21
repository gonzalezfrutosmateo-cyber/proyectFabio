import { FaUserGraduate, FaUserTie, FaFileAlt, FaBook } from 'react-icons/fa';
import './CategoryCards.css';

const cards = [
  { title: 'Alumnos', subtitle: 'Alta, baja y modificación', Icon: FaUserGraduate },
  { title: 'Secretaría', subtitle: 'Gestión de personal administrativo', Icon: FaUserTie },
  { title: 'Matrículas', subtitle: 'Fichas y recibos de pago', Icon: FaFileAlt },
  { title: 'Carreras', subtitle: 'Administración de programas', Icon: FaBook },
];

function CategoryCards() {
  return (
    <section className="categories" id="categorias">
      <div className="categories__grid">
        {cards.map(({ title, subtitle, Icon }) => (
          <article className="category-card" key={title}>
            <Icon className="category-card__icon" size={32} />
            <h3 className="category-card__title">{title}</h3>
            <span className="category-card__divider" />
            <p className="category-card__subtitle">{subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
