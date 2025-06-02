import { Request, Response, NextFunction } from 'express';
import Church, { IChurch } from '../models/Church';
import User, { UserRole } from '../models/User';
import mongoose from 'mongoose';

// @desc    Registrar uma nova igreja (Apenas Master)
// @route   POST /api/churches
// @access  Private (Master)
export const registerChurch = async (req: Request, res: Response, next: NextFunction) => {
    const { name, history, mission, vision, values, address, serviceTimes, socialLinks, imageUrl, youtubeChannelId } = req.body;
    const registeredById = req.user!.id; // ID do usuário Master logado

    if (!name) {
        return res.status(400).json({ message: 'O nome da igreja é obrigatório.' });
    }

    try {
        // Verificar se já existe uma igreja com o mesmo nome
        const existingChurch = await Church.findOne({ name });
        if (existingChurch) {
            return res.status(400).json({ message: 'Já existe uma igreja registrada com este nome.' });
        }

        // Criar nova igreja
        const church = await Church.create({
            name,
            registeredBy: registeredById,
            history,
            mission,
            vision,
            values,
            address,
            serviceTimes,
            socialLinks,
            imageUrl,
            youtubeChannelId
        });

        res.status(201).json({
            status: 'success',
            data: {
                church,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Listar todas as igrejas (Apenas Master)
// @route   GET /api/churches
// @access  Private (Master)
export const getAllChurches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const churches = await Church.find().populate('registeredBy', 'name email'); // Popula quem registrou

        res.status(200).json({
            status: 'success',
            count: churches.length,
            data: {
                churches,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obter informações detalhadas de uma igreja específica
// @route   GET /api/churches/:churchId/info
// @access  Private (Membros da igreja ou Master/Admin)
export const getChurchInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { churchId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(churchId)) {
        return res.status(400).json({ message: 'ID da igreja inválido.' });
    }

    try {
        const church = await Church.findById(churchId).populate('registeredBy', 'name email');

        if (!church) {
            return res.status(404).json({ message: 'Igreja não encontrada.' });
        }

        // A verificação de permissão (se o usuário pertence à igreja ou é admin/master)
        // será feita pelo middleware 'belongsToChurchOrMaster' ou 'isAdminOrMaster' na rota.

        res.status(200).json({
            status: 'success',
            data: {
                church,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Atualizar informações de uma igreja (Apenas Admin da igreja ou Master)
// @route   PUT /api/churches/:churchId/info
// @access  Private (Admin da Igreja ou Master)
export const updateChurchInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { churchId } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(churchId)) {
        return res.status(400).json({ message: 'ID da igreja inválido.' });
    }

    // Não permitir atualização do nome ou registeredBy por esta rota
    delete updates.name;
    delete updates.registeredBy;

    try {
        const church = await Church.findByIdAndUpdate(churchId, updates, {
            new: true, // Retorna o documento atualizado
            runValidators: true, // Roda validadores do Mongoose
        });

        if (!church) {
            return res.status(404).json({ message: 'Igreja não encontrada.' });
        }

        res.status(200).json({
            status: 'success',
            data: {
                church,
            },
        });
    } catch (error) {
        next(error);
    }
};

