import { Document, Types } from 'mongoose';
import z from 'zod';

import { updateProfileSchema } from '@/validators/profile.schema';

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
  consentAccepted: boolean;
  consentTimestamp?: Date | string;
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

export type UserProfileUpdateInput = z.infer<typeof updateProfileSchema>;

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  consentAccepted: boolean;
  consentTimestamp?: Date;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  subscription: 'free' | 'premium';
  birthYear?: number;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  jobTypes?: string[];
  locationPref?: 'remote' | 'hybrid' | 'on-site';
  remote?: boolean;
  avatarUrl?: string;
  avatarPublicId?: string;
  avatarUploadedAt?: Date;
  addressStreet?: string;
  addressCity?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  personalityTestId?: Types.ObjectId;
  skillsAssessmentId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestPasswordResetInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}
