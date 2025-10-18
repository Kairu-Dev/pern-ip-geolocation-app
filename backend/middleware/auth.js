/* 

Checks if a valid JWT token is sent with the request
Decodes the token to get user info (userId, email)
Protects routes that need authentication (like history)
If token is invalid/missing → blocks access


*/

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request
    next(); // Continue to the actual route
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;