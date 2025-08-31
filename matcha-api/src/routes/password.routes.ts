import express from 'express';

import { forgotPassword } from '@/controllers/password.controller';

const router = express.Router();
router.post('/forgot-password', forgotPassword);

export default router;
