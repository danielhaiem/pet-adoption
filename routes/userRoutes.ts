import { Router } from 'express';
import authUser from '../controllers/userController';

const router = Router();

router.route('/login').post(authUser);
