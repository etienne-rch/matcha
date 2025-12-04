import { ZodSchema } from 'zod';

export function validateZod<T>(schema: ZodSchema<T>, data: any) {
  const result = schema.safeParse(data);
  if (result.success) return { valid: true, errors: {} };

  const errors: Record<string, string> = {};

  result.error.errors.forEach((err) => {
    const field = err.path[0] as string;
    errors[field] = err.message;
  });

  return { valid: false, errors };
}
