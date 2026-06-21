import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">Sistema de Matrícula</h1>
        <p className="hero__subtitle">
          Gestioná las matrículas de forma simple y eficiente.
        </p>
        <a href="#categorias" className="hero__cta">Comenzar</a>
      </div>
    </section>
  );
}

export default HeroSection;
