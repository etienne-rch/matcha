import api from './api';

export interface PersonalityOption {
  value: number;
  label: string;
}

export interface PersonalityQuestion {
  id: string;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  options: PersonalityOption[];
}

export interface PersonalityProfile {
  key: string;
  label: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  recommendedJobs: string[];
}

export interface PersonalityTemplate {
  _id: string;
  title: string;
  summary: string;
  isActive: boolean;
  version: string;
  profiles: PersonalityProfile[];
  questions: PersonalityQuestion[];
}

export interface PersonalityAnswer {
  questionId: string;
  value: number;
}

export interface PersonalityResult {
  type: string;
  label: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  recommendedJobs: string[];
  scoreBreakdown: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
  testId: string;
}

export interface TestStatus {
  completed: boolean;
  testId?: string;
  personalityType?: string;
  message?: string;
  test?: PersonalityTemplate;
}

export const getActivePersonalityTest = async (): Promise<TestStatus> => {
  const response = await api.get('/api/personality/active');
  return response.data;
};

export const submitPersonalityTest = async (
  answers: PersonalityAnswer[],
): Promise<PersonalityResult> => {
  const response = await api.post('/api/personality/submit', { answers });
  return response.data.data;
};
