import 'reflect-metadata'; // Deve ser a primeira importação!
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import errorHandler from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger'; // Importar setup do Swagger

// Importar rotas
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import churchRoutes from './routes/churchRoutes';
import highlightRoutes from './routes/highlightRoutes';
import eventRoutes from './routes/eventRoutes'; // Importar rotas de Eventos
// ... importar outras rotas quando criadas

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app: Express = express();

// Middlewares
app.use(cors()); // Habilitar CORS para todas as origens
app.use(express.json()); // Middleware para parsear JSON

// Configurar Swagger
setupSwagger(app);

// Rota de teste da API
app.get('/api', (req: Request, res: Response) => {
  res.send('API Gestor de Igrejas está rodando!');
});

// Registrar rotas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/churches', churchRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/events', eventRoutes); // Usar rotas de Eventos
// ... usar outras rotas

// Middleware de erro global (deve ser o último middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV || 'development'}`));

export default app; // Exportar para possíveis testes

