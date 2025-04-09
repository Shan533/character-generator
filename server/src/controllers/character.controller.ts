import { Request, Response } from 'express';
import Character, { ICharacter } from '../models/character.model';
import { buildPrompt, enhancePrompt } from '../utils/promptBuilder';

// Create a new character
export const createCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, attributes } = req.body;
    
    // Build the AI prompt from description and attributes
    const basePrompt = buildPrompt(description, attributes);
    const enhancedPrompt = enhancePrompt(basePrompt);
    
    const character = new Character({
      name,
      description,
      attributes,
      prompt: enhancedPrompt
    });

    const savedCharacter = await character.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating character', error });
  }
};

// Get all characters
export const getCharacters = async (req: Request, res: Response): Promise<void> => {
  try {
    const characters = await Character.find().sort({ createdAt: -1 });
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching characters', error });
  }
};

// Get a character by ID
export const getCharacterById = async (req: Request, res: Response): Promise<void> => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      res.status(404).json({ message: 'Character not found' });
      return;
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching character', error });
  }
};

// Update a character
export const updateCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, attributes } = req.body;
    
    // Rebuild the prompt if description or attributes have changed
    let updatedData: any = { name };
    
    if (description || attributes) {
      // Get current character to check if we need to update the prompt
      const currentCharacter = await Character.findById(req.params.id);
      if (!currentCharacter) {
        res.status(404).json({ message: 'Character not found' });
        return;
      }
      
      const descriptionToUse = description || currentCharacter.description;
      const attributesToUse = attributes || currentCharacter.attributes;
      
      const basePrompt = buildPrompt(descriptionToUse, attributesToUse);
      const enhancedPrompt = enhancePrompt(basePrompt);
      
      updatedData = {
        ...updatedData,
        description: descriptionToUse,
        attributes: attributesToUse,
        prompt: enhancedPrompt
      };
    }
    
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    
    if (!updatedCharacter) {
      res.status(404).json({ message: 'Character not found' });
      return;
    }
    
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error updating character', error });
  }
};

// Delete a character
export const deleteCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) {
      res.status(404).json({ message: 'Character not found' });
      return;
    }
    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting character', error });
  }
}; 