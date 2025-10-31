import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

type RequestPart = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodSchema<any>, part: RequestPart = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const data = req[part];
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      res.status(400).json({ success: false, errors });
      return;
    }

    (req as any)[part] = result.data;
    next();
  };
