import { DataTypes, Model, Sequelize } from 'sequelize';

import { sequelize } from '../config/db.config';
import { DBTables } from '../enum/table.enum';

export class Expediente extends Model {
    declare id_expediente: number;
    declare numero_expediente: string;
    declare descripcion: string;
    declare fecha_registro: Date;
    declare id_tecnico_registro: number;
    declare estado: string;
    declare fecha_aprobacion: Date | null;
    declare fecha_rechazo: Date | null;
}

Expediente.init({
    id_expediente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero_expediente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE')
    },
    id_tecnico_registro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente'
    },
    fecha_aprobacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_rechazo: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    tableName: DBTables.EXPEDIENTE as string,
    timestamps: false
});
