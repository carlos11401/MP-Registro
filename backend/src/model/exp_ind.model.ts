// models/index.ts
import { sequelize } from '../config/db.config';
import { Expediente } from './expediente.model';
import { Indicio } from './indicio.model';

// Definir relaciones después de inicializar los modelos
Expediente.hasMany(Indicio, { foreignKey: 'id_expediente', as: 'indicios' });
Indicio.belongsTo(Expediente, { foreignKey: 'id_expediente', as: 'expediente' });

// Exportar los modelos
export { sequelize, Expediente, Indicio };
