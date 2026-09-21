import fs from "fs";
import path from "path";
import OpenAI from "openai";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { ApiError } from "../middleware/errorHandler.js";

const getInceptionKey = () => {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      const match = envContent.match(/INCEPTION_API_KEY\s*=\s*([^\r\n]+)/);
      if (match && match[1]) {
        return match[1].replace(/['"\s]/g, "");
      }
    }
  } catch (err) {
    console.warn("Direct .env read warning:", err.message);
  }
  return (process.env.INCEPTION_API_KEY || "").replace(/['"\s]/g, "");
};

const getOpenAIClient = () => {
  const apiKey = getInceptionKey();
  if (!apiKey) {
    throw new ApiError("INCEPTION_API_KEY is missing from backend/.env", 500);
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://api.inceptionlabs.ai/v1",
  });
};

export const generateProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    const userId = req.user._id;

    if (!projectId) {
      throw new ApiError("Project ID is required", 400);
    }

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      throw new ApiError("Project not found or unauthorized", 404);
    }

    const client = getOpenAIClient();

    const systemPrompt = `You are a Senior Technical Architect. Decompose the software project into 3 to 4 actionable, prioritized subtasks.
Respond ONLY with a valid JSON array of objects without backticks, code blocks, or markdown commentary.
Schema:
[
  {
    "title": "Clear concise task name",
    "priority": "High" | "Medium" | "Low",
    "daysFromNow": 3
  }
]`;

    const userPrompt = `Project Title: ${project.title}\nDescription: ${project.description || "General software development sprint"}`;

    const completion = await client.chat.completions.create({
      model: "mercury-2",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 600,
    });

    let rawText = completion.choices?.[0]?.message?.content || "[]";
    rawText = rawText.replace(/```json/gi, "").replace(/```/gi, "").trim();

    let parsedTasks = [];
    try {
      parsedTasks = JSON.parse(rawText);
    } catch {
      console.error("[PARSE ERROR] Output was not JSON:", rawText);
      throw new ApiError("AI response was not valid JSON", 502);
    }

    const now = new Date();
    const taskDocs = parsedTasks.map((t) => {
      const dueDate = new Date(now);
      dueDate.setDate(dueDate.getDate() + (t.daysFromNow || 3));

      return {
        title: t.title?.trim() || "Generated Subtask",
        projectId: project._id,
        userId: userId,
        priority: ["High", "Medium", "Low"].includes(t.priority) ? t.priority : "Medium",
        status: "todo",
        dueDate: dueDate.toISOString().split("T")[0],
      };
    });

    const inserted = await Task.insertMany(taskDocs);

    // Populate projectId with title so the frontend immediately receives the project name
    const populatedTasks = await Task.find({
      _id: { $in: inserted.map((doc) => doc._id) },
    }).populate("projectId", "title");

    res.status(201).json({
      success: true,
      message: `Generated and persisted ${populatedTasks.length} tasks successfully`,
      data: populatedTasks,
    });
  } catch (error) {
    next(error);
  }
};