const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { createTables } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const lectureRoutes = require('./routes/lectureRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const classRoutes = require('./routes/classRoutes');
const courseRoutes = require('./routes/courseRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const examScheduleRoutes = require('./routes/examScheduleRoutes');
const departmentRoutes = require('./routes/departmentRoutes');


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/exam-schedules', examScheduleRoutes);
app.use('/api/departments', departmentRoutes);

// Initialize database tables
createTables();

// Start Server
app.listen(3000, () => console.log('Server running on port 3000'));
