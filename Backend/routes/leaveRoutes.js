const express = require('express');
const { applyLeave, getAllLeaves, approveLeave, rejectLeave } = require('../controllers/leaveController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Students and Teachers can apply for leave
router.post('/apply', verifyToken, checkRole(['student', 'teacher']), applyLeave);

// Admins and Teachers can view all leaves
router.get('/', verifyToken, checkRole(['admin', 'teacher']), getAllLeaves);

// Admins and Teachers can approve/reject leaves
router.put('/approve/:id', verifyToken, checkRole(['admin', 'teacher']), approveLeave);
router.put('/reject/:id', verifyToken, checkRole(['admin', 'teacher']), rejectLeave);

module.exports = router;