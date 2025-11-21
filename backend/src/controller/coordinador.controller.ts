import { Request, Response } from 'express';
import { ESTADO } from '../enum/estado.enum';
import { Sequelize } from 'sequelize';

export const listarExpedientes = async (req: Request, res: Response) => {
    try {



        res.status(200).json("asdfasdfa");
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