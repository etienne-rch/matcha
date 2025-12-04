import { PersonalityResult } from '@/api/personality';

export type AuthStackParamList = {
  Login: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

export type CommonStackParamList = {
  Home: undefined;
  PersonalityTest: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  PersonalityTest: undefined;
  PersonalityResult: {
    result: PersonalityResult;
  };
};
