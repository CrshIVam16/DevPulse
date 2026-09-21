import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "./errorHandler.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new ApiError("Not authorized to access this route, token missing", 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to req object
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            throw new ApiError("No user found with this token ID", 401);
        }

        next();
    } catch (error) {
        next(new ApiError(error.message || "Not authorized to access this route", 401));
    }
};