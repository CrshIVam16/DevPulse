import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables from .env
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 DevPulse API running on port ${PORT}`);
    console.log(`📡 Base URL: http://localhost:${PORT}/api`);
    console.log(`🛠️  Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`=================================`);
});