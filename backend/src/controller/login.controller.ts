import { Request, Response } from 'express';
import moment from 'moment';

import { LoginRequest } from '../interface/users.interface';

import { executeProcedure } from '../config/procedure.config';

import {  TYPES } from 'tedious/lib/data-type';
import { generateToken } from '../midlewares/jwt.midlewares';
import { PROCEDURES } from '../enum/procedures.enum';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const user: LoginRequest = req.body;

    try {
        // Validate user credentials
        const result = await executeProcedure(PROCEDURES.LOGIN, {
            email: { value: user.email , type: TYPES.VarChar },
            password: { value: user.password , type: TYPES.VarChar }
        });
        if(result.length == 0){
            res.status(400).json({ message: 'Correo o contraseña incorrectos' });
            return;
        }

        // Generar el jwt
        const jwt = generateToken(result[0].id_usuario, result[0].id_rol);

        res.status(200).json({ message: 'Inicio de sesión exitoso', token: jwt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
