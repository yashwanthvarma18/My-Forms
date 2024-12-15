import React from 'react';
import { FormField } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

const renderTextField = (field: FormField, value: string, onChange: (value: string) => void) => (
  <input
    type="text"
    id={field.id}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={field.placeholder}
    required={field.required}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
  />
);

const renderNumberField = (field: FormField, value: number, onChange: (value: string) => void) => (
  <input
    type="number"
    id={field.id}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    min={field.min}
    max={field.max}
    required={field.required}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
  />
);

const renderDateField = (field: FormField, value: string, onChange: (value: string) => void) => (
  <input
    type="date"
    id={field.id}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    required={field.required}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
  />
);

const renderCheckboxField = (field: FormField, value: boolean, onChange: (value: boolean) => void) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={field.id}
      checked={value || false}
      onChange={(e) => onChange(e.target.checked)}
      required={field.required}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={field.id} className="ml-2 block text-sm text-gray-900">
      {field.label}
    </label>
  </div>
);

const renderSelectField = (field: FormField, value: string, onChange: (value: string) => void) => (
  <select
    id={field.id}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    required={field.required}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
  >
    <option value="">Select an option</option>
    {field.options?.map((option) => (
      <option key={`${field.id}-${option}`} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const renderRadioField = (field: FormField, value: string, onChange: (value: string) => void) => (
  <div className="space-y-2">
    {field.options?.map((option) => (
      <div key={`${field.id}-${option}`} className="flex items-center">
        <input
          type="radio"
          id={`${field.id}-${option}`}
          name={field.id}
          value={option}
          checked={value === option}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor={`${field.id}-${option}`} className="ml-2 block text-sm text-gray-900">
          {option}
        </label>
      </div>
    ))}
  </div>
);

export const renderFormField = (
  field: FormField,
  value: any,
  onChange: (value: any) => void
) => {
  const fieldWrapper = (children: React.ReactNode) => (
    <div className="form-field">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
    </div>
  );

  switch (field.type) {
    case 'text':
      return fieldWrapper(renderTextField(field, value, onChange));
    case 'number':
      return fieldWrapper(renderNumberField(field, value, onChange));
    case 'date':
      return fieldWrapper(renderDateField(field, value, onChange));
    case 'checkbox':
      return fieldWrapper(renderCheckboxField(field, value, onChange));
    case 'select':
      return fieldWrapper(renderSelectField(field, value, onChange));
    case 'radio':
      return fieldWrapper(renderRadioField(field, value, onChange));
    default:
      return null;
  }
};