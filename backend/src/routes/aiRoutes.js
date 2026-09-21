import { Router } from "express";
import { generateProjectTasks } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/ai/generate-tasks (JWT protected)
router.post("/generate-tasks", protect, generateProjectTasks);

export default router;