import { UserProfile } from '@/types/user';

export const mapUserToProfile = (user: any): UserProfile => ({
  _id: user._id.toString(),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  birthYear: user.birthYear,
  gender: user.gender,
  jobTypes: user.jobTypes,
  locationPref: user.locationPref,
  remote: user.remote,
  addressStreet: user.addressStreet,
  addressCity: user.addressCity,
  addressPostalCode: user.addressPostalCode,
  addressCountry: user.addressCountry,
  location: user.location,
  avatarUrl: user.avatarUrl,
  subscription: user.subscription,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
