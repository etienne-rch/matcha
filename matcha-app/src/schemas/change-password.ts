import { z } from 'zod';

import { passwordSchema } from './password';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmNewPassword'],
  });
