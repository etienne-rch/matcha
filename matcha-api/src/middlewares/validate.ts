import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodSchema } from 'zod';

import { userUpdateSchema } from '@/validators/user.validator';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.format(),
      });
      return;
    }

    req.body = result.data;
    next();
  };

export const validateUserUpdate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = userUpdateSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation échouée',
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  // Protection des champs non modifiables
  const protectedFields = [
    'isEmailVerified',
    'emailVerificationToken',
    'emailVerificationTokenExpires',
    'consentAccepted',
    'consentTimestamp',
    'personalityTestId',
    'skillsAssessmentId',
    'subscription',
  ];

  const foundProtected = protectedFields.filter((field) => field in req.body);

  if (foundProtected.length > 0) {
    res.status(403).json({
      message: `Les champs suivants ne peuvent pas être modifiés : ${foundProtected.join(', ')}`,
    });
    return;
  }

  req.body = result.data;
  next();
};
