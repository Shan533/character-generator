import React from 'react';

interface GeneratedImage {
  _id: string;
  characterId: string;
  imageUrl: string;
  isFavorite: boolean;
  version: number;
  refinedPrompt?: string;
  createdAt: string;
}

interface ImageCardProps {
  image: GeneratedImage;
  onToggleFavorite: () => void;
  onRefine: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onToggleFavorite, onRefine }) => {
  return (
    <div className="card">
      <div className="relative">
        <img 
          src={image.imageUrl} 
          alt="Generated character" 
          className="w-full h-64 object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          aria-label={image.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {image.isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500">
            Version {image.version}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(image.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        {image.refinedPrompt && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {image.refinedPrompt}
          </p>
        )}
        
        <button
          onClick={onRefine}
          className="w-full btn btn-secondary text-sm"
        >
          Refine Image
        </button>
      </div>
    </div>
  );
};

export default ImageCard; 