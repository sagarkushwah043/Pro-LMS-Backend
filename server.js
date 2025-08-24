// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import coursesRouter from "./routes/courseRoutes.js";
import enrollmentsRouter from "./routes/enrollmentRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/courses", coursesRouter);
app.use("/api/enrollments", enrollmentsRouter);

// Health check (optional)
app.get("/", (req, res) => {
  res.send("✅ Pro-LMS API is running...");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
