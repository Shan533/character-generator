import { ICharacterAttributes } from '../models/character.model';

/**
 * Builds a structured prompt for AI image generation based on character attributes
 */
export const buildPrompt = (description: string, attributes: ICharacterAttributes): string => {
  const parts: string[] = [];
  
  // Add style if available
  if (attributes.style) {
    parts.push(`${attributes.style}-style`);
  }
  
  // Add description of character
  parts.push('detailed portrait of');
  
  // Add age if available
  if (attributes.age) {
    parts.push(`a ${attributes.age}-year-old`);
  }
  
  // Add gender if available
  if (attributes.gender) {
    parts.push(attributes.gender);
  }
  
  // Add the main description
  parts.push(description);
  
  // Add genre if available
  if (attributes.genre) {
    parts.push(`in a ${attributes.genre} setting`);
  }
  
  // Add emotion if available
  if (attributes.emotion) {
    parts.push(`with a ${attributes.emotion} expression`);
  }
  
  // Add quality descriptors
  parts.push("high quality, highly detailed, professional digital art");
  
  // Join all parts into a single prompt
  return parts.join(' ');
};

/**
 * Enhances a prompt with additional details for better AI image generation
 */
export const enhancePrompt = (prompt: string): string => {
  // Add quality parameters and stylistic enhancements
  const enhancements = [
    "high resolution", 
    "intricate details", 
    "professional lighting",
    "vivid colors"
  ];
  
  return `${prompt}, ${enhancements.join(', ')}`;
};

/**
 * Examples:
 * 
 * Input:
 * description: "warrior in futuristic armor with silver hair and red eyes"
 * attributes: { age: 17, gender: "female", emotion: "angry", genre: "sci-fi", style: "anime" }
 * 
 * Output:
 * "anime-style detailed portrait of a 17-year-old female warrior in futuristic armor with silver hair and red eyes in a sci-fi setting with a angry expression, high quality, highly detailed, professional digital art, high resolution, intricate details, professional lighting, vivid colors"
 */ 