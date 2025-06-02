import { Request, Response, NextFunction } from 'express';
import Translation from '../models/Translation';

export const getTranslation = async (req: Request, res: Response, next: NextFunction) => {

    const { lng, ns } = req.params;

    try {
    const translation = await Translation.findOne({ language: lng, namespace: ns });

    if (!translation) {
      return res.status(404).json({});
    }

    return res.json(translation.data);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tradução" });
  }
}