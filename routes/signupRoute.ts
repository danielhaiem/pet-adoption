import { Router } from 'express';
import { signUpUser } from '../controllers/signupController';
import {
  hashPwd,
  isNewUser,
  passwordsMatch,
} from '../middleware/signupMiddleware';
import validateBody from '../middleware/validateBody';
import { signUpSchema } from '../schemas/allSchemas';

const router = Router();

router.post(
  '/',
  validateBody(signUpSchema),
  passwordsMatch,
  hashPwd,
  isNewUser,
  signUpUser
);

export default router;
