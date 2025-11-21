import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.config';
import { DBTables } from '../enum/table.enum';

export class RevisionExpediente extends Model {
    declare id_revision: number;
    declare id_expediente: number;
    declare id_coordinador: number;
    declare accion: string;
    declare justificacion: string | null;
    declare fecha_accion: Date;
}

RevisionExpediente.init({
    id_revision: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_expediente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_coordinador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accion: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    justificacion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    fecha_accion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('GETDATE')
    }
}, {
    sequelize,
    tableName: DBTables.REVISION_EXPEDIENTE as string,
    timestamps: false
});
    