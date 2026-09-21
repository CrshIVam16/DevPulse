import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../middleware/errorHandler.js";

// Helper: Sign JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

// POST /api/auth/register
export const register = async (req, res, next) => {
    try {
        // 1. Destructure all fields cleanly from req.body
        const { name, email, password, role, avatarUrl } = req.body;

        if (!name || !email || !password) {
            throw new ApiError("Please provide name, email, and password", 400);
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new ApiError("User with this email already exists", 400);
        }

        // 2. Fall back to a default avatar if avatarUrl is empty or not provided
        const defaultAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100";

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            role: role?.trim() || "Full Stack Intern",
            avatarUrl: avatarUrl || defaultAvatar,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError("Please provide email and password", 400);
        }

        // Explicitly select password since it has select: false on schema
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiError("Invalid email or password", 401);
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new ApiError("Invalid email or password", 401);
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                productivityScore: user.productivityScore,
                avatarUrl: user.avatarUrl,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/auth/me (Get current authenticated user)
export const getMe = async (req, res, next) => {
    try {
        // req.user is set by authMiddleware
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};