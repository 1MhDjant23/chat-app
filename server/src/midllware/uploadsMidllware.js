import  { fileURLToPath }   from    'node:url';
import  path                from    'node:path';
import multer               from 'multer';

const   __fileName = fileURLToPath(import.meta.url);
const   __dirname = path.dirname(__fileName);

const   UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'avatars');


const   storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("error in midllware");
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const   extension_file = path.extname(file.originalname);
        const   fileName = `user-${req.user.id}-${Date.now()}${extension_file}`;
        cb(null, fileName);
    }
});


//allow only images

const   fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.type.startsWith('image/')) {
        cb(null, true);
    }else {
        cb(new Error('Only image files allowed'), false);
    }
}

const   upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 2 * 1024 * 1024}
})

export  default upload;