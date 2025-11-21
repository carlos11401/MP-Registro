import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import 'dotenv/config';

import { Role } from '../enum/role.enum';

declare global {
    namespace Express {
        interface Request {
            user?: { id: number };
        }
    }
}

// Generar un token
export const generateToken = (id: number, user_type: Role): string => {
    return jwt.sign({ id, user_type }, process.env.SECRET_KEY as string, { expiresIn: '24h' });
};

// Verificar el token
export const authenticateToken = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Obtener el token
        const token = req.headers.authorization?.split(' ')[1];

        // Verificar si existe el token
        if (!token) {
            res.status(401).json({ message: 'Acceso denegado' });
        }

        try {
            // Verificar el token
            const payload = jwt.verify(token as string, process.env.SECRET_KEY as string) as jwt.JwtPayload;

            if (allowedRoles.includes(payload.user_type)) {
                req.user = { id: payload.id };
                return next();
            }

            res.status(403).json({ message: 'Acceso denegado' });
        } catch (error) {
            res.status(403).json({ message: 'Token no válido' });
        }
    }
};