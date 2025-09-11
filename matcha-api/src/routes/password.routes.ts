import express from 'express';
import rateLimit from 'express-rate-limit';

import { resetPassword } from '@/controllers/password.controller';
import { forgotPassword } from '@/controllers/password.controller';

const router = express.Router();

const forgotPasswordLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // max 5 tentatives dans ce laps de temps
    message: 'Trop de tentatives, réessayez plus tard.',
  });
  
  router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);


  router.post('/reset-password', resetPassword);
  router.post('/forgot-password', forgotPassword);

export default router;
