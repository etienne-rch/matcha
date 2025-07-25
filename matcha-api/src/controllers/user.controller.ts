import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';

import User from '@/models/User';
import { sendValidationEmail } from '@/services/email';
import { userUpdateSchema } from '@/validators/user.validator';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, consentAccepted } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      email,
      passwordHash,
      firstName,
      lastName,
      consentAccepted,
      emailVerificationToken,
      emailVerificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60), // 1h
    });

    await user.save();

    await sendValidationEmail(email, emailVerificationToken);

    res.status(201).json({
      message:
        'User created successfully. Please check your email to verify your account.',
      userId: user._id,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await User.findById(id).select('-passwordHash');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    res.status(400).json({ message: 'Invalid or missing token' });
    return;
  }

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Email successfully verified' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    res
      .status(400)
      .json({ message: 'ID invalide (attendu: ObjectId MongoDB)' });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    const updatableFields = Object.keys(userUpdateSchema.shape);

    for (const field of updatableFields) {
      if (req.body[field] !== undefined) {
        if (field === 'password') {
          // Si mot de passe transmis, on le hash dans `passwordHash`
          const hashed = await bcrypt.hash(req.body.password, 10);
          user.passwordHash = hashed;
        } else {
          (user as any)[field] = req.body[field];
        }
      }
    }

    await user.save();

    res.status(200).json({
      message: 'Profil mis à jour avec succès',
      user: {
        ...user.toObject(),
        passwordHash: undefined, // sécurité : on ne retourne pas le hash
        __v: undefined, // optionnel : on masque d'autres métadonnées internes
      },
    });
    return;
  } catch (error) {
    console.error('[updateUser]', error);
    res.status(500).json({ message: 'Erreur serveur', error });
    return;
  }
};
