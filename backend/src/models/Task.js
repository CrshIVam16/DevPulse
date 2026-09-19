import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: {
                values: ["todo", "in-progress", "done"],
                message: "Status must be either todo, in-progress, or done",
            },
            default: "todo",
            lowercase: true,
        },
        priority: {
            type: String,
            enum: {
                values: ["Low", "Medium", "High"],
                message: "Priority must be Low, Medium, or High",
            },
            default: "Medium",
        },
        dueDate: {
            type: String,
            default: () => new Date().toISOString().split("T")[0],
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Task must belong to a Project"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Task must be assigned to a User"],
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;