import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">Sistema de Gestión de Matrículas</h1>
        <p className="hero__subtitle">
          Registrá, consultá y administrá las matrículas de tus alumnos desde un solo lugar.
        </p>
        <a href="#categorias" className="hero__cta">Ver Matrículas</a>
      </div>
    </section>
  );
}

export default HeroSection;
