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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
          <div className="md:w-1/2 w-full h-full flex items-center justify-center">
            <div className="card-feature overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[3/2] bg-gradient-to-br from-baby-blue to-vibrant-green relative">
                {/* Character silhouettes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-end space-x-2">
                    <div className="w-14 h-28 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white bg-opacity-70 mb-14"></div>
                    </div>
                    <div className="w-16 h-32 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white bg-opacity-80 mb-16"></div>
                    </div>
                    <div className="w-14 h-28 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white bg-opacity-70 mb-14"></div>
                    </div>
                  </div>
                </div>
                
                {/* Sparkles */}
                <div className="absolute top-[10%] left-[25%] text-white text-2xl">✨</div>
                <div className="absolute bottom-[20%] left-[10%] text-white text-2xl">✨</div>
                <div className="absolute top-[15%] right-[10%] text-white text-2xl">✨</div>
                <div className="absolute bottom-[30%] right-[20%] text-white text-2xl">✨</div>
              </div>
              <div className="p-4 md:p-6 bg-white">
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