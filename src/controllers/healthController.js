const pool = require('../config/db')

const healthCheck = async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    if (result) {
      res.status(200).json({ status: 'ok', database: 'connected' });
    } else {
      throw new Error('Unexpected DB response');
    }
  } catch (err) {
    console.error('DB connection failed:', err);
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
}

module.exports = healthCheck;