import { z } from 'zod';

import { emailSchema } from './email';

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
