import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from '@/middlewares/error.middleware';
import authRoutes from '@/routes/auth.routes';
import healthRoutes from '@/routes/health.routes';
import personalityRoutes from '@/routes/personality.routes';
import profileRoutes from '@/routes/profile.routes';
import userRoutes from '@/routes/user.routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/personality', personalityRoutes);

app.use(errorHandler);

export default app;
