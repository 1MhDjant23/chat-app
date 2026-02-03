import  {Router}    from 'express';
import { authenticate } from '../midllware/authentication.js';
import { getMessages, sendMessage } from '../controllers/messagesController.js';



const   rooter = Router();

rooter.get('/:userId', authenticate, getMessages);
rooter.post('/', authenticate, sendMessage);

export default  rooter;