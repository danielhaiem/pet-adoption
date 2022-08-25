import { Router } from 'express';
import { getUser, getUsers } from '../controllers/userController';
import { verifyToken } from '../middleware/userMiddleware';

const router = Router();

router.get('/', verifyToken, getUsers);

router.get('/:id', verifyToken, getUser);

export default router;
