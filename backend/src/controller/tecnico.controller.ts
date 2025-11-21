import { Request, Response } from 'express';
import { Expediente } from '../model/expediente.model';

// Controlador para obtener todos los clientes

export const addExpediente = async (req: Request, res: Response): Promise<void> => {
     try {
        // Verificar si el número de expediente ya existe
        const existing = await Expediente.findOne({ where: { numero_expediente: req.body.numero_expediente } });
        if (existing) {
            res.status(404).json({ message: 'Numero de expediente ya existe' });
            return;
        }
        await Expediente.create(req.body);
        res.status(200).json({ message: 'Expediente creado exitosamente' });
    } catch (error) {
        console.error('Error al crear expediente:', error);
        res.status(500).json({ message: 'Error al crear el expediente' });
    }
}

