import express from 'express';

import {
  getActiveTest,
  submitTest,
} from '@/controllers/personality.controller';
import { requireAuth } from '@/middlewares/auth.middleware';

const router = express.Router();

router.get('/active', requireAuth, getActiveTest);

router.post('/submit', requireAuth, submitTest);

export default router;
