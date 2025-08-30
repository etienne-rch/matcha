import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(400).json({ message: 'Token and new password are required' });
    return;
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpires: { $gt: new Date() },
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

  await user.save();

  // TODO : Invalider les sessions / JWT (si tu stockes côté DB ou utilise un refresh token)
  res.status(200).json({ message: 'Mot de passe modifié avec succès' });
};
