import express from 'express';

import { errorHandler } from '@/middlewares/error.middleware';
import healthRoutes from '@/routes/health.routes';
import userRoutes from '@/routes/users.routes';

const app = express();

app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/users', userRoutes);

// Middleware d'erreur (global)
app.use(errorHandler);

export default app;
