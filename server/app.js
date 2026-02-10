import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/usersRoutes.js';
import  messagesRoutes from './src/routes/messagesRoutes.js'
const   app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messagesRoutes);


export default  app;