import { Router } from "express";
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject); // Mount project update route
router.delete("/:id", deleteProject);

export default router;