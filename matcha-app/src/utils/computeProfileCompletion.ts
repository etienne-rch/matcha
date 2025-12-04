import { UserFull } from '@/types/user';

export function computeProfileCompletion(user: UserFull) {
  let score = 0;
  const total = 6;

  if (user.firstName && user.lastName) score++;
  if (user.addressCity) score++;
  if (user.locationPref) score++;
  if (user.isEmailVerified) score++;
  if (user.jobTypes) score++;
  if (user.birthYear) score++;

  return Math.round((score / total) * 100);
}
