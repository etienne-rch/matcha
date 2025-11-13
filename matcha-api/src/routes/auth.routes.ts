import { Router } from 'express';

import {
  login,
  requestPasswordReset,
  resetPassword,
} from '@/controllers/auth.controller';
import { validate } from '@/middlewares/validate.middleware';
import {
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '@/validators/auth.schema';

const router = Router();

router.post('/login', validate(loginSchema), login);

router.post(
  '/request-reset',
  validate(requestPasswordResetSchema),
  requestPasswordReset,
);

router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;
