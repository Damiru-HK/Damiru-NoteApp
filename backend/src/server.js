import express from "express";
import cors from "cors";
import dotenv  from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001

// Middleware to parse JSON requests
app.use(cors({
    origin:"http://localhost:5173", // Allow requests from this origin
})); // Enable CORS (Cross-Origin Reesource Sharing) for all routes

app.use(express.json()); // gives access to req.body in simple terms

/**
 * Most popular usecase of middleware is authentication and authorization (auth check)
 * And rate limiting to prevent abuse of the API
 * status code is 401 for unauthorized access
 * status code is 429 for too many requests
 */

app.use(rateLimiter); // Apply rate limiting custome middleware

// Middleware to parse URL-encoded data
app.use("/api/notes", notesRoutes);

// connect database first and start server
connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT:", PORT);
    });
});


