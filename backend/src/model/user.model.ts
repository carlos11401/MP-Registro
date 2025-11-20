import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db.config';
import { User } from '../interface/users.interface';
import { DBTables } from '../enum/table.enum';

export class Usuario extends Model implements User {
    declare id_usuario: number;
    declare nombre: string;
    declare email: string;
    declare password_hash: string;
    declare id_rol: number;
    declare estado: boolean;
}

Usuario.init(
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        id_rol: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: DBTables.USUARIOS as string
    }
);