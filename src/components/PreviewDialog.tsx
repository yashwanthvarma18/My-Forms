import React from 'react';
import { X } from 'lucide-react';
import { FormField } from '../types/form';
import { FormPreview } from './FormPreview';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  fields: FormField[];
}

export const PreviewDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  description,
  fields,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-dialog-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Form Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <FormPreview
            title={title}
            description={description}
            fields={fields}
          />
        </div>
      </div>
    </div>
  );
};