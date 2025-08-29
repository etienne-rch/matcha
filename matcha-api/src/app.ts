import express from 'express';

import { errorHandler } from '@/middlewares/error.middleware';
import authRoutes from '@/routes/auth.routes';
import healthRoutes from '@/routes/health.routes';

const app = express();

// Middleware pour parser le JSON AVANT les routes
app.use(express.json());

// Routes d'authentification
app.use("/api/auth", authRoutes);

// Route de santé (pour monitoring)
app.use('/health', healthRoutes);

// Middleware global de gestion d'erreurs
app.use(errorHandler);

export default app;
