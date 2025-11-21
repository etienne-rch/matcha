import { z } from 'zod';

import { emailSchema } from './email';
import { passwordSchema } from './password';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
