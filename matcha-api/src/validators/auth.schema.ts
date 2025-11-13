import { z } from 'zod';

import { passwordSchema } from './password.schema';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: passwordSchema,
});

export const requestPasswordResetSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10, { message: 'Invalid or missing token' }),
  newPassword: passwordSchema,
});
