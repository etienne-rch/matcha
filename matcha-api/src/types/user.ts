export interface UserProfile {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  birthYear?: number;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  jobTypes?: string[];
  locationPref?: 'remote' | 'hybrid' | 'on-site';
  remote?: boolean;
  addressStreet?: string;
  addressCity?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  avatarUrl?: string;
  subscription: 'free' | 'premium';
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  consentAccepted: boolean;
}

export interface UserProfileUpdateInput {
  birthYear?: number;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  jobTypes?: string[];
  locationPref?: 'remote' | 'hybrid' | 'on-site';
  remote?: boolean;
  addressStreet?: string;
  addressCity?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  skillsAssessmentId?: string;
  personalityTestId?: string;
}
