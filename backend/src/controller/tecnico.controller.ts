import { Request, Response } from 'express';

// Controlador para obtener todos los clientes

export const addExpediente = async (req: Request, res: Response): Promise<void> => {
     try {

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

