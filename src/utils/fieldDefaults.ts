import { FormField, FieldType } from '../types/form';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

export const createDefaultField = (type: FieldType): Omit<FormField, 'id'> => {
  const baseField = {
    type,
    label: `New ${type} field`,
    required: false,
    placeholder: '',
  };

  switch (type) {
    case 'select':
    case 'radio':
      return {
        ...baseField,
        options: [...DEFAULT_OPTIONS],
      };
    case 'checkbox':
      return {
        ...baseField,
        label: 'New checkbox option',
      };
    case 'number':
      return {
        ...baseField,
        min: undefined,
        max: undefined,
      };
    default:
      return baseField;
  }
};