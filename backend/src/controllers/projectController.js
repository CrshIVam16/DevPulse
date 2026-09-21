import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/projects (Scoped to authenticated user)
export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ userId: req.user._id })
            .populate("userId", "name email")
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/projects/:id (Must belong to user)
export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({
            _id: id,
            userId: req.user._id,
        }).populate("userId", "name email");

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
        const { title, description, status } = req.body;

        if (!title || !title.trim()) {
            throw new ApiError("Project title is required", 400);
        }

        const project = await Project.create({
            title: title.trim(),
            description: description?.trim() || "",
            status: status || "Active",
            userId: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/projects/:id (Cascades deletion to tasks)
export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!project) {
            throw new ApiError(`Project with ID '${id}' not found or unauthorized`, 404);
        }

        // Clean up all tasks linked to this project
        await Task.deleteMany({ projectId: id, userId: req.user._id });

        res.status(200).json({
            success: true,
            message: "Project and linked tasks deleted successfully",
            data: { id },
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/projects/:id (Update project details)
export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const project = await Project.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            {
                ...(title && { title: title.trim() }),
                ...(description !== undefined && { description: description.trim() }),
                ...(status && { status }),
            },
            { new: true, runValidators: true }
        );

        if (!project) {
            throw new ApiError(`Project with ID '${id}' not found or unauthorized`, 404);
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    } catch (error) {
        next(error);
    }
};