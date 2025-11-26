const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/database');

const JWT_SECRET = 'Secret';

// Multer configuration for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ========================== REGISTER ==========================
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    address,
    mobile_number,
    location,
    about,
    education,
    experience,
    conferences_courses
  } = req.body;

  // Get profile image path if uploaded
  const profile_image = req.file ? req.file.filename : null;

  try {
    // Check if user already exists
    const [existingUser] = await pool.execute('SELECT id FROM tbl_users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [userResult] = await pool.execute(
      `INSERT INTO tbl_users
      (name, email, password, role, profile_image, address, mobile_number, location, about)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name ?? null,
        email ?? null,
        hashedPassword ?? null,
        role ?? null,
        profile_image ?? null,
        address ?? null,
        mobile_number ?? null,
        location ?? null,
        about ?? null
      ]
    );

    const userId = userResult.insertId;

    // If role is teacher, insert teacher details
    if (role === 'teacher') {
      await pool.execute(
        `INSERT INTO tbl_teacher_details (user_id, education, experience, conferences_courses)
         VALUES (?, ?, ?, ?)`,
        [
          userId,
          education ?? null,
          experience ?? null,
          JSON.stringify(conferences_courses || [])
        ]
      );
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========================== LOGIN ==========================
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const [users] = await pool.execute('SELECT * FROM tbl_users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 86400000 // 24 hours
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========================== LOGOUT ==========================
const logout = async (req, res) => {
  try {
    // Clear JWT cookie
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict'
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========================== PROFILE ==========================
const profile = async (req, res) => {
  try {
    // Get user ID from JWT token (set by verifyToken middleware)
    const userId = req.user.id;

    // Fetch user details from database
    const [users] = await pool.execute(
      'SELECT id, name, email, role, profile_image, address, mobile_number, location, about, created_at FROM tbl_users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    // If user is a teacher, fetch additional teacher details
    let teacherDetails = null;
    if (user.role === 'teacher') {
      const [teacherData] = await pool.execute(
        'SELECT education, experience, conferences_courses FROM tbl_teacher_details WHERE user_id = ?',
        [userId]
      );
      if (teacherData.length > 0) {
        teacherDetails = teacherData[0];
      }
    }

    // Format profile image URL
    const profileImageUrl = user.profile_image
      ? `http://localhost:3000/uploads/${user.profile_image}`
      : null;

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: profileImageUrl,
        address: user.address,
        mobile_number: user.mobile_number,
        location: user.location,
        about: user.about,
        created_at: user.created_at,
        teacherDetails: teacherDetails
      }
    });
  } catch (error) {
    console.error('Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, profile, upload };
