const express = require('express');
const { addSubject, updateSubject, getAllSubjects, getSubjectsByClass, deleteSubject } = require('../controllers/subjectController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Only Admin & Teacher can create/update/delete
router.post('/add', verifyToken, checkRole(['admin', 'teacher']), addSubject);
router.put('/update/:id', verifyToken, checkRole(['admin', 'teacher']), updateSubject);
router.delete('/delete/:id', verifyToken, checkRole(['admin', 'teacher']), deleteSubject);

// All logged-in users can view
router.get('/', verifyToken, getAllSubjects);
router.get('/class/:class_id', verifyToken, getSubjectsByClass);

module.exports = router;
