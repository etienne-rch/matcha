import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "@/models/User";

// --- Initialiser le client Google OAuth2 avec l'ID client défini dans .env ---
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Contrôleur : Connexion via un compte Google
 * Étapes :
 * 1. Récupérer le token envoyé par le client (idToken)
 * 2. Vérifier ce token auprès des serveurs Google
 * 3. Extraire les informations de l'utilisateur depuis le payload
 * 4. Vérifier si l'utilisateur existe déjà en base
 *    - Si non, créer un nouvel utilisateur avec les infos Google
 * 5. Générer un JWT interne à l'application (valide 24h)
 * 6. Retourner le token + les infos de l'utilisateur
 */
export const googleLogin = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  try {
    // Vérification du token auprès de Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    }).catch(() => null);
    
    if (!ticket) {
      return res.status(401).json({ message: "Token Google invalide" });
    }

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Token Google invalide" });
    }

    const { email, given_name, family_name, picture } = payload;

    // --- Vérifier si l'utilisateur existe déjà en base ---
    let user = await User.findOne({ email });

    // Si non existant, on le crée avec les infos fournies par Google
    if (!user) {
      user = await User.create({
        email,
        firstName: given_name,
        lastName: family_name,
        avatarUrl: picture,
        passwordHash: "", // Les utilisateurs Google n'ont pas de mot de passe local
        consentAccepted: true, // Obligatoire d'après ton UserSchema
      });
    }

    // --- Générer un JWT valable 24h ---
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "changeme",
      { expiresIn: "24h" }
    );

    // --- Retourner le token + infos utilisateur ---
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Erreur Google login:", error);
    return res.status(500).json({ message: "Erreur connexion Google" });
  }
};
