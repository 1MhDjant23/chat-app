import  { Router }                      from    'express';
import  { authenticate }                from    '../midllware/authenticationMidllware.js';
import  { updateAvatar, UpdateInfo }    from    '../controllers/profileController.js';
import  upload                          from '../midllware/uploadsMidllware.js';


const   router = Router();

router.post('/avatar', authenticate, upload.single('avatar'), updateAvatar);
router.post('/info', authenticate, UpdateInfo);
export default  router;