import { Router } from 'express';
import { signout } from '../controllers/signoutController';

const router = Router();

router.post('/', signout);

export default router;
