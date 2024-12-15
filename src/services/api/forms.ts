import { Form } from '../../types/form';

const API_URL = import.meta.env.VITE_API_URL;

export const formApi = {
  createForm: async (form: Omit<Form, 'id' | 'createdAt'>) => {
    const response = await fetch(`${API_URL}/api/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error('Failed to create form');
    }

    return response.json();
  },

  updateForm: async (form: Form) => {
    const response = await fetch(`${API_URL}/api/forms/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error('Failed to update form');
    }

    return response.json();
  },

  getUserForms: async () => {
    const response = await fetch(`${API_URL}/api/forms/user`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch forms');
    }

    return response.json();
  },
};