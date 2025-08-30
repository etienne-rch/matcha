import express from 'express';
import { requestResetPassword } from '@/controllers/password.controller';
import { resetPassword } from '@/controllers/password.controller';

const router = express.Router();

router.post('/request-reset-password', requestResetPassword);
router.post('/reset-password', resetPassword);

export default router;
