const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Secret'; // same key as in authController

// ✅ Verify Token
const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.token || // if sent in cookie
    (req.headers.authorization && req.headers.authorization.split(' ')[1]); // if sent in header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verify Error:', error);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

// ✅ Role-based access check
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
