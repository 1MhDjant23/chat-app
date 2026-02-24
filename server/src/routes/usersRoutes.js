import { Router } from 'express';
import { authenticate } from '../midllware/authenticationMidllware.js';
import { getMe, getUsers, getUserById } from '../controllers/userController.js';

const router = Router();

router.get('/me', authenticate, getMe);

router.get('/', authenticate, getUsers);

router.get('/:userId', authenticate, getUserById);


export default router;