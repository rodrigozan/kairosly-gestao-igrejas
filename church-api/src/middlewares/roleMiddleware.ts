import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User';

// Middleware para verificar se o usuário tem um dos papéis permitidos
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verifica se req.user foi definido pelo middleware 'protect'
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado, faça login primeiro.' });
    }

    // Verifica se o papel do usuário está incluído nos papéis permitidos
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Acesso negado. Papel '${req.user.role}' não tem permissão para acessar este recurso.`,
      });
    }

    // Se o usuário tem o papel permitido, continua para o próximo middleware/controlador
    next();
  };
};

// Middleware específico para verificar se o usuário é MASTER
export const isMaster = authorize(UserRole.MASTER);

// Middleware específico para verificar se o usuário é MASTER ou ADMIN
export const isAdminOrMaster = authorize(UserRole.MASTER, UserRole.ADMIN);

// Middleware para verificar se o usuário pertence a uma igreja específica (ou é MASTER)
export const belongsToChurchOrMaster = (paramName: string = 'churchId') => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Não autorizado, faça login primeiro.' });
        }

        // Master tem acesso a tudo
        if (req.user.role === UserRole.MASTER) {
            return next();
        }

        const targetChurchId = req.params[paramName];

        if (!targetChurchId) {
             return res.status(400).json({ message: `Parâmetro '${paramName}' não encontrado na rota.` });
        }

        // Verifica se o usuário pertence à igreja especificada no parâmetro da rota
        if (req.user.churchId !== targetChurchId) {
            return res.status(403).json({
                message: 'Acesso negado. Você não pertence a esta igreja ou não tem permissão para acessá-la.',
            });
        }

        next();
    };
};

