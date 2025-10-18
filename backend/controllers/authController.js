/* 

Gets email & password from request body
Checks if user exists in database
Compares the password with hashed password (using bcrypt)
If valid → creates a JWT token containing userId and email
Returns token to frontend (frontend will store this and send it with future requests)

*/

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Create JWT token (expires in 24 hours)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success with token
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { login };