import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/user.routes";
import coordinadorRoutes from "./routes/coordinador.routes";

const app = express();

app.set("port", process.env.API_PORT);
app.use(morgan("dev")); // Logger middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

app.use("/mp/v1/", userRoutes, coordinadorRoutes);

export default app;
