import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/db.js';
import { Parser } from 'json2csv';

const router = express.Router();

// Get all responses for a form
router.get('/form/:formId', authenticateToken, async (req, res) => {
  try {
    const form = await pool.query(
      'SELECT * FROM forms WHERE id = $1 AND user_id = $2',
      [req.params.formId, req.user.id]
    );

    if (form.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const responses = await pool.query(
      'SELECT * FROM form_responses WHERE form_id = $1 ORDER BY submitted_at DESC',
      [req.params.formId]
    );

    res.json(responses.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a form response
router.post('/form/:formId', async (req, res) => {
  try {
    const { email, data } = req.body;

    const form = await pool.query(
      'SELECT * FROM forms WHERE id = $1 AND published = true',
      [req.params.formId]
    );

    if (form.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found or not published' });
    }

    const response = await pool.query(
      'INSERT INTO form_responses (form_id, email, data) VALUES ($1, $2, $3) RETURNING *',
      [req.params.formId, email, data]
    );

    res.status(201).json(response.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download responses as CSV
router.get('/form/:formId/download', authenticateToken, async (req, res) => {
  try {
    const form = await pool.query(
      'SELECT * FROM forms WHERE id = $1 AND user_id = $2',
      [req.params.formId, req.user.id]
    );

    if (form.rows.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const responses = await pool.query(
      'SELECT * FROM form_responses WHERE form_id = $1 ORDER BY submitted_at DESC',
      [req.params.formId]
    );

    if (responses.rows.length === 0) {
      return res.status(404).json({ error: 'No responses found' });
    }

    // Get all unique fields from responses
    const fields = new Set(['Email', 'Submitted At']);
    responses.rows.forEach((response) => {
      Object.keys(response.data).forEach((key) => fields.add(key));
    });

    // Transform data for CSV
    const csvData = responses.rows.map((response) => ({
      Email: response.email,
      'Submitted At': new Date(response.submitted_at).toLocaleString(),
      ...response.data,
    }));

    // Generate CSV
    const parser = new Parser({ fields: Array.from(fields) });
    const csv = parser.parse(csvData);

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=form-responses-${req.params.formId}.csv`
    );

    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export the router as the default export
export default router;
