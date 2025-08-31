import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '@/services/email';

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
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!regex.test(newPassword)) {
      res.status(400).json({ message: 'Password does not meet complexity requirements' });
      return;
    }
  
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    user.resetPasswordTokenUsed = true; // Marquer comme utilisé
  
    await user.save();
  
    //nvalider les sessions / refresh tokens ici
  
    res.status(200).json({ message: 'Mot de passe modifié avec succès' });
  };
  

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
  