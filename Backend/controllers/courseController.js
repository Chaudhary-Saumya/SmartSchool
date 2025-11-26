const { pool } = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/course_images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'course-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const [courses] = await pool.execute(`
      SELECT c.*, u.name as teacher_name, u.email as teacher_email
      FROM tbl_courses c
      LEFT JOIN tbl_users u ON c.teacher_id = u.id
      ORDER BY c.created_at DESC
    `);

    res.json({
      success: true,
      data: courses,
      message: 'Courses retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await pool.execute(`
      SELECT c.*, u.name as teacher_name, u.email as teacher_email
      FROM tbl_courses c
      LEFT JOIN tbl_users u ON c.teacher_id = u.id
      WHERE c.id = ?
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: courses[0],
      message: 'Course retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
};

// Add new course
const addCourse = async (req, res) => {
  try {
    const {
      course_name,
      course_code,
      course_details,
      start_date,
      course_time_length,
      course_price,
      teacher_id,
      max_students,
      contact_number,
      course_category,
      course_duration,
      course_level
    } = req.body;

    // Validate required fields
    if (!course_name || !course_code || !course_category) {
      return res.status(400).json({
        success: false,
        message: 'Course name, course code, and category are required'
      });
    }

    // Check if course code already exists
    const [existingCourse] = await pool.execute(
      'SELECT id FROM tbl_courses WHERE course_code = ?',
      [course_code]
    );

    if (existingCourse.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Course code already exists'
      });
    }

    // Handle file upload
    let course_image = null;
    if (req.file) {
      course_image = '/uploads/course_images/' + req.file.filename;
    }

    const [result] = await pool.execute(`
      INSERT INTO tbl_courses (
        course_name, course_code, course_details, start_date,
        course_time_length, course_price, teacher_id, max_students,
        contact_number, course_category, course_duration, course_level, course_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      course_name, course_code, course_details, start_date,
      course_time_length, course_price, teacher_id, max_students,
      contact_number, course_category, course_duration, course_level, course_image
    ]);

    res.status(201).json({
      success: true,
      data: { id: result.insertId },
      message: 'Course added successfully'
    });
  } catch (error) {
    console.error('Error adding course:', error);

    // Delete uploaded file if database operation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding course',
      error: error.message
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      course_name,
      course_code,
      course_details,
      start_date,
      course_time_length,
      course_price,
      teacher_id,
      max_students,
      contact_number,
      course_category,
      course_duration,
      course_level
    } = req.body;

    // 1️⃣ Check if course exists
    const [existingCourse] = await pool.execute(
      'SELECT * FROM tbl_courses WHERE id = ?',
      [id]
    );

    if (existingCourse.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const course = existingCourse[0];

    // 2️⃣ Check if course code already exists (excluding current)
    if (course_code) {
      const [codeCheck] = await pool.execute(
        'SELECT id FROM tbl_courses WHERE course_code = ? AND id != ?',
        [course_code, id]
      );

      if (codeCheck.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Course code already exists'
        });
      }
    }

    // 3️⃣ Handle file upload (replace if new file)
    let course_image = course.course_image;
    if (req.file) {
      // Delete old image if exists
      if (course.course_image) {
        const oldImagePath = path.join(__dirname, '..', course.course_image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      course_image = '/uploads/course_images/' + req.file.filename;
    }

    // 4️⃣ Merge old + new data (keep existing values if not sent)
    const updatedData = {
      course_name: course_name ?? course.course_name,
      course_code: course_code ?? course.course_code,
      course_details: course_details ?? course.course_details,
      start_date: start_date ?? course.start_date,
      course_time_length: course_time_length ?? course.course_time_length,
      course_price: course_price ?? course.course_price,
      teacher_id: teacher_id ?? course.teacher_id,
      max_students: max_students ?? course.max_students,
      contact_number: contact_number ?? course.contact_number,
      course_category: course_category ?? course.course_category,
      course_duration: course_duration ?? course.course_duration,
      course_level: course_level ?? course.course_level,
      course_image: course_image ?? course.course_image
    };

    // 5️⃣ Update in DB safely
    await pool.execute(
      `
      UPDATE tbl_courses SET
        course_name = ?, course_code = ?, course_details = ?, start_date = ?,
        course_time_length = ?, course_price = ?, teacher_id = ?, max_students = ?,
        contact_number = ?, course_category = ?, course_duration = ?, course_level = ?,
        course_image = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        updatedData.course_name,
        updatedData.course_code,
        updatedData.course_details,
        updatedData.start_date,
        updatedData.course_time_length,
        updatedData.course_price,
        updatedData.teacher_id,
        updatedData.max_students,
        updatedData.contact_number,
        updatedData.course_category,
        updatedData.course_duration,
        updatedData.course_level,
        updatedData.course_image,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);

    // Clean up new uploaded file if DB fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Get course details to delete image
    const [course] = await pool.execute(
      'SELECT course_image FROM tbl_courses WHERE id = ?',
      [id]
    );

    if (course.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Delete course from database
    await pool.execute('DELETE FROM tbl_courses WHERE id = ?', [id]);

    // Delete image file if exists
    if (course[0].course_image) {
      const imagePath = path.join(__dirname, '..', course[0].course_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
};

// Get teachers list
const getTeachers = async (req, res) => {
  try {
    const [teachers] = await pool.execute(`
      SELECT id, name, email
      FROM tbl_users
      WHERE role = 'teacher'
      ORDER BY name
    `);

    res.json({
      success: true,
      data: teachers,
      message: 'Teachers retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers',
      error: error.message
    });
  }
};

// Get course categories
const getCourseCategories = async (req, res) => {
  try {
    const categories = [
      { value: 'arts', label: 'Arts' },
      { value: 'commerce', label: 'Commerce' },
      { value: 'science', label: 'Science' }
    ];

    res.json({
      success: true,
      data: categories,
      message: 'Course categories retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

module.exports = {
  upload,
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  getTeachers,
  getCourseCategories
};
