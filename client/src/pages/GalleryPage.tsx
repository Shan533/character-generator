import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageCard from '../components/Gallery/ImageCard';
import RefineImageModal from '../components/Gallery/RefineImageModal';

interface Character {
  _id: string;
  name: string;
  prompt: string;
}

interface GeneratedImage {
  _id: string;
  characterId: string;
  imageUrl: string;
  isFavorite: boolean;
  version: number;
  refinedPrompt?: string;
  createdAt: string;
}

const GalleryPage = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refineModalOpen, setRefineModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch character details
        const characterResponse = await axios.get(`/api/characters/${characterId}`);
        setCharacter(characterResponse.data);
        
        // Fetch images for the character
        const imagesResponse = await axios.get(`/api/images/character/${characterId}`);
        setImages(imagesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load gallery data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [characterId]);
  
  const handleToggleFavorite = async (imageId: string) => {
    try {
      const response = await axios.patch(`/api/images/${imageId}/favorite`);
      
      // Update the images list with the updated image
      setImages(prevImages => prevImages.map(img => 
        img._id === imageId ? response.data : img
      ));
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };
  
  const handleRefineImage = (image: GeneratedImage) => {
    setCurrentImage(image);
    setRefineModalOpen(true);
  };
  
  const handleRefineSubmit = async (refinedPrompt: string) => {
    if (!currentImage) return;
    
    try {
      const response = await axios.post(`/api/images/${currentImage._id}/refine`, { 
        refinedPrompt 
      });
      
      // Add the new refined image to the list
      setImages(prevImages => [response.data, ...prevImages]);
      
      // Close the modal
      setRefineModalOpen(false);
      setCurrentImage(null);
    } catch (err) {
      console.error('Error refining image:', err);
      setError('Failed to refine image. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading gallery...</p>
      </div>
    );
  }
  
  if (error || !character) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Gallery not found'}</p>
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {character.name} - Generated Images
        </h1>
        <p className="text-gray-600 mt-1">
          {images.length} {images.length === 1 ? 'image' : 'images'} generated from your prompt
        </p>
      </div>
      
      {images.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">No images have been generated yet.</p>
          <button
            onClick={() => navigate(`/characters/${characterId}`)}
            className="btn btn-primary"
          >
            Generate Images
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <ImageCard
              key={image._id}
              image={image}
              onToggleFavorite={() => handleToggleFavorite(image._id)}
              onRefine={() => handleRefineImage(image)}
            />
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate(`/characters/${characterId}`)}
          className="btn btn-secondary"
        >
          Back to Character
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Create New Character
        </button>
      </div>
      
      {refineModalOpen && currentImage && (
        <RefineImageModal
          image={currentImage}
          initialPrompt={currentImage.refinedPrompt || character.prompt}
          onClose={() => {
            setRefineModalOpen(false);
            setCurrentImage(null);
          }}
          onSubmit={handleRefineSubmit}
        />
      )}
    </div>
  );
};

export default GalleryPage; 