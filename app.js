import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api/reservations", reservationRoutes);

app.use(errorHandler);

export default app;
