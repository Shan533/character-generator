import express from 'express';
import {
  generateImages,
  getImagesByCharacterId,
  toggleFavorite,
  refineImage,
  getAllImages
} from '../controllers/image.controller';

const router = express.Router();

// GET all images
router.get('/', getAllImages);

// POST generate images for a character
router.post('/generate/:characterId', generateImages);

// GET all images for a character
router.get('/character/:characterId', getImagesByCharacterId);

// PATCH toggle favorite status
router.patch('/:id/favorite', toggleFavorite);

// POST refine an image with a new prompt
router.post('/:id/refine', refineImage);

export default router; 