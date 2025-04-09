import { useNavigate } from 'react-router-dom';
import CharacterCreationForm from '../components/CharacterCreation/CharacterCreationForm';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleCharacterCreated = (characterId: string) => {
    // Navigate to the character page after creation
    navigate(`/characters/${characterId}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Character Image Generator</h1>
        <p className="text-lg text-gray-600">
          Create AI-generated character images from your descriptions
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <CharacterCreationForm onCharacterCreated={handleCharacterCreated} />
      </div>
    </div>
  );
};

export default HomePage; 