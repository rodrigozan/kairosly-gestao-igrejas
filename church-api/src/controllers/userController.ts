import { Request, Response, NextFunction } from 'express';
import User, { IUser, UserRole } from '../models/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// @desc    Obter perfil do usuário logado
// @route   GET /api/user/profile
// @access  Private
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user!.id).select('-password').populate('familyMembers.userId', 'name email photoUrl');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

// @desc    Atualizar perfil do usuário logado
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword, birthDate, photoUrl } = req.body;
    try {
        const user = await User.findById(req.user!.id).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (name) user.name = name;
        if (email) {
            const existingUser = await User.findOne({ email: email });
            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: 'Este e-mail já está em uso por outra conta.' });
            }
            user.email = email;
        }
        if (birthDate) user.birthDate = birthDate;
        if (photoUrl) user.photoUrl = photoUrl;
        if (password) {
            if (!confirmPassword || password !== confirmPassword) {
                return res.status(400).json({ message: 'As senhas não coincidem ou a confirmação está ausente.' });
            }
            user.password = password;
        }
        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;
        res.status(200).json({ status: 'success', data: { user: userResponse } });
    } catch (error) {
        next(error);
    }
};

// @desc    Desativar conta do usuário logado (soft delete)
// @route   DELETE /api/user/profile
// @access  Private
export const deactivateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user!.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        user.isActive = false;
        await user.save();
        res.status(200).json({ status: 'success', message: 'Conta desativada com sucesso.' });
    } catch (error) {
        next(error);
    }
};

// --- Funções para Gerenciamento Familiar ---

// @desc    Adicionar membro da família
// @route   POST /api/user/family
// @access  Private
export const addFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
    const { memberUserId, relationship } = req.body;
    const userId = req.user!.id;
    if (!memberUserId || !relationship) {
        return res.status(400).json({ message: 'Forneça o ID do membro e o relacionamento.' });
    }
    if (userId === memberUserId) {
        return res.status(400).json({ message: 'Você não pode adicionar a si mesmo como membro da família.' });
    }
    try {
        const user = await User.findById(userId);
        const member = await User.findById(memberUserId);
        if (!user || !member) {
            return res.status(404).json({ message: 'Usuário ou membro da família não encontrado.' });
        }
        if (user.churchId && member.churchId && user.churchId.toString() !== member.churchId.toString()) {
             return res.status(400).json({ message: 'Membros da família devem pertencer à mesma igreja.' });
        }
        const alreadyMember = user.familyMembers.some(fm => fm.userId.toString() === memberUserId);
        if (alreadyMember) {
            return res.status(400).json({ message: 'Este usuário já é um membro da sua família.' });
        }
        user.familyMembers.push({ userId: new mongoose.Types.ObjectId(memberUserId), relationship });
        await user.save();
        // Populate before sending response
        await user.populate('familyMembers.userId', 'name email photoUrl');
        res.status(201).json({ status: 'success', data: { familyMembers: user.familyMembers } });
    } catch (error) {
        next(error);
    }
};

// @desc    Obter membros da família do usuário logado
// @route   GET /api/user/family
// @access  Private
export const getFamilyMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.user!.id).populate('familyMembers.userId', 'name email photoUrl birthDate');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json({ status: 'success', data: { familyMembers: user.familyMembers } });
    } catch (error) {
        next(error);
    }
};

// @desc    Remover membro da família
// @route   DELETE /api/user/family/:memberId
// @access  Private
export const removeFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
    const { memberId } = req.params;
    const userId = req.user!.id;
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(400).json({ message: 'ID de membro inválido.' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const initialLength = user.familyMembers.length;
        user.familyMembers = user.familyMembers.filter(fm => fm.userId.toString() !== memberId);
        if (user.familyMembers.length === initialLength) {
            return res.status(404).json({ message: 'Membro da família não encontrado na sua lista.' });
        }
        await user.save();
        res.status(200).json({ status: 'success', message: 'Membro da família removido com sucesso.' });
    } catch (error) {
        next(error);
    }
};


// --- Funções para Gerenciamento de Usuários (Admin/Master) ---

// @desc    Listar usuários de uma igreja específica
// @route   GET /api/churches/:churchId/users
// @access  Private (Master ou Admin da Igreja)
export const getChurchUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { churchId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(churchId)) {
        return res.status(400).json({ message: 'ID da igreja inválido.' });
    }

    try {
        // A permissão já foi verificada pelo middleware na rota
        const users = await User.find({ churchId: churchId }).select('-password');

        res.status(200).json({
            status: 'success',
            count: users.length,
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Atribuir/Atualizar papel e igreja de um usuário
// @route   PUT /api/users/:userId/assign
// @access  Private (Master ou Admin da Igreja de destino)
export const assignUserRoleAndChurch = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { role, churchId } = req.body;
    const adminUser = req.user!;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID de usuário inválido.' });
    }

    // Validar role
    if (role && !Object.values(UserRole).includes(role)) {
        return res.status(400).json({ message: 'Papel inválido.' });
    }

    // Validar churchId se fornecido
    if (churchId && !mongoose.Types.ObjectId.isValid(churchId)) {
        return res.status(400).json({ message: 'ID de igreja inválido.' });
    }

    try {
        const userToUpdate = await User.findById(userId);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuário a ser atualizado não encontrado.' });
        }

        // --- Lógica de Permissão --- 
        // 1. Master pode fazer qualquer coisa.
        // 2. Admin só pode gerenciar usuários da *sua própria* igreja.
        // 3. Admin não pode atribuir papel MASTER.
        // 4. Admin não pode rebaixar outro Admin ou Master.
        // 5. Admin não pode mover usuário para *outra* igreja.

        if (adminUser.role !== UserRole.MASTER) {
            // Regra 3: Admin não pode atribuir MASTER
            if (role === UserRole.MASTER) {
                return res.status(403).json({ message: 'Apenas o Master pode atribuir o papel Master.' });
            }
            // Regra 5: Admin não pode mover para outra igreja
            if (churchId && churchId !== adminUser.churchId) {
                 return res.status(403).json({ message: 'Admins só podem gerenciar usuários dentro de sua própria igreja.' });
            }
            // Regra 2: Admin só gerencia usuários da sua igreja
            if (userToUpdate.churchId?.toString() !== adminUser.churchId) {
                 return res.status(403).json({ message: 'Admins só podem gerenciar usuários de sua própria igreja.' });
            }
            // Regra 4: Admin não pode rebaixar Admin/Master
            if ((userToUpdate.role === UserRole.ADMIN || userToUpdate.role === UserRole.MASTER) && role && role !== userToUpdate.role) {
                 return res.status(403).json({ message: 'Admins não podem alterar o papel de outros Admins ou Masters.' });
            }
        }
        // --- Fim da Lógica de Permissão ---

        // Atualizar campos
        if (role) userToUpdate.role = role;
        if (churchId) userToUpdate.churchId = new mongoose.Types.ObjectId(churchId);
        // Se churchId for explicitamente null, remover da igreja (apenas Master pode fazer isso?) - Adicionar lógica se necessário
        if (churchId === null && adminUser.role === UserRole.MASTER) {
            userToUpdate.churchId = null;
        }

        const updatedUser = await userToUpdate.save();

        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json({
            status: 'success',
            data: {
                user: userResponse,
            },
        });

    } catch (error) {
        next(error);
    }
};

