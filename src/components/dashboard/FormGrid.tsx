import React from 'react';
import { Form } from '../../types/form';
import { FormCard } from './FormCard';
import { EmptyState } from '../shared/EmptyState';

interface Props {
  forms: Form[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const FormGrid: React.FC<Props> = ({ forms, onEdit, onDelete, onView }) => {
  if (forms.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};