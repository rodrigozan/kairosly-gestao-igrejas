import express from 'express';
import {
    createEvent,
    getEventsByChurch,
    getEventById,
    updateEvent,
    deleteEvent
} from '../controllers/eventController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { CreateEventDto, UpdateEventDto } from '../validators/event.dto';
import { UserRole } from '../models/User';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Gerenciamento de eventos da igreja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         imageUrl:
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
 *     CreateEventDto:
 *       type: object
 *       required:
 *         - title
 *         - date
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data e hora do evento (ISO 8601)
 *         location:
 *           type: string
 *         imageUrl:
 *           type: string
 *           format: url
 *     UpdateEventDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         imageUrl:
 *           type: string
 *           format: url
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cria um novo evento para a igreja do usuário logado
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventDto'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso.
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
 *                     event:
 *                       $ref: '#/components/schemas/Event'
 *       400:
 *         description: Erro de validação ou usuário não associado a uma igreja.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (papel insuficiente).
 *   get:
 *     summary: Lista os eventos de uma igreja (futuros por padrão)
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: churchId
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da igreja para filtrar os eventos (opcional se usuário logado)
 *       - in: query
 *         name: past
 *         schema:
 *           type: boolean
 *         description: Incluir eventos passados (default: false)
 *     security:
 *       - bearerAuth: [] # Opcional, pode ser acessado publicamente com churchId ou privadamente
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso.
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
 *                     events:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Event'
 *       400:
 *         description: ID da igreja inválido ou não fornecido (se necessário).
 */
router.post(
    '/',
    protect,
    authorize(UserRole.EDITOR, UserRole.PUBLISHER, UserRole.ADMIN, UserRole.MASTER),
    validate(CreateEventDto),
    createEvent
);
router.get('/', getEventsByChurch); // Pode precisar de 'protect' dependendo da lógica final

/**
 * @swagger
 * /events/{eventId}:
 *   get:
 *     summary: Obtém um evento específico pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso.
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
 *                     event:
 *                       $ref: '#/components/schemas/Event'
 *       400:
 *         description: ID do evento inválido.
 *       404:
 *         description: Evento não encontrado.
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do evento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEventDto'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso.
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
 *                     event:
 *                       $ref: '#/components/schemas/Event'
 *       400:
 *         description: ID do evento inválido ou erro de validação.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (papel insuficiente ou não pertence à igreja).
 *       404:
 *         description: Evento não encontrado.
 *   delete:
 *     summary: Deleta um evento existente
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do evento a ser deletado
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso.
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
 *                   example: Evento deletado com sucesso.
 *       400:
 *         description: ID do evento inválido.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (papel insuficiente ou não pertence à igreja).
 *       404:
 *         description: Evento não encontrado.
 */
router.get('/:eventId', getEventById);
router.put(
    '/:eventId',
    protect,
    authorize(UserRole.EDITOR, UserRole.PUBLISHER, UserRole.ADMIN, UserRole.MASTER),
    validate(UpdateEventDto),
    updateEvent
);
router.delete(
    '/:eventId',
    protect,
    authorize(UserRole.ADMIN, UserRole.MASTER),
    deleteEvent
);

export default router;

