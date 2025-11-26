const { pool } = require('../config/database');

// ========================== GET ALL TEACHERS ==========================
const getAllTeachers = async (req, res) => {
  try {
    const [teachers] = await pool.execute(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.mobile_number,
        u.address,
        u.location,
        u.about,
        u.profile_image,
        u.created_at,
        td.education,
        td.experience,
        td.conferences_courses
       FROM tbl_users u
       LEFT JOIN tbl_teacher_details td ON u.id = td.user_id
       WHERE u.role = 'teacher'
       ORDER BY u.created_at DESC`
    );

    // Format profile images URLs
    const formattedTeachers = teachers.map(teacher => ({
      ...teacher,
      profile_image: teacher.profile_image
        ? `http://localhost:3000/uploads/${teacher.profile_image}`
        : 'https://randomuser.me/api/portraits/men/32.jpg', // Default avatar
      conferences_courses: teacher.conferences_courses
        ? JSON.parse(teacher.conferences_courses)
        : []
    }));

    res.status(200).json({
      success: true,
      data: formattedTeachers,
      count: formattedTeachers.length
    });
  } catch (error) {
    console.error('Get All Teachers Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ========================== GET TEACHER BY ID ==========================
const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const [teachers] = await pool.execute(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.mobile_number,
        u.address,
        u.location,
        u.about,
        u.profile_image,
        u.created_at,
        td.education,
        td.experience,
        td.conferences_courses
       FROM tbl_users u
       LEFT JOIN tbl_teacher_details td ON u.id = td.user_id
       WHERE u.id = ? AND u.role = 'teacher'`,
      [id]
    );

    if (teachers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    const teacher = teachers[0];
    const formattedTeacher = {
      ...teacher,
      profile_image: teacher.profile_image
        ? `http://localhost:3000/uploads/${teacher.profile_image}`
        : 'https://randomuser.me/api/portraits/men/32.jpg',
      conferences_courses: teacher.conferences_courses
        ? JSON.parse(teacher.conferences_courses)
        : []
    };

    res.status(200).json({
      success: true,
      data: formattedTeacher
    });
  } catch (error) {
    console.error('Get Teacher By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ========================== UPDATE TEACHER ==========================
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      address,
      mobile_number,
      location,
      about,
      education,
      experience
    } = req.body;

    console.log('Update teacher request for ID:', id);
    console.log('Request body:', { name, email, password: password ? '[HIDDEN]' : undefined, address, mobile_number, location, about, education, experience });

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

    // Update or insert teacher details
    let teacherUpdateFields = [];
    let teacherUpdateValues = [];

    // Always update these teacher fields (even if empty strings)
    teacherUpdateFields.push('education = ?');
    teacherUpdateValues.push(education || null);

    teacherUpdateFields.push('experience = ?');
    teacherUpdateValues.push(experience || null);

    // Check if teacher details record exists
    const [existingTeacher] = await pool.execute(
      'SELECT id FROM tbl_teacher_details WHERE user_id = ?',
      [id]
    );

    if (existingTeacher.length > 0) {
      // Update existing record
      teacherUpdateValues.push(id);
      const teacherUpdateQuery = `UPDATE tbl_teacher_details SET ${teacherUpdateFields.join(', ')} WHERE user_id = ?`;
      console.log('Teacher update query:', teacherUpdateQuery);
      const [teacherResult] = await pool.execute(teacherUpdateQuery, teacherUpdateValues);
      console.log('Teacher update result:', teacherResult);
    } else {
      // Insert new record
      teacherUpdateValues.push(id);
      const teacherInsertQuery = `INSERT INTO tbl_teacher_details (education, experience, user_id) VALUES (?, ?, ?)`;
      console.log('Teacher insert query:', teacherInsertQuery);
      const [teacherResult] = await pool.execute(teacherInsertQuery, teacherUpdateValues);
      console.log('Teacher insert result:', teacherResult);
    }

    // Fetch updated teacher data
    const [updatedTeachers] = await pool.execute(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.mobile_number,
        u.address,
        u.location,
        u.about,
        u.profile_image,
        u.created_at,
        td.education,
        td.experience,
        td.conferences_courses
       FROM tbl_users u
       LEFT JOIN tbl_teacher_details td ON u.id = td.user_id
       WHERE u.id = ? AND u.role = 'teacher'`,
      [id]
    );

    if (updatedTeachers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    const updatedTeacher = updatedTeachers[0];
    const formattedTeacher = {
      ...updatedTeacher,
      profile_image: updatedTeacher.profile_image
        ? `http://localhost:3000/uploads/${updatedTeacher.profile_image}`
        : 'https://randomuser.me/api/portraits/men/32.jpg',
      conferences_courses: updatedTeacher.conferences_courses
        ? JSON.parse(updatedTeacher.conferences_courses)
        : []
    };

    res.status(200).json({
      success: true,
      message: 'Teacher updated successfully',
      data: formattedTeacher
    });
  } catch (error) {
    console.error('Update Teacher Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { getAllTeachers, getTeacherById, updateTeacher };
