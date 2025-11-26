const express = require('express');
const { getAllStudents, getStudentById, updateStudent } = require('../controllers/studentController');
const { verifyToken } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer configuration for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Student routes - require authentication
router.get('/', verifyToken, getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.put('/:id', verifyToken, upload.single('profile_image'), updateStudent);

module.exports = router;
