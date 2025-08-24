import { readJSON } from "../utils/fileHandler.js";

export const getCourses = (req, res) => {
  const courses = readJSON("courses.json");
  const { page = 1, limit = 6, level, category, search, sort } = req.query;

  let filtered = [...courses];

  if (level) filtered = filtered.filter(c => c.level === level);
  if (category) filtered = filtered.filter(c => c.category === category);
  if (search) filtered = filtered.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "createdAt") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));

  res.json({ data: paginated, page: Number(page), limit: Number(limit), total });
};

export const getCourseById = (req, res) => {
  const courses = readJSON("courses.json");
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
};
