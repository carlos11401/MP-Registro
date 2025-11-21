import { Role } from '../enum/role.enum'

// Interface de usuario
export interface User {
    id_usuario: number;
    id_rol: number;
    email: string;
    password_hash: string;
}

// To login request interface
export interface LoginRequest {
    id_rol: Role
    email: string
    password: string
}