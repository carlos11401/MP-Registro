import { Request, Response } from 'express';
import { ESTADO } from '../enum/estado.enum';
import { PROCEDURES } from '../enum/procedures.enum';
import { executeProcedure } from '../config/procedure.config';
import { TYPES } from 'tedious';

export const listarExpedientes = async (req: Request, res: Response) => {
    try {
        const estado = req.query.estado || null;
        const id_tecnico = req.query.id_tecnico ? Number(req.query.id_tecnico) : null;

        const result = await executeProcedure(PROCEDURES.LIST_EXPEDIENTES, {
            estado: { type: TYPES.VarChar, value: estado },
            id_tecnico: { type: TYPES.Int, value: id_tecnico }
        });

        // Validar que se haya obtenido un resultado
        if (!result || result.length === 0) {
            res.status(500).json({ message: "No se devolvió ningún resultado desde el procedimiento." });
        }
        if (result[0].error) {
            res.status(500).json({ message: "Error al listar expedientes", error: result[0].error });
        }

        res.status(200).json(result);
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

        res.status(200).json({ message: 'Indicios obtenidos correctamente', indicios: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los indicios', error });
    }
};

export const revisarExpedienteController = async (req: Request, res: Response) => {
    const body = req.body;
    const idCoordinador = req.user?.id; // se obtiene del middleware de JWT

    try {


        res.status(200).json({ message: 'Expediente revisado correctamente' });
    } catch (error: any) {
        console.error('Error al revisar expediente:', error);
        res.status(500).json({ message: error.message });
    }
};