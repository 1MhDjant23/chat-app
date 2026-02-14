import  {Router} from 'express';
import { loginUser, register }    from '../controllers/authController.js';

const   router = Router();

router.post('/login', loginUser);
router.post('/register', register);



export  default router;
