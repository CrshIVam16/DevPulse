import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            maxlength: [100, "Project title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        status: {
            type: String,
            enum: {
                values: ["Planning", "Active", "Completed"],
                message: "Status must be either Planning, Active, or Completed",
            },
            default: "Planning",
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Project must belong to a User"],
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;