import { Router } from "express";
import { getUserById, updateUser } from "../controllers/userController.js";

const router = Router();

// GET /api/users/:id - Fetch user profile & productivity score
router.get("/:id", getUserById);

// PATCH /api/users/:id - Update user details
router.patch("/:id", updateUser);

export default router;