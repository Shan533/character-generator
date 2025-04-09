import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Character {
  _id: string;
  name: string;
  description: string;
  attributes: {
    age?: number;
    gender?: string;
    emotion?: string;
    genre?: string;
    style?: string;
  };
  prompt: string;
  createdAt: string;
}

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`/api/characters/${id}`);
        setCharacter(response.data);
      } catch (err) {
        console.error('Error fetching character:', err);
        setError('Failed to load character details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCharacter();
  }, [id]);
  
  const handleGenerateImages = async () => {
    if (!character) return;
    
    setIsGenerating(true);
    
    try {
      await axios.post(`/api/images/generate/${character._id}`, { count: 3 });
      navigate(`/gallery/${character._id}`);
    } catch (err) {
      console.error('Error generating images:', err);
      setError('Failed to generate images. Please try again.');
      setIsGenerating(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading character details...</p>
      </div>
    );
  }
  
  if (error || !character) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Character not found'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 btn btn-primary"
        >
          Go Back Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium">
            Character Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Review your character before generating images
          </p>
        </div>
        
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {character.name}
              </dd>
            </div>
            
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {character.description}
              </dd>
            </div>
            
            {character.attributes.age && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {character.attributes.age}
                </dd>
              </div>
            )}
            
            {character.attributes.gender && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {character.attributes.gender}
                </dd>
              </div>
            )}
            
            {character.attributes.emotion && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Emotion</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {character.attributes.emotion}
                </dd>
              </div>
            )}
            
            {character.attributes.genre && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Genre</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {character.attributes.genre}
                </dd>
              </div>
            )}
            
            {character.attributes.style && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Art Style</dt>
                <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                  {character.attributes.style}
                </dd>
              </div>
            )}
            
            <div className="bg-white py-5 border-t border-gray-200">
              <div className="sm:px-6 pb-4">
                <dt className="text-sm font-medium text-gray-500">AI Prompt</dt>
                <dd className="mt-1 text-sm">
                  <div className="bg-gray-100 p-3 rounded">
                    {character.prompt}
                  </div>
                </dd>
                
                <div className="mt-2 text-xs text-gray-500 italic">
                  This prompt will be sent to OpenAI's DALL·E image generation model. You can generate multiple images based on this prompt.
                </div>
              </div>
            </div>
          </dl>
        </div>
        
        <div className="px-4 py-5 sm:px-6 flex justify-end space-x-3 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleGenerateImages}
            disabled={isGenerating}
            className={`btn btn-primary ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? 'Generating Images...' : 'Generate Images'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage; 