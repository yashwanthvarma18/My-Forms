import React from 'react';
import { ClipboardList } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border-2 border-dashed border-gray-200 animate-fade-in">
      <div className="w-16 h-16 mb-4 text-gray-400 bg-gray-50 rounded-full flex items-center justify-center">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">No forms yet</h3>
      <p className="text-gray-500 text-center max-w-sm">
        Get started by creating your first form using the button above
      </p>
    </div>
  );
};