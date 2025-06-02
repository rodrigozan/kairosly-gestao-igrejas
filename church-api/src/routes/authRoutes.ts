import express from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../middlewares/validationMiddleware';
import { RegisterDto, LoginDto } from '../validators/auth.dto';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para registro e login de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso. Retorna token JWT e dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro de validação (campos faltando, senhas não coincidem, e-mail já existe)
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register', validate(RegisterDto), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário existente
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna token JWT e dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro de validação (campos faltando)
 *       401:
 *         description: Credenciais inválidas (e-mail ou senha incorretos)
 *       403:
 *         description: Conta desativada
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', validate(LoginDto), login);

export default router;

