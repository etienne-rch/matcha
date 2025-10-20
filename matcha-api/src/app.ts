import express from 'express';

import { errorHandler } from '@/middlewares/error.middleware';
import authRoutes from '@/routes/auth.routes';
import healthRoutes from '@/routes/health.routes';
import profileRoutes from '@/routes/profile.route';
import userRoutes from '@/routes/users.routes';


const app = express();

// Middleware to parse JSON BEFORE the routes
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Health route (for monitoring)
app.use('/health', healthRoutes);

// User management routes
app.use('/api/users', userRoutes);

// Profile management routes
app.use('/api/profile', profileRoutes);


// Global error handling middleware
app.use(errorHandler);

export default app;
