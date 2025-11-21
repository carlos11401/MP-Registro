import { LoginRequest } from "../interface/users.interface"
import { Usuario } from "../model/user.model"
import { User } from "../interface/users.interface"

// Obtener los datos del usuario según el tipo
export const getUserData = async (user: LoginRequest): Promise<User | null> => {
    const data = {
        attributes: ['id_usuario','id_rol', 'password_hash'],
        where: { email: user.email }
    };
    try {
        return await Usuario.findOne(data);
    }
    catch (error) {
        console.error(error);
        return null;
    }
}