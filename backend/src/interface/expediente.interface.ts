export interface ExpedienteRequest {
    numero_expediente: string;
    descripcion?: string;
    id_tecnico_registro: number; // id del usuario que registra
}

export interface IndicioRequest {
    id_expediente: number;
    descripcion: string;
    color?: string;
    tamano?: string;
    peso?: string;
    ubicacion?: string;
    id_usuario_registro: number;
}