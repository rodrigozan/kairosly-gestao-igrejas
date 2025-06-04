import { Request, Response, NextFunction } from 'express';
import User, { IUser, UserRole } from '../models/User';
import Church from '../models/Church'; // Import Church model if needed for church assignment logic
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

if (!JWT_SECRET) {
  console.error('Erro: JWT_SECRET não definido no arquivo .env');
  process.exit(1);
}

// Função auxiliar para gerar token JWT
const generateToken = (id: string, role: UserRole, churchId: string | null) => {
  return jwt.sign({ id, role, churchId }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN || '1d',
  });
};

// Controlador para Registro de Usuário
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword, churchId } = req.body; // churchId pode ser opcional no registro inicial

  // Validação básica (será substituída/complementada por class-validator)
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Por favor, forneça todos os campos obrigatórios.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  try {
    // Verificar se o e-mail já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este e-mail já está em uso.' });
    }

    // Verificar se churchId é válido (se fornecido)
    if (churchId) {
        const churchExists = await Church.findById(churchId);
        if (!churchExists) {
            return res.status(400).json({ message: 'Igreja não encontrada.' });
        }
    }

    // Criar novo usuário (papel padrão é READER)
    const user = await User.create({
      name,
      email,
      password,
      role: UserRole.READER, // Papel padrão
      isActive: true,
      churchId: churchId || null
    });

    // Gerar token JWT
    const token = generateToken(user._id.toString(), user.role, user.churchId ? user.churchId.toString() : null);

    // Remover senha do objeto de usuário antes de enviar a resposta
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro global
  }
};

// Controlador para Login de Usuário
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, forneça e-mail e senha.' });
  }

  try {
    // Encontrar usuário pelo e-mail e selecionar a senha (que não é selecionada por padrão)
    const user = await User.findOne({ email }).select('+password');

    // Verificar se o usuário existe e se a senha está correta
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    // Verificar se o usuário está ativo
    if (!user.isActive) {
      return res.status(403).json({ message: 'Sua conta está desativada. Entre em contato com o administrador.' });
    }

    // Gerar token JWT
    const token = generateToken(user._id.toString(), user.role, user.churchId ? user.churchId.toString() : null);

    // Remover senha do objeto de usuário antes de enviar a resposta
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      status: 'success',
      token,
      data: {
          user: userResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

