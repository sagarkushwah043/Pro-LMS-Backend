import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import coursesRouter from "./routes/courseRoutes.js";
import enrollmentsRouter from "./routes/enrollmentRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS setup for local dev and deployed frontend
const allowedOrigins = [
  "https://pro-lms-frontend.vercel.app",
  "https://pro-lms-frontend-bg43.vercel.app", // add this
  "http://localhost:5173"
];


app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman, curl, etc.
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error("CORS policy: This origin is not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/courses", coursesRouter);
app.use("/api/enrollments", enrollmentsRouter);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Pro-LMS API is running...");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
