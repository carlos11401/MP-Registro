// import { Dialect, Sequelize } from 'sequelize';

// import "dotenv/config";

// Create a new Sequelize instance using environment variables
// export const sequelize = new Sequelize(process.env.DB_DATABASE as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
//     host: process.env.DB_HOST as string, // Database server address
//     dialect: process.env.DB_TYPE as Dialect, // Database type
//     logging: false, // Disable query logs in the console
// });


import dotenv from "dotenv";

dotenv.config();
import { Connection, Request, TYPES } from "tedious";

export const dbConfig = {
    server: process.env.DB_HOST as string,
    authentication: {
        type: "default" as const,
        options: {
            userName: process.env.DB_USER as string,
            password: process.env.DB_PASS as string,
        },
    },
    options: {
        database: process.env.DB_DATABASE as string,
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true,
    },
};

export const createConnection = () => {
    console.log("Creating DB connection...", process.env.DB_HOST);
    return new Connection(dbConfig);
};
