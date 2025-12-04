import { z } from 'zod';

import { emailSchema } from './email';
import { passwordSchema } from './password';

export const registrationSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: emailSchema,
  password: passwordSchema,
});
