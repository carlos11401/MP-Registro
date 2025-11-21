import { Request, Response } from 'express';
import { Expediente } from '../model/expediente.model';

export const listarExpedientes = async (req: Request, res: Response) => {
    try {
        const estado = req.query.estado as string | undefined;
        const whereClause = estado ? { estado } : undefined;

        const expedientes = await Expediente.findAll({
            where: whereClause,
            order: [['fecha_registro', 'ASC']]
        });
        res.status(200).json(expedientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener expedientes', error });
    }
};
