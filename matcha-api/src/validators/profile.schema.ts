import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    birthYear: z
      .number()
      .int()
      .min(1900, { message: 'Birth year must be >= 1900' })
      .max(new Date().getFullYear(), {
        message: 'Birth year cannot be in the future',
      })
      .optional(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
    jobTypes: z.array(z.string()).optional(),
    locationPref: z.enum(['remote', 'hybrid', 'on-site']).optional(),
    remote: z.boolean().optional(),
    skillsAssessmentId: z.string().optional(),
    personalityTestId: z.string().optional(),
    addressStreet: z.string().optional(),
    addressCity: z.string().optional(),
    addressPostalCode: z.string().optional(),
    addressCountry: z.string().optional(),
    location: z
      .object({
        type: z.literal('Point'),
        coordinates: z
          .tuple([z.number(), z.number()])
          .refine(([lng, lat]) => Math.abs(lng) <= 180 && Math.abs(lat) <= 90, {
            message: 'Coordinates must be valid longitude/latitude',
          }),
      })
      .optional(),
  })
  .strict();
