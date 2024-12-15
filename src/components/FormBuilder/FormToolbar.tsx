import React, { useState } from 'react';
import { Save, Eye, Share2, ArrowLeft } from 'lucide-react';
import { ShareLinkDialog } from '../ShareLinkDialog';

interface FormToolbarProps {
  formId: string;
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
}

export const FormToolbar: React.FC<FormToolbarProps> = ({
  formId,
  onPreview,
  onSave,
  onPublish,
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handlePublish = async () => {
    await onPublish();
    setShowShareDialog(true);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={onPreview}
            className="inline-flex items-center px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Eye className="h-5 w-5 mr-2" />
            Preview
          </button>
          
          <button
            onClick={onSave}
            className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            <Save className="h-5 w-5 mr-2" />
            Save
          </button>
          
          <button
            onClick={handlePublish}
            className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Publish
          </button>
        </div>
      </div>

      <ShareLinkDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
        formId={formId}
      />
    </>
  );
};