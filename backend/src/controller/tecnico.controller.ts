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

        if(result.length == 0){
            res.status(400).json({ message: 'Correo o contraseña incorrectos' });
            return;
        }

        res.status(200).json({ message: 'Expediente creado exitosamente' });
    } catch (error) {
        console.error('Error al crear expediente:', error);
        res.status(500).json({ message: 'Error al crear el expediente' });
    }
}

export const addIndicio = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Indicio agregado exitosamente' });
    } catch (error) {
        console.error('Error al crear indicio:', error);
        res.status(500).json({ message: 'Error al agregar indicio', error });
    }
};

