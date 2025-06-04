import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser, UserRole } from '../models/User';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Estender a interface Request do Express para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        churchId: string | null;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obter token do header (Bearer token)
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET não configurado.');
      }
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: UserRole; churchId: string | null; iat: number; exp: number };

      // Obter usuário do token e verificar se ainda existe e está ativo
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }

      if (!currentUser.isActive) {
          return res.status(403).json({ message: 'Usuário desativado. Acesso negado.' });
      }

      // Anexar informações do usuário à requisição
      req.user = {
          id: currentUser._id.toString(),
          role: currentUser.role,
          churchId: currentUser.churchId ? currentUser.churchId.toString() : null
      };

      next();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return res.status(401).json({ message: 'Não autorizado, token inválido ou expirado.' });
    }
  } else {
    return res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};

