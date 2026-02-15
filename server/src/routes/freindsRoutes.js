import  { Router }  from    'express';
import { authenticate } from '../midllware/authenticationMidllware.js';
import { sendRequest } from '../controllers/freindsController.js';

const   router = Router();


router.post('/request/:userId', authenticate, sendRequest);

export  default router;
