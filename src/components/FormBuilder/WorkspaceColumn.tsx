import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Form, FormField } from '../../types/form';
import { DraggableField } from '../DraggableField';

interface WorkspaceColumnProps {
  form: Form;
  fields: FormField[];
  selectedFieldId: string | undefined;
  onFieldSelect: (field: FormField) => void;
  onFieldDelete: (id: string) => void;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

export const WorkspaceColumn: React.FC<WorkspaceColumnProps> = ({
  form,
  fields,
  selectedFieldId,
  onFieldSelect,
  onFieldDelete,
  onTitleChange,
  onDescriptionChange,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'workspace',
  });

  return (
    <div ref={setNodeRef} className="p-6 min-h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <input
            type="text"
            value={form.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Form Title"
            className="text-3xl font-bold w-full border-none focus:outline-none focus:ring-0 bg-transparent"
          />
          <textarea
            value={form.description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Form Description"
            className="mt-2 w-full border-none focus:outline-none focus:ring-0 bg-transparent resize-none"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          {fields.map((field) => (
            <DraggableField
              key={field.id}
              field={field}
              onRemove={onFieldDelete}
              onClick={() => onFieldSelect(field)}
              isSelected={field.id === selectedFieldId}
            />
          ))}
          
          {fields.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">
                Drag and drop fields here to build your form
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}