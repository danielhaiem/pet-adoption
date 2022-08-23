import { Router } from 'express';
import { login } from '../controllers/loginController';
import { isExistingUser, verifyPwd } from '../middleware/loginMiddleware';
import validateBody from '../middleware/validateBody';
import { loginSchema } from '../schemas/allSchemas';

const router = Router();

router.post('/', validateBody(loginSchema), isExistingUser, verifyPwd, login);

export default router;
