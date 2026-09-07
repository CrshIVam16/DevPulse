import { projects } from "../data/store.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/projects
export const getProjects = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/projects/:id
export const getProjectById = (req, res, next) => {
    try {
        const { id } = req.params;
        const project = projects.find((p) => p.id === id);

        if (!project) {
            throw new ApiError(`Project with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/projects
export const createProject = (req, res, next) => {
    try {
        const { title, description, status = "Planning", userId = "user-1" } = req.body;

        const newProject = {
            id: `proj-${Date.now()}`,
            title: title.trim(),
            description: description || "",
            status,
            userId
        };

        projects.push(newProject);

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: newProject
        });
    } catch (error) {
        next(error);
    }
};