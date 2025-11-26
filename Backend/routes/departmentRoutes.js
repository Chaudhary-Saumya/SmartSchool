const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

// Get all departments
router.get('/', verifyToken, getAllDepartments);

// Add new department
router.post('/add', addDepartment); // Temporarily removed for testing

// Update department
router.put('/update/:id', verifyToken, updateDepartment);

// Delete department
router.delete('/delete/:id', verifyToken, deleteDepartment);

module.exports = router;
