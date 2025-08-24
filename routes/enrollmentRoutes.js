import express from "express";
import { enrollCourse, unenrollCourse, getEnrolledCourses } from "../controllers/enrollmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // 👈 import middleware

const router = express.Router();

// Protect all routes with authMiddleware
router.post("/", authMiddleware, enrollCourse);
router.delete("/:id", authMiddleware, unenrollCourse);
router.get("/", authMiddleware, getEnrolledCourses);

export default router;
