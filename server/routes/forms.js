// project/server/routes/forms.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { formService } from '../services/formService.js';

const router = express.Router();

// Create a new form
router.post('/', authenticateToken, async (req, res) => {
  try {
    const form = await formService.createForm(req.user.id, req.body);
    res.status(201).json(form);
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ 
      error: 'Failed to create form', 
      details: error.message 
    });
  }
});

// Get all forms for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const forms = await formService.getUserForms(req.user.id);
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ 
      error: 'Failed to fetch forms', 
      details: error.message 
    });
  }
});

// Get a specific form
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const form = await formService.getFormById(req.params.id, req.user.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ 
      error: 'Failed to fetch form', 
      details: error.message 
    });
  }
});

// Update a form
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const form = await formService.updateForm(
      req.params.id, 
      req.user.id, 
      req.body
    );
    res.json(form);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ 
      error: 'Failed to update form', 
      details: error.message 
    });
  }
});

// Publish a form
router.patch('/:id/publish', authenticateToken, async (req, res) => {
  try {
    const form = await formService.publishForm(
      req.params.id, 
      req.user.id
    );
    res.json(form);
  } catch (error) {
    console.error('Error publishing form:', error);
    res.status(500).json({ 
      error: 'Failed to publish form', 
      details: error.message 
    });
  }
});

// Delete a form
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedForm = await formService.deleteForm(
      req.params.id, 
      req.user.id
    );
    res.json(deletedForm);
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ 
      error: 'Failed to delete form', 
      details: error.message 
    });
  }
});

export default router;