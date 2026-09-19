
import Task from "../models/Task.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/tasks (Dynamic database filtering)
export const getTasks = async (req, res, next) => {
    try {
        const { status, priority, projectId } = req.query;

        const filterQuery = {};
        if (status) filterQuery.status = status.toLowerCase();
        if (priority) filterQuery.priority = priority;
        if (projectId) filterQuery.projectId = projectId;

        const tasks = await Task.find(filterQuery)
            .populate("projectId", "title status")
            .populate("userId", "name email");

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
        const { title, projectId, userId, dueDate, priority, status } = req.body;

        const newTask = await Task.create({
            title: title.trim(),
            projectId,
            userId,
            dueDate: dueDate || new Date().toISOString().split("T")[0],
            priority: priority || "Medium",
            status: status ? status.toLowerCase() : "todo",
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask,
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, dueDate, priority, status, projectId } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                ...(title && { title: title.trim() }),
                ...(dueDate && { dueDate }),
                ...(priority && { priority }),
                ...(status && { status: status.toLowerCase() }),
                ...(projectId && { projectId }),
            },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            throw new ApiError(`Task with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            throw new ApiError(`Task with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully from database",
            data: deletedTask,
        });
    } catch (error) {
        next(error);
    }
};