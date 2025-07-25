import { z } from 'zod';

export const updateProfileSchema = z.object({
  birthYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
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
      coordinates: z.tuple([z.number(), z.number()]), // [lng, lat]
    })
    .optional(),
});
