import {Router} from 'express';
import {authenticate} from '../midllware/authentication.js';
import  {getMe, getUsers} from '../controllers/userController.js';

const   router = Router();

router.get('/me', authenticate, getMe);

router.get('/', authenticate, getUsers);


export default router;