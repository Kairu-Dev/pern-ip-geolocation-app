const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//Import Routes
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running! 🚀' });
});

app.use('/api', authRoutes);
app.use('/api/history', historyRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log(`💡 Try: different port or kill process on port ${PORT}`);
  } else {
    console.error('❌ Server error:', err.message);
  }
  process.exit(1);
});