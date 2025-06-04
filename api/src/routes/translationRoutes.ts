import express from 'express';
import {
    getTranslation
} from '../controllers/i18nController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { CreateEventDto, UpdateEventDto } from '../validators/event.dto';

const router = express.Router();
const controller = getTranslation;

router.get('/:lng/:ns', protect, getTranslation);

export default router;