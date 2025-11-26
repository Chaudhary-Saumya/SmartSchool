const { pool } = require('../config/database');

// Helper function to calculate total days
const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including start date
  return diffDays;
};

// ======================== Apply for Leave ========================
const applyLeave = async (req, res) => {
  const { leave_type, start_date, end_date, reason } = req.body;
  const student_id = req.user.id; // From JWT decoded data
  const createdBy = req.user.id;

  try {
    if (!leave_type || !start_date || !end_date) {
      return res.status(400).json({ message: 'Leave type, start date, and end date are required' });
    }

    const total_days = calculateTotalDays(start_date, end_date);

    await pool.execute(
      'INSERT INTO tbl_leaves (student_id, leave_type, start_date, end_date, reason, total_days, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [student_id, leave_type, start_date, end_date, reason, total_days, createdBy]
    );

    res.status(201).json({ message: 'Leave application submitted successfully' });
  } catch (error) {
    console.error('Apply Leave Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get All Leaves ========================
const getAllLeaves = async (req, res) => {
  try {
    const [leaves] = await pool.execute(`
      SELECT l.*,
             u1.name AS student_name,
             u2.name AS created_by_name,
             u3.name AS updated_by_name
      FROM tbl_leaves l
      LEFT JOIN tbl_users u1 ON l.student_id = u1.id
      LEFT JOIN tbl_users u2 ON l.created_by = u2.id
      LEFT JOIN tbl_users u3 ON l.updated_by = u3.id
      ORDER BY l.created_at DESC
    `);

    res.status(200).json(leaves);
  } catch (error) {
    console.error('Get Leaves Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Approve Leave ========================
const approveLeave = async (req, res) => {
  const { id } = req.params;
  const updatedBy = req.user.id;

  try {
    const [leave] = await pool.execute('SELECT * FROM tbl_leaves WHERE id = ?', [id]);
    if (leave.length === 0) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    // Check if user can approve this leave
    if (req.user.role === 'teacher' && leave[0].student_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only approve your own leave requests' });
    }

    await pool.execute(
      'UPDATE tbl_leaves SET status = ?, updated_by = ? WHERE id = ?',
      ['approved', updatedBy, id]
    );

    res.status(200).json({ message: 'Leave approved successfully' });
  } catch (error) {
    console.error('Approve Leave Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Reject Leave ========================
const rejectLeave = async (req, res) => {
  const { id } = req.params;
  const { rejection_reason } = req.body;
  const updatedBy = req.user.id;

  try {
    const [leave] = await pool.execute('SELECT * FROM tbl_leaves WHERE id = ?', [id]);
    if (leave.length === 0) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    await pool.execute(
      'UPDATE tbl_leaves SET status = ?, rejection_reason = ?, updated_by = ? WHERE id = ?',
      ['rejected', rejection_reason, updatedBy, id]
    );

    res.status(200).json({ message: 'Leave rejected successfully' });
  } catch (error) {
    console.error('Reject Leave Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyLeave, getAllLeaves, approveLeave, rejectLeave };
