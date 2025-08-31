import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Email invalide"),

  body("password")
    .isLength({ min: 12 })
    .withMessage("Mot de passe trop court (12 min)")
    .matches(/[A-Z]/)
    .withMessage("Doit contenir une majuscule")
    .matches(/[a-z]/)
    .withMessage("Doit contenir une minuscule")
    .matches(/[0-9]/)
    .withMessage("Doit contenir un chiffre")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Doit contenir un caractère spécial"),
];
