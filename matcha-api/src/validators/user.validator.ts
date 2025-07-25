import { z } from 'zod';





export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/, {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  consentAccepted: z.literal(true),
});

export const userUpdateSchema = z.object({
  civility: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().optional(),
  linkedin: z.string().url().optional(),
  availability: z.string().optional(),
  mobility: z.string().optional(),
  salary: z.number().optional(),
  status: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.array(z.string()).optional(),
  language: z.array(z.string()).optional(),
  location: z.string().optional(),
  contractType: z.string().optional(),
  jobType: z.string().optional(),
  jobCategory: z.string().optional(),
  currentPosition: z.string().optional(),
  portfolio: z.string().url().optional(),
  birthDate: z.coerce.date().optional(),
  bio: z.string().max(1000).optional(),
});