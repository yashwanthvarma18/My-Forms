// project/server/db/queries/forms.js
import pool from '../index.js';

export const formQueries = {
  // Create a new form
  createForm: async (userId, title, description) => {
    const query = `
      INSERT INTO forms (user_id, title, description) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const values = [userId, title, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all forms for a user with detailed information
  getUserForms: async (userId) => {
    const query = `
      SELECT 
        f.id, 
        f.title, 
        f.description, 
        f.published, 
        f.created_at, 
        f.updated_at,
        COUNT(DISTINCT ff.id) as field_count,
        COUNT(DISTINCT fr.id) as response_count
      FROM forms f 
      LEFT JOIN form_fields ff ON f.id = ff.form_id 
      LEFT JOIN form_responses fr ON f.id = fr.form_id 
      WHERE f.user_id = $1 
      GROUP BY f.id 
      ORDER BY f.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  // Get a single form with its fields
  getFormById: async (formId, userId) => {
    const query = `
      SELECT 
        f.*, 
        json_agg(
          json_build_object(
            'id', ff.id,
            'type', ff.type,
            'label', ff.label,
            'placeholder', ff.placeholder,
            'required', ff.required,
            'options', ff.options,
            'min', ff.min,
            'max', ff.max,
            'position', ff.position
          )
        ) as fields
      FROM forms f 
      LEFT JOIN form_fields ff ON f.id = ff.form_id 
      WHERE f.id = $1 AND f.user_id = $2 
      GROUP BY f.id
    `;
    const result = await pool.query(query, [formId, userId]);
    
    // Handle case where no form is found
    if (result.rows.length === 0) return null;
    
    const form = result.rows[0];
    // Remove the json_agg NULL if no fields exist
    form.fields = form.fields[0].id ? form.fields : [];
    
    return form;
  },

  // Update a form
  updateForm: async (formId, userId, title, description) => {
    const query = `
      UPDATE forms 
      SET title = $3, description = $4 
      WHERE id = $1 AND user_id = $2 
      RETURNING *
    `;
    const values = [formId, userId, title, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Delete a form
  deleteForm: async (formId, userId) => {
    const query = 'DELETE FROM forms WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [formId, userId]);
    return result.rows[0];
  },

  // Publish a form
  publishForm: async (formId, userId) => {
    const query = `
      UPDATE forms 
      SET published = true 
      WHERE id = $1 AND user_id = $2 
      RETURNING *
    `;
    const result = await pool.query(query, [formId, userId]);
    return result.rows[0];
  }
};