const pool = require("../config/db");

const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  try {
    await pool.query(queryText);
    console.log("Users table created or already exists")
  } catch (error) {
    console.log("Error Creating the table: ", error);
  } finally {
    pool.end();
  }
}

// createUserTable ();

module.exports = createUserTable();