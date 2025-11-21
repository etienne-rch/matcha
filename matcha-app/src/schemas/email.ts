import { z } from 'zod';

export const emailSchema = z.string().email('Format d’email invalide');
