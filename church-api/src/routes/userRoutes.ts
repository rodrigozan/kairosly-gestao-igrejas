import express from 'express';
import {
    getProfile,
    updateProfile,
    deactivateProfile,
    addFamilyMember,
    getFamilyMembers,
    removeFamilyMember,
    assignUserRoleAndChurch,
    getChurchUsers // Assuming this remains handled elsewhere or added later
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { UpdateProfileDto, AddFamilyMemberDto, AssignUserDto } from '../validators/user.dto';
import { isMaster, isAdminOrMaster } from '../middlewares/roleMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuário
 *   description: Gerenciamento do perfil do usuário e família
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: string
 *       enum: [master, admin, editor, publisher, reader]
 *       description: Papel do usuário no sistema
 *     FamilyMember:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: objectId
 *           description: ID do usuário membro da família
 *         relationship:
 *           type: string
 *           description: Relacionamento (ex: Cônjuge, Filho(a))
 *     UserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           $ref: '#/components/schemas/UserRole'
 *         churchId:
 *           type: string
 *           format: objectId
 *           nullable: true
 *           description: ID da igreja à qual o usuário pertence
 *         isActive:
 *           type: boolean
 *         birthDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         photoUrl:
 *           type: string
 *           format: url
 *           nullable: true
 *         familyMembers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FamilyMember'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RegisterDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *         confirmPassword:
 *           type: string
 *           format: password
 *     LoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     UpdateProfileDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *         confirmPassword:
 *           type: string
 *           format: password
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Data de nascimento (YYYY-MM-DD)
 *         photoUrl:
 *           type: string
 *           format: url
 *     AddFamilyMemberDto:
 *       type: object
 *       required:
 *         - memberUserId
 *         - relationship
 *       properties:
 *         memberUserId:
 *           type: string
 *           format: objectId
 *           description: ID do usuário a ser adicionado como membro da família
 *         relationship:
 *           type: string
 *           description: Relacionamento (ex: Cônjuge, Filho(a))
 *     AssignUserDto:
 *       type: object
 *       properties:
 *         role:
 *           $ref: '#/components/schemas/UserRole'
 *         churchId:
 *           type: string
 *           format: objectId
 *           nullable: true
 *           description: ID da igreja para atribuir ou null para remover (apenas Master)
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Aplica autenticação a todas as rotas abaixo
router.use(protect);

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtém o perfil do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário retornado com sucesso.
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
 *                     user:
 *                       $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     summary: Atualiza o perfil do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileDto'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
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
 *                     user:
 *                       $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro de validação (e-mail já em uso, senhas não coincidem)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Desativa a conta do usuário logado (soft delete)
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta desativada com sucesso.
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
 *                   example: Conta desativada com sucesso.
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
router.route('/profile')
    .get(getProfile)
    .put(validate(UpdateProfileDto), updateProfile)
    .delete(deactivateProfile);

/**
 * @swagger
 * /user/family:
 *   get:
 *     summary: Obtém a lista de membros da família do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de membros da família retornada.
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
 *                     familyMembers:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/FamilyMember'
 *                           - type: object
 *                             properties:
 *                               userId:
 *                                 $ref: '#/components/schemas/UserResponse' # Populated user data
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *   post:
 *     summary: Adiciona um membro à família do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddFamilyMemberDto'
 *     responses:
 *       201:
 *         description: Membro adicionado com sucesso.
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
 *                     familyMembers:
 *                       type: array
 *                       items:
 *                          allOf:
 *                           - $ref: '#/components/schemas/FamilyMember'
 *                           - type: object
 *                             properties:
 *                               userId:
 *                                 $ref: '#/components/schemas/UserResponse' # Populated user data
 *       400:
 *         description: Erro de validação (ID inválido, usuário já é membro, pertence a outra igreja)
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário ou membro não encontrado
 */
router.route('/family')
    .get(getFamilyMembers)
    .post(validate(AddFamilyMemberDto), addFamilyMember);

/**
 * @swagger
 * /user/family/{memberId}:
 *   delete:
 *     summary: Remove um membro da família do usuário logado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do membro da família a ser removido
 *     responses:
 *       200:
 *         description: Membro removido com sucesso.
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
 *                   example: Membro da família removido com sucesso.
 *       400:
 *         description: ID de membro inválido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário ou membro não encontrado na lista
 */
router.route('/family/:memberId')
    .delete(removeFamilyMember);

/**
 * @swagger
 * /user/{userId}/assign:
 *   put:
 *     summary: Atribui/Atualiza papel e/ou igreja de um usuário (Admin/Master)
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignUserDto'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
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
 *                     user:
 *                       $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Erro de validação (ID inválido, papel inválido)
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Permissão negada (Admin tentando atribuir Master, gerenciar usuário de outra igreja, etc.)
 *       404:
 *         description: Usuário a ser atualizado não encontrado
 */
// A permissão isAdminOrMaster é aplicada aqui, a lógica mais fina está no controller
router.put('/:userId/assign', isAdminOrMaster, validate(AssignUserDto), assignUserRoleAndChurch);

export default router;

