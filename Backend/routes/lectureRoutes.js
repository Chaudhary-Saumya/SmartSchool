const express = require('express');
const { addLecture, getAllLectures, getLecturesByClass, updateLecture, deleteLecture } = require('../controllers/lectureController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Only Admin & Teacher can create/update/delete lectures
router.post('/add', verifyToken, checkRole(['admin', 'teacher']), addLecture);
router.put('/update/:id', verifyToken, checkRole(['admin', 'teacher']), updateLecture);
router.delete('/delete/:id', verifyToken, checkRole(['admin', 'teacher']), deleteLecture);

// All logged-in users can view lectures
router.get('/', verifyToken, getAllLectures);
router.get('/class/:class_id', verifyToken, getLecturesByClass);

module.exports = router;
