import Task from "../models/Task.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/tasks (Scoped to authenticated user with query filters)
export const getTasks = async (req, res, next) => {
    try {
        const { status, priority, projectId } = req.query;

        const filter = { userId: req.user._id };

        if (status && status !== "all") filter.status = status.toLowerCase();
        if (priority && priority !== "all") filter.priority = priority;
        if (projectId) filter.projectId = projectId;

        const tasks = await Task.find(filter)
            .populate("projectId", "title status")
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/tasks
export const createTask = async (req, res, next) => {
    try {
        const { title, projectId, priority, dueDate, status } = req.body;

        if (!title || !title.trim()) {
            throw new ApiError("Task title is required", 400);
        }
        if (!projectId) {
            throw new ApiError("Task must be assigned to a valid Project ID", 400);
        }

        const task = await Task.create({
            title: title.trim(),
            projectId,
            userId: req.user._id,
            priority: priority || "Medium",
            status: status ? status.toLowerCase() : "todo",
            dueDate: dueDate || new Date().toISOString().split("T")[0],
        });

        const populatedTask = await Task.findById(task._id).populate(
            "projectId",
            "title status"
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: populatedTask,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        ).populate("projectId", "title status");

        if (!task) {
            throw new ApiError(`Task with ID '${id}' not found or unauthorized`, 404);
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if (!task) {
            throw new ApiError(`Task with ID '${id}' not found or unauthorized`, 404);
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: { id },
        });
    } catch (error) {
        next(error);
    }
};