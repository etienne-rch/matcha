import { Router } from 'express';

import { login } from '@/controllers/auth.controller';
import { validate } from '@/middlewares/validate.middleware';
import { loginSchema } from '@/validators/login.schema';

const router = Router();

router.post('/login', validate(loginSchema), login);

export default router;
