const express = require('express');
const {
  getAllClasses,
  addStudentToClass,
  removeStudentFromClass,
  getStudentsInClass,
  getStudentClasses,
  getAllStudents
} = require('../controllers/classController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// All authenticated users can view classes
router.get('/', verifyToken, getAllClasses);

// Admin/Teacher can manage student-class assignments
router.post('/add-student', verifyToken, checkRole(['admin', 'teacher']), addStudentToClass);
router.post('/remove-student', verifyToken, checkRole(['admin', 'teacher']), removeStudentFromClass);

// View students in a class (authenticated users)
router.get('/:class_id/students', verifyToken, getStudentsInClass);

// Students can view their own classes, others can view all students
router.get('/my-classes', verifyToken, getStudentClasses);
router.get('/all-students', verifyToken, getAllStudents);

module.exports = router;
