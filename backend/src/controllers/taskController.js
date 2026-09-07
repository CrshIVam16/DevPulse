import { tasks } from "../data/store.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/tasks (Supports query filters: ?status=todo&priority=High&projectId=proj-1)
export const getTasks = (req, res, next) => {
    try {
        const { status, priority, projectId } = req.query;

        let filtered = [...tasks];

        if (status) {
            filtered = filtered.filter((t) => t.status.toLowerCase() === status.toLowerCase());
        }
        if (priority) {
            filtered = filtered.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
        }
        if (projectId) {
            filtered = filtered.filter((t) => t.projectId === projectId);
        }

        res.status(200).json({
            success: true,
            count: filtered.length,
            data: filtered
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/tasks
export const createTask = (req, res, next) => {
    try {
        const { title, projectId, dueDate, priority = "Medium", status = "todo", userId = "user-1" } = req.body;

        const newTask = {
            id: `task-${Date.now()}`,
            title: title.trim(),
            projectId,
            userId,
            dueDate: dueDate || new Date().toISOString().split("T")[0],
            priority,
            status: status.toLowerCase()
        };

        tasks.push(newTask);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask
        });
    } catch (error) {
        next(error);
    }
};

// PUT /api/tasks/:id (Full/Partial update & status management)
export const updateTask = (req, res, next) => {
    try {
        const { id } = req.params;
        const taskIndex = tasks.findIndex((t) => t.id === id);

        if (taskIndex === -1) {
            throw new ApiError(`Task with ID '${id}' not found`, 404);
        }

        const { title, dueDate, priority, status, projectId } = req.body;

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...(title && { title: title.trim() }),
            ...(dueDate && { dueDate }),
            ...(priority && { priority }),
            ...(status && { status: status.toLowerCase() }),
            ...(projectId && { projectId })
        };

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: tasks[taskIndex]
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/tasks/:id
export const deleteTask = (req, res, next) => {
    try {
        const { id } = req.params;
        const taskIndex = tasks.findIndex((t) => t.id === id);

        if (taskIndex === -1) {
            throw new ApiError(`Task with ID '${id}' not found`, 404);
        }

        const removedTask = tasks.splice(taskIndex, 1)[0];

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: removedTask
        });
    } catch (error) {
        next(error);
    }
};