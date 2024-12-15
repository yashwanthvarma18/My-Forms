import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Form, FormField } from '../../types/form';
import { FieldTypes } from '../FieldTypes';
import { WorkspaceColumn } from './WorkspaceColumn';
import { PropertiesPanel } from './PropertiesPanel';
import { createDefaultField } from '../../utils/fieldDefaults';

interface FormContentProps {
  form: Form;
  onUpdateForm: (form: Form) => void;
}

export const FormContent: React.FC<FormContentProps> = ({ form, onUpdateForm }) => {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;

    // Handle new field creation from field types
    if (active.id.toString().startsWith('field-type-')) {
      const fieldType = active.data.current?.type;
      if (fieldType && over.id === 'workspace') {
        const defaultField = createDefaultField(fieldType);
        const newField: FormField = {
          ...defaultField,
          id: crypto.randomUUID(),
        };
        
        onUpdateForm({
          ...form,
          fields: [...form.fields, newField],
        });
        setSelectedField(newField);
      }
      return;
    }

    // Handle reordering of existing fields
    if (active.id !== over.id) {
      const oldIndex = form.fields.findIndex(f => f.id === active.id);
      const newIndex = form.fields.findIndex(f => f.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFields = [...form.fields];
        const [movedField] = newFields.splice(oldIndex, 1);
        newFields.splice(newIndex, 0, movedField);
        
        onUpdateForm({
          ...form,
          fields: newFields,
        });
      }
    }
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<FormField>) => {
    const updatedFields = form.fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onUpdateForm({ ...form, fields: updatedFields });
    if (selectedField?.id === fieldId) {
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const handleFieldDelete = (fieldId: string) => {
    const updatedFields = form.fields.filter(field => field.id !== fieldId);
    onUpdateForm({ ...form, fields: updatedFields });
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const handleFormTitleChange = (title: string) => {
    onUpdateForm({ ...form, title });
  };

  const handleFormDescriptionChange = (description: string) => {
    onUpdateForm({ ...form, description });
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <FieldTypes />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50">
          <SortableContext
            items={form.fields.map(f => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <WorkspaceColumn
              form={form}
              fields={form.fields}
              selectedFieldId={selectedField?.id}
              onFieldSelect={setSelectedField}
              onFieldDelete={handleFieldDelete}
              onTitleChange={handleFormTitleChange}
              onDescriptionChange={handleFormDescriptionChange}
            />
          </SortableContext>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {selectedField ? (
            <PropertiesPanel
              field={selectedField}
              onUpdate={(updates) => handleFieldUpdate(selectedField.id, updates)}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              Select a field to edit its properties
            </div>
          )}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-500 opacity-90">
              {activeId.toString().startsWith('field-type-') ? (
                'New Field'
              ) : (
                form.fields.find(f => f.id === activeId)?.label || ''
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};