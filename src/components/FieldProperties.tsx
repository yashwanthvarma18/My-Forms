import React from 'react';
import { FormField } from '../types/form';
import { Plus, Trash2, CheckSquare } from 'lucide-react';

interface Props {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
}

export const FieldProperties: React.FC<Props> = ({ field, onUpdate }) => {
  const handleUpdate = (updates: Partial<FormField>) => {
    onUpdate(updates);
  };

  const handleAddOption = () => {
    if (!field.options) return;
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    handleUpdate({ options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    if (!field.options || field.options.length <= 1) return;
    const newOptions = field.options.filter((_, i) => i !== index);
    handleUpdate({ options: newOptions });
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!field.options) return;
    const newOptions = [...field.options];
    newOptions[index] = value;
    handleUpdate({ options: newOptions });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Placeholder
        </label>
        <input
          type="text"
          value={field.placeholder || ''}
          onChange={(e) => handleUpdate({ placeholder: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={field.required || false}
              onChange={(e) => handleUpdate({ required: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-5 h-5 border rounded transition-colors ${
              field.required ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
            }`}>
              {field.required && (
                <CheckSquare className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700">Required</span>
        </label>
      </div>

      {(field.type === 'select' || field.type === 'radio') && field.options && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="space-y-2">
            {field.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  type="button"
                  disabled={field.options?.length === 1}
                >
                  <Trash2 size={18} className={field.options?.length === 1 ? 'opacity-50' : ''} />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddOption}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              type="button"
            >
              <Plus size={18} className="mr-1" />
              Add Option
            </button>
          </div>
        </div>
      )}

      {field.type === 'number' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min</label>
            <input
              type="number"
              value={field.min || ''}
              onChange={(e) =>
                handleUpdate({ min: e.target.value ? Number(e.target.value) : undefined })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max</label>
            <input
              type="number"
              value={field.max || ''}
              onChange={(e) =>
                handleUpdate({ max: e.target.value ? Number(e.target.value) : undefined })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};