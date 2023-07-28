import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validatedBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const body = schema.parse(req.body);

    req.body = body;

    return next();
  };

export { validatedBody };
