import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        role: {
            type: String,
            default: "Full Stack Intern",
            trim: true,
        },
        avatarUrl: {
            type: String,
            default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        },
        productivityScore: {
            type: Number,
            default: 0,
            min: [0, "Productivity score cannot be below 0"],
            max: [100, "Productivity score cannot exceed 100"],
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

const User = mongoose.model("User", userSchema);
export default User;