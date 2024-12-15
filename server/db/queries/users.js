import pool from '../index.js';

export const userQueries = {
  // Create a new user
  createUser: async (email, hashedPassword) => {
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email, created_at
    `;
    const values = [email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Find user by email
  findUserByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  // Find user by id
  findUserById: async (id) => {
    const query = 'SELECT id, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};