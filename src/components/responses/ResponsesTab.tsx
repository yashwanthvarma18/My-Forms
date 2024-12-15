import React from 'react';
import { useResponseStore } from '../../store/responseStore';
import { ResponsesList } from './ResponsesList';
import { ResponsesSummary } from './ResponsesSummary';
import { Download } from 'lucide-react';

interface Props {
  formId: string;
}

export const ResponsesTab: React.FC<Props> = ({ formId }) => {
  const { getResponsesByFormId, getResponseSummary } = useResponseStore();
  const responses = getResponsesByFormId(formId);
  const summary = getResponseSummary(formId);

  const handleDownloadCSV = () => {
    if (responses.length === 0) return;

    // Get all unique fields from responses
    const fields = new Set<string>();
    responses.forEach(response => {
      Object.keys(response.data).forEach(key => fields.add(key));
    });

    // Create CSV header
    const headers = ['Email', 'Submitted At', ...Array.from(fields)];
    
    // Create CSV rows
    const rows = responses.map(response => {
      const row = [
        response.email,
        response.submittedAt.toLocaleString(),
        ...Array.from(fields).map(field => response.data[field] || ''),
      ];
      return row.join(',');
    });

    // Combine headers and rows
    const csv = [headers.join(','), ...rows].join('\n');
    
    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-responses-${formId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Form Responses
        </h2>
        <button
          onClick={handleDownloadCSV}
          disabled={responses.length === 0}
          className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4 mr-2" />
          Download All
        </button>
      </div>

      <ResponsesSummary summary={summary} />
      <ResponsesList responses={responses} />
    </div>
  );
};