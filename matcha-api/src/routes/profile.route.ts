import { Router } from 'express';

import {
  deleteAccount,
  getProfile,
  updateProfile,
} from '@/controllers/profile.controller';
import { requireAuth } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import { updateProfileSchema } from '@/validators/profile.validator';

const router = Router();

router.post('/', requireAuth, validate(updateProfileSchema), updateProfile);

router.get('/', requireAuth, getProfile);

router.delete('/account', requireAuth, deleteAccount);

export default router;
