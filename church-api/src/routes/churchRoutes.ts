import express from 'express';
import {
    registerChurch,
    getAllChurches,
    getChurchInfo,
    updateChurchInfo
} from '../controllers/churchController';
import { getChurchUsers } from '../controllers/userController'; // Import controller for church users
import { protect } from '../middlewares/authMiddleware';
import { isMaster, isAdminOrMaster, belongsToChurchOrMaster } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validationMiddleware'; // Import validation middleware
import { RegisterChurchDto, UpdateChurchInfoDto } from '../validators/church.dto'; // Import DTOs

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Igrejas
 *   description: Gerenciamento de informações das igrejas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialLink:
 *       type: object
 *       properties:
 *         platform:
 *           type: string
 *           description: Plataforma (ex: Facebook, Instagram)
 *         url:
 *           type: string
 *           format: url
 *           description: URL do perfil social
 *     ServiceTime:
 *       type: object
 *       properties:
 *         dayOfWeek:
 *           type: string
 *           description: Dia da semana (ex: Domingo)
 *         time:
 *           type: string
 *           description: Horário (ex: 10:00)
 *         description:
 *           type: string
 *           description: Descrição do serviço (ex: Culto de Celebração)
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         number:
 *           type: string
 *         complement:
 *           type: string
 *         neighborhood:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zipCode:
 *           type: string
 *     Church:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         name:
 *           type: string
 *         registeredBy:
 *           type: string
 *           format: objectId
 *           description: ID do usuário Master que registrou
 *         history:
 *           type: string
 *         mission:
 *           type: string
 *         vision:
 *           type: string
 *         values:
 *           type: array
 *           items:
 *             type: string
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         serviceTimes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceTime'
 *         socialLinks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SocialLink'
 *         imageUrl:
 *           type: string
 *           format: url
 *         youtubeChannelId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RegisterChurchDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         history:
 *           type: string
 *         mission:
 *           type: string
 *         vision:
 *           type: string
 *         values:
 *           type: array
 *           items:
 *             type: string
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         serviceTimes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceTime'
 *         socialLinks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SocialLink'
 *         imageUrl:
 *           type: string
 *           format: url
 *         youtubeChannelId:
 *           type: string
 *     UpdateChurchInfoDto:
 *       type: object
 *       properties:
 *         history:
 *           type: string
 *         mission:
 *           type: string
 *         vision:
 *           type: string
 *         values:
 *           type: array
 *           items:
 *             type: string
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         serviceTimes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceTime'
 *         socialLinks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SocialLink'
 *         imageUrl:
 *           type: string
 *           format: url
 *         youtubeChannelId:
 *           type: string
 */

/**
 * @swagger
 * /churches:
 *   post:
 *     summary: Registra uma nova igreja (Apenas Master)
 *     tags: [Igrejas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterChurchDto'
 *     responses:
 *       201:
 *         description: Igreja registrada com sucesso.
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
 *                     church:
 *                       $ref: '#/components/schemas/Church'
 *       400:
 *         description: Erro de validação ou nome da igreja já existe.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (usuário não é Master).
 *   get:
 *     summary: Lista todas as igrejas registradas (Apenas Master)
 *     tags: [Igrejas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de igrejas retornada com sucesso.
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
 *                     churches:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Church'
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (usuário não é Master).
 */
router.post('/', protect, isMaster, validate(RegisterChurchDto), registerChurch);
router.get('/', protect, isMaster, getAllChurches);

/**
 * @swagger
 * /churches/{churchId}/info:
 *   get:
 *     summary: Obtém informações detalhadas de uma igreja específica
 *     tags: [Igrejas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da igreja
 *     responses:
 *       200:
 *         description: Informações da igreja retornadas com sucesso.
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
 *                     church:
 *                       $ref: '#/components/schemas/Church'
 *       400:
 *         description: ID da igreja inválido.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (usuário não pertence à igreja ou não tem permissão).
 *       404:
 *         description: Igreja não encontrada.
 *   put:
 *     summary: Atualiza informações de uma igreja (Apenas Admin da igreja ou Master)
 *     tags: [Igrejas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da igreja a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateChurchInfoDto'
 *     responses:
 *       200:
 *         description: Informações da igreja atualizadas com sucesso.
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
 *                     church:
 *                       $ref: '#/components/schemas/Church'
 *       400:
 *         description: ID da igreja inválido ou erro de validação.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (usuário não é Admin/Master ou não pertence à igreja).
 *       404:
 *         description: Igreja não encontrada.
 */
router.route('/:churchId/info')
    .get(protect, belongsToChurchOrMaster('churchId'), getChurchInfo)
    .put(protect, isAdminOrMaster, belongsToChurchOrMaster('churchId'), validate(UpdateChurchInfoDto), updateChurchInfo);

/**
 * @swagger
 * /churches/{churchId}/users:
 *   get:
 *     summary: Lista usuários de uma igreja específica (Master ou Admin da Igreja)
 *     tags: [Igrejas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: churchId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID da igreja
 *     responses:
 *       200:
 *         description: Lista de usuários da igreja retornada com sucesso.
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
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: ID da igreja inválido.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (usuário não é Admin/Master ou não pertence à igreja).
 */
router.get('/:churchId/users', protect, isAdminOrMaster, belongsToChurchOrMaster('churchId'), getChurchUsers);

export default router;

