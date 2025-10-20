import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; 

const JWT_SECRET = process.env.JWT_SECRET!;

interface JwtPayload {
  id: string;
  jwtVersion: number;
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // on compare la jwtVersion stockée dans le token vs celle en DB
    const user = await User.findById(payload.id);
    if (!user || user.jwtVersion !== payload.jwtVersion) {
      return res.status(401).json({ message: 'Token invalidated' });
    }

    // Authentifié
    req.user = { id: user._id };
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
