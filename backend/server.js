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
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📍 Environment: development`);
  });

  // Safe Port Shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
}

// Export for Vercel
module.exports = app;