import express from 'express';

import {
  createUser,
  getUserById,
  updateUser,
  verifyEmail,
} from '@/controllers/user.controller';
import { validate, validateUserUpdate } from '@/middlewares/validate';
import { createUserSchema } from '@/validators/user.validator';

const router = express.Router();

router.post('/', validate(createUserSchema), createUser);

router.get('/verify-email', verifyEmail);

router.get('/:id', getUserById);

router.put('/profile/:id', validateUserUpdate, updateUser);

export default router;