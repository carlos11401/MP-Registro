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
    return new Connection(dbConfig);
};
