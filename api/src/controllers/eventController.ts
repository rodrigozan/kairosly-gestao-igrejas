import { Request, Response, NextFunction } from 'express';
import Event, { IEvent } from '../models/Event';
import mongoose from 'mongoose';
import { UserRole } from '../models/User';

// @desc    Criar um novo evento
// @route   POST /api/events
// @access  Private (Editor, Publisher, Admin, Master)
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, date, location, imageUrl } = req.body;
    const userId = req.user!.id;
    const churchId = req.user!.churchId;

    if (!churchId) {
        return res.status(400).json({ message: 'Usuário não associado a uma igreja. Não é possível criar evento.' });
    }

    try {
        const event = await Event.create({
            title,
            description,
            date,
            location,
            imageUrl,
            churchId,
            createdBy: userId,
        });

        res.status(201).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Listar todos os eventos de uma igreja (futuros por padrão)
// @route   GET /api/events
// @access  Public ou Private (Membros da igreja)
export const getEventsByChurch = async (req: Request, res: Response, next: NextFunction) => {
    let churchId = req.query.churchId as string | undefined;
    const showPast = req.query.past === 'true'; // Query param para incluir eventos passados

    if (!churchId && req.user?.churchId) {
        churchId = req.user.churchId;
    } else if (!churchId) {
        return res.status(400).json({ message: 'ID da Igreja não fornecido.' });
    }

    if (churchId && !mongoose.Types.ObjectId.isValid(churchId)) {
        return res.status(400).json({ message: 'ID da Igreja inválido.' });
    }

    try {
        const query: any = { churchId: churchId };
        if (!showPast) {
            query.date = { $gte: new Date() }; // Filtra apenas eventos futuros ou de hoje
        }

        const events = await Event.find(query)
                                  .populate('createdBy', 'name')
                                  .sort({ date: 1 }); // Ordena por data (mais próximos primeiro)

        res.status(200).json({
            status: 'success',
            count: events.length,
            data: {
                events,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obter um evento específico pelo ID
// @route   GET /api/events/:eventId
// @access  Public ou Private
export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const event = await Event.findById(eventId).populate('createdBy', 'name');

        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }

        // Opcional: Verificar permissão se a rota for privada

        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Atualizar um evento
// @route   PUT /api/events/:eventId
// @access  Private (Editor, Publisher, Admin, Master - da mesma igreja)
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params;
    const updates = req.body;
    const userRole = req.user!.role;
    const userChurchId = req.user!.churchId;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }

        // Verificar permissão
        const canUpdate = userRole === UserRole.MASTER ||
                        (userChurchId === event.churchId.toString() &&
                         [UserRole.ADMIN, UserRole.EDITOR, UserRole.PUBLISHER].includes(userRole));

        if (!canUpdate) {
            return res.status(403).json({ message: 'Você não tem permissão para atualizar este evento.' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
            new: true,
            runValidators: true,
        }).populate('createdBy', 'name');

        res.status(200).json({
            status: 'success',
            data: {
                event: updatedEvent,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Deletar um evento
// @route   DELETE /api/events/:eventId
// @access  Private (Admin, Master - da mesma igreja)
export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { eventId } = req.params;
    const userRole = req.user!.role;
    const userChurchId = req.user!.churchId;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: 'ID do evento inválido.' });
    }

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }

        // Verificar permissão
        const canDelete = userRole === UserRole.MASTER ||
                        (userChurchId === event.churchId.toString() && userRole === UserRole.ADMIN);

        if (!canDelete) {
            return res.status(403).json({ message: 'Você não tem permissão para deletar este evento.' });
        }

        await event.deleteOne();

        res.status(200).json({ status: 'success', message: 'Evento deletado com sucesso.' });
    } catch (error) {
        next(error);
    }
};

