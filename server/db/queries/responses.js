import pool from '../index.js';

export const responseQueries = {
  // Create a form response
  createResponse: async (formId, email, data) => {
    const query = `
      INSERT INTO form_responses (form_id, email, data)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [formId, email, data];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get responses for a form
  getFormResponses: async (formId, userId) => {
    const query = `
      SELECT fr.*
      FROM form_responses fr
      JOIN forms f ON fr.form_id = f.id
      WHERE f.id = $1 AND f.user_id = $2
      ORDER BY fr.submitted_at DESC
    `;
    const result = await pool.query(query, [formId, userId]);
    return result.rows;
  }
};