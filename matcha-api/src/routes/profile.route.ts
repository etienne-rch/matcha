import { Router } from 'express';

import {
  deleteAccount,
  getProfile,
  updateProfile,
} from '@/controllers/profile.controller';
import { requireAuth } from '@/middlewares/auth.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { updateProfileSchema } from '@/validators/profile.schema';

const router = Router();

router.patch('/', requireAuth, validate(updateProfileSchema), updateProfile);

router.get('/', requireAuth, getProfile);

router.delete('/account', requireAuth, deleteAccount);

export default router;
