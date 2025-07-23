const pool = require('../config/db');

const getAllUsersService = async () => {
  const result = await pool.query('SELECT name, email FROM users');
  return result.rows;
}

const createUserService = async (name, email, password) => {
  const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]);
  return result.rows[0];
}

const getUserByEmailService = async (email) => {
  const result = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

const getUserByIDService = async (id) => {
  const result = await pool.query('SELECT name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

const updateUserService = async(id) => {
  const result = await pool.query('SELECT name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

const deleteUserService = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = { getAllUsersService, createUserService, getUserByIDService, updateUserService, deleteUserService, getUserByEmailService }