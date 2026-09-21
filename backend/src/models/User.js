import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Prevents returning the hash in default find() queries
        },
        role: {
            type: String,
            default: "Full Stack Intern",
            trim: true,
        },
        avatarUrl: {
            type: String,
            default:
                "https://unsplash.com/photos/a-brown-and-white-stuffed-animal-sitting-on-top-of-a-table-QclSoXUTGEo",
        },
        productivityScore: {
            type: Number,
            default: 0,
            min: [0, "Productivity score cannot be below 0"],
            max: [100, "Productivity score cannot exceed 100"],
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook: Hashes password if modified or newly created
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Instance method: Compares user entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;