import { ApiError } from "./errorHandler.js";

// Validates incoming POST/PUT request bodies
export const validateTaskInput = (req, res, next) => {
  const { title, status, priority, projectId } = req.body;

  // Check required fields on creation
  if (req.method === "POST") {
    if (!title || typeof title !== "string" || !title.trim()) {
      return next(new ApiError("Validation Error: Task 'title' is required and must be a string", 400));
    }
    if (!projectId) {
      return next(new ApiError("Validation Error: 'projectId' is required", 400));
    }
  }

  // Validate allowed enum values if present
  const validStatuses = ["todo", "in-progress", "done"];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    return next(new ApiError(`Validation Error: Status must be one of: ${validStatuses.join(", ")}`, 400));
  }

  const validPriorities = ["Low", "Medium", "High"];
  if (priority && !validPriorities.includes(priority)) {
    return next(new ApiError(`Validation Error: Priority must be one of: ${validPriorities.join(", ")}`, 400));
  }

  next();
};

export const validateProjectInput = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return next(new ApiError("Validation Error: Project 'title' is required", 400));
  }
  next();
};