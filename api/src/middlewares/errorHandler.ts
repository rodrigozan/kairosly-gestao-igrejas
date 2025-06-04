import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Erro interno do servidor';

  // Log do erro para debug (pode ser mais sofisticado em produção)
  console.error('ERRO:', err);

  // Resposta padronizada
  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Opcional: mostrar stack em dev
  });
};

export default errorHandler;

