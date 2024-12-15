import React, { useState } from 'react';
import { FormField } from '../types/form';
import { renderFormField } from '../utils/formRendering';

interface Props {
  title: string;
  description: string;
  fields: FormField[];
}

export const FormPreview: React.FC<Props> = ({ title, description, fields }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="animate-field-appear">
            {renderFormField(field, formData[field.id], (value) => handleFieldChange(field.id, value))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};