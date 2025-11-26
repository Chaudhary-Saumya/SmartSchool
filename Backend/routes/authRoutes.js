const express = require('express');
const { register, login, logout, profile, upload } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', upload.single('profile_image'), register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.get('/profile', verifyToken, profile);

module.exports = router;
