import express          from 'express';
import morgan           from 'morgan';
import cors             from 'cors';
import helmet           from 'helmet';
import authRoutes       from './src/routes/auth.js';
import userRoutes       from './src/routes/usersRoutes.js';
import messagesRoutes   from './src/routes/messagesRoutes.js';
import profileRoutes    from './src/routes/profileRoutes.js';
import { fileURLToPath }    from 'node:url';
import path from 'node:path';
const   app = express();

const   __fileName = fileURLToPath(import.meta.url);
const   __dirname = path.dirname(__fileName);
const   UPLOADS_DIR = path.join(__dirname, 'src', 'uploads');
// console.log("DIIIIIIR:", UPLOADS_DIR);


//  Configure Helmet to allow cross-origin resources
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Enable CORS
app.use(cors());

app.use('/uploads', express.static(UPLOADS_DIR, {
  setHeaders: (res, path) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/profile', profileRoutes);


export default  app;