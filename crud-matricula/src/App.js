import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryCards from './components/CategoryCards';
import Footer from './components/Footer';
import AlumnosPage from './pages/AlumnosPage';
import SecretariaPage from './pages/SecretariaPage';
import MatriculasPage from './pages/MatriculasPage';
import CarrerasPage from './pages/CarrerasPage';

function Home() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* Rutas: cada path monta la página de su entidad */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumnos" element={<AlumnosPage />} />
          <Route path="/secretaria" element={<SecretariaPage />} />
          <Route path="/matriculas" element={<MatriculasPage />} />
          <Route path="/carreras" element={<CarrerasPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
