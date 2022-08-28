import { Router } from 'express';
import {
  getSearchResults,
  getPetById,
  addSavedPet,
  deleteSavedPet,
} from '../controllers/petController';
import { isQueryValid } from '../middleware/petsMiddleware';
import { verifyToken } from '../middleware/userMiddleware';

const router = Router();

router.get('/', isQueryValid, getSearchResults);

router.get('/:id', getPetById);

router.post('/:id/save', verifyToken, addSavedPet);
router.delete('/:id/save', verifyToken, deleteSavedPet);

export default router;
