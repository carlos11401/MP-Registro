import { Request, Response } from 'express';


// Controlador para obtener todos los clientes

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        // data example
        const customers = [
            { id: 1, name: 'Cliente 1', email: 'cliente1@example.com' },
            { id: 2, name: 'Cliente 2', email: 'cliente2@example.com' },
        ];

        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
}

