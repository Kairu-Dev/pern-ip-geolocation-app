/* 

Handles history CRUD (authentication required)

*/

const express = require('express');
const { getHistory, addHistory, deleteHistories } = require('../controllers/historyController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All routes below require authentication
router.use(authenticateToken);

// GET /api/history
router.get('/', getHistory);

// POST /api/history
router.post('/', addHistory);

// DELETE /api/history
router.delete('/', deleteHistories);

module.exports = router;

