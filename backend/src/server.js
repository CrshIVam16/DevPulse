
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

// 1. Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// 2. Connect to Database then start Server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 DevPulse API running on port ${PORT}`);
    console.log(`📡 Base URL: http://localhost:${PORT}/api`);
    console.log(`🛠️  Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`=================================`);
  });
};

startServer();