import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "@/models/User";

/**
 * Contrôleur de connexion utilisateur
 */
export const login = async (req: Request, res: Response) => {
  // Vérification des erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Chercher utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur inexistant" });
    }

    // Vérifier le mot de passe hashé
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un JWT valide 24h
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "changeme",
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
