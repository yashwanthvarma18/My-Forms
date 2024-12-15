import React from 'react';
import { FormField } from '../../types/form';
import { FieldProperties } from '../FieldProperties';

interface PropertiesPanelProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  field,
  onUpdate,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Field Properties</h2>
      <FieldProperties field={field} onUpdate={onUpdate} />
    </div>
  );
};