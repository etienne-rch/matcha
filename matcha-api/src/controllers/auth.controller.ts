import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '@/models/User';
import { sendResetPasswordEmail } from '@/services/email';
import { RequestPasswordResetInput, ResetPasswordInput } from '@/types/user';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message:
          'Please verify your email address before logging in. Check your inbox for the verification link.',
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '24h' },
    );

    res.status(200).json({
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
    next(err);
  }
};

export const requestPasswordReset = async (
  req: Request<{}, {}, RequestPasswordResetInput>,
  res: Response,
): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Ne pas révéler si l'email existe ou non → sécurité
      res
        .status(200)
        .json({ message: 'If this email exists, a reset link has been sent.' });
      return;
    }

    // Génère un token brut (envoyé par email)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash du token (stocké en base)
    const tokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Enregistre le hash et une date d’expiration (15 min)
    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    // Envoie du mail avec le token brut
    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({
      message: 'If this email exists, a reset link has been sent.',
    });
  } catch (error) {
    console.error('❌ Error in requestPasswordReset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (
  req: Request<{}, {}, ResetPasswordInput>,
  res: Response,
): Promise<void> => {
  const { token, newPassword } = req.body;

  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    // Hash du nouveau mot de passe
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Mise à jour + suppression du token
    user.passwordHash = newPasswordHash;
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('❌ Error in resetPassword:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
