export interface FormResponse {
  id: string;
  formId: string;
  email: string;
  submittedAt: Date;
  data: Record<string, any>;
}

export interface FormResponseSummary {
  formId: string;
  totalResponses: number;
  lastResponseAt: Date | null;
}