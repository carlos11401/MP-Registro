import { createConnection } from "./db.config";
import { Request, TYPES } from "tedious";

export const executeProcedure = (
    procedureName: string,
    params: any = {}
): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const connection = createConnection();

        const results: any[] = [];

        connection.on("connect", (err) => {
            if (err) return reject(err);

            const request = new Request(procedureName, (err) => {
                if (err) reject(err);
            });

            for (const key in params) {
                const { type, value } = params[key];
                request.addParameter(key, type, value);
            }

            request.on("row", (columns) => {
                const row: any = {};
                columns.forEach((col: any) => {
                    row[col.metadata.colName] = col.value;
                });
                results.push(row);
            });

            request.on("requestCompleted", () => {
                resolve(results);
                connection.close();
            });

            connection.callProcedure(request);
        });

        connection.connect();
    });
};
