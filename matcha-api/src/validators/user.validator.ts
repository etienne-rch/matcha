import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/, {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  consentAccepted: z.literal(true),
});
