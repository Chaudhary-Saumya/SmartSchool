const { pool } = require('../config/database');

// ========================== GET ALL STUDENTS ==========================
const getAllStudents = async (req, res) => {
  try {
    const [students] = await pool.execute(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.mobile_number,
        u.address,
        u.location,
        u.profile_image,
        u.created_at,
        GROUP_CONCAT(c.name ORDER BY c.class_number SEPARATOR ', ') AS department
       FROM tbl_users u
       LEFT JOIN tbl_student_classes sc ON u.id = sc.student_id
       LEFT JOIN tbl_classes c ON sc.class_id = c.id
       WHERE u.role = 'student'
       GROUP BY u.id
       ORDER BY u.name`
    );

    // Format data to match frontend expectations
    const formattedStudents = students.map((student, index) => ({
      id: student.id,
      rollNo: `S-${String(student.id).padStart(3, '0')}`,
      name: student.name,
      email: student.email,
      gender: 'Not specified', // Database doesn't have gender field
      mobile: student.mobile_number || 'Not provided',
      department: student.department || 'Not assigned',
      dob: 'Not specified', // Database doesn't have DOB field
      address: student.address || 'Not provided',
      guardianMobile: 'Not provided', // Database doesn't have guardian info
      profileCompletion: Math.floor(Math.random() * 41) + 60, // Random 60-100%
      avatar: student.profile_image
        ? `http://localhost:3000/uploads/${student.profile_image}`
        : `https://i.pravatar.cc/40?img=${(index % 8) + 1}`
    }));

    res.status(200).json({
      success: true,
      data: formattedStudents,
      count: formattedStudents.length
    });
  } catch (error) {
    console.error('Get All Students Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ========================== GET STUDENT BY ID ==========================
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const [students] = await pool.execute(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.mobile_number,
        u.address,
        u.location,
        u.profile_image,
        u.created_at,
        GROUP_CONCAT(c.name ORDER BY c.class_number SEPARATOR ', ') AS department
       FROM tbl_users u
       LEFT JOIN tbl_student_classes sc ON u.id = sc.student_id
       LEFT JOIN tbl_classes c ON sc.class_id = c.id
       WHERE u.id = ? AND u.role = 'student'
       GROUP BY u.id`,
      [id]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const student = students[0];
    const formattedStudent = {
      id: student.id,
      rollNo: `S-${String(student.id).padStart(3, '0')}`,
      name: student.name,
      email: student.email,
      gender: 'Not specified',
      mobile: student.mobile_number || 'Not provided',
      department: student.department || 'Not assigned',
      dob: 'Not specified',
      address: student.address || 'Not provided',
      guardianMobile: 'Not provided',
      profileCompletion: 85, // Default completion for individual view
      avatar: student.profile_image
        ? `http://localhost:3000/uploads/${student.profile_image}`
        : 'https://i.pravatar.cc/40?img=1'
    };

    res.status(200).json({
      success: true,
      data: formattedStudent
    });
  } catch (error) {
    console.error('Get Student By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ========================== UPDATE STUDENT ==========================
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      address,
      mobile_number,
      location,
      about
    } = req.body;

    console.log('Update student request for ID:', id);
    console.log('Request body:', { name, email, password: password ? '[HIDDEN]' : undefined, address, mobile_number, location, about });

    // Get profile image path if uploaded
    const profile_image = req.file ? req.file.filename : null;
    console.log('Profile image:', profile_image);

    // Start building the update query for users table
    let updateFields = [];
    let updateValues = [];

    // Always update these core fields (even if empty strings)
    updateFields.push('name = ?');
    updateValues.push(name || null);

    updateFields.push('email = ?');
    updateValues.push(email || null);

    if (password && password.trim() !== '') {
      // Hash new password if provided
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push('password = ?');
      updateValues.push(hashedPassword);
    }

    updateFields.push('address = ?');
    updateValues.push(address || null);

    updateFields.push('mobile_number = ?');
    updateValues.push(mobile_number || null);

    updateFields.push('location = ?');
    updateValues.push(location || null);

    updateFields.push('about = ?');
    updateValues.push(about || null);

    if (profile_image) {
      updateFields.push('profile_image = ?');
      updateValues.push(profile_image);
    }

    console.log('User update fields:', updateFields);
    console.log('User update values:', updateValues.map((v, i) => i === updateValues.length - 1 ? v : (typeof v === 'string' && v.length > 20 ? v.substring(0, 20) + '...' : v)));

    // Update user table
    updateValues.push(id);
    const userUpdateQuery = `UPDATE tbl_users SET ${updateFields.join(', ')} WHERE id = ?`;
    console.log('User update query:', userUpdateQuery);
    const [userResult] = await pool.execute(userUpdateQuery, updateValues);
    console.log('User update result:', userResult);

    // Fetch updated student data
    const [updatedStudents] = await pool.execute(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.mobile_number,
        u.address,
        u.location,
        u.about,
        u.profile_image,
        u.created_at,
        GROUP_CONCAT(c.name ORDER BY c.class_number SEPARATOR ', ') AS department
       FROM tbl_users u
       LEFT JOIN tbl_student_classes sc ON u.id = sc.student_id
       LEFT JOIN tbl_classes c ON sc.class_id = c.id
       WHERE u.id = ? AND u.role = 'student'
       GROUP BY u.id`,
      [id]
    );

    if (updatedStudents.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const updatedStudent = updatedStudents[0];
    const formattedStudent = {
      id: updatedStudent.id,
      rollNo: `S-${String(updatedStudent.id).padStart(3, '0')}`,
      name: updatedStudent.name,
      email: updatedStudent.email,
      mobile: updatedStudent.mobile_number || 'Not provided',
      department: updatedStudent.department || 'Not assigned',
      address: updatedStudent.address || 'Not provided',
      location: updatedStudent.location || 'Not specified',
      about: updatedStudent.about || '',
      profileCompletion: 85, // Default completion for individual view
      avatar: updatedStudent.profile_image
        ? `http://localhost:3000/uploads/${updatedStudent.profile_image}`
        : 'https://i.pravatar.cc/40?img=1'
    };

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: formattedStudent
    });
  } catch (error) {
    console.error('Update Student Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getAllStudents, getStudentById, updateStudent };
