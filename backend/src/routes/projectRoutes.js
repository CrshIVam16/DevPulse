import { Router } from "express";
import { getProjects, getProjectById, createProject } from "../controllers/projectController.js";
import { validateProjectInput } from "../middleware/validate.js";

const router = Router();

// GET /api/projects - Retrieve all projects
router.get("/", getProjects);

// GET /api/projects/:id - Retrieve single project by ID
router.get("/:id", getProjectById);

// POST /api/projects - Create a new project (validated)
router.post("/", validateProjectInput, createProject);

export default router;