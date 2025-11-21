import { z } from 'zod';

import { passwordSchema } from './password.schema';

export const createUserSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: passwordSchema,
  consentAccepted: z.literal(true),
});
