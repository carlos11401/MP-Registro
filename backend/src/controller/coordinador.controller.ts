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
        const result = await executeProcedure(PROCEDURES.INDICIOS_BY_EXPEDIENTE, {
            id_expediente: { type: TYPES.Int, value: Number(id_expediente) }
        });

        // Validar que se haya obtenido un resultado
        if (!result || result.length === 0) {
            res.status(500).json({ message: "No se devolvió ningún resultado desde el procedimiento." });
        }
        if (result[0].error) {
            res.status(500).json({ message: "Error al listar indicios", error: result[0].error });
        }
        res.status(200).json({ message: 'Indicios obtenidos correctamente', indicios: result });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los indicios', error });
    }
};

export const aprobarExpedienteController = async (req: Request, res: Response) => {
    const id_expediente = req.query.id_expediente ;
    const idCoordinador = req.user?.id;

    try {
        const result = await executeProcedure(PROCEDURES.APROBAR_EXPEDIENTE, {
            id_expediente: { type: TYPES.Int, value: Number(id_expediente) },
            id_coordinador: { type: TYPES.Int, value: idCoordinador }
        });

        // Validar que se haya obtenido un resultado
        if (!result || result.length === 0) {
            res.status(500).json({ message: "No se devolvió ningún resultado desde el procedimiento." });
        }
        if (result[0].error) {
            res.status(500).json({ message: "Error al aprobar expediente", error: result[0].error });
        }

        res.status(200).json({ message: 'Expediente aprobado correctamente' });
    } catch (error: any) {
        console.error('Error al aprobar expediente:', error);
        res.status(500).json({ message: error.message });
    }
};

export const rechazarExpedienteController = async (req: Request, res: Response) => {
    const id_expediente = req.body.id_expediente ;
    const idCoordinador = req.user?.id;
    const justificacion = req.body.justificacion || '';

    try {
        const result = await executeProcedure(PROCEDURES.RECHAZAR_EXPEDIENTE, {
            id_expediente: { type: TYPES.Int, value: Number(id_expediente) },
            id_coordinador: { type: TYPES.Int, value: idCoordinador },
            justificacion: { type: TYPES.VarChar, value: justificacion }
        });

        // Validar que se haya obtenido un resultado
        if (!result || result.length === 0) {
            res.status(500).json({ message: "No se devolvió ningún resultado desde el procedimiento." });
        }
        if (result[0].error) {
            res.status(500).json({ message: "Error al rechazar expediente", error: result[0].error });
        }

        res.status(200).json({ message: 'Expediente rechazado correctamente' });
    } catch (error: any) {
        console.error('Error al rechazar expediente:', error);
        res.status(500).json({ message: error.message });
    }
};