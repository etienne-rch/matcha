import { Router } from 'express';

import {
  changePassword,
  deleteAccount,
  getProfile,
  updateProfile,
} from '@/controllers/profile.controller';
import { requireAuth } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';
import {
  changePasswordSchema,
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

export default router;
