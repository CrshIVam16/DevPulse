import { users } from "../data/store.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/users/:id
export const getUserById = (req, res, next) => {
    try {
        const { id } = req.params;
        const user = users.find((u) => u.id === id);

        if (!user) {
            throw new ApiError(`User with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/users/:id
export const updateUser = (req, res, next) => {
    try {
        const { id } = req.params;
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
            throw new ApiError(`User with ID '${id}' not found`, 404);
        }

        const { name, role, productivityScore } = req.body;
        users[userIndex] = {
            ...users[userIndex],
            ...(name && { name }),
            ...(role && { role }),
            ...(productivityScore !== undefined && { productivityScore })
        };

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: users[userIndex]
        });
    } catch (error) {
        next(error);
    }
};