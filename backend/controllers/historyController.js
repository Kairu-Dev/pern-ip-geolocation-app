/* 

getHistory: Fetches all search history for the logged-in user
addHistory: Saves a new IP search to database
deleteHistories: Deletes selected history entries (with security check)

*/


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all history for logged-in user
const getHistory = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT token (added by auth middleware)

    const histories = await prisma.history.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' } // Most recent first
    });

    res.json({ histories });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to fetch history.' });
  }
};

// Add new history entry
const addHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { ipAddress, location } = req.body;

    // Validate input
    if (!ipAddress || !location) {
      return res.status(400).json({ error: 'IP address and location are required.' });
    }

    // Create history entry
    const history = await prisma.history.create({
      data: {
        userId,
        ipAddress,
        location: JSON.stringify(location) // Store location data as JSON string
      }
    });

    res.status(201).json({ message: 'History added', history });
  } catch (error) {
    console.error('Add history error:', error);
    res.status(500).json({ error: 'Failed to add history.' });
  }
};

// Delete multiple histories
const deleteHistories = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { ids } = req.body; // Array of history IDs to delete

    // Validate input
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'History IDs are required.' });
    }

    // Delete histories (only those belonging to this user)
    const deleted = await prisma.history.deleteMany({
      where: {
        id: { in: ids },
        userId // Security: only delete user's own history
      }
    });

    res.json({ message: `${deleted.count} history entries deleted.` });
  } catch (error) {
    console.error('Delete history error:', error);
    res.status(500).json({ error: 'Failed to delete history.' });
  }
};

module.exports = { getHistory, addHistory, deleteHistories };