
import Project from "../models/Project.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/projects
export const getProjects = async (req, res, next) => {
    try {
        // Populates the owner user's basic profile
        const projects = await Project.find().populate("userId", "name email");

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate("userId", "name email");

        if (!project) {
            throw new ApiError(`Project with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/projects
export const createProject = async (req, res, next) => {
    try {
        const { title, description, status, progress, userId } = req.body;

        const newProject = await Project.create({
            title: title.trim(),
            description: description || "",
            status: status || "Planning",
            progress: progress || 0,
            userId,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: newProject,
        });
    } catch (error) {
        next(error);
    }
};