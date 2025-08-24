import { readJSON, writeJSON } from "../utils/fileHandler.js";

export const enrollCourse = (req, res) => {
  const { courseId } = req.body;
  if (!courseId) return res.status(400).json({ error: "courseId is required" });

  const enrollments = readJSON("enrollments.json");

  // prevent duplicate
  if (enrollments.some(e => e.courseId === courseId && e.userId === "fake-student")) {
    return res.status(409).json({ error: "Already enrolled" });
  }

  const newEnrollment = {
    id: `e_${Date.now()}`,
    userId: "fake-student", // later replace with req.user.id when auth is ready
    courseId,
    createdAt: new Date().toISOString(),
  };

  enrollments.push(newEnrollment);
  writeJSON("enrollments.json", enrollments);

  res.status(201).json({ message: "Enrolled", ...newEnrollment });
};

export const unenrollCourse = (req, res) => {
  const { id } = req.params;
  let enrollments = readJSON("enrollments.json");

  const exists = enrollments.find(e => e.id === id);
  if (!exists) return res.status(404).json({ error: "Enrollment not found" });

  enrollments = enrollments.filter(e => e.id !== id);
  writeJSON("enrollments.json", enrollments);

  res.json({ message: "Unenrolled" });
};

// ✅ New: Get all enrolled courses for a user
export const getEnrolledCourses = (req, res) => {
  const enrollments = readJSON("enrollments.json");
  const courses = readJSON("courses.json"); // assuming you already have courses.json

  // Filter by logged-in user (here fake-student)
  const userEnrollments = enrollments.filter(e => e.userId === "fake-student");

  // Merge course details with enrollment info
  const enriched = userEnrollments.map(e => {
    const course = courses.find(c => c.id === e.courseId);
    return {
      ...e,
      courseTitle: course?.title || "Unknown Course",
      courseDescription: course?.description || "",
      courseImage: course?.image || null,
    };
  });

  res.json(enriched);
};
