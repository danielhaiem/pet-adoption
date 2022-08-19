import { Router } from 'express';
import { getSearchResults, getPetById } from '../controllers/petController';
import { isQueryValid } from '../middleware/petsMiddleware';

const router = Router();

// @desc    Fetch all pets
// @route   GET /api/pets
// @access  Public
router.get('/', isQueryValid, getSearchResults);

// @desc    Fetch single pet
// @route   GET /api/pets/:id
// @access  Public
router.get('/:id', getPetById);

export default router;
