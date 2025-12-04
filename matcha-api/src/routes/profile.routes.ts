import { Router } from 'express';

import {
  changePassword,
  deleteAccount,
  getProfile,
  requestEmailChange,
  updateProfile,
} from '@/controllers/profile.controller';
import { requireAuth } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';
import {
  changePasswordSchema,
  requestEmailChangeSchema,
  updateProfileSchema,
} from '@/validators/profile.schema';

const router = Router();

router.patch('/', requireAuth, validate(updateProfileSchema), updateProfile);

router.get('/', requireAuth, getProfile);

router.delete('/account', requireAuth, deleteAccount);

router.post(
  '/change-password',
  requireAuth,
  validate(changePasswordSchema),
  changePassword,
);

router.post(
  '/request-email-change',
  requireAuth,
  validate(requestEmailChangeSchema),
  requestEmailChange,
);

export default router;
