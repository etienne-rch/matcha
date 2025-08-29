import { Router } from "express";
import { body } from "express-validator";
import { login } from "@/controllers/auth.controller";
import { loginValidator } from "@/middlewares/validators/authValidators";
import { googleLogin } from "@/controllers/google.controller";

const router = Router();

/**
 * Endpoint : POST /api/auth/login
 * Vérifie les données et appelle le contrôleur login
 */
router.post("/login", loginValidator, login);

router.post("/google", googleLogin);

export default router;
