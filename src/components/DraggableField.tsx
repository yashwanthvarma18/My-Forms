import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, CheckCircle } from 'lucide-react';
import { FormField } from '../types/form';

interface Props {
  field: FormField;
  onRemove: (id: string) => void;
  onClick: () => void;
  isSelected: boolean;
}

export const DraggableField: React.FC<Props> = ({
  field,
  onRemove,
  onClick,
  isSelected,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(field.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`field-card relative flex items-center p-4 mb-2 rounded-lg shadow-sm ${
        isSelected ? 'gradient-border shadow-glow' : 'border border-gray-200'
      } ${isDragging ? 'opacity-50' : ''} bg-white transition-all duration-300`}
      onClick={onClick}
    >
      <div
        {...attributes}
        {...listeners}
        className="drag-handle mr-2 text-gray-400"
      >
        <GripVertical size={20} />
      </div>
      
      <div className="flex-1">
        <div className="font-medium flex items-center text-gray-800">
          {field.label}
          {field.required && (
            <CheckCircle className="ml-2 h-4 w-4 text-primary animate-bounce-subtle" />
          )}
        </div>
        <div className="text-sm text-gray-500">{field.type}</div>
      </div>
      
      <button
        onClick={handleRemove}
        className="p-1.5 rounded-full text-gray-400 hover:text-error hover:bg-error/10 transition-colors"
        aria-label="Remove field"
      >
        <X size={18} />
      </button>
    </div>
  );
};