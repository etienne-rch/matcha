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

        personalityTestId: data.personalityTestId,
        skillsAssessmentId: data.skillsAssessmentId,

        personality: data.personality
          ? {
              type: data.personality.type,
              label: data.personality.label,
              description: data.personality.description,
              strengths: data.personality.strengths || [],
              weaknesses: data.personality.weaknesses || [],
              recommendedJobs: data.personality.recommendedJobs || [],
              scoreBreakdown: {
                EI: data.personality.scoreBreakdown?.EI ?? 0,
                SN: data.personality.scoreBreakdown?.SN ?? 0,
                TF: data.personality.scoreBreakdown?.TF ?? 0,
                JP: data.personality.scoreBreakdown?.JP ?? 0,
              },
            }
          : null,
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
