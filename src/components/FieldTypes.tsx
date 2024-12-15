import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { TextIcon, Hash, Calendar, CheckSquare, List, Radio } from 'lucide-react';
import { FieldType } from '../types/form';

interface FieldTypeItem {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const fieldTypes: FieldTypeItem[] = [
  { type: 'text', label: 'Text Input', icon: <TextIcon size={20} />, color: 'rgb(99, 102, 241)' },
  { type: 'number', label: 'Number Input', icon: <Hash size={20} />, color: 'rgb(236, 72, 153)' },
  { type: 'date', label: 'Date Picker', icon: <Calendar size={20} />, color: 'rgb(139, 92, 246)' },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={20} />, color: 'rgb(16, 185, 129)' },
  { type: 'select', label: 'Dropdown Select', icon: <List size={20} />, color: 'rgb(245, 158, 11)' },
  { type: 'radio', label: 'Radio Buttons', icon: <Radio size={20} />, color: 'rgb(239, 68, 68)' },
];

const DraggableFieldType: React.FC<FieldTypeItem> = ({ type, label, icon, color }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `field-type-${type}`,
    data: { type },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="field-card w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 group"
    >
      <span className="flex-shrink-0 p-2 rounded-md transition-colors" style={{ color, backgroundColor: `${color}10` }}>
        {icon}
      </span>
      <span className="ml-3 text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
        {label}
      </span>
    </button>
  );
};

export const FieldTypes: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Field Types
      </h2>
      <div className="space-y-2">
        {fieldTypes.map((fieldType) => (
          <DraggableFieldType key={fieldType.type} {...fieldType} />
        ))}
      </div>
    </div>
  );
};