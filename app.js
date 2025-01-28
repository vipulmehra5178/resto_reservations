import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json());

// Routes
app.use("/api/reservations", reservationRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
