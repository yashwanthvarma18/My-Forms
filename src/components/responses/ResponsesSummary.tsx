import React from 'react';
import { FileText, Clock } from 'lucide-react';

interface Props {
  summary: {
    totalResponses: number;
    lastResponseAt: Date | null;
  };
}

export const ResponsesSummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg p-6 shadow-elevation hover:shadow-elevation-hover transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Responses</p>
            <p className="text-2xl font-bold text-gray-900">{summary.totalResponses}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-elevation hover:shadow-elevation-hover transition-shadow">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Clock className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Response</p>
            <p className="text-2xl font-bold text-gray-900">
              {summary.lastResponseAt
                ? summary.lastResponseAt.toLocaleDateString()
                : 'No responses yet'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};