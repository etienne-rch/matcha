import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import User from '@/models/User';
import { sendValidationEmail } from '@/services/email';
import { UserRegisterInput } from '@/types/user';

/**
 * Create new user (registration)
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, consentAccepted } =
      req.body as UserRegisterInput;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      consentAccepted,
      emailVerificationToken,
      emailVerificationTokenExpires: new Date(Date.now() + 3600 * 1000), // 1h
    });

    // Skip sending email in tests
    if (process.env.NODE_ENV !== 'test') {
      await sendValidationEmail(email, emailVerificationToken);
    }

    res.status(201).json({
      message:
        'User created successfully. Please check your email to verify your account.',
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(error);
  }
};

/**
 * Verify email from token
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invalid Token</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
            .container { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
            h1 { color: #e74c3c; }
            p { color: #555; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>❌ Token invalide</h1>
            <p>Le lien de vérification est invalide ou manquant.</p>
            <p>Veuillez utiliser le lien reçu par email ou demander un nouveau lien.</p>
          </div>
        </body>
      </html>
    `);
    return;
  }

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Token Expired</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
              .container { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
              h1 { color: #e67e22; }
              p { color: #555; line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>⏰ Token expiré</h1>
              <p>Le lien de vérification a expiré ou est invalide.</p>
              <p>Veuillez demander un nouveau lien de vérification.</p>
            </div>
          </body>
        </html>
      `);
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Verified</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
            .container { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
            h1 { color: #27ae60; }
            p { color: #555; line-height: 1.6; }
            .success-icon { font-size: 64px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✅</div>
            <h1>Email vérifié avec succès !</h1>
            <p>Votre adresse email a été vérifiée.</p>
            <p>Vous pouvez maintenant vous connecter à l'application Matcha.</p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
};
