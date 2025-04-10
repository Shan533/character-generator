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
    <div className="max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
      {!showCreationForm ? (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-800">
              Bring Your Characters <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">to Life</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Create stunning AI-generated character images from your descriptions.
              Design unique characters for your stories, games, or creative projects.
            </p>
            <button 
              onClick={() => setShowCreationForm(true)}
              className="btn-primary text-base md:text-lg px-6 py-3"
            >
              Create Your Character
            </button>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="card overflow-hidden p-0 h-full">
              <div className="h-48 md:h-64 overflow-hidden">
                <img 
                  src={heroPlaceholder} 
                  alt="Character examples" 
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-green-50">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Limitless Creativity</h2>
                <p className="text-sm md:text-base text-gray-700">
                  Describe your character's features, style, and personality.
                  Our AI will generate high-quality images that match your vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Create Your Character</h2>
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