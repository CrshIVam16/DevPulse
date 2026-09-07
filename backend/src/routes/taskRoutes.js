import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { validateTaskInput } from "../middleware/validate.js";

const router = Router();

// GET /api/tasks - List all tasks (supports query filtering by ?status, ?priority, ?projectId)
router.get("/", getTasks);

// POST /api/tasks - Create a new task (validated)
router.post("/", validateTaskInput, createTask);

// PUT /api/tasks/:id - Update task details & handle status changes (validated)
router.put("/:id", validateTaskInput, updateTask);

// DELETE /api/tasks/:id - Delete a task by ID
router.delete("/:id", deleteTask);

export default router;