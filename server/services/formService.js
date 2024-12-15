import { formQueries } from '../db/queries/forms.js';
import { formFieldQueries } from '../db/queries/formFields.js';

export const formService = {
  async createForm(userId, formData) {
    try {
      // Create the form
      const form = await formQueries.createForm(
        userId, 
        formData.title || 'Untitled Form', 
        formData.description || ''
      );

      // Create form fields if they exist
      if (formData.fields && formData.fields.length > 0) {
        await formFieldQueries.createFormFields(form.id, formData.fields);
      }

      // Fetch the full form with fields
      const fullForm = await formQueries.getFormById(form.id, userId);
      return fullForm;
    } catch (error) {
      console.error('Error in createForm service:', error);
      throw error;
    }
  },

  async getUserForms(userId) {
    try {
      const forms = await formQueries.getUserForms(userId);
      return forms.map(form => ({
        ...form,
        fieldCount: parseInt(form.field_count, 10),
        responseCount: parseInt(form.response_count, 10)
      }));
    } catch (error) {
      console.error('Error in getUserForms service:', error);
      throw error;
    }
  },

  async updateForm(formId, userId, formData) {
    try {
      // Update form details
      const updatedForm = await formQueries.updateForm(
        formId, 
        userId, 
        formData.title, 
        formData.description
      );

      // Update form fields
      if (formData.fields) {
        await formFieldQueries.updateFormFields(formId, formData.fields);
      }

      // Fetch the updated form with fields
      const fullForm = await formQueries.getFormById(formId, userId);
      return fullForm;
    } catch (error) {
      console.error('Error in updateForm service:', error);
      throw error;
    }
  },

  async deleteForm(formId, userId) {
    try {
      return await formQueries.deleteForm(formId, userId);
    } catch (error) {
      console.error('Error in deleteForm service:', error);
      throw error;
    }
  },

  async publishForm(formId, userId) {
    try {
      return await formQueries.publishForm(formId, userId);
    } catch (error) {
      console.error('Error in publishForm service:', error);
      throw error;
    }
  }
};