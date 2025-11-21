import { Request, Response } from 'express';
import { executeProcedure } from '../config/procedure.config';
import { PROCEDURES } from '../enum/procedures.enum';
import { TYPES } from 'tedious';

// Controlador para obtener todos los clientes

export const addExpediente = async (req: Request, res: Response): Promise<void> => {
     try {
        // 
        const result = await executeProcedure(PROCEDURES.ADD_EXPEDIENTE, {
            numero_expediente: { type: TYPES.VarChar, value: req.body.numero_expediente },
            descripcion: { type: TYPES.VarChar, value: req.body.descripcion },
            id_tecnico: { type: TYPES.Int, value: req.body.id_tecnico_registro }
        });

        // Validar que se haya obtenido un resultado
        if (!result || result.length === 0) {
            res.status(500).json({ message: "No se devolvió ningún resultado desde el procedimiento." });
        }
        if (result[0].error) {
            res.status(500).json({ message: "Error al crear expediente", error: result[0].error });
        }

        res.status(200).json({ message: 'Expediente creado exitosamente' });
    } catch (error) {
        console.error('Error al crear expediente:', error);
        res.status(500).json({ message: 'Error al crear el expediente' });
    }
}

export const addIndicio = async (req: Request, res: Response): Promise<void> => {
    try {
        // Agregar indicio al expediente
        const result = await executeProcedure(PROCEDURES.ADD_INDICIO, {
            id_expediente: { type: TYPES.Int, value: req.body.id_expediente },
            descripcion: { type: TYPES.VarChar, value: req.body.descripcion },
            color: { type: TYPES.VarChar, value: req.body.color },
            tamano: { type: TYPES.VarChar, value: req.body.tamano },
            peso: { type: TYPES.VarChar, value: req.body.peso },
            ubicacion: { type: TYPES.VarChar, value: req.body.ubicacion },
            id_usuario_registro: { type: TYPES.Int, value: req.body.id_usuario_registro }
        });

        // Validar que se haya obtenido un resultado
        if (!result || result.length === 0) {
            res.status(500).json({ message: "No se devolvió ningún resultado desde el procedimiento." });
        }
        if (result[0].error) {
            res.status(500).json({ message: "Error al crear indicio", error: result[0].error });
        }
        
        res.status(200).json({ message: 'Indicio agregado exitosamente' });
    } catch (error) {
        console.error('Error al crear indicio:', error);
        res.status(500).json({ message: 'Error al agregar indicio', error });
    }
};

