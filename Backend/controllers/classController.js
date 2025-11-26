const { pool } = require('../config/database');

// ======================== Get All Classes ========================
const getAllClasses = async (req, res) => {
  try {
    const [classes] = await pool.execute('SELECT * FROM tbl_classes ORDER BY class_number');
    res.status(200).json(classes);
  } catch (error) {
    console.error('Get Classes Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Add Student to Class ========================
const addStudentToClass = async (req, res) => {
  const { student_id, class_id } = req.body;

  try {
    if (!student_id || !class_id) {
      return res.status(400).json({ message: 'Student ID and Class ID are required' });
    }

    // Check if student exists and has role "student"
    const [student] = await pool.execute(
      'SELECT * FROM tbl_users WHERE id = ? AND role = "student"',
      [student_id]
    );
    if (student.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if class exists
    const [classExists] = await pool.execute('SELECT * FROM tbl_classes WHERE id = ?', [class_id]);
    if (classExists.length === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if student is already assigned to this class
    const [existing] = await pool.execute(
      'SELECT * FROM tbl_student_classes WHERE student_id = ? AND class_id = ?',
      [student_id, class_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Student is already in this class' });
    }

    // Insert student into class
    await pool.execute(
      'INSERT INTO tbl_student_classes (student_id, class_id) VALUES (?, ?)',
      [student_id, class_id]
    );

    res.status(201).json({ message: 'Student added to class successfully' });
  } catch (error) {
    console.error('Add Student to Class Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Remove Student from Class ========================
const removeStudentFromClass = async (req, res) => {
  const { student_id, class_id } = req.body;

  try {
    if (!student_id || !class_id) {
      return res.status(400).json({ message: 'Student ID and Class ID are required' });
    }

    // Check if student-class mapping exists
    const [existing] = await pool.execute(
      'SELECT * FROM tbl_student_classes WHERE student_id = ? AND class_id = ?',
      [student_id, class_id]
    );
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Student is not in this class' });
    }

    // Delete mapping
    await pool.execute(
      'DELETE FROM tbl_student_classes WHERE student_id = ? AND class_id = ?',
      [student_id, class_id]
    );

    res.status(200).json({ message: 'Student removed from class successfully' });
  } catch (error) {
    console.error('Remove Student from Class Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get Students in a Class ========================
const getStudentsInClass = async (req, res) => {
  const { class_id } = req.params;

  try {
    const [students] = await pool.execute(
      `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.profile_image, 
        sc.created_at AS enrolled_at
      FROM tbl_users u
      JOIN tbl_student_classes sc ON u.id = sc.student_id
      WHERE sc.class_id = ? AND u.role = 'student'
      ORDER BY u.name
      `,
      [class_id]
    );

    res.status(200).json(students);
  } catch (error) {
    console.error('Get Students in Class Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get Classes for a Student ========================
const getStudentClasses = async (req, res) => {
  const studentId = req.user.id; // from JWT

  try {
    const [classes] = await pool.execute(
      `
      SELECT 
        c.id, 
        c.class_number, 
        c.name, 
        sc.created_at AS enrolled_at
      FROM tbl_classes c
      JOIN tbl_student_classes sc ON c.id = sc.class_id
      WHERE sc.student_id = ?
      ORDER BY c.class_number
      `,
      [studentId]
    );

    res.status(200).json(classes);
  } catch (error) {
    console.error('Get Student Classes Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get All Students ========================
const getAllStudents = async (req, res) => {
  try {
    const [students] = await pool.execute(
      `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.profile_image, 
        u.address, 
        u.mobile_number, 
        u.location,
        GROUP_CONCAT(c.name ORDER BY c.class_number SEPARATOR ', ') AS classes
      FROM tbl_users u
      LEFT JOIN tbl_student_classes sc ON u.id = sc.student_id
      LEFT JOIN tbl_classes c ON sc.class_id = c.id
      WHERE u.role = 'student'
      GROUP BY u.id
      ORDER BY u.name
      `
    );

    res.status(200).json(students);
  } catch (error) {
    console.error('Get All Students Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== EXPORT CONTROLLERS ========================
module.exports = {
  getAllClasses,
  addStudentToClass,
  removeStudentFromClass,
  getStudentsInClass,
  getStudentClasses,
  getAllStudents,
};
