import { z } from 'zod';

import { passwordSchema } from './password.schema';

export const updateProfileSchema = z
  .object({
    // Identité
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),

    // Données personnelles
    birthYear: z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear())
      .optional(),

    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
    subscription: z.enum(['free', 'premium']).optional(),

    // Emploi & localisation
    jobTypes: z.array(z.string()).optional(),
    locationPref: z.enum(['remote', 'hybrid', 'on-site']).optional(),
    remote: z.boolean().optional(),

    // Avatar
    avatarUrl: z.string().optional(),
    avatarPublicId: z.string().optional(),
    avatarUploadedAt: z.string().datetime().optional(),

    consentAccepted: z.boolean().optional(),

    // Relations
    personalityTestId: z.string().optional(),
    skillsAssessmentId: z.string().optional(),

    // Adresse
    addressStreet: z.string().optional(),
    addressCity: z.string().optional(),
    addressPostalCode: z.string().optional(),
    addressCountry: z.string().optional(),

    // Géolocalisation
    location: z
      .object({
        type: z.literal('Point').optional(),
        coordinates: z
          .tuple([z.number(), z.number()])
          .refine(
            ([lng, lat]) => Math.abs(lng) <= 180 && Math.abs(lat) <= 90,
            'Coordinates must be valid longitude/latitude',
          )
          .optional(),
      })
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Old password is required' }),
  newPassword: passwordSchema,
  confirmNewPassword: z.string(),
});

export const requestEmailChangeSchema = z.object({
  newEmail: z.string().email({ message: 'Invalid email format' }),
});
