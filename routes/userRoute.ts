import { Router } from 'express';
import { getUser, getUserFull, getUsers } from '../controllers/userController';
import { isAdmin, verifyToken } from '../middleware/userMiddleware';
import { profileSchema } from '../schemas/allSchemas';
import validateBody from '../middleware/validateBody';
import {
  hashPwd,
  isNewUser,
  passwordsMatch,
} from '../middleware/signupMiddleware';
import { updateUserInfo } from '../controllers/profileController';

const router = Router();

router.get('/', verifyToken, isAdmin, getUsers);

router.get('/:id', verifyToken, getUser);
router.put(
  '/:id',
  validateBody(profileSchema),
  verifyToken,
  passwordsMatch,
  hashPwd,
  isNewUser,
  updateUserInfo
);

router.get('/:id/full', verifyToken, isAdmin, getUserFull);

export default router;
