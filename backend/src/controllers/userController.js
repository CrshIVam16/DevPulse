
import User from "../models/User.js";
import { ApiError } from "../middleware/errorHandler.js";

// GET /api/users/:id
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            throw new ApiError(`User with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/users/:id
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, role, productivityScore } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                ...(name && { name: name.trim() }),
                ...(role && { role: role.trim() }),
                ...(productivityScore !== undefined && { productivityScore }),
            },
            { new: true, runValidators: true } // Returns updated doc & runs schema checks
        );

        if (!updatedUser) {
            throw new ApiError(`User with ID '${id}' not found`, 404);
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};