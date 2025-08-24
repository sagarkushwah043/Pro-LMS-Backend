# 🖥️ Mini LMS Backend (Node + Express)

This is the backend API for **Mini LMS: Course Catalog + Enrollment (MERN-lite)**.  
It provides REST endpoints for browsing courses and managing enrollments.  
Data is stored in local JSON files (`courses.json`, `enrollments.json`) for simplicity.

---

## 🚀 Features
- Node.js + Express API
- Courses API with pagination, search, filters, and sorting
- Enrollment API (enroll / unenroll)
- Middleware for token authentication
- Error handling middleware (400/401/404/409 responses)
- JSON file data layer (atomic read/write)

---

## 📂 Folder Structure

/api
│── server.js # Express server entry point
│── package.json
│── .env # Environment variables (PORT, FAKE_TOKEN)
│
├── /data # JSON "database"
│ ├── courses.json # Seeded course data (15–25 records)
│ └── enrollments.json # Starts empty
│
├── /routes # API route definitions
│ ├── courses.js
│ └── enrollments.js
│
├── /controllers # Business logic
│ ├── courseController.js
│ └── enrollmentController.js
│
├── /middleware # Middleware utilities
│ ├── authMiddleware.js # Token validation
│ └── errorMiddleware.js # Error handler
│
└── /utils # Helper functions
├── fileHandler.js # JSON read/write
└── validators.js # Input validation

## ⚙️ Setup Instructions

1️⃣ Install Dependencies
```bash
cd api
npm install

2️⃣ Create .env file

PORT=4000
FAKE_TOKEN=student-demo-token
NODE_ENV=development


3️⃣ Run Server

npm run dev

API will be available at:
👉 http://localhost:4000



📌 API Endpoints
🔑 Authentication

All routes require the header:

Authorization: Bearer student-demo-token

📚 Courses

GET /api/courses
Query params: page, limit, level, category, search, sort
Example:

GET /api/courses?page=1&limit=6&level=beginner&search=javascript

GET /api/courses/:id
Get single course by ID.

(Optional) POST /api/courses
Add a new course (basic validation).

(Optional) PUT /api/courses/:id
Update course details.

🎓 Enrollments

POST /api/enrollments

{ "courseId": "c_101" }
→ Enrolls student in the course.

DELETE /api/enrollments/:id
Unenroll from a course.

🧪 Example Responses
Success (GET /api/courses)
{
  "data": [
    { "id": "c_101", "title": "JS Basics", "level": "beginner", "category": "programming", "enrolled": false }
  ],
  "page": 1,
  "limit": 6,
  "total": 14
}

Success (POST /api/enrollments)
{
  "message": "Enrolled",
  "enrollmentId": "e_555",
  "courseId": "c_101"
}

Validation Error
{ "error": "courseId is required" }
