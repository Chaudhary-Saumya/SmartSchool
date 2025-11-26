const { pool } = require('../config/database');

// ======================== Add Subject ========================
const addSubject = async (req, res) => {
  const { name, description, class_ids } = req.body;
  const createdBy = req.user.id; // From JWT decoded data

  try {
    if (!name) {
      return res.status(400).json({ message: 'Subject name is required' });
    }

    // Validate class_ids if provided
    if (class_ids && Array.isArray(class_ids)) {
      for (const classId of class_ids) {
        const [classExists] = await pool.execute('SELECT id FROM tbl_classes WHERE id = ?', [classId]);
        if (classExists.length === 0) {
          return res.status(404).json({ message: `Class with ID ${classId} not found` });
        }
      }
    }

    // Insert subject
    const [result] = await pool.execute(
      'INSERT INTO tbl_subjects (name, description, created_by) VALUES (?, ?, ?)',
      [name, description || null, createdBy]
    );
    const subjectId = result.insertId;

    // Insert subject-class relationships if class_ids provided
    if (class_ids && Array.isArray(class_ids) && class_ids.length > 0) {
      for (const classId of class_ids) {
        await pool.execute(
          'INSERT INTO tbl_subject_classes (subject_id, class_id) VALUES (?, ?)',
          [subjectId, classId]
        );
      }
    }

    res.status(201).json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error('Add Subject Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Update Subject ========================
const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name, description, class_ids } = req.body;
  const updatedBy = req.user.id;

  try {
    const [subject] = await pool.execute('SELECT * FROM tbl_subjects WHERE id = ?', [id]);
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Validate class_ids if provided
    if (class_ids && Array.isArray(class_ids)) {
      for (const classId of class_ids) {
        const [classExists] = await pool.execute('SELECT id FROM tbl_classes WHERE id = ?', [classId]);
        if (classExists.length === 0) {
          return res.status(404).json({ message: `Class with ID ${classId} not found` });
        }
      }
    }

    // Build dynamic update query for subject fields
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }

    if (updateFields.length > 0) {
      updateFields.push('updated_by = ?');
      updateValues.push(updatedBy);
      updateValues.push(id);

      const updateQuery = `UPDATE tbl_subjects SET ${updateFields.join(', ')} WHERE id = ?`;
      await pool.execute(updateQuery, updateValues);
    }

    // Update subject-class relationships
    if (class_ids !== undefined) {
      // Delete existing relationships
      await pool.execute('DELETE FROM tbl_subject_classes WHERE subject_id = ?', [id]);

      // Insert new relationships if class_ids provided
      if (Array.isArray(class_ids) && class_ids.length > 0) {
        for (const classId of class_ids) {
          await pool.execute(
            'INSERT INTO tbl_subject_classes (subject_id, class_id) VALUES (?, ?)',
            [id, classId]
          );
        }
      }
    }

    res.status(200).json({ message: 'Subject updated successfully' });
  } catch (error) {
    console.error('Update Subject Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get All Subjects ========================
const getAllSubjects = async (req, res) => {
  try {
    let query = `
      SELECT s.*,
             u1.name AS created_by_name,
             u2.name AS updated_by_name,
             GROUP_CONCAT(DISTINCT CONCAT(c.name, ' (', c.class_number, ')') SEPARATOR ', ') AS class_names,
             GROUP_CONCAT(DISTINCT sc_rel.class_id) AS class_ids,
             SUM(COALESCE(sc.total_students, 0)) AS total_students
      FROM tbl_subjects s
      LEFT JOIN tbl_users u1 ON s.created_by = u1.id
      LEFT JOIN tbl_users u2 ON s.updated_by = u2.id
      LEFT JOIN tbl_subject_classes sc_rel ON s.id = sc_rel.subject_id
      LEFT JOIN tbl_classes c ON sc_rel.class_id = c.id
      LEFT JOIN (SELECT class_id, COUNT(*) as total_students FROM tbl_student_classes GROUP BY class_id) sc ON sc_rel.class_id = sc.class_id
    `;
    let params = [];

    if (req.user.role === 'teacher') {
      query += ' WHERE s.created_by = ?';
      params.push(req.user.id);
    }

    query += ' GROUP BY s.id ORDER BY s.created_at DESC';

    const [subjects] = await pool.execute(query, params);

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Get Subjects Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get Subjects by Class ========================
const getSubjectsByClass = async (req, res) => {
  const { class_id } = req.params;

  try {
    const [subjects] = await pool.execute(`
      SELECT s.*,
             u1.name AS created_by_name,
             u2.name AS updated_by_name,
             c.name AS class_name,
             c.class_number
      FROM tbl_subjects s
      LEFT JOIN tbl_users u1 ON s.created_by = u1.id
      LEFT JOIN tbl_users u2 ON s.updated_by = u2.id
      LEFT JOIN tbl_classes c ON s.class_id = c.id
      WHERE s.class_id = ?
      ORDER BY s.created_at DESC
    `, [class_id]);

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Get Subjects by Class Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Delete Subject ========================
const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if subject exists
    const [subject] = await pool.execute('SELECT * FROM tbl_subjects WHERE id = ?', [id]);
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Delete subject
    await pool.execute('DELETE FROM tbl_subjects WHERE id = ?', [id]);

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Delete Subject Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addSubject, updateSubject, getAllSubjects, getSubjectsByClass, deleteSubject };
