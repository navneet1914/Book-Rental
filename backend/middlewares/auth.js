const jwt = require('jsonwebtoken');

require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  console.log(token)
  

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Ensure you have JWT_SECRET in your backend .env
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Attach user info to request object
    next();
  });
};

module.exports = authMiddleware;
