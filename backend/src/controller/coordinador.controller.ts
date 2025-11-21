import { Request, Response } from 'express';
import { Expediente } from '../model/expediente.model';
import { Indicio } from '../model/indicio.model';

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


export const fetchIndiciosByExpediente = async (req: Request, res: Response): Promise<void> => {
    const { id_expediente } = req.params;

    if (!id_expediente) {
        res.status(400).json({ message: 'Debes proporcionar el id del expediente' });
        return;
    }

    try {
        const indicios = await Indicio.findAll({
            where: { id_expediente }
        });
        res.status(200).json({ indicios });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los indicios', error });
    }
};