import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Lock all task routes behind authentication
router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;