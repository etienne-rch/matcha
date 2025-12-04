export interface PersonalitySummary {
  type: string; // "INTJ"
  label: string; // "Le Stratège"
  description: string; // Texte complet
  strengths: string[]; // Ex: ["Créatif", "Logique"]
  weaknesses: string[]; // Ex: ["Impulsif", "Impatient"]
  recommendedJobs: string[]; // Ex: ["Product Manager", "UX Designer"]

  scoreBreakdown: {
    EI: number;
    SN: number;
    TF: number;
    JP: number;
  };
}

export interface UserFull {
  id: string;

  email: string;
  firstName: string;
  lastName: string;

  birthYear?: number;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  subscription: 'free' | 'premium';

  addressStreet?: string;
  addressCity?: string;
  addressPostalCode?: string;
  addressCountry?: string;

  locationPref?: 'remote' | 'hybrid' | 'on-site';
  remote?: boolean;
  jobTypes?: string[];

  avatarUrl?: string;

  isEmailVerified: boolean;
  consentAccepted: boolean;
  consentEmail?: boolean;
  consentData?: boolean;

  personalityTestId?: string;
  skillsAssessmentId?: string;

  location?: {
    type: 'Point';
    coordinates: [number, number];
  };

  personality?: PersonalitySummary | null;
}
