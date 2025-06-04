import express from 'express';
import {
    createHighlight,
    getHighlightsByChurch,
    getHighlightById,
    updateHighlight,
    deleteHighlight
} from '../controllers/highlightController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { CreateHighlightDto, UpdateHighlightDto } from '../validators/highlight.dto';
import { UserRole } from '../models/User';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Destaques
 *   description: Gerenciamento de destaques da igreja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Highlight:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 *           format: url
 *         description:
 *           type: string
 *         link:
 *           type: string
 *           format: url
 *         churchId:
 *           type: string
 *           format: objectId
 *         createdBy:
 *           type: object # Populated user info
 *           properties:
 *              _id:
 *                  type: string
 *                  format: objectId
 *              name:
 *                  type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateHighlightDto:
 *       type: object
 *       required:
 *         - title
 *         - imageUrl
 *       properties:
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 *           format: url
 *         description:
 *           type: string
 *         link:
 *           type: string
 *           format: url
 *     UpdateHighlightDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 *           format: url
 *         description:
 *           type: string
 *         link:
 *           type: string
 *           format: url
 */

/**
 * @swagger
 * /highlights:
 *   post:
 *     summary: Cria um novo destaque para a igreja do usuário logado
 *     tags: [Destaques]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHighlightDto'
 *     responses:
 *       201:
 *         description: Destaque criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     highlight:
 *                       $ref: '#/components/schemas/Highlight'
 *       400:
 *         description: Erro de validação ou usuário não associado a uma igreja.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (papel insuficiente).
 *   get:
 *     summary: Lista os destaques de uma igreja
 *     tags: [Destaques]
 *     parameters:
 *       - in: query
 *         name: churchId
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da igreja para filtrar os destaques (opcional se usuário logado)
 *     security:
 *       - bearerAuth: [] # Opcional, pode ser acessado publicamente com churchId ou privadamente
 *     responses:
 *       200:
 *         description: Lista de destaques retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     highlights:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Highlight'
 *       400:
 *         description: ID da igreja inválido ou não fornecido (se necessário).
 */
router.post(
    '/',
    protect,
    authorize(UserRole.EDITOR, UserRole.PUBLISHER, UserRole.ADMIN, UserRole.MASTER),
    validate(CreateHighlightDto),
    createHighlight
);
router.get('/', getHighlightsByChurch); // Pode precisar de 'protect' dependendo da lógica final

/**
 * @swagger
 * /highlights/{highlightId}:
 *   get:
 *     summary: Obtém um destaque específico pelo ID
 *     tags: [Destaques]
 *     parameters:
 *       - in: path
 *         name: highlightId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do destaque
 *     responses:
 *       200:
 *         description: Destaque retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     highlight:
 *                       $ref: '#/components/schemas/Highlight'
 *       400:
 *         description: ID do destaque inválido.
 *       404:
 *         description: Destaque não encontrado.
 *   put:
 *     summary: Atualiza um destaque existente
 *     tags: [Destaques]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: highlightId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do destaque a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHighlightDto'
 *     responses:
 *       200:
 *         description: Destaque atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     highlight:
 *                       $ref: '#/components/schemas/Highlight'
 *       400:
 *         description: ID do destaque inválido ou erro de validação.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (papel insuficiente ou não pertence à igreja).
 *       404:
 *         description: Destaque não encontrado.
 *   delete:
 *     summary: Deleta um destaque existente
 *     tags: [Destaques]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: highlightId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do destaque a ser deletado
 *     responses:
 *       200:
 *         description: Destaque deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Destaque deletado com sucesso.
 *       400:
 *         description: ID do destaque inválido.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (papel insuficiente ou não pertence à igreja).
 *       404:
 *         description: Destaque não encontrado.
 */
router.get('/:highlightId', getHighlightById);
router.put(
    '/:highlightId',
    protect,
    authorize(UserRole.EDITOR, UserRole.PUBLISHER, UserRole.ADMIN, UserRole.MASTER),
    validate(UpdateHighlightDto),
    updateHighlight
);
router.delete(
    '/:highlightId',
    protect,
    authorize(UserRole.ADMIN, UserRole.MASTER),
    deleteHighlight
);

export default router;

