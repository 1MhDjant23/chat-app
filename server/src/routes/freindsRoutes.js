import { Router } from 'express';
import { authenticate } from '../midllware/authenticationMidllware.js';
import { acceptFreindReq, getFriendsList, getPendingRequests, rejectFreindReq, sendRequest } from '../controllers/freindsController.js';

const router = Router();

router.post('/request/:username', authenticate, sendRequest);
router.put('/accept/:requestId', authenticate, acceptFreindReq);
router.put('/reject/:requestId', authenticate, rejectFreindReq);
router.get('/pending', authenticate, getPendingRequests);
router.get('/', authenticate, getFriendsList);

export default router;
