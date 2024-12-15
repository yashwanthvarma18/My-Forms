import React from 'react';
import { PlusCircle } from 'lucide-react';

interface Props {
  onCreateForm: () => void;
}

export const DashboardHeader: React.FC<Props> = ({ onCreateForm }) => {
  return (
    <div className="flex justify-between items-center mb-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Forms
        </h1>
        <p className="text-gray-600 mt-1">Create and manage your forms</p>
      </div>
      <button
        onClick={onCreateForm}
        className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-200 transform hover:scale-102 shadow-lg hover:shadow-xl"
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        Create New Form
      </button>
    </div>
  );
};