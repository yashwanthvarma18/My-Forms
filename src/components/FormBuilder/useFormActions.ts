import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../../store/formStore';
import { useToastStore } from '../../store/toastStore';
import { Form } from '../../types/form';

export const useFormActions = (currentForm: Form | null) => {
  const navigate = useNavigate();
  const { updateForm, publishForm } = useFormStore();
  const { addToast } = useToastStore();

  const handleSave = () => {
    if (!currentForm) return;
    updateForm(currentForm);
    addToast('Form saved successfully', 'success');
  };

  const handlePublish = () => {
    if (!currentForm) return;
    publishForm(currentForm.id);
    addToast('Form published successfully', 'success');
    navigate(`/form/${currentForm.id}`);
  };

  return {
    handleSave,
    handlePublish,
  };
};