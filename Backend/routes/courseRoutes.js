const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth.verifyToken);

// =======================
// 📚 Course CRUD Routes
// =======================
router.get('/', courseController.getAllCourses); // Get all courses
router.get('/:id', courseController.getCourseById); // Get course by ID

// Add new course with image upload
router.post(
  '/',
  courseController.upload.single('course_image'),
  courseController.addCourse
);

// Update course with optional image upload
router.put(
  '/:id',
  courseController.upload.single('course_image'),
  courseController.updateCourse
);

// Delete course
router.delete('/:id', courseController.deleteCourse);

// =======================
// 🔧 Helper Routes
// =======================
router.get('/helpers/teachers', courseController.getTeachers);
router.get('/helpers/categories', courseController.getCourseCategories);

module.exports = router;
