import { z } from 'zod';

import { passwordSchema } from './password';

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm: passwordSchema,
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'],
  });
