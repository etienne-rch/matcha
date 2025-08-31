import express from 'express';

import { resetPassword } from '@/controllers/password.controller';
import { forgotPassword } from '@/controllers/password.controller';

const router = express.Router();

router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

export default router;
