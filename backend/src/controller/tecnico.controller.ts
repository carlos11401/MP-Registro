import { Request, Response } from 'express';
import { Expediente } from '../model/expediente.model';
import { Indicio } from '../model/indicio.model';

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

export const addIndicio = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificar que el expediente exista
        const expediente = await Expediente.findByPk(req.body.id_expediente);
        if (!expediente) { res.status(404).json({ message: 'Expediente no encontrado' }); return; }

        // Crear el indicio
        const nuevoIndicio = await Indicio.create(req.body);
        res.status(200).json({ message: 'Indicio agregado exitosamente', indicio: nuevoIndicio });
    } catch (error) {
        console.error('Error al crear indicio:', error);
        res.status(500).json({ message: 'Error al agregar indicio', error });
    }
};

