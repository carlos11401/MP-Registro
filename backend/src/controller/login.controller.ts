import { Request, Response } from 'express';
import moment from 'moment';

import { LoginRequest } from '../interface/users.interface';

import { getUserData } from '../service/userData.service';
import { isPasswordValid } from '../service/encrypt.service';
import { generateToken } from '../midlewares/jwt.midlewares';

import { Usuario } from '../model/user.model';

// Validate login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const user: LoginRequest = req.body;

    try {
        // Validar que el usuario este registrado
        const userData = await getUserData(user);
        if(!userData){
            res.status(400).json({ message: 'Correo o contraseña incorrectos' });
            return;
        }
        // Validar la contraseña
        const passwordMatch = isPasswordValid(user.password, userData.password_hash);
        if(!passwordMatch){
            res.status(400).json({ message: 'Correo o contraseña incorrectos' });
            return;
        }

        // Generar el jwt
        const jwt = generateToken(userData.id_usuario, user.id_rol);
        // Actualizar el ultimo login del usuario
        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        await Usuario.update({ last_log: time }, { where: { email: user.email } });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token: jwt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
