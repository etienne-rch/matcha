import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import crypto from 'crypto';
import { sendResetPasswordEmail } from '@/services/email';
import jwt from "jsonwebtoken";
import User from "@/models/User";


// import bcrypt from 'bcryptjs';


/**
 * User login controller
 */
export const login = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    if (!user.passwordHash) {
      return res.status(401).json({ message: "User has no local password" });
    }
    
    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }



    // Generate a JWT valid for 24h
    const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      jwtVersion: user.jwtVersion, // ✅ Ajout de la version pour invalider les anciens tokens
    },
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
    return res.status(500).json({ message: "Internal server error" });
  }
};
/**
 * User resetPassword controller
 */

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;
  
    if (!token || !newPassword) {
      res.status(400).json({ message: 'Token and new password are required' });
      return;
    }
  
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: new Date() },
      resetPasswordTokenUsed: false, 
    });
  
    if (!user) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }
  
    // Vérifier complexité du mot de passe
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    if (!regex.test(newPassword)) {
      res.status(400).json({ message: 'Password does not meet complexity requirements' });
      return;
    }
  
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    user.resetPasswordTokenUsed = true; // Marquer comme utilisé
  
    user.jwtVersion += 1;
    await user.save();
  
    //nvalider les sessions / refresh tokens ici
  
    res.status(200).json({ message: 'Mot de passe modifié avec succès' });
  };

/**
 * User forgotPassword controller
 */

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const genericMessage = 'Email envoyé si compte existant';
  
    if (!email) {
      return res.status(400).json({ message: 'Email requis' });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(200).json({ message: genericMessage }); // Pas de leak
      }
  
      // Ne générer un nouveau token que si aucun token valide n’existe déjà
      if (
        user.resetPasswordToken &&
        user.resetPasswordTokenExpires &&
        user.resetPasswordTokenExpires > new Date() &&
        user.resetPasswordTokenUsed === false
      ) {
        return res.status(200).json({ message: genericMessage });
      }
  
      // Générer un nouveau token sécurisé
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  
      user.resetPasswordToken = token;
      user.resetPasswordTokenExpires = expires;
      user.resetPasswordTokenUsed = false;
  
      await user.save();
  
      await sendResetPasswordEmail(user.email, token);
  
      return res.status(200).json({ message: genericMessage });
    } catch (error) {
      console.error('Erreur forgot-password:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  