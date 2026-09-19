import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // 1. Clear existing database collections
        await User.deleteMany();
        await Project.deleteMany();
        await Task.deleteMany();
        console.log("🧹 Previous collections cleared...");

        // 2. Create Primary User
        const primaryUser = await User.create({
            name: "Alex",
            email: "alex@devpulse.io",
            role: "Full Stack Intern",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            productivityScore: 70,
        });
        console.log(`👤 User created: ${primaryUser.name} (${primaryUser._id})`);

        // 3. Create Projects linked to Alex
        const projects = await Project.insertMany([
            {
                title: "E-Commerce API",
                description: "Node.js backend with Stripe integration",
                status: "Active",
                progress: 75,
                userId: primaryUser._id,
            },
            {
                title: "Dashboard UI Redux",
                description: "React components & Tailwind styling",
                status: "Planning",
                progress: 30,
                userId: primaryUser._id,
            },
            {
                title: "AI Integration Engine",
                description: "Microservice for prompt generation and task automation",
                status: "Active",
                progress: 50,
                userId: primaryUser._id,
            },
        ]);
        console.log(`🚀 ${projects.length} Projects created...`);

        // 4. Create Tasks linked to Alex and specific Projects
        await Task.insertMany([
            {
                title: "Implement OAuth2 Authentication Flow",
                status: "in-progress",
                priority: "High",
                dueDate: "2026-10-25",
                projectId: projects[0]._id,
                userId: primaryUser._id,
            },
            {
                title: "Optimize Database Queries for Products Endpoint",
                status: "todo",
                priority: "Medium",
                dueDate: "2026-10-26",
                projectId: projects[0]._id,
                userId: primaryUser._id,
            },
            {
                title: "Setup MongoDB Schema and Indexes",
                status: "todo",
                priority: "High",
                dueDate: "2026-10-27",
                projectId: projects[1]._id,
                userId: primaryUser._id,
            },
            {
                title: "Build Reusable UI Loading Skeletons",
                status: "in-progress",
                priority: "Medium",
                dueDate: "2026-10-28",
                projectId: projects[1]._id,
                userId: primaryUser._id,
            },
            {
                title: "Configure Tailwind Typography and Color Palette",
                status: "done",
                priority: "Low",
                dueDate: "2026-10-22",
                projectId: projects[2]._id,
                userId: primaryUser._id,
            },
        ]);
        console.log("⚡ 5 Tasks created successfully with valid relations!");

        console.log("🌱 Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error(`❌ Seeder Failed: ${error.message}`);
        process.exit(1);
    }
};

seedData();