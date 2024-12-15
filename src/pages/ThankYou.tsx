import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank you!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Your response has been recorded successfully.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};