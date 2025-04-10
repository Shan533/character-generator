import { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import GeneratedImage from '../models/image.model';
import Character from '../models/character.model';

// Ensure environment variables are loaded
dotenv.config();

// For fallback if API key is not provided or API call fails
const PLACEHOLDER_IMAGES = [
  'https://placehold.co/512x512?text=Character+1',
  'https://placehold.co/512x512?text=Character+2',
  'https://placehold.co/512x512?text=Character+3'
];

// Generate images using OpenAI API
const generateImagesWithOpenAI = async (prompt: string, count = 1): Promise<string[]> => {
  // Access API key directly from process.env each time
  const apiKey = process.env.OPEN_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not provided. Using placeholder images.');
    return PLACEHOLDER_IMAGES.slice(0, count);
  }

  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    
    // DALL-E 3 only supports 1 image per request, so we need to make multiple requests
    const imagePromises = Array(count).fill(0).map(async (_, i) => {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          response_format: "url",
        });
        
        // Ensure we return a string
        const imageUrl = response.data[0].url;
        if (!imageUrl) {
          throw new Error('No image URL returned');
        }
        return imageUrl;
      } catch (err: any) {
        console.error(`Error generating image ${i+1}/${count}:`, err.message);
        return PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length];
      }
    });
    
    // Explicitly cast to string array
    const images = await Promise.all(imagePromises) as string[];
    return images;
  } catch (error: any) {
    console.error('Error generating images with OpenAI:', error.message);
    if (error.response) {
      console.error('API response status:', error.response.status);
      console.error('API response data:', error.response.data);
    }
    // Fallback to placeholder images if API call fails
    console.warn('Using placeholder images as fallback');
    return PLACEHOLDER_IMAGES.slice(0, count);
  }
};

// Generate images for a character
export const generateImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { characterId } = req.params;
    const { count = 1 } = req.body;
    
    // Find the character
    const character = await Character.findById(characterId);
    if (!character) {
      res.status(404).json({ message: 'Character not found' });
      return;
    }

    // Generate images using OpenAI
    const imageUrls = await generateImagesWithOpenAI(character.prompt, count);
    
    // Save the generated images to the database
    const savedImages = await Promise.all(
      imageUrls.map(async (imageUrl, index) => {
        const image = new GeneratedImage({
          characterId,
          imageUrl,
          version: 1,
          refinedPrompt: character.prompt
        });
        return image.save();
      })
    );
    
    res.status(201).json(savedImages);
  } catch (error) {
    console.error('Error generating images:', error);
    res.status(500).json({ message: 'Error generating images', error });
  }
};

// Get all images for a character
export const getImagesByCharacterId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { characterId } = req.params;
    const images = await GeneratedImage.find({ characterId }).sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
};

// Toggle favorite status of an image
export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await GeneratedImage.findById(id);
    
    if (!image) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    
    image.isFavorite = !image.isFavorite;
    const updatedImage = await image.save();
    
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite status', error });
  }
};

// Refine an image with a new prompt
export const refineImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { refinedPrompt } = req.body;
    
    // Find the original image
    const originalImage = await GeneratedImage.findById(id);
    if (!originalImage) {
      res.status(404).json({ message: 'Image not found' });
      return;
    }
    
    // Generate a new image with the refined prompt
    const imageUrls = await generateImagesWithOpenAI(refinedPrompt, 1);
    
    // Create a new image record with the refined prompt
    const refinedImage = new GeneratedImage({
      characterId: originalImage.characterId,
      imageUrl: imageUrls[0],
      version: originalImage.version + 1,
      refinedPrompt
    });
    
    const savedImage = await refinedImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error refining image', error });
  }
};

// Get all images
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await GeneratedImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all images', error });
  }
}; 