import 'reflect-metadata'; 
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/database';
import errorHandler from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import churchRoutes from './routes/churchRoutes';
import highlightRoutes from './routes/highlightRoutes';
import eventRoutes from './routes/eventRoutes';
import translationRoutes from './routes/translationRoutes';


dotenv.config();

connectDB();

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

setupSwagger(app);

// Rota de teste da API
app.get('/api', (req: Request, res: Response) => {
  res.send('API Gestor de Igrejas está rodando!');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/churches', churchRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/translation', translationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV || 'development'}`));

export default app;

