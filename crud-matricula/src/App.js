import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryCards from './components/CategoryCards';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <CategoryCards />
      <Footer />
    </div>
  );
}

export default App;
