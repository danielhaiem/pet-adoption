import { Router } from 'express';
import { getSearchResults, getPetById } from '../controllers/petController';
import { isQueryValid } from '../middleware/petsMiddleware';

const router = Router();

router.get('/', isQueryValid, getSearchResults);

router.get('/:id', getPetById);

export default router;
