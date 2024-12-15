export type FieldType = 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'radio';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
  options?: string[];
  min?: number;
  max?: number;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: Date;
  published: boolean;
}