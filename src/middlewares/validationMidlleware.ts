import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const bodyValidation =
  (schema: Schema, arrayFields: string[] = []) =>
  (req: Request, res: Response, next: NextFunction): void => {
    arrayFields.forEach((field) => {
      if (typeof req.body[field] === "string") {
        try {
          const parsed = JSON.parse(req.body[field]);
          req.body[field] = Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          req.body[field] = [req.body[field]];
        }
      }
    });

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        status: 400,
        message: error.details
          .map((detail) => detail.message.replace(/"/g, ""))
          .join(", "),
      });
      return;
    }
    next();
  };