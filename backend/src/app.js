import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { errorHandler, ApiError } from "./middleware/errorHandler.js";

const app = express();

// 1. Global Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Supports Base64 avatars

// 2. Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DevPulse REST API is running healthy",
        timestamp: new Date().toISOString(),
    });
});

// 3. Mount Feature Routers (Task 4 routes)
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// 4. Catch Unhandled Routes (404 Not Found)
app.use((req, res, next) => {
    next(new ApiError(`Route ${req.originalUrl} not found on this server`, 404));
});

// 5. Centralized Error Handling Middleware
app.use(errorHandler);

export default app;