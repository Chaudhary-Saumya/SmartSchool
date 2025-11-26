const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'smart_school', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0 
});

// Function to create tables
const createTables = async () => {
  try {
    // Rename existing tables to tbl_ prefix if they exist
    await pool.execute(`ALTER TABLE users RENAME TO tbl_users`).catch(() => {});
    await pool.execute(`ALTER TABLE teacher_details RENAME TO tbl_teacher_details`).catch(() => {});
    await pool.execute(`ALTER TABLE subjects RENAME TO tbl_subjects`).catch(() => {});
    await pool.execute(`ALTER TABLE leaves RENAME TO tbl_leaves`).catch(() => {});
    await pool.execute(`ALTER TABLE lectures RENAME TO tbl_lectures`).catch(() => {});
    await pool.execute(`ALTER TABLE library_assets RENAME TO tbl_library_assets`).catch(() => {});
    await pool.execute(`ALTER TABLE classes RENAME TO tbl_classes`).catch(() => {});
    await pool.execute(`ALTER TABLE student_classes RENAME TO tbl_student_classes`).catch(() => {});
    await pool.execute(`ALTER TABLE holidays RENAME TO tbl_holidays`).catch(() => {});

    // Create tbl_users table if not exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'teacher', 'admin') NOT NULL,
        profile_image VARCHAR(255),
        address TEXT,
        mobile_number VARCHAR(20),
        location VARCHAR(255),
        about TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create tbl_classes table first (needed by tbl_subjects and tbl_lectures)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_number INT NOT NULL UNIQUE CHECK (class_number BETWEEN 1 AND 12),
        name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default classes 1-12 if not exists
    for (let i = 1; i <= 12; i++) {
      await pool.execute(`
        INSERT IGNORE INTO tbl_classes (class_number, name) VALUES (?, ?)
      `, [i, `Class ${i}`]);
    }

    // Create tbl_subjects table (depends on tbl_classes and tbl_users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        class_id INT,
        created_by INT NOT NULL,
        updated_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES tbl_classes(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES tbl_users(id) ON DELETE CASCADE,
        FOREIGN KEY (updated_by) REFERENCES tbl_users(id) ON DELETE SET NULL
      )
    `);

    // Create tbl_lectures table (depends on tbl_subjects, tbl_classes, and tbl_users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_lectures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT NOT NULL,
        class_id INT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        duration INT NOT NULL COMMENT 'Duration in minutes',
        location VARCHAR(255),
        status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (subject_id) REFERENCES tbl_subjects(id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES tbl_classes(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES tbl_users(id) ON DELETE CASCADE
      )
    `);

    // Create tbl_teacher_details table (depends on tbl_users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_teacher_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        education TEXT,
        experience TEXT,
        conferences_courses JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES tbl_users(id) ON DELETE CASCADE
      )
    `);

    // Create tbl_leaves table (depends on tbl_users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_leaves (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        leave_type VARCHAR(100) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        reason TEXT,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        rejection_reason TEXT,
        total_days INT NOT NULL,
        created_by INT NOT NULL,
        updated_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES tbl_users(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES tbl_users(id) ON DELETE CASCADE,
        FOREIGN KEY (updated_by) REFERENCES tbl_users(id) ON DELETE SET NULL
      )
    `);

    // Create tbl_library_assets table (depends on tbl_subjects and tbl_users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_library_assets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subject_id INT NOT NULL,
        purchase_date DATE NOT NULL,
        asset_type ENUM('Book', 'CD', 'DVD', 'Newspaper') NOT NULL,
        due_date DATE,
        shelf_location VARCHAR(255),
        status ENUM('available', 'borrowed', 'damaged', 'lost') DEFAULT 'available',
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (subject_id) REFERENCES tbl_subjects(id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES tbl_users(id) ON DELETE CASCADE
      )
    `);

    // Create tbl_student_classes table (depends on tbl_users and tbl_classes)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_student_classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        class_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES tbl_users(id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES tbl_classes(id) ON DELETE CASCADE,
        UNIQUE KEY unique_student_class (student_id, class_id)
      )
    `);

    // Create tbl_holidays table (depends on tbl_users)
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS tbl_holidays (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        description TEXT,
        holiday_type ENUM('Public', 'By School') NOT NULL,
        location ENUM('Global', 'School') NOT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES tbl_users(id) ON DELETE CASCADE
      )
    `);

    console.log('Tables created and renamed successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

module.exports = { pool, createTables };
