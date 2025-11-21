import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.config';
import { DBTables } from '../enum/table.enum';


export class Indicio extends Model {
    declare id_indicio: number;
    declare id_expediente: number;
    declare descripcion: string;
    declare color: string | null;
    declare tamano: string | null;
    declare peso: string | null;
    declare ubicacion: string | null;
    declare id_usuario_registro: number;
    declare fecha_registro: Date;
}

Indicio.init({
    id_indicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_expediente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    tamano: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    peso: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    ubicacion: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    id_usuario_registro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE')
    }
}, {
    sequelize,
    tableName: DBTables.INDICIO as string,
    timestamps: false
});
