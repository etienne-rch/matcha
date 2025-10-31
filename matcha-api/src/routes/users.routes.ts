import express from 'express';

import {
  createUser,
  getUserById,
  verifyEmail,
} from '@/controllers/user.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createUserSchema } from '@/validators/user.schema';

const router = express.Router();

router.post('/', validate(createUserSchema), createUser);

router.get('/verify-email', verifyEmail);

router.get('/:id', getUserById);

export default router;
