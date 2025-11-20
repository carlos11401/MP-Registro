import { Dialect, Sequelize } from 'sequelize';

import "dotenv/config";

// Create a new Sequelize instance using environment variables
export const sequelize = new Sequelize(process.env.DB_DATABASE as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: process.env.DB_HOST as string, // Database server address
    dialect: process.env.DB_TYPE as Dialect, // Database type
    logging: false, // Disable query logs in the console
});