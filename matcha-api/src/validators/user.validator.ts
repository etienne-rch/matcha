import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  firstName: z.string(),
  lastName: z.string(),
  consentAccepted: z.literal(true),
});
