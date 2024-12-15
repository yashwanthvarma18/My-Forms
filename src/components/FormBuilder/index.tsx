import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormStore } from '../../store/formStore';
import { useToastStore } from '../../store/toastStore';
import { FormToolbar } from './FormToolbar';
import { FormContent } from './FormContent';
import { PreviewDialog } from '../PreviewDialog';
import { ToastContainer } from '../Toast/ToastContainer';
import { ResponsesTab } from '../responses/ResponsesTab';
import { useFormActions } from './useFormActions';

export const FormBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'builder' | 'responses'>('builder');
  const { forms, currentForm, setCurrentForm } = useFormStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (id) {
      const form = forms.find(f => f.id === id);
      if (form) {
        setCurrentForm(form);
      }
    }
  }, [id, forms, setCurrentForm]);

  const handleSave = () => {
    if (currentForm) {
      useFormStore.getState().updateForm(currentForm);
      addToast('Form saved successfully', 'success');
    }
  };

  const handlePublish = () => {
    if (currentForm) {
      useFormStore.getState().publishForm(currentForm.id);
      addToast('Form published successfully', 'success');
    }
  };

  if (!currentForm) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Loading form...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <FormToolbar
          onPreview={() => setShowPreview(true)}
          onSave={handleSave}
          onPublish={handlePublish}
        />

        <div className="border-b border-gray-200 bg-white">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('builder')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'builder'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Form Builder
            </button>
            <button
              onClick={() => setActiveTab('responses')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'responses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Responses
            </button>
          </nav>
        </div>

        {activeTab === 'builder' ? (
          <FormContent
            form={currentForm}
            onUpdateForm={setCurrentForm}
          />
        ) : (
          <ResponsesTab formId={currentForm.id} />
        )}
        
        <PreviewDialog
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title={currentForm.title}
          description={currentForm.description}
          fields={currentForm.fields}
        />

        <ToastContainer />
      </div>
    </div>
  );
};