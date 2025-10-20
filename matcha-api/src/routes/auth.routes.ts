import { Router } from "express";
import { body } from "express-validator";
import rateLimit from 'express-rate-limit';
import { login } from "@/controllers/user.controller";
import { googleLogin } from "@/controllers/user.controller";
import { loginValidator } from "@/middlewares/authValidators";
import { forgotPasswordLimiter } from '@/middlewares/rateLimiters';
import { resetPassword } from '@/controllers/auth.controller';
import { forgotPassword } from '@/controllers/auth.controller';



const router = Router();

/**
 * Endpoint: POST /api/auth/login
 * Validates the input data and calls the login controller
 */
router.post("/login", loginValidator, login);

router.post("/google", googleLogin);

router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);

router.post('/reset-password', resetPassword);

export default router;







