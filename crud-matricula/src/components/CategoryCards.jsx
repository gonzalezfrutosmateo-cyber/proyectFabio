import './CategoryCards.css';

const cards = [
  { title: 'Alumnos', subtitle: 'Registrá y gestioná tus alumnos' },
  { title: 'Secretaría', subtitle: 'Administración sin límites' },
  { title: 'Matrículas', subtitle: 'Control total de inscripciones' },
  { title: 'Reportes', subtitle: 'Información para transformar la gestión' },
];

function CategoryCards() {
  return (
    <section className="categories" id="categorias">
      <div className="categories__grid">
        {cards.map((card) => (
          <article className="category-card" key={card.title}>
            <h3 className="category-card__title">{card.title}</h3>
            <span className="category-card__divider" />
            <p className="category-card__subtitle">{card.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
