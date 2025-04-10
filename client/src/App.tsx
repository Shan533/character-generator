import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CharacterPage from './pages/CharacterPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  return (
    <Router basename="/character-generator">
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters/:id" element={<CharacterPage />} />
            <Route path="/gallery/:characterId" element={<GalleryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Character Generator. All images are AI-generated.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
