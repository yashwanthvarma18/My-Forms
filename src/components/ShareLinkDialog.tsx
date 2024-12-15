import React, { useState } from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

export const ShareLinkDialog: React.FC<Props> = ({ isOpen, onClose, formId }) => {
  const [copied, setCopied] = useState(false);
  const shareableLink = `${window.location.origin}/form/${formId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-scale-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Share Form</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Share this link with others to collect responses
        </p>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="flex-1 p-2 border rounded-md bg-gray-50 text-sm"
          />
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none"
          >
            {copied ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};