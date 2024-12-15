import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormField } from '../types/form';

interface FormStore {
  forms: Form[];
  currentForm: Form | null;
  createForm: () => void;
  updateForm: (form: Form) => void;
  deleteForm: (id: string) => void;
  setCurrentForm: (form: Form | null) => void;
  addField: (field: Omit<FormField, 'id'>) => void;
  updateField: (id: string, field: Partial<FormField>) => void;
  removeField: (id: string) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  publishForm: (id: string) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  forms: [],
  currentForm: null,
  createForm: () => {
    const newForm: Form = {
      id: uuidv4(),
      title: 'Untitled Form',
      description: '',
      fields: [],
      createdAt: new Date(),
      published: false,
    };
    set((state) => ({
      forms: [...state.forms, newForm],
      currentForm: newForm,
    }));
  },
  updateForm: (form) => {
    set((state) => ({
      forms: state.forms.map((f) => (f.id === form.id ? form : f)),
      currentForm: form,
    }));
  },
  deleteForm: (id) => {
    set((state) => ({
      forms: state.forms.filter((f) => f.id !== id),
      currentForm: state.currentForm?.id === id ? null : state.currentForm,
    }));
  },
  setCurrentForm: (form) => {
    set({ currentForm: form });
  },
  addField: (field) => {
    set((state) => {
      if (!state.currentForm) return state;
      const newField = { ...field, id: uuidv4() };
      const updatedForm = {
        ...state.currentForm,
        fields: [...state.currentForm.fields, newField],
      };
      return {
        currentForm: updatedForm,
        forms: state.forms.map((f) => (f.id === updatedForm.id ? updatedForm : f)),
      };
    });
  },
  updateField: (id, field) => {
    set((state) => {
      if (!state.currentForm) return state;
      const updatedForm = {
        ...state.currentForm,
        fields: state.currentForm.fields.map((f) =>
          f.id === id ? { ...f, ...field } : f
        ),
      };
      return {
        currentForm: updatedForm,
        forms: state.forms.map((f) => (f.id === updatedForm.id ? updatedForm : f)),
      };
    });
  },
  removeField: (id) => {
    set((state) => {
      if (!state.currentForm) return state;
      const updatedForm = {
        ...state.currentForm,
        fields: state.currentForm.fields.filter((f) => f.id !== id),
      };
      return {
        currentForm: updatedForm,
        forms: state.forms.map((f) => (f.id === updatedForm.id ? updatedForm : f)),
      };
    });
  },
  reorderFields: (fromIndex, toIndex) => {
    set((state) => {
      if (!state.currentForm) return state;
      const fields = [...state.currentForm.fields];
      const [removed] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, removed);
      const updatedForm = { ...state.currentForm, fields };
      return {
        currentForm: updatedForm,
        forms: state.forms.map((f) => (f.id === updatedForm.id ? updatedForm : f)),
      };
    });
  },
  publishForm: (id) => {
    set((state) => ({
      forms: state.forms.map((f) =>
        f.id === id ? { ...f, published: true } : f
      ),
      currentForm: state.currentForm?.id === id
        ? { ...state.currentForm, published: true }
        : state.currentForm,
    }));
  },
}));