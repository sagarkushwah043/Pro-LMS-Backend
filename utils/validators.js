// utils/validators.js

// Allowed values
export const validLevels = ["beginner", "intermediate", "advanced"];
export const validCategories = ["programming", "design", "marketing", "other"];

/**
 * Validate filters passed in query params
 */
export const validateCourseFilters = (query) => {
  const { level, category } = query;

  if (level && !validLevels.includes(level.toLowerCase())) {
    return { valid: false, message: `Invalid level filter: ${level}` };
  }

  if (category && !validCategories.includes(category.toLowerCase())) {
    return { valid: false, message: `Invalid category filter: ${category}` };
  }

  return { valid: true };
};

/**
 * Validate enrollment request body
 */
export const validateEnrollment = (body) => {
  if (!body.courseId || typeof body.courseId !== "string") {
    return { valid: false, message: "courseId is required and must be a string" };
  }

  return { valid: true };
};
