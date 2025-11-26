const express = require('express');
const router = express.Router();
const { getAllExamSchedules, addExamSchedule, updateExamSchedule, deleteExamSchedule } = require('../controllers/examScheduleController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all exam schedules
router.get('/', verifyToken, getAllExamSchedules);

// Create new exam schedule
router.post('/add', verifyToken, checkRole(['admin', 'teacher']), addExamSchedule);

// Update exam schedule
router.put('/update/:id', verifyToken, checkRole(['admin', 'teacher']), updateExamSchedule);

// Delete exam schedule
router.delete('/delete/:id', verifyToken, checkRole(['admin', 'teacher']), deleteExamSchedule);

module.exports = router;
