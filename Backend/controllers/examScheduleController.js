const { pool } = require('../config/database');

// ======================== Get All Exam Schedules ========================
const getAllExamSchedules = async (req, res) => {
  try {
    const [schedules] = await pool.execute(`
      SELECT es.*,
             s.name AS subject_name,
             c.name AS class_name,
             c.class_number
      FROM tbl_exam_schedules es
      LEFT JOIN tbl_subjects s ON es.subject_id = s.id
      LEFT JOIN tbl_classes c ON es.class_id = c.id
      ORDER BY es.date ASC, es.time ASC
    `);

    res.status(200).json(schedules);
  } catch (error) {
    console.error('Get Exam Schedules Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Add Exam Schedule ========================
const addExamSchedule = async (req, res) => {
  const { subject_id, class_id, date, time, duration, room_no, total_marks, required_marks } = req.body;

  try {
    // Validate required fields
    if (!subject_id || !class_id || !date || !time || !duration || !room_no || !total_marks || !required_marks) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if subject exists
    const [subject] = await pool.execute('SELECT id FROM tbl_subjects WHERE id = ?', [subject_id]);
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Check if class exists
    const [classExists] = await pool.execute('SELECT id FROM tbl_classes WHERE id = ?', [class_id]);
    if (classExists.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check for duplicate schedule (same subject, class, date)
    const [existing] = await pool.execute(
      'SELECT id FROM tbl_exam_schedules WHERE subject_id = ? AND class_id = ? AND date = ?',
      [subject_id, class_id, date]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Exam schedule already exists for this subject, class, and date' });
    }

    // Insert exam schedule
    const [result] = await pool.execute(
      'INSERT INTO tbl_exam_schedules (subject_id, class_id, date, time, duration, room_no, total_marks, required_marks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [subject_id, class_id, date, time, duration, room_no, total_marks, required_marks]
    );

    res.status(201).json({ message: 'Exam schedule created successfully', id: result.insertId });
  } catch (error) {
    console.error('Add Exam Schedule Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Update Exam Schedule ========================
const updateExamSchedule = async (req, res) => {
  const { id } = req.params;
  const { subject_id, class_id, date, time, duration, room_no, total_marks, required_marks } = req.body;

  try {
    // Check if schedule exists
    const [schedule] = await pool.execute('SELECT * FROM tbl_exam_schedules WHERE id = ?', [id]);
    if (schedule.length === 0) {
      return res.status(404).json({ message: 'Exam schedule not found' });
    }

    // Validate required fields
    if (!subject_id || !class_id || !date || !time || !duration || !room_no || !total_marks || !required_marks) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if subject exists
    const [subject] = await pool.execute('SELECT id FROM tbl_subjects WHERE id = ?', [subject_id]);
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Check if class exists
    const [classExists] = await pool.execute('SELECT id FROM tbl_classes WHERE id = ?', [class_id]);
    if (classExists.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check for duplicate schedule (same subject, class, date) excluding current record
    const [existing] = await pool.execute(
      'SELECT id FROM tbl_exam_schedules WHERE subject_id = ? AND class_id = ? AND date = ? AND id != ?',
      [subject_id, class_id, date, id]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Exam schedule already exists for this subject, class, and date' });
    }

    // Update exam schedule
    await pool.execute(
      'UPDATE tbl_exam_schedules SET subject_id = ?, class_id = ?, date = ?, time = ?, duration = ?, room_no = ?, total_marks = ?, required_marks = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [subject_id, class_id, date, time, duration, room_no, total_marks, required_marks, id]
    );

    res.status(200).json({ message: 'Exam schedule updated successfully' });
  } catch (error) {
    console.error('Update Exam Schedule Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Delete Exam Schedule ========================
const deleteExamSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if schedule exists
    const [schedule] = await pool.execute('SELECT * FROM tbl_exam_schedules WHERE id = ?', [id]);
    if (schedule.length === 0) {
      return res.status(404).json({ message: 'Exam schedule not found' });
    }

    // Delete exam schedule
    await pool.execute('DELETE FROM tbl_exam_schedules WHERE id = ?', [id]);

    res.status(200).json({ message: 'Exam schedule deleted successfully' });
  } catch (error) {
    console.error('Delete Exam Schedule Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllExamSchedules, addExamSchedule, updateExamSchedule, deleteExamSchedule };
