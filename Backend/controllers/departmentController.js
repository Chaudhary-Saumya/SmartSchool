const pool = require('../config/database');

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const [departments] = await pool.execute(`
      SELECT d.*, u.name as created_by_name
      FROM tbl_departments d
      LEFT JOIN tbl_users u ON d.created_by = u.id
      ORDER BY d.created_at DESC
    `);

    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
};

// Add new department
const addDepartment = async (req, res) => {
  try {
    const {
      name,
      head_of_department,
      phone,
      email,
      start_date,
      student_capacity,
      details,
      building_name,
      number_of_classrooms,
      website
    } = req.body;

    // Validate required fields
    if (!name || !head_of_department || !phone || !email || !start_date ||
        !student_capacity || !building_name || !number_of_classrooms) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if department name already exists
    const [existing] = await pool.execute(
      'SELECT id FROM tbl_departments WHERE name = ?',
      [name]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Department name already exists' });
    }

    // Check if email already exists
    const [existingEmail] = await pool.execute(
      'SELECT id FROM tbl_departments WHERE email = ?',
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Insert new department
    const [result] = await pool.execute(`
      INSERT INTO tbl_departments (
        name, head_of_department, phone, email, start_date, student_capacity,
        details, building_name, number_of_classrooms, website, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, head_of_department, phone, email, start_date, student_capacity,
      details || null, building_name, number_of_classrooms, website || null, req.user.id
    ]);

    res.status(201).json({
      message: 'Department added successfully',
      departmentId: result.insertId
    });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ message: 'Error adding department' });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      head_of_department,
      phone,
      email,
      start_date,
      student_capacity,
      details,
      building_name,
      number_of_classrooms,
      website
    } = req.body;

    // Validate required fields
    if (!name || !head_of_department || !phone || !email || !start_date ||
        !student_capacity || !building_name || !number_of_classrooms) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if department exists
    const [existing] = await pool.execute(
      'SELECT id FROM tbl_departments WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Check if name already exists (excluding current department)
    const [nameCheck] = await pool.execute(
      'SELECT id FROM tbl_departments WHERE name = ? AND id != ?',
      [name, id]
    );

    if (nameCheck.length > 0) {
      return res.status(400).json({ message: 'Department name already exists' });
    }

    // Check if email already exists (excluding current department)
    const [emailCheck] = await pool.execute(
      'SELECT id FROM tbl_departments WHERE email = ? AND id != ?',
      [email, id]
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Update department
    await pool.execute(`
      UPDATE tbl_departments SET
        name = ?, head_of_department = ?, phone = ?, email = ?, start_date = ?,
        student_capacity = ?, details = ?, building_name = ?, number_of_classrooms = ?,
        website = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      name, head_of_department, phone, email, start_date, student_capacity,
      details || null, building_name, number_of_classrooms, website || null, id
    ]);

    res.json({ message: 'Department updated successfully' });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Error updating department' });
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if department exists
    const [existing] = await pool.execute(
      'SELECT id FROM tbl_departments WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Delete department
    await pool.execute('DELETE FROM tbl_departments WHERE id = ?', [id]);

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Error deleting department' });
  }
};

module.exports = {
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment
};
