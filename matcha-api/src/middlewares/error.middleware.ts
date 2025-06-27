import { Request, Response } from 'express';

export const errorHandler = (err: any, _req: Request, res: Response) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Erreur inconnue',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
