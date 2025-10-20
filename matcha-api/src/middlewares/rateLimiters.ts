import rateLimit from 'express-rate-limit';

export const forgotPasswordLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Max 5 requêtes dans ce laps de temps
  message: 'Trop de tentatives, réessayez plus tard.',
});

