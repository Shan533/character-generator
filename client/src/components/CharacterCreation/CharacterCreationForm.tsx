import { useState, FormEvent } from 'react';
import axios from 'axios';

interface CharacterAttributes {
  age?: number;
  gender?: string;
  emotion?: string;
  genre?: string;
  style?: string;
}

interface CharacterFormData {
  name: string;
  description: string;
  attributes: CharacterAttributes;
}

interface CharacterCreationFormProps {
  onCharacterCreated: (characterId: string) => void;
}

const CharacterCreationForm: React.FC<CharacterCreationFormProps> = ({ onCharacterCreated }) => {
  const [formData, setFormData] = useState<CharacterFormData>({
    name: '',
    description: '',
    attributes: {
      age: undefined,
      gender: '',
      emotion: '',
      genre: '',
      style: ''
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Other'];
  const emotionOptions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'Confident', 'Fearful', 'Proud'];
  const genreOptions = ['Fantasy', 'Sci-Fi', 'Modern', 'Historical', 'Anime', 'Superhero', 'Cyberpunk', 'Steampunk', 'Post-apocalyptic'];
  const styleOptions = ['Realistic', 'Anime', 'Cartoon', 'Pixel Art', 'Watercolor', 'Oil Painting', 'Digital Art', 'Comic Book', 'Photorealistic'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested attributes
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof CharacterFormData] as CharacterAttributes,
          [child]: value
        }
      });
    } else {
      // Handle top-level fields
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // We'll let the server build the prompt now
      const response = await axios.post('/api/characters', {
        ...formData
      });
      
      // Call the callback with the character ID
      onCharacterCreated(response.data._id);
    } catch (err) {
      console.error('Error creating character:', err);
      setError('Failed to create character. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6">Create Your Character</h3>
          <p className="mt-1 text-sm text-gray-500">
            Describe your character and set its attributes to generate images
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Character Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="E.g., Elara Nightshade"
              />
            </div>
          </div>
          
          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Character Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Describe your character's appearance, outfit, features, etc. Be specific about hair color, eye color, clothing, accessories, and any unique characteristics."
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              For best results, be specific about appearance, clothing, and distinctive features. Include details like "blonde hair", "blue eyes", "red leather jacket", etc.
            </p>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="attributes.age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="attributes.age"
                id="attributes.age"
                value={formData.attributes.age || ''}
                onChange={handleInputChange}
                min="1"
                max="1000"
                className="form-input"
                placeholder="E.g., 25"
              />
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="attributes.gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-1">
              <select
                id="attributes.gender"
                name="attributes.gender"
                value={formData.attributes.gender}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select gender</option>
                {genderOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="attributes.emotion" className="block text-sm font-medium text-gray-700">
              Emotion
            </label>
            <div className="mt-1">
              <select
                id="attributes.emotion"
                name="attributes.emotion"
                value={formData.attributes.emotion}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select emotion</option>
                {emotionOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="attributes.genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <div className="mt-1">
              <select
                id="attributes.genre"
                name="attributes.genre"
                value={formData.attributes.genre}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select genre</option>
                {genreOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-3">
            <label htmlFor="attributes.style" className="block text-sm font-medium text-gray-700">
              Art Style
            </label>
            <div className="mt-1">
              <select
                id="attributes.style"
                name="attributes.style"
                value={formData.attributes.style}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select style</option>
                {styleOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              The art style will significantly impact how your character looks.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating...' : 'Create Character'}
        </button>
      </div>
    </form>
  );
};

export default CharacterCreationForm; 