import express from 'express';

import { createUser, getUserById } from '@/controllers/user.controller';
import { validate } from '@/middlewares/validate';
import { createUserSchema } from '@/validators/user.validator';

const router = express.Router();

router.post('/', validate(createUserSchema), createUser);

router.get('/:id', getUserById);

export default router;
