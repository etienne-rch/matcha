import express from 'express';
import { resetPassword } from '@/controllers/password.controller';

const router = express.Router();

router.post('/reset-password', resetPassword);

export default router;
