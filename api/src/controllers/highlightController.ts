import { Request, Response, NextFunction } from 'express';
import Highlight, { IHighlight } from '../models/Highlight';
import mongoose from 'mongoose';
import { UserRole } from '../models/User'; // Import UserRole if needed for permissions

// @desc    Criar um novo destaque
// @route   POST /api/highlights
// @access  Private (Editor, Publisher, Admin, Master)
export const createHighlight = async (req: Request, res: Response, next: NextFunction) => {
    const { title, imageUrl, description, link } = req.body;
    const userId = req.user!.id;
    const churchId = req.user!.churchId;

    if (!churchId) {
        return res.status(400).json({ message: 'Usuário não associado a uma igreja. Não é possível criar destaque.' });
    }

    try {
        const highlight = await Highlight.create({
            title,
            imageUrl,
            description,
            link,
            churchId,
            createdBy: userId,
        });

        res.status(201).json({
            status: 'success',
            data: {
                highlight,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Listar todos os destaques de uma igreja
// @route   GET /api/highlights (ou /api/churches/:churchId/highlights)
// @access  Public ou Private (Membros da igreja)
// Decidimos por /api/highlights e filtrar pela igreja do usuário logado ou query param
export const getHighlightsByChurch = async (req: Request, res: Response, next: NextFunction) => {
    // Permitir filtrar por churchId via query param para acesso público/master
    // Ou usar o churchId do usuário logado para membros
    let churchId = req.query.churchId as string | undefined;

    if (!churchId && req.user?.churchId) {
        churchId = req.user.churchId;
    } else if (!churchId) {
        // Se não for usuário logado e não houver query param, pode retornar erro ou lista vazia
        return res.status(400).json({ message: 'ID da Igreja não fornecido.' });
    }

    if (churchId && !mongoose.Types.ObjectId.isValid(churchId)) {
        return res.status(400).json({ message: 'ID da Igreja inválido.' });
    }

    try {
        const highlights = await Highlight.find({ churchId: churchId })
                                          .populate('createdBy', 'name') // Popula nome do criador
                                          .sort({ createdAt: -1 }); // Ordena pelos mais recentes

        res.status(200).json({
            status: 'success',
            count: highlights.length,
            data: {
                highlights,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obter um destaque específico pelo ID
// @route   GET /api/highlights/:highlightId
// @access  Public ou Private (Membros da igreja)
export const getHighlightById = async (req: Request, res: Response, next: NextFunction) => {
    const { highlightId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(highlightId)) {
        return res.status(400).json({ message: 'ID do destaque inválido.' });
    }

    try {
        const highlight = await Highlight.findById(highlightId).populate('createdBy', 'name');

        if (!highlight) {
            return res.status(404).json({ message: 'Destaque não encontrado.' });
        }

        // Opcional: Verificar se o usuário pertence à igreja do destaque se a rota for privada
        // if (req.user && req.user.churchId !== highlight.churchId.toString() && req.user.role !== UserRole.MASTER) {
        //     return res.status(403).json({ message: 'Acesso negado a este destaque.' });
        // }

        res.status(200).json({
            status: 'success',
            data: {
                highlight,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Atualizar um destaque
// @route   PUT /api/highlights/:highlightId
// @access  Private (Editor, Publisher, Admin, Master - da mesma igreja)
export const updateHighlight = async (req: Request, res: Response, next: NextFunction) => {
    const { highlightId } = req.params;
    const updates = req.body;
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const userChurchId = req.user!.churchId;

    if (!mongoose.Types.ObjectId.isValid(highlightId)) {
        return res.status(400).json({ message: 'ID do destaque inválido.' });
    }

    try {
        const highlight = await Highlight.findById(highlightId);

        if (!highlight) {
            return res.status(404).json({ message: 'Destaque não encontrado.' });
        }

        // Verificar permissão: Usuário deve ser Master ou pertencer à mesma igreja e ter role adequado
        const canUpdate = userRole === UserRole.MASTER ||
                        (userChurchId === highlight.churchId.toString() &&
                         [UserRole.ADMIN, UserRole.EDITOR, UserRole.PUBLISHER].includes(userRole));
                         // Ou verificar se foi o criador: || highlight.createdBy.toString() === userId;

        if (!canUpdate) {
            return res.status(403).json({ message: 'Você não tem permissão para atualizar este destaque.' });
        }

        // Atualizar o documento
        const updatedHighlight = await Highlight.findByIdAndUpdate(highlightId, updates, {
            new: true,
            runValidators: true,
        }).populate('createdBy', 'name');

        res.status(200).json({
            status: 'success',
            data: {
                highlight: updatedHighlight,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Deletar um destaque
// @route   DELETE /api/highlights/:highlightId
// @access  Private (Admin, Master - da mesma igreja)
export const deleteHighlight = async (req: Request, res: Response, next: NextFunction) => {
    const { highlightId } = req.params;
    const userRole = req.user!.role;
    const userChurchId = req.user!.churchId;

    if (!mongoose.Types.ObjectId.isValid(highlightId)) {
        return res.status(400).json({ message: 'ID do destaque inválido.' });
    }

    try {
        const highlight = await Highlight.findById(highlightId);

        if (!highlight) {
            return res.status(404).json({ message: 'Destaque não encontrado.' });
        }

        // Verificar permissão: Usuário deve ser Master ou Admin da mesma igreja
        const canDelete = userRole === UserRole.MASTER ||
                        (userChurchId === highlight.churchId.toString() && userRole === UserRole.ADMIN);
                        // Ou verificar se foi o criador: || highlight.createdBy.toString() === req.user!.id;

        if (!canDelete) {
            return res.status(403).json({ message: 'Você não tem permissão para deletar este destaque.' });
        }

        await highlight.deleteOne();

        res.status(200).json({ status: 'success', message: 'Destaque deletado com sucesso.' });
    } catch (error) {
        next(error);
    }
};

