import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCreationForm from '../components/CharacterCreation/CharacterCreationForm';
import heroPlaceholder from '../assets/hero-placeholder.svg';

const HomePage = () => {
  const navigate = useNavigate();
  const [showCreationForm, setShowCreationForm] = useState(false);
  
  const handleCharacterCreated = (characterId: string) => {
    // Navigate to the character page after creation
    navigate(`/characters/${characterId}`);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {!showCreationForm ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Bring Your Characters <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">to Life</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Create stunning AI-generated character images from your descriptions.
              Design unique characters for your stories, games, or creative projects.
            </p>
            <button 
              onClick={() => setShowCreationForm(true)}
              className="btn-primary text-lg"
            >
              Create Your Character
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="card overflow-hidden p-0">
              <img 
                src={heroPlaceholder} 
                alt="Character examples" 
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
                <h2 className="text-2xl font-bold mb-2">Limitless Creativity</h2>
                <p className="text-gray-700">
                  Describe your character's features, style, and personality.
                  Our AI will generate high-quality images that match your vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Create Your Character</h2>
            <button 
              onClick={() => setShowCreationForm(false)} 
              className="btn-secondary"
            >
              Back to Home
            </button>
          </div>
          <div className="card">
            <CharacterCreationForm onCharacterCreated={handleCharacterCreated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 