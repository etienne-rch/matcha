import express from 'express';

import { errorHandler } from '@/middlewares/error.middleware';
import healthRoutes from '@/routes/health.routes';
import profileRoutes from '@/routes/profile.route';
import userRoutes from '@/routes/users.routes';
import passwordRoutes from '@/routes/password.routes';

const app = express();

app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/auth', passwordRoutes);


// Middleware d'erreur (global)
app.use(errorHandler);

export default app;
