import { NextFunction, Request, Response } from 'express';

interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
