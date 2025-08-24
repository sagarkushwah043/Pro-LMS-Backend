import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import coursesRouter from "./routes/courseRoutes.js";
import enrollmentsRouter from "./routes/enrollmentRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",      // Vite local frontend
  "http://localhost:3000",      // CRA local frontend
  "https://pro-lms-frontend.vercel.app" // deployed frontend
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ API Routes
app.use("/api/courses", coursesRouter);
app.use("/api/enrollments", enrollmentsRouter);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Pro-LMS API is running...");
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
