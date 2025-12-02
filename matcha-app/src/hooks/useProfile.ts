import { useEffect, useState } from 'react';

import { getProfile } from '@/api/profile';
import { UserFull } from '@/types/user';

export function useProfile() {
  const [user, setUser] = useState<UserFull | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const raw = await getProfile();
      const data = raw.user;

      const normalized: UserFull = {
        id: data._id,
        email: data.email,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        birthYear: data.birthYear,
        gender: data.gender,
        subscription: data.subscription ?? 'free',

        addressStreet: data.addressStreet,
        addressCity: data.addressCity,
        addressPostalCode: data.addressPostalCode,
        addressCountry: data.addressCountry,

        jobTypes: data.jobTypes || [],
        locationPref: data.locationPref,
        remote: data.remote,

        location: data.location,

        avatarUrl: data.avatarUrl,

        isEmailVerified: data.isEmailVerified,
        consentAccepted: data.consentAccepted,
        consentEmail: data.consentEmail,
        consentData: data.consentData,
      };

      setUser(normalized);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    user,
    loading,
    refresh: load,
  };
}
