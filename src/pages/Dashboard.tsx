import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/formStore';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { FormGrid } from '../components/dashboard/FormGrid';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { ProfileMenu } from '../components/ProfileMenu';

export const Dashboard: React.FC = () => {
  const { forms, createForm, deleteForm } = useFormStore();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const handleCreateForm = () => {
    const form = createForm();
    navigate('/builder');
  };

  const handleDeleteForm = (id: string) => {
    setFormToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleEditForm = (id: string) => {
    navigate(`/builder/${id}`);
  };

  const handleViewForm = (id: string) => {
    navigate(`/form/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end p-4">
          <ProfileMenu />
        </div>
        
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <DashboardHeader onCreateForm={handleCreateForm} />
          
          <div className="mt-8">
            <FormGrid
              forms={forms}
              onEdit={handleEditForm}
              onDelete={handleDeleteForm}
              onView={handleViewForm}
            />
          </div>

          <DeleteConfirmation
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={() => {
              if (formToDelete) {
                deleteForm(formToDelete);
                setFormToDelete(null);
              }
            }}
            title={forms.find(f => f.id === formToDelete)?.title || ''}
          />
        </div>
      </div>
    </div>
  );
};