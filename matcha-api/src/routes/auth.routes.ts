import { Router } from "express";
import { body } from "express-validator";
import { login } from "@/controllers/auth.controller";
import { googleLogin } from "@/controllers/google.controller";

const router = Router();

/**
 * Endpoint : POST /api/auth/login
 * Vérifie les données et appelle le contrôleur login
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email invalide"),
    body("password")
      .isLength({ min: 12 }).withMessage("Mot de passe trop court (12 min)")
      .matches(/[A-Z]/).withMessage("Doit contenir une majuscule")
      .matches(/[a-z]/).withMessage("Doit contenir une minuscule")
      .matches(/[0-9]/).withMessage("Doit contenir un chiffre")
      .matches(/[^A-Za-z0-9]/).withMessage("Doit contenir un caractère spécial"),
  ],
  login
);

router.post("/google", googleLogin);

export default router;
