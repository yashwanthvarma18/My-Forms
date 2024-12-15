import React from 'react';
import { FormResponse } from '../../types/response';
import { Mail, Calendar } from 'lucide-react';

interface Props {
  responses: FormResponse[];
}

export const ResponsesList: React.FC<Props> = ({ responses }) => {
  if (responses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">No responses received yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-elevation overflow-hidden">
      <div className="divide-y divide-gray-200">
        {responses.map((response) => (
          <div
            key={response.id}
            className="p-6 hover:bg-gray-50 transition-colors animate-fade-in"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {response.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {response.submittedAt.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(response.data).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-500">{key}</p>
                    <p className="mt-1 text-sm text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};