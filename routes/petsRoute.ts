import { Router } from 'express';
import {
  getSearchResults,
  getPetById,
  addSavedPet,
  deleteSavedPet,
  adoptOrFosterPet,
  returnPet,
  getUserPets,
} from '../controllers/petController';
import {
  isPetAdopted,
  isPetAvailable,
  isQueryValid,
} from '../middleware/petsMiddleware';
import { verifyToken } from '../middleware/userMiddleware';

const router = Router();

router.get('/', isQueryValid, getSearchResults);

router.get('/:id', getPetById);

router.post('/:id/save', verifyToken, addSavedPet);
router.delete('/:id/save', verifyToken, deleteSavedPet);

router.post('/:id/adopt', verifyToken, isPetAdopted, adoptOrFosterPet);
router.post('/:id/return', verifyToken, isPetAvailable, returnPet);

router.get('/user/:id', verifyToken, getUserPets);

export default router;
