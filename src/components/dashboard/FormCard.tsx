import React from 'react';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { Form } from '../../types/form';

interface Props {
  form: Form;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const FormCard: React.FC<Props> = ({ form, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-102 animate-fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
            {form.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            form.published 
              ? 'bg-success/10 text-success' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {form.published ? 'Published' : 'Draft'}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            {form.fields.length} fields
          </span>
          <span className="mx-2">•</span>
          <span>
            Created {new Date(form.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(form.id)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md text-primary hover:bg-primary/10 transition-colors"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </button>
          
          {form.published && (
            <button
              onClick={() => onView(form.id)}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md text-accent hover:bg-accent/10 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </button>
          )}
          
          <button
            onClick={() => onDelete(form.id)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};