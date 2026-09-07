import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler, ApiError } from "./middleware/errorHandler.js";

const app = express();

// 1. Global Pre-Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing for Task 1 frontend
app.use(express.json()); // Parses incoming application/json request bodies

// 2. Health Check Endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DevPulse REST API is running healthy",
        timestamp: new Date().toISOString()
    });
});

// 3. Mount Feature Routers
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// 4. Catch Unhandled Routes (404 Not Found)
app.use((req, res, next) => {
    next(new ApiError(`Route ${req.originalUrl} not found on this server`, 404));
});

// 5. Global Error Handling Middleware (must be mounted last)
app.use(errorHandler);

export default app;