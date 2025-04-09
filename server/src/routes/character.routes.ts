import express from 'express';
import {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter
} from '../controllers/character.controller';

const router = express.Router();

// GET all characters
router.get('/', getCharacters);

// GET a character by ID
router.get('/:id', getCharacterById);

// POST create a new character
router.post('/', createCharacter);

// PUT update a character
router.put('/:id', updateCharacter);

// DELETE a character
router.delete('/:id', deleteCharacter);

export default router; 