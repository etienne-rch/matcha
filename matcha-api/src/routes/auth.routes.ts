import { Router } from "express";
import { body } from "express-validator";
import { login } from "@/controllers/user.controller";
import { googleLogin } from "@/controllers/user.controller";
import { loginValidator } from "@/middlewares/authValidators";

const router = Router();

/**
 * Endpoint: POST /api/auth/login
 * Validates the input data and calls the login controller
 */
router.post("/login", loginValidator, login);

router.post("/google", googleLogin);

export default router;
