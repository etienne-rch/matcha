import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '@/models/User';
import { sendResetPasswordEmail } from '@/services/email'; // à créer

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Réponse générique par défaut
  const genericMessage = 'Email envoyé si compte existant';

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    // Réponse immédiate si utilisateur non trouvé (pour ne pas leak)
    if (!user) return res.status(200).json({ message: genericMessage });

    // Invalider tout ancien token
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    user.resetPasswordTokenUsed = false;

    // Générer un token sécurisé
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = expires;
    user.resetPasswordTokenUsed = false;

    await user.save();

    // Envoyer email avec le lien
    await sendResetPasswordEmail(user.email, token);

    return res.status(200).json({ message: genericMessage });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
