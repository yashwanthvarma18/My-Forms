const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  signup: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure credentials (cookies) are sent
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sign up');
      }

      return response.json();
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  },

  signin: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure credentials (cookies) are sent
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sign in');
      }

      return response.json();
    } catch (error) {
      console.error('Signin Error:', error);
      throw error;
    }
  },

  signout: async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signout`, {
        method: 'POST',
        credentials: 'include', // Ensure credentials (cookies) are sent
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sign out');
      }

      return response.json();
    } catch (error) {
      console.error('Signout Error:', error);
      throw error;
    }
  },
};
