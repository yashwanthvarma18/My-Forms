import { create } from 'zustand';
import { FormResponse } from '../types/response';

interface ResponseStore {
  responses: FormResponse[];
  addResponse: (response: FormResponse) => void;
  getResponsesByFormId: (formId: string) => FormResponse[];
  getResponseSummary: (formId: string) => {
    totalResponses: number;
    lastResponseAt: Date | null;
  };
}

// Dummy data for testing
const dummyResponse: FormResponse = {
  id: '1',
  formId: '1',
  email: 'test@example.com',
  submittedAt: new Date('2024-03-15T10:30:00'),
  data: {
    name: 'John Doe',
    age: '30',
    feedback: 'Great survey!',
  },
};

export const useResponseStore = create<ResponseStore>((set, get) => ({
  responses: [dummyResponse],
  
  addResponse: (response) => {
    set((state) => ({
      responses: [...state.responses, response],
    }));
  },
  
  getResponsesByFormId: (formId) => {
    return get().responses.filter((response) => response.formId === formId);
  },
  
  getResponseSummary: (formId) => {
    const formResponses = get().getResponsesByFormId(formId);
    const lastResponse = formResponses[formResponses.length - 1];
    
    return {
      totalResponses: formResponses.length,
      lastResponseAt: lastResponse ? lastResponse.submittedAt : null,
    };
  },
}));