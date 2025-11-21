import { LoginRequest } from "../interface/users.interface"
import { User } from "../interface/users.interface"
import { TYPES } from "tedious/lib/data-type";
import { executeProcedure } from "../config/procedure.config";

// Obtener los datos del usuario según el tipo
export const getUserData = async (user: LoginRequest): Promise<void | null> => {
    // const data = {
    //     attributes: ['id_usuario','id_rol', 'password_hash'],
    //     where: { email: user.email }
    // };
    try {

        // return await Usuario.findOne(data);
        
    }
    catch (error) {
        console.error(error);
        return null;
    }
}