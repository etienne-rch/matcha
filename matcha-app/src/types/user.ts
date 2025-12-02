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
}
