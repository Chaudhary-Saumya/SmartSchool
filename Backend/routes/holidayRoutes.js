const express = require('express');
const { addHoliday, getAllHolidays, updateHoliday, deleteHoliday } = require('../controllers/holidayController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Only Admin & Teacher can create/update/delete holidays
router.post('/add', verifyToken, checkRole(['admin', 'teacher']), addHoliday);
router.put('/update/:id', verifyToken, checkRole(['admin', 'teacher']), updateHoliday);
router.delete('/delete/:id', verifyToken, checkRole(['admin', 'teacher']), deleteHoliday);

// All logged-in users can view holidays
router.get('/', verifyToken, getAllHolidays);

module.exports = router;
