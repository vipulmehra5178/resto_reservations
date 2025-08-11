import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/reservations", reservationRoutes);

app.use(errorHandler);

export default app;
