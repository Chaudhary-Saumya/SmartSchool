const { pool } = require('../config/database');

// ======================== Add Lecture ========================
const addLecture = async (req, res) => {
  const { subject_id, class_id, date, time, duration, location, status } = req.body;
  const createdBy = req.user.id; // From JWT decoded data

  try {
    // Validate required fields
    if (!subject_id || !class_id || !date || !time || !duration) {
      return res.status(400).json({
        message: 'Subject ID, class ID, date, time, and duration are required'
      });
    }

    // Validate and parse duration as integer
    const parsedDuration = parseInt(duration, 10);
    if (isNaN(parsedDuration) || parsedDuration <= 0) {
      return res.status(400).json({
        message: 'Duration must be a positive integer (minutes)'
      });
    }

    // Validate subject exists
    const [subject] = await pool.execute('SELECT id FROM tbl_subjects WHERE id = ?', [subject_id]);
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Validate class exists
    const [classExists] = await pool.execute('SELECT id FROM tbl_classes WHERE id = ?', [class_id]);
    if (classExists.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Validate status
    const validStatuses = ['confirmed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be either "confirmed" or "cancelled"'
      });
    }

    // Insert lecture
    const [result] = await pool.execute(
      `INSERT INTO tbl_lectures
       (subject_id, class_id, date, time, duration, location, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [subject_id, class_id, date, time, parsedDuration, location || null, status || 'confirmed', createdBy]
    );

    res.status(201).json({
      message: 'Lecture added successfully',
      lectureId: result.insertId
    });
  } catch (error) {
    console.error('Add Lecture Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get All Lectures ========================
const getAllLectures = async (req, res) => {
  try {
    const [lectures] = await pool.execute(`
      SELECT l.*,
             s.name AS subject_name,
             s.description AS subject_description,
             c.name AS class_name,
             c.class_number,
             u.name AS created_by_name
      FROM tbl_lectures l
      JOIN tbl_subjects s ON l.subject_id = s.id
      JOIN tbl_classes c ON l.class_id = c.id
      JOIN tbl_users u ON l.created_by = u.id
      ORDER BY l.date DESC, l.time DESC
    `);

    res.status(200).json(lectures);
  } catch (error) {
    console.error('Get Lectures Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get Lectures by Class ========================
const getLecturesByClass = async (req, res) => {
  const { class_id } = req.params;
  const studentId = req.user.id; // From JWT

  try {
    // Check if user is student and enrolled in this class
    const [enrollment] = await pool.execute(
      'SELECT * FROM tbl_student_classes WHERE student_id = ? AND class_id = ?',
      [studentId, class_id]
    );

    if (req.user.role === 'student' && enrollment.length === 0) {
      return res.status(403).json({ message: 'Access denied. You are not enrolled in this class.' });
    }

    const [lectures] = await pool.execute(`
      SELECT l.*,
             s.name AS subject_name,
             s.description AS subject_description,
             c.name AS class_name,
             c.class_number,
             u.name AS created_by_name
      FROM tbl_lectures l
      JOIN tbl_subjects s ON l.subject_id = s.id
      JOIN tbl_classes c ON l.class_id = c.id
      JOIN tbl_users u ON l.created_by = u.id
      WHERE l.class_id = ?
      ORDER BY l.date DESC, l.time DESC
    `, [class_id]);

    res.status(200).json(lectures);
  } catch (error) {
    console.error('Get Lectures by Class Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Update Lecture ========================
const updateLecture = async (req, res) => {
  const { id } = req.params;
  const { subject_id, class_id, date, time, duration, location, status } = req.body;
  const updatedBy = req.user.id;

  try {
    // Check if lecture exists
    const [lecture] = await pool.execute('SELECT * FROM tbl_lectures WHERE id = ?', [id]);
    if (lecture.length === 0) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Validate subject exists if provided
    if (subject_id) {
      const [subject] = await pool.execute('SELECT id FROM tbl_subjects WHERE id = ?', [subject_id]);
      if (subject.length === 0) {
        return res.status(404).json({ message: 'Subject not found' });
      }
    }

    // Validate class exists if provided
    if (class_id) {
      const [classExists] = await pool.execute('SELECT id FROM tbl_classes WHERE id = ?', [class_id]);
      if (classExists.length === 0) {
        return res.status(404).json({ message: 'Class not found' });
      }
    }

    // Validate duration if provided
    let parsedDurationUpdate = undefined;
    if (duration !== undefined && duration !== null) {
      let durationValue;
      if (typeof duration === 'string') {
        const match = duration.match(/(\d+(?:\.\d+)?)/);
        if (match) {
          durationValue = parseFloat(match[1]);
          if (duration.toLowerCase().includes('hour')) {
            durationValue *= 60;
          }
        } else {
          durationValue = parseFloat(duration);
        }
      } else {
        durationValue = parseFloat(duration);
      }

      if (isNaN(durationValue) || durationValue <= 0) {
        return res.status(400).json({
          message: 'Duration must be a positive number (e.g., 90 or "1.5 hours")'
        });
      }
      parsedDurationUpdate = Math.round(durationValue);
    }

    // Validate status if provided
    const validStatuses = ['confirmed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be either "confirmed" or "cancelled"'
      });
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    if (subject_id !== undefined) {
      updateFields.push('subject_id = ?');
      updateValues.push(subject_id);
    }
    if (class_id !== undefined) {
      updateFields.push('class_id = ?');
      updateValues.push(class_id);
    }
    if (date !== undefined) {
      updateFields.push('date = ?');
      updateValues.push(date);
    }
    if (time !== undefined) {
      updateFields.push('time = ?');
      updateValues.push(time);
    }
    if (parsedDurationUpdate !== undefined) {
      updateFields.push('duration = ?');
      updateValues.push(parsedDurationUpdate);
    }
    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    }
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    const updateQuery = `UPDATE tbl_lectures SET ${updateFields.join(', ')} WHERE id = ?`;

    await pool.execute(updateQuery, updateValues);

    res.status(200).json({ message: 'Lecture updated successfully' });
  } catch (error) {
    console.error('Update Lecture Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Delete Lecture ========================
const deleteLecture = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if lecture exists
    const [lecture] = await pool.execute('SELECT * FROM tbl_lectures WHERE id = ?', [id]);
    if (lecture.length === 0) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Delete lecture
    await pool.execute('DELETE FROM tbl_lectures WHERE id = ?', [id]);

    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    console.error('Delete Lecture Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addLecture, getAllLectures, getLecturesByClass, updateLecture, deleteLecture };
